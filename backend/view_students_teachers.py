"""
View all students and teachers from the database
Run this script to see all registered users in separate tables
"""

from app import create_app
from database import db
from models.user import Student, Teacher

# Create app instance
app = create_app()

def print_table_header(title):
    """Print a formatted table header"""
    print("\n" + "="*80)
    print(f"{title:^80}")
    print("="*80)

def print_students():
    """Display all students in a formatted table"""
    with app.app_context():
        students = Student.query.order_by(Student.created_at.desc()).all()
        
        print_table_header(f"STUDENTS TABLE ({len(students)} students)")
        
        if not students:
            print("No students registered yet.")
            return
        
        # Table header
        print(f"{'ID':<5} | {'Full Name':<25} | {'Email':<30} | {'Created At':<20}")
        print("-"*80)
        
        # Table rows
        for student in students:
            created = student.created_at.strftime('%Y-%m-%d %H:%M:%S') if student.created_at else 'N/A'
            print(f"{student.id:<5} | {student.full_name:<25} | {student.email:<30} | {created:<20}")
        
        print("="*80)

def print_teachers():
    """Display all teachers in a formatted table"""
    with app.app_context():
        teachers = Teacher.query.order_by(Teacher.created_at.desc()).all()
        
        print_table_header(f"TEACHERS TABLE ({len(teachers)} teachers)")
        
        if not teachers:
            print("No teachers registered yet.")
            return
        
        # Table header
        print(f"{'ID':<5} | {'Full Name':<25} | {'Email':<30} | {'Created At':<20}")
        print("-"*80)
        
        # Table rows
        for teacher in teachers:
            created = teacher.created_at.strftime('%Y-%m-%d %H:%M:%S') if teacher.created_at else 'N/A'
            print(f"{teacher.id:<5} | {teacher.full_name:<25} | {teacher.email:<30} | {created:<20}")
        
        print("="*80)

def print_summary():
    """Display summary statistics"""
    with app.app_context():
        student_count = Student.query.count()
        teacher_count = Teacher.query.count()
        total = student_count + teacher_count
        
        print_table_header("SUMMARY")
        print(f"Students:  {student_count}")
        print(f"Teachers:  {teacher_count}")
        print(f"Total:     {total}")
        print("="*80)

if __name__ == '__main__':
    print("\n" + "🎓 EMEXA Database Viewer 🎓".center(80))
    print_students()
    print_teachers()
    print_summary()
    print("\n")
