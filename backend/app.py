from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from dotenv import load_dotenv
import os
from database import db

# Load environment variables
load_dotenv()

# Initialize extensions
jwt = JWTManager()

def create_app():
    app = Flask(__name__)
    
    # Configuration
    app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'dev-secret-key')
    app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY', 'dev-jwt-secret')
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'sqlite:///emexa.db')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    
    # CORS configuration - Frontend always on port 5173
    # But allow 5174-5190 as backup in case port conflicts occur
    CORS(app, 
         origins=[
             "http://localhost:5173",  # Primary frontend port
             "http://localhost:5174", "http://localhost:5175", "http://localhost:5176",
             "http://localhost:5177", "http://localhost:5178", "http://localhost:5179",
             "http://localhost:5180", "http://localhost:5181", "http://localhost:5182",
             "http://localhost:5183", "http://localhost:5184", "http://localhost:5185",
             "http://127.0.0.1:5173",  # Primary frontend port (127.0.0.1)
             "http://127.0.0.1:5174", "http://127.0.0.1:5175", "http://127.0.0.1:5176",
             "http://127.0.0.1:5177", "http://127.0.0.1:5178", "http://127.0.0.1:5179",
             "http://127.0.0.1:5180", "http://127.0.0.1:5181", "http://127.0.0.1:5182",
             "http://127.0.0.1:5183", "http://127.0.0.1:5184", "http://127.0.0.1:5185",
         ],
         supports_credentials=True,
         allow_headers=['Content-Type', 'Authorization'],
         expose_headers=['Content-Type', 'Authorization'])
    
    # Initialize extensions with app
    db.init_app(app)
    jwt.init_app(app)
    
    # Register blueprints
    from routes.auth import auth_bp
    app.register_blueprint(auth_bp, url_prefix='/auth')
    
    # Import models to ensure they are registered with SQLAlchemy
    from models.user import User, Student, Teacher
    
    # Create database tables
    with app.app_context():
        db.create_all()
        print("Database tables created successfully!")
        print("   - users table")
        print("   - students table") 
        print("   - teachers table")
    
    @app.route('/')
    def index():
        return {'message': 'EMEXA API is running', 'version': '1.0.0'}
    
    return app

if __name__ == '__main__':
    app = create_app()
    print("\n>> Starting Flask server on http://127.0.0.1:5000")
    print(">> CORS enabled for localhost ports 5173-5183\n")
    app.run(debug=True, host='127.0.0.1', port=5000, use_reloader=False)
