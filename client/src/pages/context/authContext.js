// AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const BACKEND_URL = 'http://your-backend-url'; // Update this to your actual backend URL

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('currentUser');
        if (storedUser) {
            setCurrentUser(JSON.parse(storedUser));
        }
    }, []);

    const login = async ({ email, password }) => {
        try {
            const response = await axios.post(`${BACKEND_URL}/api/auth/login`, { email, password });
            const { token, userId, name, email: userEmail } = response.data;

            const user = { email: userEmail, name, userId, token };
            setCurrentUser(user);

            localStorage.setItem('currentUser', JSON.stringify(user));
            localStorage.setItem('token', token);
            localStorage.setItem('userId', userId);

            return user;
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    const register = async ({ name, email, password, confirmPassword }) => {
        try {
            const response = await axios.post(`${BACKEND_URL}/api/auth/register`, { name, email, password, confirmPassword });
            const { token, userId } = response.data;

            const user = { name, email, userId, token };
            setCurrentUser(user);

            localStorage.setItem('currentUser', JSON.stringify(user));
            localStorage.setItem('token', token);
            localStorage.setItem('userId', userId);

            return user;
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    const logout = () => {
        setCurrentUser(null);
        localStorage.removeItem('currentUser');
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
    };

    return (
        <AuthContext.Provider value={{ currentUser, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
