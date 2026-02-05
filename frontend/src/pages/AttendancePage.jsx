import { useEffect, useState } from "react";
import { getEmployees, markAttendance, getAttendance } from "../services/api";

function AttendancePage() {
  const [employees, setEmployees] = useState([]);
  const [employeeId, setEmployeeId] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("Present");
  const [records, setRecords] = useState([]);
  const [error, setError] = useState("");

  // Load employees on page load
  useEffect(() => {
    getEmployees()
      .then(setEmployees)
      .catch(() => setEmployees([]));
  }, []);

  // Load attendance records for selected employee
  function loadAttendance(id) {
    if (!id) {
      setRecords([]);
      return;
    }

    getAttendance(id)
      .then((data) => {
        setRecords(data);
        setError("");
      })
      .catch(() => {
        // Treat 404 as "no attendance yet"
        setRecords([]);
        setError("");
      });
  }

  // Submit attendance
  function submitAttendance(e) {
    e.preventDefault();
    setError("");

    if (!employeeId) {
      setError("Please select an employee");
      return;
    }

    markAttendance({
      employee_id: employeeId,
      date: date,
      status: status,
    })
      .then(() => {
        // Refresh attendance after marking/updating
        loadAttendance(employeeId);
      })
      .catch((err) => {
        setError(err.message);
      });
  }

  return (
    <div className="container">
      <h1>Attendance</h1>

      {error && <div className="error">{error}</div>}

      {/* Attendance Form */}
      <form onSubmit={submitAttendance}>
        <select
          value={employeeId}
          onChange={(e) => {
            setEmployeeId(e.target.value);
            loadAttendance(e.target.value);
          }}
          required
        >
          <option value="">Select Employee</option>
          {employees.map((emp) => (
            <option key={emp.employee_id} value={emp.employee_id}>
              {emp.full_name}
            </option>
          ))}
        </select>

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="Present">Present</option>
          <option value="Absent">Absent</option>
        </select>

        <button type="submit">Mark Attendance</button>
      </form>

      <h2>Attendance Records</h2>

      {records.length === 0 && (
        <p className="empty">No attendance records found.</p>
      )}

      {records.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
                {records.map((r) => (
                    <tr key={`${r.employee_id}-${r.date}`}>
                    <td>{r.date}</td>
                    <td>{r.status}</td>
                    </tr>
                ))}
          </tbody>

        </table>
      )}
    </div>
  );
}

export default AttendancePage;
