import { useEffect, useMemo, useState } from "react";
import AuthPanel from "./components/AuthPanel";
import CitizenPanel from "./components/CitizenPanel";
import AdminPanel from "./components/AdminPanel";
import {
  getAllComplaints,
  getCurrentUser,
  getMyComplaints,
  login,
  register,
  submitComplaint,
  updateComplaintStatus
} from "./services/api";

const TOKEN_KEY = "civicverify_token";

export default function App() {
  const [token, setToken] = useState(localStorage.getItem(TOKEN_KEY) || "");
  const [user, setUser] = useState(null);
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const isAdmin = useMemo(() => user?.role === "admin", [user]);

  useEffect(() => {
    if (!token) {
      setUser(null);
      setComplaints([]);
      return;
    }

    loadUserAndData(token);
  }, [token]);

  async function loadUserAndData(activeToken) {
    setLoading(true);
    setErrorMessage("");
    try {
      const profile = await getCurrentUser(activeToken);
      setUser(profile);
      if (profile.role === "admin") {
        const all = await getAllComplaints(activeToken);
        setComplaints(all);
      } else {
        const mine = await getMyComplaints(activeToken);
        setComplaints(mine);
      }
    } catch (error) {
      setErrorMessage(error.message);
      localStorage.removeItem(TOKEN_KEY);
      setToken("");
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  async function handleRegister(payload) {
    setLoading(true);
    setErrorMessage("");
    setMessage("");
    try {
      const result = await register(payload);
      localStorage.setItem(TOKEN_KEY, result.token);
      setToken(result.token);
      setMessage("Registration successful.");
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleLogin(payload) {
    setLoading(true);
    setErrorMessage("");
    setMessage("");
    try {
      const result = await login(payload);
      localStorage.setItem(TOKEN_KEY, result.token);
      setToken(result.token);
      setMessage("Logged in successfully.");
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmitComplaint(payload, file) {
    setLoading(true);
    setErrorMessage("");
    setMessage("");
    try {
      const result = await submitComplaint(token, payload, file);
      setMessage(`Complaint submitted. Routed to: ${result.aiClassification.department}`);
      await loadUserAndData(token);
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleUpdateStatus(complaintId, payload) {
    setLoading(true);
    setErrorMessage("");
    setMessage("");
    try {
      await updateComplaintStatus(token, complaintId, payload);
      setMessage("Complaint updated.");
      await loadUserAndData(token);
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  }

  function handleLogout() {
    localStorage.removeItem(TOKEN_KEY);
    setToken("");
    setUser(null);
    setComplaints([]);
    setMessage("Logged out.");
    setErrorMessage("");
  }

  return (
    <div className="app-shell">
      <div className="container">
        <header className="row-between">
          <div>
            <span className="badge">CivicVerify</span>
            <h1>Location-aware civic complaint platform</h1>
          </div>
          {user ? (
            <button className="text-btn" type="button" onClick={handleLogout}>
              Logout
            </button>
          ) : null}
        </header>

        {!user ? (
          <AuthPanel
            onRegister={handleRegister}
            onLogin={handleLogin}
            loading={loading}
            errorMessage={errorMessage}
          />
        ) : isAdmin ? (
          <AdminPanel
            complaints={complaints}
            onRefresh={() => loadUserAndData(token)}
            onUpdateStatus={handleUpdateStatus}
            loading={loading}
            message={message}
            errorMessage={errorMessage}
          />
        ) : (
          <CitizenPanel
            user={user}
            complaints={complaints}
            onRefresh={() => loadUserAndData(token)}
            onSubmitComplaint={handleSubmitComplaint}
            loading={loading}
            message={message}
            errorMessage={errorMessage}
          />
        )}
      </div>
    </div>
  );
}
