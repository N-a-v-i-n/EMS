import React, { useEffect, useState } from 'react';
import axios from '../api/axios';

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const res = await axios.get('employees/');
      setEmployees(res.data);
    } catch (err) {
      setError('Failed to fetch employee list');
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this employee?')) return;

    try {
      await axios.delete(`employees/${id}/`);
      setEmployees((prev) => prev.filter((emp) => emp.id !== id));
    } catch (err) {
      alert('Failed to delete employee');
    }
  };

  return (
    <div>
      <h3>Employee List</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {employees.length === 0 ? (
        <p>No employees found.</p>
      ) : (
        <ul>
          {employees.map((emp) => (
            <li key={emp.id} style={{ marginBottom: '1rem' }}>
              <strong>Employee ID:</strong> {emp.id}
              <ul>
                {Object.entries(emp.data).map(([key, value]) => (
                  <li key={key}>
                    {key}: {value}
                  </li>
                ))}
              </ul>
              <button onClick={() => handleDelete(emp.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default EmployeeList;
