import { useEffect, useState } from "react";
import LocationPicker from "./LocationPicker";

const initialComplaint = {
  category: "Road Damage",
  description: "",
  latitude: "",
  longitude: "",
  locationConfidence: "Medium",
  manualLocation: ""
};

export default function CitizenPanel({
  user,
  complaints,
  onRefresh,
  onSubmitComplaint,
  loading,
  message,
  errorMessage
}) {
  const [form, setForm] = useState(initialComplaint);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");

  useEffect(() => {
    if (!navigator.geolocation) {
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setForm((prev) => ({
          ...prev,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          locationConfidence: "High"
        }));
      },
      () => {
        setForm((prev) => ({ ...prev, locationConfidence: "Low" }));
      },
      { enableHighAccuracy: true, timeout: 12000 }
    );
  }, []);

  function updateField(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSelectLocation(lat, lng) {
    setForm((prev) => ({
      ...prev,
      latitude: lat,
      longitude: lng,
      locationConfidence: "High"
    }));
  }

  function handleImageUpload(event) {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    setSelectedFile(file);
    const preview = URL.createObjectURL(file);
    setPreviewUrl(preview);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    await onSubmitComplaint(form, selectedFile);
    setSelectedFile(null);
    setPreviewUrl("");
    setForm((prev) => ({
      ...initialComplaint,
      latitude: prev.latitude,
      longitude: prev.longitude,
      locationConfidence: prev.locationConfidence
    }));
  }

  return (
    <div className="stack-lg">
      <div className="panel">
        <h2>Welcome, {user.name}</h2>
        <p className="muted">Report new civic issues with evidence and location data.</p>

        <form className="stack" onSubmit={handleSubmit}>
          <label>
            Category
            <select name="category" value={form.category} onChange={updateField}>
              <option>Road Damage</option>
              <option>Water Leakage</option>
              <option>Garbage Dumping</option>
              <option>Drainage Problem</option>
              <option>Streetlight Issue</option>
              <option>Electrical Wire Damage</option>
              <option>Open Manhole</option>
              <option>Traffic/Signage</option>
            </select>
          </label>

          <label>
            Description
            <textarea
              name="description"
              value={form.description}
              onChange={updateField}
              rows={4}
              required
              placeholder="Explain what happened and exact nearby landmark."
            />
          </label>

          <label>
            Camera evidence (recommended)
            <input type="file" accept="image/*" capture="environment" onChange={handleImageUpload} />
          </label>

          {previewUrl ? <img className="preview-image" src={previewUrl} alt="Selected evidence" /> : null}

          <label>
            Manual location fallback
            <input
              name="manualLocation"
              value={form.manualLocation}
              onChange={updateField}
              placeholder="e.g. Near city hospital main gate"
            />
          </label>

          <LocationPicker
            latitude={form.latitude}
            longitude={form.longitude}
            onSelect={handleSelectLocation}
          />

          <div className="badge-row">
            <span className="badge">Lat: {form.latitude || "N/A"}</span>
            <span className="badge">Lng: {form.longitude || "N/A"}</span>
            <span className="badge">Confidence: {form.locationConfidence}</span>
          </div>

          <button className="primary-btn" type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit complaint"}
          </button>
        </form>

        {message ? <p className="success-text">{message}</p> : null}
        {errorMessage ? <p className="error-text">{errorMessage}</p> : null}
      </div>

      <div className="panel">
        <div className="row-between">
          <h3>My complaints</h3>
          <button type="button" className="text-btn" onClick={onRefresh}>Refresh</button>
        </div>
        <ComplaintTable complaints={complaints} />
      </div>
    </div>
  );
}

function ComplaintTable({ complaints }) {
  if (!complaints.length) {
    return <p className="muted">No complaints submitted yet.</p>;
  }

  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Category</th>
            <th>Department</th>
            <th>Status</th>
            <th>Photo</th>
          </tr>
        </thead>
        <tbody>
          {complaints.map((item) => (
            <tr key={item._id}>
              <td>{item.complaintId}</td>
              <td>{item.category}</td>
              <td>{item.department}</td>
              <td>{item.status}</td>
              <td>
                {item.photoDataUrl ? (
                  <img className="tiny-preview" src={item.photoDataUrl} alt="Complaint evidence" />
                ) : (
                  "No image"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
