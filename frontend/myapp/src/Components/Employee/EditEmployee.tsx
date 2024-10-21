import React, { useState, useEffect } from 'react';

interface Employee {
  id: number;
  name: string;
  position: string;
  deaprtment: string;
  salary: string;
}

interface EditEmployeeModalProps {
  employee: Employee | null;
  showModal: boolean;
  onClose: () => void;
  onSave: (updatedEmployee: Employee) => void;
}

const EditEmployeeModal: React.FC<EditEmployeeModalProps> = ({ employee, showModal, onClose, onSave }) => {
  const [updatedEmployee, setUpdatedEmployee] = useState<Employee>({
    id: 0,
    name: '',
    position: '',
    deaprtment: '',
    salary: '',
  });

  useEffect(() => {
    if (employee) {
      setUpdatedEmployee(employee);
    }
  }, [employee]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedEmployee({ ...updatedEmployee, [name]: value });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(updatedEmployee);
  };

  return (
    <div className={`modal fade ${showModal ? 'show d-block' : ''}`} tabIndex={-1} aria-hidden={!showModal}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Employee</h5>
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
                  value={updatedEmployee.name}
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
                  value={updatedEmployee.position}
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
                  value={updatedEmployee.deaprtment}
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
                  value={updatedEmployee.salary}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">Save changes</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditEmployeeModal;
