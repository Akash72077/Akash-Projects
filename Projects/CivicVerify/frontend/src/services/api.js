const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, options);
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.message || "Request failed.");
  }
  return data;
}

export function register(payload) {
  return request("/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
}

export function login(payload) {
  return request("/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
}

export function getCurrentUser(token) {
  return request("/auth/me", {
    headers: { Authorization: `Bearer ${token}` }
  });
}

export function submitComplaint(token, payload, file) {
  const formData = new FormData();

  Object.entries(payload).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      formData.append(key, value);
    }
  });

  if (file) {
    formData.append("photo", file);
  }

  return request("/complaints", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: formData
  });
}

export function getMyComplaints(token) {
  return request("/complaints/mine", {
    headers: { Authorization: `Bearer ${token}` }
  });
}

export function getAllComplaints(token) {
  return request("/complaints", {
    headers: { Authorization: `Bearer ${token}` }
  });
}

export function updateComplaintStatus(token, complaintId, payload) {
  return request(`/complaints/${complaintId}/status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(payload)
  });
}

export function getPriorities(token) {
  return request("/complaints/priorities", {
    headers: { Authorization: `Bearer ${token}` }
  });
}

export function recomputePriorities(token) {
  return request("/complaints/recompute", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` }
  });
}
