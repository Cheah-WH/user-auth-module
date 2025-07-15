import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
        const fetchDashboard = async () => {
            try {
                const res = await axios.get('http://localhost:8000/api/dashboard/', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });
                setData(res.data.message);
            } catch (err) {
                alert(
                    err.response?.data?.detail
                        ? `Access denied: ${err.response.data.detail}`
                        : 'Access denied: An unexpected error occurred.'
                );
                setData('Unauthorized or not admin');
                navigate('/user-home');
            }
        };
        fetchDashboard();
    }, [navigate]);

    return (
        <div>
            <h3>Admin Dashboard</h3>
            <p>{data}</p>
        </div>
    );
}

export default Dashboard;
