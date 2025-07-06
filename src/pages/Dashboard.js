import React, { useEffect, useState } from "react";
import axios from "../api/axios";

function Dashboard() {
  const [stats, setStats] = useState({
    totalEmployees: 0,
    totalFields: 0,
  });

  useEffect(() => {
    async function fetchStats() {
      try {
        const [empRes, fieldRes] = await Promise.all([
          axios.get("/employees/"),
          axios.get("/employees/fields/"),
        ]);
        setStats({
          totalEmployees: empRes.data.length,
          totalFields: fieldRes.data.length,
        });
      } catch (error) {
        console.error("Failed to fetch dashboard stats", error);
      }
    }

    fetchStats();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">📊 EMS Dashboard</h2>

      <div className="row g-4">
        <div className="col-md-6">
          <div className="card shadow-sm border-primary">
            <div className="card-body">
              <h5 className="card-title">👥 Total Employees</h5>
              <p className="card-text fs-4">{stats.totalEmployees}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
