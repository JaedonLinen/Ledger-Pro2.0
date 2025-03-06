from flask import request, jsonify
from config import app, db
from models import users, accounts
from datetime import datetime

@app.route("/get_users", methods=["GET"])
def get_users():
    all_users = users.query.all()
    json_users = list(map(lambda x: x.to_json(), all_users))
    return jsonify({"allUsers": json_users})

@app.route("/login", methods=["POST"])
def login():
    data = request.json
    username = data.get("username")
    password = data.get("password")

    if not username or not password:
        return jsonify({"error": "Username and password are required"}), 400
    
    user = users.query.filter_by(username=username).first()

    if user and user.check_password(password): 
        return jsonify({"message": "Login successful", "user": user.to_json()}), 201
    else:
        return jsonify({"message": "Invalid username or password"}), 401

@app.route("/create_user", methods=["POST"])
def create_user():
    first_name = request.json.get("firstName")
    last_name = request.json.get("lastName")
    email = request.json.get("email")
    password_hash = request.json.get("passwordHash")
    role = request.json.get("role")
    date_of_birth = datetime.strptime(request.json.get("dateOfBirth"), '%Y-%m-%d').date()
    
    if not first_name:
        return (jsonify({"message": "First Name"}), 400)

    if not last_name:
        return (jsonify({"message": "Last Name"}), 400)
    
    if not email:
        return (jsonify({"message": "Email"}), 400)
    
    if not password_hash:
        return (jsonify({"message": "Password"}), 400)
    
    if not role:
        return (jsonify({"message": "role"}), 400)
    
    if not date_of_birth:
        return (jsonify({"message": "dob"}), 400)
    
    new_user =  users(first_name=first_name, last_name=last_name, email=email, password_hash=password_hash, role=role, date_of_birth=date_of_birth, isActive="Active")
    new_user.set_password(password_hash)
    new_user.set_username()


    try:
        db.session.add(new_user)
        db.session.commit()
    except Exception as e:
        return jsonify({"message": str(e)}), 400
    
    return jsonify({"message": "User created!"}), 201

@app.route("/register_user", methods=["POST"])
def register_user():
    first_name = request.json.get("firstName")
    last_name = request.json.get("lastName")
    email = request.json.get("email")
    password_hash = request.json.get("passwordHash")
    role = request.json.get("role")
    date_of_birth = datetime.strptime(request.json.get("dateOfBirth"), '%Y-%m-%d').date()
    
    if not first_name:
        return (jsonify({"message": "First Name"}), 400)

    if not last_name:
        return (jsonify({"message": "Last Name"}), 400)
    
    if not email:
        return (jsonify({"message": "Email"}), 400)
    
    if not password_hash:
        return (jsonify({"message": "Password"}), 400)
    
    if not role:
        return (jsonify({"message": "role"}), 400)
    
    if not date_of_birth:
        return (jsonify({"message": "dob"}), 400)
    
    new_user =  users(first_name=first_name, last_name=last_name, email=email, password_hash=password_hash, role=role, date_of_birth=date_of_birth, isActive="Inactive")
    new_user.set_password(password_hash)
    new_user.set_username()


    try:
        db.session.add(new_user)
        db.session.commit()
    except Exception as e:
        return jsonify({"message": str(e)}), 400
    
    return jsonify({"message": "User created!"}), 201

@app.route("/update_user/<int:user_id>", methods=["PATCH"])
def update_user(user_id):
    user = users.query.get(user_id)

    if not user:
        return jsonify({"message": "User not found"}), 404
    
    data = request.json
    user.first_name = data.get("firstName", user.first_name)
    user.last_name = data.get("lastName", user.last_name)
    user.username = data.get("username", user.username)
    user.email = data.get("email", user.email)
    user.password_hash = data.get("passwordHash", user.password_hash)
    user.role = data.get("role", user.role)
    user.date_of_birth = datetime.strptime((data.get("dateOfBirth", user.date_of_birth)), "%a, %d %b %Y %H:%M:%S %Z").date()
    user.isActive = data.get("isActive", user.isActive)

    db.session.commit()

    return jsonify({"message": "User updated!"}), 200

@app.route("/delete_user/<int:user_id>", methods=["DELETE"])
def delete_user(user_id):
    user = users.query.get(user_id)

    if not user:
        return jsonify({"message": "User not found"}), 404
    
    db.session.delete(user)
    db.session.commit()

    return jsonify({"message": "User deleted!"}), 200

if __name__ == "__main__":
    with app.app_context():
        db.create_all()

    app.run(debug=True)




################# account api calls #######################
@app.route("/get_accounts", methods=["GET"])
def get_accounts():
    all_accounts = users.query.all()
    json_accounts = list(map(lambda x: x.to_json(), all_accounts))
    return jsonify({"allAccounts": json_accounts})

@app.route("/create_account", methods=["POST"])
def create_account():
    account_name = request.json.get("account_name")
    account_num = request.json.get("account_num")
    account_desc = request.json.get("account_desc")
    normal_side = request.json.get("normal_side")
    category = request.json.get("category")
    subcategory = request.json.get("subcategory")
    initial_balance = request.json.get("initial_balance")
    account_owner = request.json.get("account_owner")
    
    if not account_name:
        return (jsonify({"message": "Account Name"}), 400)

    if not account_num:
        return (jsonify({"message": "Account Number"}), 400)
    
    if not account_desc:
        return (jsonify({"message": "Account description"}), 400)
    
    if not normal_side:
        return (jsonify({"message": "Normal Side"}), 400)
    
    if not category:
        return (jsonify({"message": "Category"}), 400)
    
    if not subcategory:
        return (jsonify({"message": "Subcategory"}), 400)
    
    if not initial_balance:
        return (jsonify({"message": "Initial Balance"}), 400)
    
    if not account_owner:
        return (jsonify({"message": "Account Owner"}), 400)
    
    new_account = accounts(account_num=account_num, account_name=account_name, account_desc=account_desc, normal_side=normal_side, category=category, subcategory=subcategory, initial_balance=initial_balance, account_owner=account_owner)

    try:
        db.session.add(new_account)
        db.session.commit()
    except Exception as e:
        return jsonify({"message": str(e)}), 400
    
    return jsonify({"message": "User created!"}), 201


