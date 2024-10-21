import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import EditEmployeeModal from './EditEmployee';
import AddEmployeeModal from './AddEmployee';

interface DecodedToken {
  exp: number;
}

interface Employee {
  id: number;
  name: string;
  position: string;
  deaprtment: string;
  salary: string;
}

const EmployeePage: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        const decodedToken: DecodedToken = jwtDecode(token);
        if (decodedToken.exp * 1000 < Date.now()) {
          alert('Token expired, please login again');
          navigate('/login');
        } else {
          fetchEmployees(token);
        }
      } catch (error) {
        console.error('Error decoding token:', error);
        navigate('/login');
      }
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const fetchEmployees = async (token: string) => {
    try {
      const response = await fetch('http://localhost:5151/api/Employee_', {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error('Failed to fetch employees');

      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const handleAddEmployee = async (newEmployee: Omit<Employee, 'id'>) => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const response = await fetch('http://localhost:5151/api/Employee_', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newEmployee),
      });

      if (!response.ok) throw new Error('Failed to add employee');

      fetchEmployees(token);
      setShowAddModal(false);
    } catch (error) {
      console.error('Error adding employee:', error);
    }
  };

  const handleEditClick = (employee: Employee) => {
    setSelectedEmployee(employee);
    setShowEditModal(true);
  };

  const handleEditSave = async (updatedEmployee: Employee) => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const response = await fetch(`http://localhost:5151/api/Employee_/${updatedEmployee.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedEmployee),
      });

      if (!response.ok) throw new Error('Failed to update employee');

      setShowEditModal(false);
      fetchEmployees(token);
    } catch (error) {
      console.error('Error updating employee:', error);
    }
  };

  const handleDeleteClick = async (id: number) => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const response = await fetch(`http://localhost:5151/api/Employee_/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error('Failed to delete employee');

      fetchEmployees(token);
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center">
        <h2>Employee List</h2>
        <button 
          type="button" 
          className="btn btn-success" 
          onClick={() => setShowAddModal(true)}
        >
          Add Employee
        </button>
      </div>

      <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Position</th>
            <th>Department</th>
            <th>Salary</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.position}</td>
              <td>{employee.deaprtment}</td>
              <td>{employee.salary}</td>
              <td>
                <button 
                  className="btn btn-primary" 
                  onClick={() => handleEditClick(employee)}
                >
                  Edit
                </button>
                <button 
                  className="btn btn-danger" 
                  onClick={() => handleDeleteClick(employee.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add Employee Modal */}
      <AddEmployeeModal
        showModal={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSave={handleAddEmployee}
      />

      {/* Edit Employee Modal */}
      {selectedEmployee && (
        <EditEmployeeModal
          showModal={showEditModal}
          employee={selectedEmployee}
          onClose={() => setShowEditModal(false)}
          onSave={handleEditSave}
        />
      )}
    </div>
  );
};

export default EmployeePage;
