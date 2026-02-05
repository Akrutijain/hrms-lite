import { useEffect, useState } from "react";
import { getEmployees } from "../services/api";
import { markAttendance, getAttendance } from "../services/api";

function AttendancePage() {
  const [employees, setEmployees] = useState([]);
  const [employeeId, setEmployeeId] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("Present");
  const [records, setRecords] = useState([]);

  useEffect(() => {
    getEmployees().then(setEmployees);
  }, []);

  function submitAttendance(e) {
    e.preventDefault();

    markAttendance({
      employee_id: employeeId,
      date: date,
      status: status,
    }).then(() => {
      loadAttendance(employeeId);
    });
  }

  function loadAttendance(id) {
    getAttendance(id).then(setRecords);
  }

  return (
    <>
      <h1>Attendance</h1>

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

        <br /><br />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />

        <br /><br />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option>Present</option>
          <option>Absent</option>
        </select>

        <br /><br />

        <button type="submit">Mark Attendance</button>
      </form>

      <hr />

      <h3>Attendance Records</h3>

      {records.length === 0 && <p>No records found.</p>}

      {records.length > 0 && (
        <table border="1" cellPadding="8">
          <thead>
            <tr>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {records.map((r, index) => (
              <tr key={index}>
                <td>{r.date}</td>
                <td>{r.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}

export default AttendancePage;
