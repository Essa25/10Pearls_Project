import React, { useState } from 'react';

interface Employee {
  id: number;
  name: string;
  position: string;
  deaprtment: string;
  salary: string;
}

interface AddEmployeeModalProps {
  showModal: boolean;
  onClose: () => void;
  onSave: (newEmployee: Omit<Employee, 'id'>) => void;
}

const AddEmployeeModal: React.FC<AddEmployeeModalProps> = ({ showModal, onClose, onSave }) => {
  const [newEmployee, setNewEmployee] = useState({ name: '', position: '', deaprtment: '', salary: '' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewEmployee({ ...newEmployee, [name]: value });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(newEmployee);
    setNewEmployee({ name: '', position: '', deaprtment: '', salary: '' });
  };

  return (
    <div className={`modal fade ${showModal ? 'show d-block' : ''}`} tabIndex={-1} aria-hidden={!showModal}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add New Employee</h5>
            <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSave}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={newEmployee.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="position" className="form-label">Position</label>
                <input
                  type="text"
                  className="form-control"
                  id="position"
                  name="position"
                  value={newEmployee.position}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="deaprtment" className="form-label">Department</label>
                <input
                  type="text"
                  className="form-control"
                  id="deaprtment"
                  name="deaprtment"
                  value={newEmployee.deaprtment}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="salary" className="form-label">Salary</label>
                <input
                  type="text"
                  className="form-control"
                  id="salary"
                  name="salary"
                  value={newEmployee.salary}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">Add Employee</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEmployeeModal;
