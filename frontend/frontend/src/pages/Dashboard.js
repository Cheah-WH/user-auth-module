import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { refreshToken } from '../utils/auth';

function Dashboard() {
    const [data, setData] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const accessToken = localStorage.getItem('access_token');
        if (!accessToken) {
            alert('Please log in first.');
            navigate('/');
            return;
        }
        const fetchDashboard = async (token) => {
            try {
                const res = await axios.get('http://localhost:8000/api/dashboard/', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setData(res.data.message);
            } catch (err) {
                const newToken = await refreshToken();
                if (newToken) {
                    fetchDashboard(newToken)
                } else {
                    alert(
                        err.response?.data?.detail
                            ? `Access denied: ${err.response.data.detail}`
                            : 'Access denied: An unexpected error occurred.'
                    );
                    setData('Unauthorized or not admin');
                    navigate('/user-home');
                }
            }
        };
        fetchDashboard(accessToken);
    }, [navigate]);

    return (
        <div>
            <h3>Admin Dashboard</h3>
            <p>{data}</p>
        </div>
    );
}

export default Dashboard;
