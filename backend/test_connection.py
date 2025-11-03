import requests
import json

BASE_URL = "http://localhost:5000"

print("=" * 50)
print("EMEXA Backend Connection Test")
print("=" * 50)

# Test 1: Health check
print("\n1. Testing API Health Check...")
try:
    response = requests.get(f"{BASE_URL}/")
    print(f"   Status: {response.status_code}")
    print(f"   Response: {response.json()}")
    print("   ✅ Backend is running!")
except Exception as e:
    print(f"   ❌ Error: {e}")

# Test 2: Register new user
print("\n2. Testing User Registration...")
try:
    test_user = {
        "fullName": "Test Student",
        "email": "test@emexa.com",
        "password": "password123",
        "accountType": "student"
    }
    response = requests.post(f"{BASE_URL}/auth/register", json=test_user)
    print(f"   Status: {response.status_code}")
    data = response.json()
    print(f"   Message: {data.get('message', 'No message')}")
    if response.status_code == 201:
        print(f"   User: {data.get('user')}")
        print(f"   Token: {data.get('token')[:20]}...")
        print("   ✅ Registration works!")
        token = data.get('token')
    else:
        print(f"   ⚠️ {data.get('message')}")
        token = None
except Exception as e:
    print(f"   ❌ Error: {e}")
    token = None

# Test 3: Login
print("\n3. Testing User Login...")
try:
    login_data = {
        "email": "test@emexa.com",
        "password": "password123"
    }
    response = requests.post(f"{BASE_URL}/auth/login", json=login_data)
    print(f"   Status: {response.status_code}")
    data = response.json()
    if response.status_code == 200:
        print(f"   User: {data.get('user')}")
        print(f"   Token: {data.get('token')[:20]}...")
        print("   ✅ Login works!")
    else:
        print(f"   Message: {data.get('message')}")
except Exception as e:
    print(f"   ❌ Error: {e}")

# Test 4: Forgot Password
print("\n4. Testing Forgot Password...")
try:
    forgot_data = {"email": "test@emexa.com"}
    response = requests.post(f"{BASE_URL}/auth/forgot-password", json=forgot_data)
    print(f"   Status: {response.status_code}")
    data = response.json()
    print(f"   Message: {data.get('message')}")
    if response.status_code == 200:
        print("   ✅ Forgot password works!")
except Exception as e:
    print(f"   ❌ Error: {e}")

print("\n" + "=" * 50)
print("Test Complete!")
print("=" * 50)
