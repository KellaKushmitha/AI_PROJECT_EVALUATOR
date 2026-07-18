import json
from dotenv import load_dotenv
import os

load_dotenv()

from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_jwt_extended import jwt_required, get_jwt_identity
import json
from flask_jwt_extended import (
    JWTManager,
    create_access_token,
    jwt_required,
    get_jwt_identity
)

from database import db
from models import User, Report
from agent import evaluate_project


from models import *
from auth import auth

app = Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///reports.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY")

db.init_app(app)
jwt = JWTManager(app)


CORS(app)
app.register_blueprint(auth)
with app.app_context():
    db.create_all()


@app.route("/")
def home():
    return jsonify({
        "status": "running",
        "message": "AI Project Evaluator API"
    })


@app.route("/evaluate", methods=["POST"])
@jwt_required()
def evaluate():

    try:

        data = request.get_json()
        user_id = get_jwt_identity()

        result = evaluate_project(
            data["title"],
            data["domain"],
            data["abstract"],
            data["technology"]
        )

        report = Report(

    title=data["title"],
    domain=data["domain"],
    abstract=data["abstract"],
    technology=data["technology"],

    innovation=result["innovation"],
    complexity=result["complexity"],
    feasibility=result["feasibility"],
    overall=result["overall"],

    summary=result["summary"],

    risks=json.dumps(result["risks"]),
    improvements=json.dumps(result["improvements"]),
    suggested_technologies=json.dumps(result["suggested_technologies"]),
    viva_questions=json.dumps(result["viva_questions"]),

    user_id=user_id
)

        db.session.add(report)
        db.session.commit()

        return jsonify({
    "id": report.id,
    **result
})

    except Exception as e:
        return jsonify({
        "error": str(e)
    }),500

@app.route("/history")
@jwt_required()
def history():

    user_id = get_jwt_identity()

    reports = Report.query.filter_by(
        user_id=user_id
    ).order_by(
        Report.created_at.desc()
    ).all()

    output = []

    for report in reports:

        output.append({

            "id": report.id,

            "title": report.title,

            "domain": report.domain,

            "abstract": report.abstract,

            "technology": report.technology,

            "innovation": report.innovation,

            "complexity": report.complexity,

            "feasibility": report.feasibility,

            "overall": report.overall,

            "summary": report.summary,

            "risks": json.loads(report.risks),

            "improvements": json.loads(report.improvements),

            "suggestedTechnologies": json.loads(report.suggested_technologies),

            "vivaQuestions": json.loads(report.viva_questions),

            "saved": report.saved,

            "date": report.created_at.strftime("%d-%m-%Y %H:%M")

        })

    return jsonify(output)


@app.route("/save/<int:id>", methods=["POST"])
@jwt_required()
def save_report(id):

    user_id = get_jwt_identity()

    report = Report.query.filter_by(
        id=id,
        user_id=user_id
    ).first()

    if report is None:
        return jsonify({"message": "Not Found"}), 404

    report.saved = True

    db.session.commit()

    return jsonify({
        "message": "Saved Successfully"
    })


@app.route("/saved")
@jwt_required()
def saved_reports():

    user_id = get_jwt_identity()

    reports = Report.query.filter_by(
        saved=True,
        user_id=user_id
    ).all()

    output = []

    for report in reports:

        output.append({

            "id": report.id,

            "title": report.title,

            "domain": report.domain,

            "abstract": report.abstract,

            "technology": report.technology,

            "innovation": report.innovation,

            "complexity": report.complexity,

            "feasibility": report.feasibility,

            "overall": report.overall,

            "summary": report.summary,

            "risks": json.loads(report.risks),

            "improvements": json.loads(report.improvements),

            "suggestedTechnologies": json.loads(report.suggested_technologies),

            "vivaQuestions": json.loads(report.viva_questions),

            "date": report.created_at.strftime("%d-%m-%Y %H:%M")

        })

    return jsonify(output)



if __name__ == "__main__":
    app.run(debug=True)