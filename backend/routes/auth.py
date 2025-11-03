from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from database import db
from models.user import User, Student, Teacher
from email_validator import validate_email, EmailNotValidError

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/login', methods=['POST'])
def login():
    """Login endpoint - authenticate user and return JWT token"""
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({'message': 'No data provided'}), 400
        
        email = data.get('email', '').strip()
        password = data.get('password', '')
        
        if not email or not password:
            return jsonify({'message': 'Email and password are required'}), 400
        
        # Try to find user in Student table first
        student = Student.query.filter_by(email=email).first()
        if student and student.check_password(password):
            access_token = create_access_token(identity={'id': student.id, 'type': 'student'})
            return jsonify({
                'token': access_token,
                'user': student.to_dict()
            }), 200
        
        # Try to find user in Teacher table
        teacher = Teacher.query.filter_by(email=email).first()
        if teacher and teacher.check_password(password):
            access_token = create_access_token(identity={'id': teacher.id, 'type': 'teacher'})
            return jsonify({
                'token': access_token,
                'user': teacher.to_dict()
            }), 200
        
        # If not found in either table, return error
        return jsonify({'message': 'Invalid email or password'}), 401
        
    except Exception as e:
        return jsonify({'message': f'Login failed: {str(e)}'}), 500


@auth_bp.route('/register', methods=['POST'])
def register():
    """Register endpoint - create new student or teacher account"""
    try:
        data = request.get_json()
        
        print("\n" + "="*60)
        print("REGISTRATION REQUEST RECEIVED")
        print("="*60)
        
        if not data:
            return jsonify({'message': 'No data provided'}), 400
        
        full_name = data.get('fullName', '').strip()
        email = data.get('email', '').strip()
        password = data.get('password', '')
        account_type = data.get('accountType', 'student')
        
        print(f"Full Name: {full_name}")
        print(f"Email: {email}")
        print(f"Password: {'*' * len(password)} ({len(password)} characters)")
        print(f"Account Type: {account_type}")
        
        # Validation
        if not full_name:
            return jsonify({'message': 'Full name is required'}), 400
        
        if not email:
            return jsonify({'message': 'Email is required'}), 400
        
        # Validate email format
        try:
            validate_email(email)
        except EmailNotValidError:
            return jsonify({'message': 'Invalid email format'}), 400
        
        if not password or len(password) < 8:
            return jsonify({'message': 'Password must be at least 8 characters'}), 400
        
        if account_type not in ['student', 'teacher']:
            return jsonify({'message': 'Account type must be student or teacher'}), 400
        
        # Check if email already exists in Student or Teacher tables
        existing_student = Student.query.filter_by(email=email).first()
        existing_teacher = Teacher.query.filter_by(email=email).first()
        
        if existing_student or existing_teacher:
            print(f"WARNING: Email {email} already exists!")
            return jsonify({'message': 'Email already registered'}), 409
        
        print(f"Validation passed - Creating {account_type} account...")
        
        # Create new student or teacher based on account type
        if account_type == 'student':
            new_user = Student(
                full_name=full_name,
                email=email
            )
            new_user.set_password(password)
            db.session.add(new_user)
            db.session.commit()
            
            print(f"Student saved to 'students' table!")
            print(f"   Student ID: {new_user.id}")
            print(f"   Created at: {new_user.created_at}")
            
            # Create JWT token for auto-login
            access_token = create_access_token(identity={'id': new_user.id, 'type': 'student'})
            
        else:  # teacher
            new_user = Teacher(
                full_name=full_name,
                email=email
            )
            new_user.set_password(password)
            db.session.add(new_user)
            db.session.commit()
            
            print(f"Teacher saved to 'teachers' table!")
            print(f"   Teacher ID: {new_user.id}")
            print(f"   Created at: {new_user.created_at}")
            
            # Create JWT token for auto-login
            access_token = create_access_token(identity={'id': new_user.id, 'type': 'teacher'})
        
        print(f"JWT Token generated: {access_token[:30]}...")
        print("="*60)
        print(f"{account_type.upper()} REGISTRATION SUCCESSFUL")
        print("="*60 + "\n")
        
        return jsonify({
            'message': 'Registration successful',
            'token': access_token,
            'user': new_user.to_dict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        print(f"ERROR: Registration error: {str(e)}")
        return jsonify({'message': f'Registration failed: {str(e)}'}), 500


@auth_bp.route('/forgot-password', methods=['POST'])
def forgot_password():
    """Forgot password endpoint - send password reset email"""
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({'message': 'No data provided'}), 400
        
        email = data.get('email', '').strip()
        
        if not email:
            return jsonify({'message': 'Email is required'}), 400
        
        # Check both Student and Teacher tables
        student = Student.query.filter_by(email=email).first()
        teacher = Teacher.query.filter_by(email=email).first()
        
        # For security, always return success even if email doesn't exist
        # This prevents user enumeration attacks
        if student or teacher:
            # TODO: Generate password reset token and send email
            # For now, just log it (implement email sending later)
            print(f'Password reset requested for: {email}')
            # reset_token = create_access_token(identity={'id': user.id, 'type': 'student/teacher'}, expires_delta=timedelta(hours=1))
            # send_reset_email(email, reset_token)
        
        return jsonify({
            'message': 'If the email exists, a password reset link has been sent'
        }), 200
        
    except Exception as e:
        return jsonify({'message': f'Password reset failed: {str(e)}'}), 500


@auth_bp.route('/me', methods=['GET'])
@jwt_required()
def get_current_user():
    """Get current authenticated user"""
    try:
        current_user_identity = get_jwt_identity()
        
        # Handle both old (integer) and new (dict) token formats
        if isinstance(current_user_identity, dict):
            user_id = current_user_identity.get('id')
            user_type = current_user_identity.get('type')
            
            if user_type == 'student':
                user = Student.query.get(user_id)
            else:  # teacher
                user = Teacher.query.get(user_id)
        else:
            # Old token format (just user_id) - check User table for backward compatibility
            user = User.query.get(current_user_identity)
        
        if not user:
            return jsonify({'message': 'User not found'}), 404
        
        return jsonify({'user': user.to_dict()}), 200
        
    except Exception as e:
        return jsonify({'message': f'Failed to get user: {str(e)}'}), 500


@auth_bp.route('/users', methods=['GET'])
def get_all_users():
    """Get all registered users (students and teachers) - for development/admin purposes"""
    try:
        students = Student.query.order_by(Student.created_at.desc()).all()
        teachers = Teacher.query.order_by(Teacher.created_at.desc()).all()
        
        all_users = [student.to_dict() for student in students] + [teacher.to_dict() for teacher in teachers]
        
        print(f"\n📊 Fetching all users:")
        print(f"   └─ Students: {len(students)}")
        print(f"   └─ Teachers: {len(teachers)}")
        print(f"   └─ Total: {len(all_users)}")
        
        return jsonify({
            'users': all_users,
            'students': [student.to_dict() for student in students],
            'teachers': [teacher.to_dict() for teacher in teachers],
            'total': len(all_users),
            'studentCount': len(students),
            'teacherCount': len(teachers)
        }), 200
        
    except Exception as e:
        return jsonify({'message': f'Failed to get users: {str(e)}'}), 500
