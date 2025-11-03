import sqlite3
import os

print("\n" + "="*60)
print("  ALL REGISTERED USER DATA - WHERE YOUR DATA IS SAVED")
print("="*60 + "\n")

# Flask stores database in 'instance' folder by default
db_paths = [
    'instance/emexa.db',  # Flask default location
    'emexa.db'            # Fallback location
]

db_path = None
for path in db_paths:
    if os.path.exists(path):
        db_path = path
        break

# Check if database exists
if not db_path:
    print("DATABASE NOT FOUND!")
    print("\nThe database file 'emexa.db' doesn't exist yet.")
    print("\nTO CREATE IT:")
    print("  1. Make sure you're in the backend folder")
    print("  2. Run: python app.py")
    print("  3. The database will be created automatically")
    print("\nCHECKED LOCATIONS:")
    for path in db_paths:
        print(f"  {os.path.abspath(path)}")
    print("\n" + "="*60)
    exit()

print(f"Using database: {os.path.abspath(db_path)}\n")

# Connect to database
conn = sqlite3.connect(db_path)
cursor = conn.cursor()

try:
    # Show Students
    print("STUDENTS TABLE")
    print("-"*60)
    cursor.execute('SELECT id, full_name, email, created_at FROM students ORDER BY created_at DESC')
    students = cursor.fetchall()
    print(f'Total Students: {len(students)}\n')

    if len(students) == 0:
        print("  No students registered yet.\n")
    else:
        for s in students:
            print(f'  ID: {s[0]}')
            print(f'  Name: {s[1]}')
            print(f'  Email: {s[2]}')
            print(f'  Registered: {s[3]}')
            print()

    # Show Teachers
    print("\nTEACHERS TABLE")
    print("-"*60)
    cursor.execute('SELECT id, full_name, email, created_at FROM teachers ORDER BY created_at DESC')
    teachers = cursor.fetchall()
    print(f'Total Teachers: {len(teachers)}\n')

    if len(teachers) == 0:
        print("  No teachers registered yet.\n")
    else:
        for t in teachers:
            print(f'  ID: {t[0]}')
            print(f'  Name: {t[1]}')
            print(f'  Email: {t[2]}')
            print(f'  Registered: {t[3]}')
            print()

except sqlite3.OperationalError as e:
    print(f"\nERROR: {e}")
    print("\nThe database exists but tables haven't been created yet.")
    print("\nTO FIX:")
    print("  1. Run: python app.py")
    print("  2. The tables will be created automatically")
    print()

finally:
    conn.close()

# Show database file info
print("\n" + "="*60)
print("DATABASE FILE LOCATION:")
print(f"  Path: {os.path.abspath(db_path)}")
if os.path.exists(db_path):
    print(f"  Size: {os.path.getsize(db_path) / 1024:.2f} KB")
print(f"  Folder: {os.path.dirname(os.path.abspath(db_path))}")
print("="*60)
