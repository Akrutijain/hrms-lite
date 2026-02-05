const API_BASE_URL = "https://hrms-lite-backend-nyu0.onrender.com";

export async function getEmployees() {
  const response = await fetch(`${API_BASE_URL}/employees`);
  return response.json();
}

export async function addEmployee(employee) {
  const response = await fetch(`${API_BASE_URL}/employees`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(employee),
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.detail || "Failed to add employee");
  }

  return response.json();
}

export async function markAttendance(attendance) {
  const response = await fetch(`${API_BASE_URL}/attendance`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(attendance),
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.detail || "Failed to mark attendance");
  }

  return response.json();
}

export async function getAttendance(employeeId) {
  const response = await fetch(
    `${API_BASE_URL}/attendance/${employeeId}`
  );
  return response.json();
}

export async function deleteEmployee(employeeId) {
  const response = await fetch(
    `${API_BASE_URL}/employees/${employeeId}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.detail || "Failed to delete employee");
  }

  return response.json();
}
