from config import db
from datetime import datetime

class users(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name =  db.Column(db.String(50), unique=False, nullable=False)
    last_name =  db.Column(db.String(50), unique=False, nullable=False)
    username =  db.Column(db.String(50), unique=True, nullable=False)
    email =  db.Column(db.String(100), unique=False, nullable=False)
    password_hash = db.Column(db.String(255), unique=True, nullable=False)
    role =  db.Column(db.String(7), unique=False, nullable=False)
    date_of_birth =  db.Column(db.Date, unique=False, nullable=False)
    created_at =  db.Column(db.DateTime, default=datetime.now)

    def to_json(self):
        return{
            "id": self.id,
            "firstName": self.first_name,
            "lastName": self.last_name,
            "username": self.username,
            "email": self.email,
            "passwordHash": self.password_hash,
            "role": self.role,
            "dateOfBirth": self.date_of_birth,
            "createdAt": self.created_at
        }

