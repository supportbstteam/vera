import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
export default function Logout() {
  const navigate = useNavigate();
  const baseUrl = process.env.REACT_APP_API_URL
  useEffect(() => {
    const logOut = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/');
          return;
        }
        const response = await axios.get(`${baseUrl}/api/logout`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        localStorage.removeItem('token');
        navigate('/');
      } catch (error) {
        console.error('Error logging out:', error);
        localStorage.removeItem('token');
        navigate('/');
      }
    };
    logOut();
  }, [navigate]);
  return null;
}
