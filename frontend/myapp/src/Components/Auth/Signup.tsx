import React, { useState } from 'react';
import { login, signup } from '../../Services/AuthService';
import { useNavigate } from 'react-router-dom';

const Signup: React.FC = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate()

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await signup(username, email, password);
            setMessage(`Signup successful! User ID: ${response.data.id}`);
        } catch (error) {
            setMessage('Signup failed. Please try again.');
        }
    };

    const login=()=>{
        navigate("/login");
      }

    return (
        <div className="container mt-5">
            <h2>Signup</h2>
            <form onSubmit={handleSignup}>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input type="text" className="form-control" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit" className="btn btn-primary">Signup</button>
                {message && <p className="mt-3">{message}</p>}
            </form>
            <br></br>
            <p>Already a user? 
                <br>
                </br>
                </p>
            <button onClick={() => login()}  className="btn btn-success">Login</button>
            
        </div>
        
    );
};

export default Signup;
