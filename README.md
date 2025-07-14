==================== Introduction ====================

This is a User Management Module
The main goal of this project is to implement a user authentication module using React + Django + DRF + JWT
The database selected for this project is PostgreSQL
The functions include account registration, login, logout and protected route access.
Additional features such as token refresh endpoint, role-based access (user/admin) are also included.
This README file will guide you how to setup this project on your localhost and also guide you with the API usage.

==================== Setup Instructions ====================
Note: Python version 3.13.5 or compatible version is required   
Note: PostgreSQL version 17.5 is required and can be installed at https://www.enterprisedb.com/downloads/postgres-postgresql-downloads

1. Clone the repository
    git clone https://github.com/Cheah-WH/user-auth-module.git

2. Setup the backend
    2.1 Go to backend folder with bash command: cd backend
    2.2 Create virtual environment with bash command: python manage.py -m venv .venv
    2.3 Activate the .venv with bash command: .venv\Scripts\activate
    2.4 Install the dependencies with bash command: pip install -r requirements.txt
    2.5 Setup the environment by creating a .env file inside backend/backend/, fill in the data below:
        SECRET_KEY=your-django-secret-key
        DB_NAME=your_database_name
        DB_USER=your_database_user
        DB_PASSWORD=your_database_password
        DB_HOST=localhost
        DB_PORT=5432
    2.6 Create the tables with the migration files, run bash command: python manage.py migrate 
    2.7 Start the backend server with bash command: python manage.py runserver

3. Setup the frontend 


==================== API Usage ====================

| Method | Endpoint              | Description        |
| ------ | --------------------- | ------------------ |
| POST   | `/api/register/`      | Register user      |
| POST   | `/api/token/`         | Login (get JWT)    |
| POST   | `/api/token/refresh/` | Refresh token      |
| POST   | `/api/logout/`        | Logout / blacklist |

| Method | Endpoint          | Access        |
| ------ | ----------------- | ------------- |
| GET    | `/api/dashboard/` | Admin only    |
| GET    | `/api/user-home/` | Login - JWT   | 



  