from flask import request, jsonify
from config import app, db
from models import users, Accounts, event_log, transactions, transaction_entries
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




#######                            ########
  #######   account api calls    ########
#######                            ########

@app.route("/get_accounts", methods=["GET"])
def get_accounts():
    all_accounts = Accounts.query.all()
    json_accounts = list(map(lambda x: x.to_json(), all_accounts))
    return jsonify({"allAccounts": json_accounts})

@app.route("/get_account/<int:account_id>", methods=["GET"])
def get_account(account_id):
    account = Accounts.query.get(account_id)
    json_account = account.to_json()
    return jsonify({"account": json_account})

@app.route("/update_account/<int:account_id>", methods=["PATCH"])
def update_account(account_id):
    account = Accounts.query.get(account_id)

    if not account:
        return jsonify({"message": "User not found"}), 404
    
    data = request.json
    account.account_name = data.get("account_name", account.account_name)
    account.account_num = data.get("account_num", account.account_num)
    account.account_desc = data.get("account_desc", account.account_desc)
    account.normal_side = data.get("normal_side", account.normal_side)
    account.category = data.get("category", account.category)
    account.subcategory = data.get("subcategory", account.subcategory)
    account.isActive = data.get("isActive", account.isActive)

    db.session.commit()

    return jsonify({"message": "Account updated!"}), 200

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
    
    new_account = Accounts(account_num=account_num, account_name=account_name, account_desc=account_desc, normal_side=normal_side, category=category, subcategory=subcategory, initial_balance=initial_balance, account_owner=account_owner)
    if new_account.initial_balance != 0.0 and new_account.initial_balance != 0:
        new_account.place_initial_balance()
        new_account.place_balance()

    new_event = event_log(user_id=account_owner, table_name="Accounts", column_name="all", old_value="null", new_value=account_name, action="add")

    try:
        db.session.add(new_account)
        db.session.add(new_event)
        db.session.commit()
    except Exception as e:
        return jsonify({"message": str(e)}), 400
    
    return jsonify({"message": "User created!"}), 201



#######                            ########
  #######   transaction api calls    ########
#######                            ########

@app.route("/get_transactions", methods=["GET"])
def get_transactions():
    all_transactions = transactions.query.all()
    json_transactions = list(map(lambda x: x.to_json(), all_transactions))
    return jsonify({"allTransactions": json_transactions})

@app.route("/get_entries/<int:transaction_id>", methods=["GET"])
def get_entries(transaction_id):
    all_entries = transaction_entries.query.filter(transaction_entries.account_id == transaction_id).all()
    json_entries = list(map(lambda x: x.to_json(), all_entries))
    return jsonify({"allEntries": json_entries})

@app.route("/get_transaction_by_acc/<int:account_id>", methods=["GET"])
def get_transactions_by_acc(account_id):
    # Step 1: Get all distinct transaction IDs for the given account_id
    transaction_ids = db.session.query(transaction_entries.transaction_id)\
                                .filter(transaction_entries.account_id == account_id)\
                                .distinct()\
                                .all()
    
    transaction_ids = [tid[0] for tid in transaction_ids]

    all_entries = transactions.query.filter(transaction_entries.transaction_id.in_(transaction_ids)).all()

    # Convert to JSON format
    json_entries = [entry.to_json() for entry in all_entries]

    return jsonify({"allTransactions": json_entries})

@app.route("/get_transaction/<int:transaction_id>", methods=["GET"])
def get_transaction(transaction_id):
    transaction = transactions.query.get(transaction_id)
    json_transaction = transaction.to_json()

    entries = transaction_entries.query.filter(transaction_entries.transaction_id == transaction_id).all()
    json_transaction_entries = list(map(lambda x: x.to_json(), entries))

    return jsonify({
        "transaction": json_transaction, 
        "transaction_entries": json_transaction_entries
    })

@app.route("/update_transaction/<int:transaction_id>", methods=["PATCH"])
def update_transaction(transaction_id):
    transaction = transactions.query.get(transaction_id)

    if not transaction:
        return jsonify({"message": "User not found"}), 404
    
    data = request.json
    transaction.transaction_id = data.get("transaction_id", transaction.transaction_id)
    transaction.transaction_type = data.get("transaction_type", transaction.transaction_type)
    transaction.description = data.get("description", transaction.description)
    transaction.transaction_date = data.get("transaction_date", transaction.transaction_date)
    transaction.user_id = data.get("user_id", transaction.user_id)
    transaction.status = data.get("status", transaction.status)
    transaction.date_created = data.get("date_created", transaction.date_created)
    transaction.date_updated = data.get("date_updated", transaction.date_updated)
    transaction.comment = data.get("comment", transaction.comment)

    db.session.commit()

    return jsonify({"message": "Journal updated!"}), 200

@app.route("/create_transaction", methods=["POST"])
def create_transaction():
    data = request.json  # Retrieve JSON payload

    # Extract transaction details
    description = data.get("description")
    transaction_type = data.get("transaction_type")
    transaction_date = datetime.strptime(data.get("transaction_date"), '%Y-%m-%d').date()
    user_id = data.get("user_id")
    entries = data.get("entries")

    if not all([description, transaction_type, transaction_date, user_id]):
        return jsonify({"message": "Missing required fields"}), 400
    
    
    new_transaction = transactions(
        description=description,
        transaction_type=transaction_type,
        transaction_date=transaction_date,
        user_id=user_id,
        status="Pending"
    )

    new_event = event_log(
        user_id=user_id,
        table_name="Transactions",
        column_name="all",
        old_value="null",
        new_value="new transaction",
        action="add"
    )

    try:
        db.session.add(new_transaction)
        db.session.add(new_event)
        db.session.commit()
    except Exception as e:
        return jsonify({"message": str(e)}), 400

     # Use the generated transaction ID for entries
    transaction_id = new_transaction.transaction_id  # Get the newly created transaction ID

    transaction_entries_list = []
    event_logs_list = []

    for entry in entries:
        account_id = entry.get("account_id")
        amount = entry.get("amount")
        entry_type = entry.get("type")

        # Validate entry data
        if not all([account_id, amount, entry_type]):
            return jsonify({"message": "Missing required fields in entries"}), 400

        new_entry = transaction_entries(
            transaction_id=transaction_id,
            amount=amount,
            account_id=account_id,
            type=entry_type
        )

        new_entry_event = event_log(
            user_id=user_id,
            table_name="transaction_entries",
            column_name="all",
            old_value="null",
            new_value=str(transaction_id),
            action="add"
        )

        transaction_entries_list.append(new_entry)
        event_logs_list.append(new_entry_event)

    try:
        db.session.add_all(transaction_entries_list)
        db.session.add_all(event_logs_list)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": str(e)}), 400

    return jsonify({"message": "Transaction and entries created successfully!", "transaction_id": transaction_id}), 201

@app.route("/create_transaction_entries/<int:id>", methods=["POST"])
def create_transaction_entries(id):

    transaction_id = request.json.get("transaction_id")
    amount = request.json.get("amount")
    type = request.json.get("type")

    
    if not transaction_id:
        return (jsonify({"message": "transaction_id"}), 400)

    
    if not amount:
        return (jsonify({"message": "transaction_date"}), 400)
    
    if not type:
        return (jsonify({"message": "type"}), 400)
    
    
    new_transaction_entry = transaction_entries(transaction_id=transaction_id, amount=amount, account_id=id, type=type)

    new_event = event_log(user_id=id, table_name="transaction_entries", column_name="all", old_value="null", new_value=transaction_id, action="add")

    try:
        db.session.add(new_transaction_entry)
        db.session.add(new_event)
        db.session.commit()
    except Exception as e:
        return jsonify({"message": str(e)}), 400
    
    return jsonify({"message": "Transaction entry created!"}), 201

@app.route("/excute_transaction/<int:id>", methods=["PATCH"])
def excute_transaction(id):

    transaction_id = request.json.get("transaction_id")
    amount = request.json.get("amount")
    type = request.json.get("type")

    
    if not transaction_id:
        return (jsonify({"message": "transaction_id"}), 400)

    
    if not amount:
        return (jsonify({"message": "transaction_date"}), 400)
    
    if not type:
        return (jsonify({"message": "type"}), 400)
    
    
    new_transaction_entry = transaction_entries(transaction_id=transaction_id, amount=amount, account_id=id, type=type)

    new_event = event_log(user_id=id, table_name="transaction_entries", column_name="all", old_value="null", new_value=transaction_id, action="add")

    try:
        db.session.add(new_transaction_entry)
        db.session.add(new_event)
        db.session.commit()
    except Exception as e:
        return jsonify({"message": str(e)}), 400
    
    return jsonify({"message": "Transaction entry created!"}), 201




#######                            ########
  #######   event api calls    ########
#######                            ########

@app.route("/get_events", methods=["GET"])
def get_events():
    all_events = event_log.query.all()
    json_events = list(map(lambda x: x.to_json(), all_events))
    return jsonify({"allEvents": json_events})


if __name__ == "__main__":
    with app.app_context():
        db.create_all()

    app.run(debug=True)




