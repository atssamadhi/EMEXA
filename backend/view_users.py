import sqlite3
from datetime import datetime

# Connect to database
conn = sqlite3.connect('instance/emexa.db')
cursor = conn.cursor()

print("=" * 70)
print("EMEXA DATABASE - USER RECORDS")
print("=" * 70)

# Query all users
cursor.execute("SELECT id, full_name, email, account_type, created_at, updated_at FROM users")
users = cursor.fetchall()

if users:
    print(f"\nTotal Users: {len(users)}\n")
    
    for user in users:
        user_id, full_name, email, account_type, created_at, updated_at = user
        print(f"┌{'─' * 68}┐")
        print(f"│ User ID: {user_id:<60}│")
        print(f"│ Name: {full_name:<63}│")
        print(f"│ Email: {email:<62}│")
        print(f"│ Account Type: {account_type.upper():<55}│")
        print(f"│ Created: {created_at:<61}│")
        print(f"│ Updated: {updated_at:<61}│")
        print(f"└{'─' * 68}┘\n")
else:
    print("\n⚠️  No users found in database\n")

# Close connection
conn.close()

print("=" * 70)
