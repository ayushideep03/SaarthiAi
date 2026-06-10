from sqlalchemy import Column, String, Integer, Boolean, JSON, ForeignKey, Text, Float, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID
from app.database import Base
from app.models.base import AuditableBase

class User(Base, AuditableBase):
    __tablename__ = 'users'
    
    phone_number = Column(String(20), unique=True, index=True, nullable=False)
    role = Column(String(20), default="citizen", nullable=False) # citizen, admin, judge
    hashed_password = Column(String(255), nullable=True) # Optional if passwordless
    is_active = Column(Boolean, default=True)

    profile = relationship("Profile", back_populates="user", uselist=False)
    documents = relationship("Document", back_populates="user")
    chat_history = relationship("ChatHistory", back_populates="user")
    reminders = relationship("Reminder", back_populates="user")

class Profile(Base, AuditableBase):
    __tablename__ = 'profiles'
    
    user_id = Column(UUID(as_uuid=True), ForeignKey('users.id'), unique=True, nullable=False)
    age = Column(Integer, nullable=True)
    gender = Column(String(20), nullable=True)
    occupation = Column(String(100), nullable=True)
    income = Column(Integer, nullable=True)
    state = Column(String(50), nullable=True)
    is_rural = Column(Boolean, nullable=True)
    disability_status = Column(Boolean, nullable=True)
    context_state = Column(JSON, default={})
    
    user = relationship("User", back_populates="profile")
    eligibility_results = relationship("EligibilityResult", back_populates="profile")

class Scheme(Base, AuditableBase):
    __tablename__ = 'schemes'
    
    scheme_id = Column(String(50), unique=True, index=True, nullable=False)
    name = Column(String(200), nullable=False)
    description = Column(Text, nullable=False)
    expected_benefit_value = Column(Integer, nullable=True) # e.g. 6000
    expected_benefit_text = Column(String(200), nullable=True) # e.g. ₹6,000/year
    
    rules = relationship("SchemeRule", back_populates="scheme")
    eligibility_results = relationship("EligibilityResult", back_populates="scheme")

class SchemeRule(Base, AuditableBase):
    __tablename__ = 'scheme_rules'
    
    scheme_id = Column(UUID(as_uuid=True), ForeignKey('schemes.id'), nullable=False)
    rule_type = Column(String(50), nullable=False) # e.g. EQUALS, GREATER_THAN, CONTAINS
    attribute = Column(String(50), nullable=False) # e.g. occupation, income
    value = Column(String(200), nullable=False)
    
    scheme = relationship("Scheme", back_populates="rules")

class Document(Base, AuditableBase):
    __tablename__ = 'documents'
    
    user_id = Column(UUID(as_uuid=True), ForeignKey('users.id'), nullable=False)
    document_type = Column(String(50), nullable=False) # e.g. AADHAAR, INCOME_CERT
    file_url = Column(String(500), nullable=False)
    is_verified = Column(Boolean, default=False)
    readiness_score = Column(Float, default=0.0)
    
    user = relationship("User", back_populates="documents")
    checks = relationship("DocumentCheck", back_populates="document")

class DocumentCheck(Base, AuditableBase):
    __tablename__ = 'document_checks'
    
    document_id = Column(UUID(as_uuid=True), ForeignKey('documents.id'), nullable=False)
    extracted_data = Column(JSON, default={}) # Redacted info
    ai_confidence = Column(Float, nullable=False)
    status = Column(String(50), nullable=False) # PASS, FAIL, MANUAL_REVIEW
    
    document = relationship("Document", back_populates="checks")

class EligibilityResult(Base, AuditableBase):
    __tablename__ = 'eligibility_results'
    
    profile_id = Column(UUID(as_uuid=True), ForeignKey('profiles.id'), nullable=False)
    scheme_id = Column(UUID(as_uuid=True), ForeignKey('schemes.id'), nullable=False)
    is_eligible = Column(Boolean, nullable=False)
    confidence_score = Column(Float, nullable=False)
    missing_requirements = Column(JSON, default=[])
    
    profile = relationship("Profile", back_populates="eligibility_results")
    scheme = relationship("Scheme", back_populates="eligibility_results")

class Reminder(Base, AuditableBase):
    __tablename__ = 'reminders'
    
    user_id = Column(UUID(as_uuid=True), ForeignKey('users.id'), nullable=False)
    reminder_type = Column(String(50), nullable=False) # RENEWAL, DEADLINE
    message = Column(Text, nullable=False)
    scheduled_for = Column(DateTime, nullable=False)
    is_sent = Column(Boolean, default=False)
    
    user = relationship("User", back_populates="reminders")

class ChatHistory(Base, AuditableBase):
    __tablename__ = 'chat_history'
    
    user_id = Column(UUID(as_uuid=True), ForeignKey('users.id'), nullable=False)
    role = Column(String(20), nullable=False) # user, assistant
    content = Column(Text, nullable=False)
    
    user = relationship("User", back_populates="chat_history")

class AnalyticsEvent(Base, AuditableBase):
    __tablename__ = 'analytics_events'
    
    event_type = Column(String(50), nullable=False, index=True)
    user_id = Column(UUID(as_uuid=True), ForeignKey('users.id'), nullable=True)
    metadata_json = Column(JSON, default={})
    latency_ms = Column(Integer, nullable=True)

class AuditLog(Base, AuditableBase):
    __tablename__ = 'audit_logs'
    
    action = Column(String(100), nullable=False)
    actor_id = Column(UUID(as_uuid=True), nullable=True) # nullable for system actions
    resource_type = Column(String(50), nullable=False)
    resource_id = Column(UUID(as_uuid=True), nullable=True)
    details = Column(JSON, default={})
