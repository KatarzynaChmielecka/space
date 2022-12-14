import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/auth-context';

interface UserData {
  user: {
    _id: string;
    username: string;
    email: string;
    avatar: string;
  };
}
const Test = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const auth = useContext(AuthContext);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/user/account`,
          {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          },
        );
        const data = response.data;

        if (data) {
          setUserData(data);
        } else {
          setError("You aren't allowed to be here.Please, login.");
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setError(error.response?.data.message);
        } else {
          return 'An unexpected error occurred';
        }
      }
    };
    fetchUserData();
  }, []);

  return (
    <div style={{ color: 'black' }}>
      {auth.token ? (
        userData && (
          <div>
            <p>{userData.user.username}</p>
            <p>{userData.user.email}</p>
            <img
              src={userData.user.avatar}
              alt="user avatar"
              style={{ width: '50px', height: '50px', borderRadius: '50%' }}
            />
          </div>
        )
      ) : (
        <>
          <p>{error || 'Please, login again'}</p>
          <Link to="/login">Login</Link>
        </>
      )}
    </div>
  );
};

export default Test;
