import { useState } from "react";

const statusOptions = ["Submitted", "Verified", "In Progress", "Resolved", "Rejected"];

import { getPriorities, recomputePriorities } from "../services/api";

export default function AdminPanel({ complaints, onRefresh, onUpdateStatus, loading, message, errorMessage }) {
  const [resolutionNote, setResolutionNote] = useState({});
  const [clusters, setClusters] = useState([]);
  const [computing, setComputing] = useState(false);

  async function submitStatus(event, complaintId, status) {
    event.preventDefault();
    await onUpdateStatus(complaintId, {
      status,
      resolutionNote: resolutionNote[complaintId] || ""
    });
  }

  async function loadClusters() {
    setComputing(true);
    setClusters([]);
    try {
      const token = localStorage.getItem("civicverify_token");
      const res = await getPriorities(token);
      setClusters(res);
    } catch (err) {
      console.error(err);
    } finally {
      setComputing(false);
    }
  }

  async function handleRecompute() {
    setComputing(true);
    try {
      const token = localStorage.getItem("civicverify_token");
      await recomputePriorities(token);
      await loadClusters();
      onRefresh();
    } catch (err) {
      console.error(err);
    } finally {
      setComputing(false);
    }
  }

  return (
    <div className="panel">
      <div className="row-between">
        <h2>Admin dashboard</h2>
        <div>
          <button className="text-btn" type="button" onClick={onRefresh}>Refresh</button>
          <button className="text-btn" type="button" onClick={loadClusters} disabled={computing}>
            {computing ? "Loading..." : "Show priorities"}
          </button>
          <button className="primary-btn" type="button" onClick={handleRecompute} disabled={computing}>
            {computing ? "Working..." : "Recompute priorities"}
          </button>
        </div>
      </div>

      <p className="muted">Manage complaint routing and resolution status.</p>
      {message ? <p className="success-text">{message}</p> : null}
      {errorMessage ? <p className="error-text">{errorMessage}</p> : null}

      {clusters.length > 0 && (
        <div className="panel" style={{ marginBottom: 12 }}>
          <h3>Priority clusters</h3>
          {clusters.map((cl) => (
            <div key={cl.key} className="card" style={{ marginBottom: 8 }}>
              <div className="row-between">
                <strong>{cl.priority.toUpperCase()}</strong>
                <span>{cl.count} reports</span>
              </div>
              <div>
                <small>avg damage: {cl.avgDamageScore}</small>
                <p>Location: {cl.lat}, {cl.lng}</p>
                <p>Complaints: {cl.complaints.map((c) => c._id).join(", ")}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {!complaints.length ? (
        <p className="muted">No complaints available.</p>
      ) : (
        <div className="card-grid">
          {complaints.map((complaint) => (
            <article key={complaint._id} className="card">
              <h3>{complaint.complaintId}</h3>
              <p><strong>Citizen:</strong> {complaint.user?.name || "Unknown"} ({complaint.user?.email || "-"})</p>
              <p><strong>Category:</strong> {complaint.category}</p>
              <p><strong>Department:</strong> {complaint.department}</p>
              <p><strong>Status:</strong> {complaint.status}</p>
              <p><strong>Priority:</strong> {complaint.priority}</p>
              <p><strong>Damage score:</strong> {complaint.damageScore}</p>
              <p><strong>AI source:</strong> {complaint.aiSource} ({complaint.aiConfidence})</p>
              <p><strong>Reasoning:</strong> {complaint.aiReasoning || "N/A"}</p>
              <p><strong>Description:</strong> {complaint.description}</p>

              <form className="stack" onSubmit={(event) => submitStatus(event, complaint._id, complaint.status)}>
                <label>
                  Update status
                  <select
                    value={complaint.status}
                    onChange={(event) => onUpdateStatus(complaint._id, { status: event.target.value })}
                  >
                    {statusOptions.map((status) => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </label>

                <label>
                  Resolution note
                  <textarea
                    rows={3}
                    value={resolutionNote[complaint._id] || ""}
                    onChange={(event) =>
                      setResolutionNote((prev) => ({ ...prev, [complaint._id]: event.target.value }))
                    }
                  />
                </label>

                <button className="primary-btn" type="submit" disabled={loading}>
                  {loading ? "Updating..." : "Save note"}
                </button>
              </form>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
