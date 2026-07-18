from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token
from werkzeug.security import generate_password_hash, check_password_hash

from database import db
from models import User

auth = Blueprint("auth", __name__)#strating point of authorization


@auth.route("/register", methods=["POST"])
def signup():

    data = request.get_json()

    username = data["username"]
    email = data["email"]
    password = data["password"]


    existing_user = User.query.filter_by(email=email).first()

    if existing_user:
        return jsonify({
            "message":"Email already registered"
        }),400


    hashed_password = generate_password_hash(password)


    user = User(
        username=username,
        email=email,
        password=hashed_password
    )


    db.session.add(user)#adding user to db
    db.session.commit()


    return jsonify({
        "message":"Registration successful"
    }),201



@auth.route("/login", methods=["POST"])
def login():

    data = request.get_json()

    email = data.get("email")
    password = data.get("password")

    print("Entered email:", email)

    user = User.query.filter_by(email=email).first()

    print("User from database:", user)

    if not user:
        return jsonify({
            "message":"User not found"
        }),401


    print("Stored password:", user.password)


    if not check_password_hash(user.password, password):

        print("Password mismatch")

        return jsonify({
            "message":"Password incorrect"
        }),401


    token = create_access_token(
        identity=str(user.id)
    )


    return jsonify({
        "access_token":token,
        "username":user.username
    })