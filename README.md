# Employee Management System (EMS)

This is a full-stack Employee Management System built with:

- **Django (REST Framework)** for the backend API
- **React** for the frontend UI

---

## Project Structure

EMS/
├── ems_backend/ # Django backend
├── ems-frontend/ # React frontend
├── README.md

Backend Setup (ems_backend/)
-------------------------------
Step 1: Create and activate a virtual environment
cd ems_backend
python -m venv venv
venv\Scripts\activate        # Windows
# OR
source venv/bin/activate     # macOS/Linux

Step 2: Install requirements
pip install -r requirements.txt

Step 3: Run migrations
python manage.py migrate

Step 5: Run the backend server
python manage.py runserver



Frontend Setup (ems-frontend/)
--------------------------------
Step 1: Go to frontend directory
cd ../ems-frontend

Step 2: Install dependencies
npm install

Step 3: Start React app
npm start




##Curls

##Create Account
curl -X POST http://127.0.0.1:8000/api/accounts/register/ \
  -H "Content-Type: application/json" \
  -d '{"username": "naveen", "password": "test1234"}'
  
##Account Login
curl -X POST http://127.0.0.1:8000/api/accounts/login/ \
  -H "Content-Type: application/json" \
  -d '{"username": "naveen", "password": "test"}'

  
##Create Employee
curl -X POST http://127.0.0.1:8000/api/employees/ \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"data": {"name": "Naveen", "age": 28, "role": "Developer"}}'

  
##List All Employees
curl -X GET http://127.0.0.1:8000/api/employees/ \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"

  
##Refresh Token
curl -X POST http://127.0.0.1:8000/api/accounts/token/refresh/ \
  -H "Content-Type: application/json" \
  -d '{"refresh": "your_refresh_token_here"}'

  
##Delete Employee (ID = 1)
curl -X DELETE http://127.0.0.1:8000/api/employees/1/ \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"

  
##Create Field
curl -X POST http://127.0.0.1:8000/api/employees/fields/ \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"label": "Name", "input_type": "text", "required": true}'

  
##View All Fields
curl -X GET http://127.0.0.1:8000/api/employees/fields/ \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"

  
##View Profile
curl -X GET http://127.0.0.1:8000/api/accounts/profile/ \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"

  
##Update Profile
curl -X PUT http://127.0.0.1:8000/api/accounts/profile/ \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -d '{"email": "newemail@ex1.com"}'

  
##Change Password
curl -X POST http://127.0.0.1:8000/api/accounts/change-password/ \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -d '{"old_password": "test", "new_password": "newpass"}'

  
##Reorder Field Position
curl -X POST http://127.0.0.1:8000/api/employees/fields/reorder/ \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -d '[{"id": 3, "position": 0}, {"id": 1, "position": 1}]'
