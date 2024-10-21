import axios from 'axios';

const API_URL = 'http://localhost:5151/api/';

export const signup = async (username: string, email: string, password: string) => {
    return await axios.post(`${API_URL}signup`, { username, email, password });
};

export const login = async (username: string, password: string) => {
    return await axios.post(`${API_URL}login`, { username, password });
};
