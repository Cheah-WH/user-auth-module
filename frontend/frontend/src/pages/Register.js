import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Register() {
    const [form, setForm] = useState({ username: '', email: '', password: '', role: 'user' });
    const [msg, setMsg] = useState('');

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8000/api/register/', form);
            setMsg('✅ Registered successfully');
            setForm({ username: '', email: '', password: '', role: 'user' });
        } catch (err) {
            setMsg('Failed to register');
        }
    };

    return (
        <div>
            <h3>Register</h3>
            <form onSubmit={handleSubmit}>
                <input name="username" placeholder="Username" value={form.username} onChange={handleChange} required /><br /><br />
                <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required /><br /><br />
                <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required /><br /><br />
                <select name="role" value={form.role} onChange={handleChange}>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                </select><br /><br />
                <button type="submit">Register</button>
            </form>
            <p>{msg}</p>
            <Link to="/">← Back to Login</Link>
        </div>
    );
}

export default Register;
