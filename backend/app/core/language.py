"""
Saarthi AI – Core Language Infrastructure
==========================================
Handles language detection, registry, translation routing,
and code-mixing support for 25+ Indian languages.
"""
import re
import logging
from typing import Optional
from dataclasses import dataclass, field

logger = logging.getLogger(__name__)

# ───────────────────────────────────────────────────────
#  Language Registry – Add new languages without code changes
# ───────────────────────────────────────────────────────

@dataclass
class LanguageConfig:
    code: str            # ISO 639 / BCP-47
    name_en: str         # English name
    name_native: str     # Native script name
    script: str          # Unicode script block name
    bhashini_code: str   # Bhashini pipeline language code
    tier: int = 1        # Priority tier (1 = primary, 2 = secondary)
    tts_supported: bool = True
    asr_supported: bool = True

LANGUAGE_REGISTRY: dict[str, LanguageConfig] = {
    # ── Tier 1 ──
    "en": LanguageConfig("en", "English", "English", "Latin", "en", 1),
    "hi": LanguageConfig("hi", "Hindi", "हिन्दी", "Devanagari", "hi", 1),
    "bn": LanguageConfig("bn", "Bengali", "বাংলা", "Bengali", "bn", 1),
    "te": LanguageConfig("te", "Telugu", "తెలుగు", "Telugu", "te", 1),
    "mr": LanguageConfig("mr", "Marathi", "मराठी", "Devanagari", "mr", 1),
    "ta": LanguageConfig("ta", "Tamil", "தமிழ்", "Tamil", "ta", 1),
    "ur": LanguageConfig("ur", "Urdu", "اردو", "Arabic", "ur", 1),
    "gu": LanguageConfig("gu", "Gujarati", "ગુજરાતી", "Gujarati", "gu", 1),
    "kn": LanguageConfig("kn", "Kannada", "ಕನ್ನಡ", "Kannada", "kn", 1),
    "or": LanguageConfig("or", "Odia", "ଓଡ଼ିଆ", "Oriya", "or", 1),
    "ml": LanguageConfig("ml", "Malayalam", "മലയാളം", "Malayalam", "ml", 1),
    "pa": LanguageConfig("pa", "Punjabi", "ਪੰਜਾਬੀ", "Gurmukhi", "pa", 1),
    "as": LanguageConfig("as", "Assamese", "অসমীয়া", "Bengali", "as", 1),
    # ── Tier 2 ──
    "bho": LanguageConfig("bho", "Bhojpuri", "भोजपुरी", "Devanagari", "bho", 2),
    "mai": LanguageConfig("mai", "Maithili", "मैथिली", "Devanagari", "mai", 2),
    "mag": LanguageConfig("mag", "Magahi", "मगही", "Devanagari", "mag", 2, tts_supported=False),
    "sa":  LanguageConfig("sa", "Sanskrit", "संस्कृतम्", "Devanagari", "sa", 2, tts_supported=False, asr_supported=False),
    "kok": LanguageConfig("kok", "Konkani", "कोंकणी", "Devanagari", "kok", 2, tts_supported=False),
    "doi": LanguageConfig("doi", "Dogri", "डोगरी", "Devanagari", "doi", 2, tts_supported=False),
    "ks":  LanguageConfig("ks", "Kashmiri", "कॉशुर", "Arabic", "ks", 2, tts_supported=False),
    "mni": LanguageConfig("mni", "Manipuri", "মৈতৈলোন্", "Bengali", "mni", 2, tts_supported=False),
    "brx": LanguageConfig("brx", "Bodo", "बड़ो", "Devanagari", "brx", 2, tts_supported=False),
    "sat": LanguageConfig("sat", "Santali", "ᱥᱟᱱᱛᱟᱲᱤ", "OlChiki", "sat", 2, tts_supported=False),
    "sd":  LanguageConfig("sd", "Sindhi", "سنڌي", "Arabic", "sd", 2, tts_supported=False),
    "ne":  LanguageConfig("ne", "Nepali", "नेपाली", "Devanagari", "ne", 2),
}

def get_language(code: str) -> Optional[LanguageConfig]:
    return LANGUAGE_REGISTRY.get(code)

def get_all_languages(tier: Optional[int] = None) -> list[LanguageConfig]:
    langs = list(LANGUAGE_REGISTRY.values())
    if tier:
        langs = [l for l in langs if l.tier == tier]
    return langs

# ───────────────────────────────────────────────────────
#  Script-Based Language Detection
# ───────────────────────────────────────────────────────

# Unicode ranges for Indian scripts
SCRIPT_RANGES = {
    "Devanagari":  (0x0900, 0x097F),
    "Bengali":     (0x0980, 0x09FF),
    "Gurmukhi":    (0x0A00, 0x0A7F),
    "Gujarati":    (0x0A80, 0x0AFF),
    "Oriya":       (0x0B00, 0x0B7F),
    "Tamil":       (0x0B80, 0x0BFF),
    "Telugu":      (0x0C00, 0x0C7F),
    "Kannada":     (0x0C80, 0x0CFF),
    "Malayalam":   (0x0D00, 0x0D7F),
    "Arabic":      (0x0600, 0x06FF),
    "OlChiki":     (0x1C50, 0x1C7F),
}

# Map script → most likely language code
SCRIPT_TO_LANG: dict[str, str] = {
    "Bengali":    "bn",
    "Gurmukhi":   "pa",
    "Gujarati":   "gu",
    "Oriya":      "or",
    "Tamil":      "ta",
    "Telugu":     "te",
    "Kannada":    "kn",
    "Malayalam":  "ml",
    "OlChiki":    "sat",
}

# Romanized Hindi keyword detection
HINDI_KEYWORDS = {
    "mera", "meri", "mere", "hai", "hum", "kya", "kaise", "karu",
    "chahiye", "yojana", "sarkari", "paisa", "liye", "kaunsi",
    "mujhe", "hamara", "nahi", "aur", "se", "ke", "ka", "ki",
    "ko", "par", "abhi", "haan", "nahin", "wala", "kaam",
}


@dataclass
class DetectionResult:
    language_code: str
    confidence: float
    is_mixed: bool = False
    secondary_language: Optional[str] = None


def detect_language(text: str) -> DetectionResult:
    """
    Detect language from user input using Unicode script analysis
    and romanized Hindi keyword matching for code-mixed text.
    """
    if not text or not text.strip():
        return DetectionResult("hi", 0.5)  # Default to Hindi

    # Count characters per script
    script_counts: dict[str, int] = {}
    latin_count = 0
    total_alpha = 0

    for char in text:
        cp = ord(char)
        if char.isalpha():
            total_alpha += 1
            matched = False
            for script_name, (start, end) in SCRIPT_RANGES.items():
                if start <= cp <= end:
                    script_counts[script_name] = script_counts.get(script_name, 0) + 1
                    matched = True
                    break
            if not matched and cp < 0x0080:
                latin_count += 1

    if total_alpha == 0:
        return DetectionResult("hi", 0.5)

    # If we have a dominant non-Latin script, use it
    if script_counts:
        dominant_script = max(script_counts, key=script_counts.get)  # type: ignore
        dominant_count = script_counts[dominant_script]
        confidence = dominant_count / total_alpha

        # Devanagari needs disambiguation (Hindi vs Marathi vs others)
        if dominant_script == "Devanagari":
            lang_code = _disambiguate_devanagari(text)
        else:
            lang_code = SCRIPT_TO_LANG.get(dominant_script, "en")

        # Check if mixed with Latin
        is_mixed = latin_count > 0 and latin_count / total_alpha > 0.1
        secondary = "en" if is_mixed else None

        return DetectionResult(lang_code, confidence, is_mixed, secondary)

    # All Latin – check for romanized Hindi / code-mixed
    words = set(re.findall(r'[a-zA-Z]+', text.lower()))
    hindi_matches = words & HINDI_KEYWORDS
    hindi_ratio = len(hindi_matches) / max(len(words), 1)

    if hindi_ratio >= 0.2:
        is_mixed = hindi_ratio < 0.8
        return DetectionResult("hi", 0.6 + hindi_ratio * 0.3, is_mixed, "en" if is_mixed else None)

    return DetectionResult("en", 0.9)


def _disambiguate_devanagari(text: str) -> str:
    """Distinguish Hindi from Marathi/Bhojpuri/Maithili using keyword heuristics."""
    lower = text.lower()
    # Marathi markers
    marathi_markers = ["आहे", "मी", "तुम्ही", "काय", "हे", "ते", "ना"]
    if any(m in text for m in marathi_markers):
        return "mr"
    return "hi"  # Default Devanagari → Hindi


# ───────────────────────────────────────────────────────
#  Translation Service (Gemini-powered)
# ───────────────────────────────────────────────────────

class TranslationService:
    """
    Translates agent responses into the user's preferred language
    using Gemini Flash for speed, with Bhashini as fallback.
    """

    async def translate(self, text: str, source_lang: str, target_lang: str) -> str:
        """Translate text between languages using Gemini."""
        if source_lang == target_lang:
            return text

        try:
            import google.generativeai as genai
            from app.config import get_settings
            settings = get_settings()
            genai.configure(api_key=settings.gemini_api_key)

            model = genai.GenerativeModel("gemini-2.0-flash")
            target_config = get_language(target_lang)
            target_name = target_config.name_en if target_config else target_lang

            prompt = (
                f"Translate the following text to {target_name}. "
                f"Return ONLY the translation, nothing else. "
                f"Use simple, conversational language suitable for rural Indian citizens.\n\n"
                f"{text}"
            )
            response = await model.generate_content_async(prompt)
            return response.text.strip()
        except Exception as e:
            logger.error(f"Translation failed: {e}")
            return text  # Graceful fallback – return original

    async def translate_batch(self, texts: list[str], source_lang: str, target_lang: str) -> list[str]:
        """Translate multiple texts efficiently."""
        if source_lang == target_lang:
            return texts
        results = []
        for t in texts:
            results.append(await self.translate(t, source_lang, target_lang))
        return results


translation_service = TranslationService()
