import React, { useState, useEffect } from 'react';
import axios from '../api/axios';

function DynamicForm() {
  const [fields, setFields] = useState([]);
  const [formData, setFormData] = useState({});
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('employees/fields/')
      .then((res) => {
        setFields(res.data);
      })
      .catch((err) => {
        console.error('Error loading fields:', err);
      });
  }, []);

  const handleChange = (label, value) => {
    setFormData((prev) => ({
      ...prev,
      [label]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('employees/', { data: formData });
      setMessage('✅ Employee created!');
      setFormData({});
    } catch (err) {
      console.error('Error submitting:', err);
      setMessage('❌ Failed to submit');
    }
  };

  return (
    <div>
      <h3>Create Employee</h3>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        {fields.map((field) => (
          <div key={field.id} style={{ marginBottom: '1rem' }}>
            <label>{field.label}</label><br />
            <input
              type={field.input_type}
              value={formData[field.label] || ''}
              onChange={(e) => handleChange(field.label, e.target.value)}
              required={field.required}
            />
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default DynamicForm;
