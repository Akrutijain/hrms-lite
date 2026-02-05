import { useEffect, useState } from "react";
import { getEmployees, addEmployee } from "../services/api";

function EmployeePage() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    employee_id: "",
    full_name: "",
    email: "",
    department: "",
  });

  function loadEmployees() {
    setLoading(true);
    getEmployees()
      .then((data) => {
        setEmployees(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    loadEmployees();
  }, []);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    addEmployee(form)
      .then(() => {
        setForm({
          employee_id: "",
          full_name: "",
          email: "",
          department: "",
        });
        loadEmployees();
      })
      .catch((err) => {
        setError(err.message);
      });
  }

  return (
    <>
      <h1>HRMS Lite</h1>

      {/* Add Employee Form */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input
          name="employee_id"
          placeholder="Employee ID"
          value={form.employee_id}
          onChange={handleChange}
          required
        />
        <br /><br />

        <input
          name="full_name"
          placeholder="Full Name"
          value={form.full_name}
          onChange={handleChange}
          required
        />
        <br /><br />

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <br /><br />

        <input
          name="department"
          placeholder="Department"
          value={form.department}
          onChange={handleChange}
          required
        />
        <br /><br />

        <button type="submit">Add Employee</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Employee Table */}
      {loading && <p>Loading employees...</p>}

      {!loading && employees.length === 0 && <p>No employees found.</p>}

      {!loading && employees.length > 0 && (
        <table border="1" cellPadding="8">
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Department</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp.employee_id}>
                <td>{emp.employee_id}</td>
                <td>{emp.full_name}</td>
                <td>{emp.email}</td>
                <td>{emp.department}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}

export default EmployeePage;
