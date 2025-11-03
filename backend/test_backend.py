"""
Backend Testing Script - Tests all API endpoints
Run this to check if backend is working correctly
"""

import requests
import json
from datetime import datetime

# Backend URL
BASE_URL = "http://127.0.0.1:5000"

# Colors for terminal output
GREEN = '\033[92m'
RED = '\033[91m'
YELLOW = '\033[93m'
BLUE = '\033[94m'
RESET = '\033[0m'

def print_header(text):
    print(f"\n{BLUE}{'='*60}{RESET}")
    print(f"{BLUE}{text.center(60)}{RESET}")
    print(f"{BLUE}{'='*60}{RESET}\n")

def print_test(test_name, passed, message=""):
    status = f"{GREEN}✓ PASS{RESET}" if passed else f"{RED}✗ FAIL{RESET}"
    print(f"{status} - {test_name}")
    if message:
        print(f"      {message}")

def test_server_running():
    """Test 1: Check if server is running"""
    print_header("TEST 1: Server Running Check")
    try:
        response = requests.get(f"{BASE_URL}/", timeout=3)
        if response.status_code == 200:
            print_test("Server is running", True, f"Status: {response.status_code}")
            return True
        else:
            print_test("Server is running", False, f"Unexpected status: {response.status_code}")
            return False
    except requests.exceptions.ConnectionError:
        print_test("Server is running", False, "Cannot connect to server!")
        print(f"{RED}      Make sure backend is running: python app.py{RESET}")
        return False
    except Exception as e:
        print_test("Server is running", False, f"Error: {str(e)}")
        return False

def test_registration():
    """Test 2: User Registration"""
    print_header("TEST 2: User Registration")
    
    # Test data
    test_user = {
        "fullName": f"Test User {datetime.now().strftime('%H%M%S')}",
        "email": f"test_{datetime.now().strftime('%H%M%S')}@test.com",
        "password": "test12345",
        "accountType": "student"
    }
    
    try:
        response = requests.post(
            f"{BASE_URL}/auth/register",
            json=test_user,
            headers={"Content-Type": "application/json"},
            timeout=5
        )
        
        if response.status_code == 201:
            data = response.json()
            print_test("Registration endpoint", True, f"User created: {data.get('user', {}).get('full_name')}")
            print(f"      Email: {test_user['email']}")
            print(f"      Account Type: {data.get('user', {}).get('accountType')}")
            return True, test_user
        else:
            print_test("Registration endpoint", False, f"Status: {response.status_code}")
            print(f"      Response: {response.text}")
            return False, test_user
            
    except Exception as e:
        print_test("Registration endpoint", False, f"Error: {str(e)}")
        return False, test_user

def test_login(email, password):
    """Test 3: User Login"""
    print_header("TEST 3: User Login")
    
    try:
        response = requests.post(
            f"{BASE_URL}/auth/login",
            json={"email": email, "password": password},
            headers={"Content-Type": "application/json"},
            timeout=5
        )
        
        if response.status_code == 200:
            data = response.json()
            print_test("Login endpoint", True, f"Logged in as: {data.get('user', {}).get('full_name')}")
            print(f"      Token received: {data.get('token', '')[:30]}...")
            return True, data.get('token')
        else:
            print_test("Login endpoint", False, f"Status: {response.status_code}")
            print(f"      Response: {response.text}")
            return False, None
            
    except Exception as e:
        print_test("Login endpoint", False, f"Error: {str(e)}")
        return False, None

def test_forgot_password(email):
    """Test 4: Forgot Password"""
    print_header("TEST 4: Forgot Password")
    
    try:
        response = requests.post(
            f"{BASE_URL}/auth/forgot-password",
            json={"email": email},
            headers={"Content-Type": "application/json"},
            timeout=5
        )
        
        if response.status_code == 200:
            data = response.json()
            print_test("Forgot password endpoint", True, data.get('message', ''))
            return True
        else:
            print_test("Forgot password endpoint", False, f"Status: {response.status_code}")
            print(f"      Response: {response.text}")
            return False
            
    except Exception as e:
        print_test("Forgot password endpoint", False, f"Error: {str(e)}")
        return False

def test_get_users():
    """Test 5: Get All Users"""
    print_header("TEST 5: Get All Users")
    
    try:
        response = requests.get(f"{BASE_URL}/auth/users", timeout=5)
        
        if response.status_code == 200:
            data = response.json()
            users = data.get('users', [])
            students = [u for u in users if u.get('accountType') == 'student']
            teachers = [u for u in users if u.get('accountType') == 'teacher']
            
            print_test("Get users endpoint", True, f"Total users: {len(users)}")
            print(f"      Students: {len(students)}")
            print(f"      Teachers: {len(teachers)}")
            
            if len(users) > 0:
                print(f"\n      {YELLOW}Recent users:{RESET}")
                for user in users[-3:]:  # Show last 3 users
                    print(f"      - {user.get('full_name')} ({user.get('email')}) - {user.get('accountType')}")
            
            return True
        else:
            print_test("Get users endpoint", False, f"Status: {response.status_code}")
            return False
            
    except Exception as e:
        print_test("Get users endpoint", False, f"Error: {str(e)}")
        return False

def test_cors():
    """Test 6: CORS Configuration"""
    print_header("TEST 6: CORS Configuration")
    
    test_origins = [
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:5175",
        "http://localhost:5176",
        "http://localhost:5179",
        "http://127.0.0.1:5173"
    ]
    
    passed_count = 0
    for origin in test_origins:
        try:
            response = requests.options(
                f"{BASE_URL}/auth/register",
                headers={
                    "Origin": origin,
                    "Access-Control-Request-Method": "POST",
                    "Access-Control-Request-Headers": "Content-Type"
                },
                timeout=3
            )
            
            if response.status_code in [200, 204]:
                passed_count += 1
                
        except Exception:
            pass
    
    all_passed = passed_count == len(test_origins)
    print_test(f"CORS allows all localhost ports", all_passed, 
               f"{passed_count}/{len(test_origins)} origins accepted")
    
    if not all_passed:
        print(f"      {YELLOW}Some ports may have CORS issues{RESET}")
    
    return all_passed

def run_all_tests():
    """Run all tests"""
    print(f"\n{BLUE}╔{'═'*58}╗{RESET}")
    print(f"{BLUE}║{' '*15}EMEXA BACKEND TEST SUITE{' '*19}║{RESET}")
    print(f"{BLUE}╚{'═'*58}╝{RESET}")
    print(f"\nTesting backend at: {YELLOW}{BASE_URL}{RESET}")
    print(f"Time: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n")
    
    results = {}
    
    # Test 1: Server Running
    results['server'] = test_server_running()
    if not results['server']:
        print(f"\n{RED}Cannot continue tests - Backend is not running!{RESET}")
        print(f"\n{YELLOW}To start backend:{RESET}")
        print(f"  cd backend")
        print(f"  .\\venv\\Scripts\\activate.ps1")
        print(f"  python app.py")
        return
    
    # Test 2: Registration
    results['registration'], test_user = test_registration()
    
    # Test 3: Login (using registered user)
    if results['registration']:
        results['login'], token = test_login(test_user['email'], test_user['password'])
    else:
        print_header("TEST 3: User Login")
        print_test("Login endpoint", False, "Skipped - Registration failed")
        results['login'] = False
    
    # Test 4: Forgot Password
    if results['registration']:
        results['forgot'] = test_forgot_password(test_user['email'])
    else:
        print_header("TEST 4: Forgot Password")
        print_test("Forgot password endpoint", False, "Skipped - No test user")
        results['forgot'] = False
    
    # Test 5: Get Users
    results['get_users'] = test_get_users()
    
    # Test 6: CORS
    results['cors'] = test_cors()
    
    # Summary
    print_header("TEST SUMMARY")
    total = len(results)
    passed = sum(1 for v in results.values() if v)
    failed = total - passed
    
    print(f"Total Tests: {total}")
    print(f"{GREEN}Passed: {passed}{RESET}")
    if failed > 0:
        print(f"{RED}Failed: {failed}{RESET}")
    
    percentage = (passed / total * 100) if total > 0 else 0
    
    if percentage == 100:
        print(f"\n{GREEN}✓ ALL TESTS PASSED! Backend is working perfectly!{RESET}")
    elif percentage >= 80:
        print(f"\n{YELLOW}⚠ Most tests passed. Some issues detected.{RESET}")
    else:
        print(f"\n{RED}✗ Multiple tests failed. Backend needs attention.{RESET}")
    
    print(f"\n{BLUE}{'='*60}{RESET}\n")

if __name__ == "__main__":
    run_all_tests()
