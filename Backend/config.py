from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS



app = Flask(__name__)
CORS(app)

app.config["SQLALCHEMY_DATABASE_URI"] = "mysql+pymysql://admin:wiswyh-nyqtUg-zoxdy5@ledgprodb.cpiwgyu8goxy.us-east-1.rds.amazonaws.com:3306/LedgerProDB"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)