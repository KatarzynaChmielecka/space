import axios from 'axios';
import { useCallback, useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import { AuthContext } from '../context/auth-context';

interface Image {
  _id: string;
  imageUrl: string;
}
interface Note {
  _id: string;
  createdAt: string;
  text: string;
}
interface UserData {
  user: {
    _id: string;
    username: string;
    email: string;
    avatar: string;
    images: Image[];
    notes: Note[];
  };
}

const useGet = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const paramsUserId = useParams().userId;
  const { token } = useContext(AuthContext);
  const { setValue } = useForm();

  const fetchUserData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/user/${paramsUserId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const data = response.data;

      if (data) {
        setUserData(data);

        setValue('username', data.user.username);
        setValue('email', data.user.email);
      } else {
        setError("You aren't allowed to be here. Please, login.");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(
          error.response?.data.message === 'jwt expired'
            ? 'You have been log out.'
            : error.response?.data.message ||
                'Something went wrong. Please, try again later.',
        );
      } else {
        setError('Something went wrong. Please, try again later.');
      }
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    fetchUserData();
  }, []);
  return { userData, error, fetchUserData, loading, setValue };
};
export default useGet;
