import { useState } from "react";

const initialForm = {
  name: "",
  email: "",
  password: "",
  role: "citizen",
  adminSetupKey: ""
};

export default function AuthPanel({ onRegister, onLogin, loading, errorMessage }) {
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState(initialForm);

  function updateField(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (isRegister) {
      await onRegister(form);
      return;
    }

    await onLogin({ email: form.email, password: form.password });
  }

  return (
    <div className="panel">
      <h2>{isRegister ? "Create account" : "Sign in"}</h2>
      <p className="muted">Use citizen account to submit complaints or admin account to manage them.</p>

      <form className="stack" onSubmit={handleSubmit}>
        {isRegister && (
          <label>
            Full name
            <input name="name" value={form.name} onChange={updateField} required />
          </label>
        )}

        <label>
          Email
          <input name="email" type="email" value={form.email} onChange={updateField} required />
        </label>

        <label>
          Password
          <input name="password" type="password" value={form.password} onChange={updateField} required />
        </label>

        {isRegister && (
          <>
            <label>
              Role
              <select name="role" value={form.role} onChange={updateField}>
                <option value="citizen">Citizen</option>
                <option value="admin">Admin</option>
              </select>
            </label>

            {form.role === "admin" && (
              <label>
                Admin setup key
                <input
                  name="adminSetupKey"
                  type="password"
                  value={form.adminSetupKey}
                  onChange={updateField}
                  required
                />
              </label>
            )}
          </>
        )}

        <button className="primary-btn" type="submit" disabled={loading}>
          {loading ? "Please wait..." : isRegister ? "Register" : "Login"}
        </button>
      </form>

      {errorMessage ? <p className="error-text">{errorMessage}</p> : null}

      <button className="text-btn" type="button" onClick={() => setIsRegister((prev) => !prev)}>
        {isRegister ? "Already have an account? Login" : "New user? Register here"}
      </button>
    </div>
  );
}
