import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function UserHome() {
    const [data, setData] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const accessToken = localStorage.getItem('access_token');
        if (!accessToken) {
            alert('Please log in first.');
            navigate('/');
            return;
        }

        const fetchUserHome = async () => {
            try {
                const res = await axios.get('http://localhost:8000/api/user-home/', {
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
                setData('Unauthorized');
                navigate('/');
            }
        };
        fetchUserHome();
    }, [navigate]);

    const handleLogout = async () => {
        try {
            const res = await axios.post('http://localhost:8000/api/logout/', {
                refresh: localStorage.getItem('refresh_token'),
            });
            console.log('Logout response:', res.data);

            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            navigate('/');
        } catch (err) {
            console.error('Logout failed:', err);
        }
    };

    return (
        <div>
            <h3>User Home</h3>
            <p>{data}</p>
            <Link to="/dashboard">Go to Admin Dashboard</Link><br /><br />
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default UserHome;
