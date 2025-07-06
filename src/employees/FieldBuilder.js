import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const ItemType = "FIELD";

const FieldRow = ({ field, index, moveField, onEdit, onDelete }) => {
  const [, ref] = useDrag({
    type: ItemType,
    item: { index },
  });

  const [, drop] = useDrop({
    accept: ItemType,
    hover: (item) => {
      if (item.index !== index) {
        moveField(item.index, index);
        item.index = index;
      }
    },
  });

  return (
    <div
      ref={(node) => ref(drop(node))}
      className="d-flex justify-content-between align-items-center border p-2 mb-2"
    >
      <div>
        <strong>{field.label}</strong> <small>({field.input_type})</small>
        {field.required && <span className="text-danger"> *</span>}
      </div>
      <div>
        <button
          className="btn btn-sm btn-outline-danger"
          onClick={() => {
            alert("Deleting " + field.label);
            onDelete(field.id);
          }}
        >
          ❌
        </button>
      </div>
    </div>
  );
};

const FieldBuilder = () => {
  const [fields, setFields] = useState([]);
  const [form, setForm] = useState({ label: "", input_type: "text", required: false });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchFields();
  }, []);

  const fetchFields = () => {
    axios.get("/employees/fields/").then((res) => setFields(res.data));
  };

  const moveField = (from, to) => {
    const updated = [...fields];
    const [moved] = updated.splice(from, 1);
    updated.splice(to, 0, moved);
    setFields(updated);
  };

  const saveOrder = async () => {
    const payload = fields.map((f, idx) => ({ id: f.id, position: idx }));
    await axios.post("/employees/fields/reorder/", payload);
    alert("Reorder saved");
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await axios.put(`/employees/fields/${editingId}/`, form);
    } else {
      await axios.post("/employees/fields/", form);
    }
    setForm({ label: "", input_type: "text", required: false });
    setEditingId(null);
    fetchFields();
  };

  const handleEdit = (field) => {
    setEditingId(field.id);
    setForm({ label: field.label, input_type: field.input_type, required: field.required });
  };

  const handleDelete = async (id) => {
    await axios.delete(`/employees/fields/${id}/`);
    fetchFields();
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="container mt-4">
        <h5 className="mb-3">Manage & Reorder Form Fields</h5>
        <form onSubmit={handleSubmit} className="row g-2 mb-4">
          <div className="col-md-4">
            <input
              name="label"
              className="form-control"
              placeholder="Field Label"
              value={form.label}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-3">
            <select
              name="input_type"
              className="form-select"
              value={form.input_type}
              onChange={handleChange}
            >
              <option value="text">Text</option>
              <option value="number">Number</option>
              <option value="date">Date</option>
              <option value="password">Password</option>
              <option value="email">Email</option>
              <option value="textarea">Textarea</option>
            </select>
          </div>
          <div className="col-md-2">
            <div className="form-check mt-2">
              <input
                className="form-check-input"
                type="checkbox"
                name="required"
                checked={form.required}
                onChange={handleChange}
              />
              <label className="form-check-label">Required</label>
            </div>
          </div>
          <div className="col-md-3">
            <button type="submit" className="btn btn-success w-100">
              {editingId ? "Update Field" : "Add Field"}
            </button>
          </div>
        </form>

        {fields.map((field, index) => (
          <FieldRow
            key={field.id}
            index={index}
            field={field}
            moveField={moveField}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}

        <button className="btn btn-primary mt-3" onClick={saveOrder}>
          Save Order
        </button>
      </div>
    </DndProvider>
  );
};

export default FieldBuilder;