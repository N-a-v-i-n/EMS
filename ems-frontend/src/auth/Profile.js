import React, { useEffect, useState } from "react";
import axios from "../api/axios";

function Profile() {
  const [subTab, setSubTab] = useState("info");
  const [profile, setProfile] = useState({ username: "", email: "" });
  const [passwords, setPasswords] = useState({ old_password: "", new_password: "" });
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    axios.get("/accounts/profile/")
      .then((res) => setProfile(res.data))
      .catch(() => {
        setMessage("❌ Failed to fetch profile.");
        setError(true);
      });
  }, []);

  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put("/accounts/profile/", profile);
      setMessage("✅ Profile updated successfully.");
      setError(false);
    } catch {
      setMessage("❌ Failed to update profile.");
      setError(true);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/accounts/change-password/", passwords);
      setMessage("✅ Password changed successfully.");
      setPasswords({ old_password: "", new_password: "" });
      setError(false);
    } catch {
      setMessage("❌ Failed to change password.");
      setError(true);
    }
  };

  return (
    <div className="container mt-4">
      <h5 className="mt-3">👤 Profile Settings</h5>

      {message && (
        <div className={`alert ${error ? "alert-danger" : "alert-success"} mt-3`}>
          {message}
        </div>
      )}

      <ul className="nav nav-pills my-4">
        <li className="nav-item">
          <button
            className={`nav-link ${subTab === "info" ? "active" : ""}`}
            onClick={() => setSubTab("info")}
          >
            🧾 Personal Info
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${subTab === "password" ? "active" : ""}`}
            onClick={() => setSubTab("password")}
          >
            🔒 Change Password
          </button>
        </li>
      </ul>

      {subTab === "info" && (
        <form onSubmit={handleProfileSubmit} className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Username</label>
            <input
              name="username"
              className="form-control"
              value={profile.username}
              disabled
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Email</label>
            <input
              name="email"
              className="form-control"
              type="email"
              value={profile.email}
              onChange={handleProfileChange}
              required
            />
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary mt-2">
              Update Profile
            </button>
          </div>
        </form>
      )}

      {subTab === "password" && (
        <form onSubmit={handlePasswordSubmit} className="row g-3 mt-3">
          <div className="col-md-6">
            <label className="form-label">Old Password</label>
            <input
              name="old_password"
              className="form-control"
              type="password"
              value={passwords.old_password}
              onChange={handlePasswordChange}
              required
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">New Password</label>
            <input
              name="new_password"
              className="form-control"
              type="password"
              value={passwords.new_password}
              onChange={handlePasswordChange}
              required
            />
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-warning mt-2">
              Change Password
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default Profile;
