# HRMS Lite

A lightweight Human Resource Management System (HRMS Lite) built as a full-stack web application.  
The system allows an admin to manage employees and track daily attendance using a clean and simple interface.

---

## 🚀 Live Application

- **Frontend (Netlify)**  
  https://inquisitive-youtiao-87f389.netlify.app/

- **Backend API (Render)**  
  https://hrms-lite-backend-nyu0.onrender.com/docs

---

## 🧩 Features

### Employee Management
- Add a new employee
- Unique employee ID enforcement
- Email validation
- View all employees
- Delete employee

### Attendance Management
- Mark daily attendance (Present / Absent)
- View attendance records per employee

---

## 🛠 Tech Stack

### Frontend
- React (Vite)
- JavaScript
- HTML & CSS
- Netlify (Deployment)

### Backend
- FastAPI
- SQLAlchemy
- SQLite
- Uvicorn
- Render (Deployment)

---

## 🗄 Database
- SQLite database for persistence
- Tables:
  - Employees
  - Attendance

---

## ▶️ Run Locally

### Backend
```bash
cd backend
pip install fastapi uvicorn sqlalchemy pydantic email-validator
python -m uvicorn main:app --reload
