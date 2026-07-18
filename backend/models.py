from database import db
from datetime import datetime


class User(db.Model):

    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)

    username = db.Column(db.String(100), unique=True, nullable=False)

    email = db.Column(db.String(150), unique=True, nullable=False)

    password = db.Column(db.String(255), nullable=False)

    created_at = db.Column(db.DateTime, default=datetime.utcnow)


class Report(db.Model):

    __tablename__ = "reports"

    id = db.Column(db.Integer, primary_key=True)

    title = db.Column(db.String(200), nullable=False)

    domain = db.Column(db.String(100), nullable=False)

    abstract = db.Column(db.Text, nullable=False)

    technology = db.Column(db.Text, nullable=False)

    innovation = db.Column(db.Integer)

    complexity = db.Column(db.Integer)

    feasibility = db.Column(db.Integer)

    overall = db.Column(db.Integer)

    summary = db.Column(db.Text)

    risks = db.Column(db.Text)

    improvements = db.Column(db.Text)

    suggested_technologies = db.Column(db.Text)

    viva_questions = db.Column(db.Text)

    saved = db.Column(db.Boolean, default=False)

    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))