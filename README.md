# SAARTHI AI - Multilingual Welfare Copilot

A production-ready AI platform built for the NSS IIT Roorkee Challenge 1.1. SAARTHI AI acts as a digital welfare copilot that helps citizens discover schemes, understand eligibility, prepare documents, and complete applications using a Voice-First and WhatsApp-First interface.

## Tech Stack
- **Frontend**: Next.js 15, Tailwind CSS, Shadcn UI, Framer Motion
- **Backend**: FastAPI, Celery, Redis, Qdrant (Vector Database), PostgreSQL
- **AI**: Gemini 2.5 Pro (Vision) / Flash, Bhashini (ULCA Speech API)
- **Deployment**: Docker Compose

## Core Modules
1. **Multi-Agent Orchestrator**: 7 independent AI agents handling Discovery, Eligibility, RAG, Documents, Roadmap, Reminders, and Analytics.
2. **Deterministic Rule Engine**: Zero-hallucination execution. LLM explains, but hard rules decide eligibility.
3. **Bhashini Voice Pipeline**: Full-duplex WebSocket streaming for seamless vernacular conversations.
4. **Judge Dashboard**: Live command center displaying metrics, "Welfare Value Unlocked", and instant demo personas.

## Running Locally
```bash
# 1. Clone the repository and configure environments
cp backend/.env.example backend/.env

# 2. Build the full monorepo stack using Docker Compose
docker compose up --build
```
