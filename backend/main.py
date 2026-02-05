from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from pydantic import BaseModel, EmailStr
from datetime import date

from database import engine, SessionLocal
from models import Base, Employee, Attendance

Base.metadata.create_all(bind=engine)

app = FastAPI(title="HRMS Lite")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ---------- Schemas ----------

class EmployeeCreate(BaseModel):
    employee_id: str
    full_name: str
    email: EmailStr
    department: str

class AttendanceCreate(BaseModel):
    employee_id: str
    date: date
    status: str

# ---------- Employee APIs ----------

@app.post("/employees")
def add_employee(emp: EmployeeCreate, db: Session = Depends(get_db)):
    existing = db.query(Employee).filter(
        (Employee.employee_id == emp.employee_id) |
        (Employee.email == emp.email)
    ).first()

    if existing:
        raise HTTPException(status_code=400, detail="Employee already exists")

    employee = Employee(**emp.dict())
    db.add(employee)
    db.commit()
    return {"message": "Employee added successfully"}

@app.get("/employees")
def get_employees(db: Session = Depends(get_db)):
    return db.query(Employee).all()

@app.delete("/employees/{employee_id}")
def delete_employee(employee_id: str, db: Session = Depends(get_db)):
    emp = db.query(Employee).filter(Employee.employee_id == employee_id).first()

    if not emp:
        raise HTTPException(status_code=404, detail="Employee not found")

    db.delete(emp)
    db.commit()
    return {"message": "Employee deleted successfully"}

# ---------- Attendance APIs ----------

@app.post("/attendance")
def mark_attendance(att: AttendanceCreate, db: Session = Depends(get_db)):
    # Check employee exists
    emp = db.query(Employee).filter(
        Employee.employee_id == att.employee_id
    ).first()

    if not emp:
        raise HTTPException(status_code=404, detail="Employee not found")

    # 🔥 Check if attendance already exists for same date
    existing = db.query(Attendance).filter(
        Attendance.employee_id == att.employee_id,
        Attendance.date == att.date
    ).first()

    if existing:
        # Update status instead of creating duplicate
        existing.status = att.status
        db.commit()
        return {"message": "Attendance updated"}

    # Create new attendance
    record = Attendance(**att.dict())
    db.add(record)
    db.commit()
    return {"message": "Attendance marked"}
