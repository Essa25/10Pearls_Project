import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../Services/AuthService';
const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await login(username, password);

            if (response?.data?.token) {
                // Store JWT token in localStorage
                localStorage.setItem('token', response.data.token);
                
                // Optionally, display a success message
                setMessage('Login successful! Redirecting to the Employee page...');

                // Redirect to the employee page
                navigate('/employee');
            } else {
                setMessage('Login failed. Invalid token response.');
            }
        } catch (error) {
            console.error('Login error:', error);
            setMessage('Login failed. Please check your credentials or try again later.');
        }
    };

    const signup = () =>{
        navigate("/");
    }

    return (
        <div className="container mt-5">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input
                        type="text"
                        className="form-control"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
                {message && <p className="mt-3">{message}</p>}
            </form>
            <br></br>
            <p>Not a user? 
                <br>
                </br>
                </p>
            <button onClick={() => signup()}  className="btn btn-success">Signup</button>
        </div>
    );
};

export default Login;
