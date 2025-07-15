import axios from 'axios';

export const refreshToken = async () => {
  const refresh = localStorage.getItem('refresh_token');
  if (!refresh) return null;

  try {
    const res = await axios.post('http://localhost:8000/api/token/refresh/', {
      refresh: refresh,
    });
    localStorage.setItem('access_token', res.data.access);
    return res.data.access;
  } catch (err) {
    console.error('Token refresh failed:', err);
    return null;
  }
};
