from config import db
from datetime import datetime
import bcrypt

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

    def set_password(self, password):
        salt = bcrypt.gensalt()
        self.password_hash = bcrypt.hashpw(password.encode('utf-8'), salt).decode('utf-8')

    def check_password(self, password):
        return bcrypt.checkpw(password.encode('utf-8'), self.password_hash.encode('utf-8'))
    
    def set_username(self):
        first_name = self.first_name.lower()
        last_name = self.last_name.lower()
        birth_month = str(self.date_of_birth.month).zfill(2)
        birth_year_last_two = str(self.date_of_birth.year)[-2:]

        self.username = f"{first_name}{last_name}{birth_month}{birth_year_last_two}"

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

