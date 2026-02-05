import { useState } from "react";
import EmployeePage from "./pages/EmployeePage";
import AttendancePage from "./pages/AttendancePage";

function App() {
  const [page, setPage] = useState("employees");

  return (
    <div className="container">
      <button onClick={() => setPage("employees")}>Employees</button>
      <button onClick={() => setPage("attendance")}>Attendance</button>

      <hr />

      {page === "employees" && <EmployeePage />}
      {page === "attendance" && <AttendancePage />}
    </div>
  );
}

export default App;
