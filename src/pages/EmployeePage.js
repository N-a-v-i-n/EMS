import { useState } from 'react';
import EmployeeList from '../employees/EmployeeList';
import DynamicForm from '../employees/DynamicForm';
import FieldBuilder from '../employees/FieldBuilder';

function EmployeePage() {
  const [activeTab, setActiveTab] = useState('list');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'list':
        return <EmployeeList />;
      case 'add':
        return <DynamicForm />;
      case 'update':
        return <EmployeeList mode="edit" />;
      case 'form':
        return <FieldBuilder />;
      default:
        return null;
    }
  };

  return (
    <div className="container py-4">
      <h2 className="mb-4 border-bottom pb-2">👨‍💼 Employee Management</h2>

      {/* Tabs */}
      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'list' ? 'active' : ''}`}
            onClick={() => setActiveTab('list')}
          >
            🧾 Employees
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'add' ? 'active' : ''}`}
            onClick={() => setActiveTab('add')}
          >
            ➕ Add Employee
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'update' ? 'active' : ''}`}
            onClick={() => setActiveTab('update')}
          >
            ✏️ Update/Delete Employee
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'form' ? 'active' : ''}`}
            onClick={() => setActiveTab('form')}
          >
            ⚙️ Manage Employee Form
          </button>
        </li>
      </ul>

      <div className="card p-4 shadow-sm">
        {renderTabContent()}
      </div>
    </div>
  );
}

export default EmployeePage;
