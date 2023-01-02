import axios from 'axios';
import { useEffect, useState } from 'react';

interface UserData {
  _id: string;
  username: string;
  email: string;
  avatar: string;
}
const Test = () => {
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/user/account`,
        {
          withCredentials: true,
        },
        // {
        //   headers: {
        //     Authorization: `Bearer ${token}`,
        //   },
        // },
      );
      const data = response.data;
      console.log(data);
      if (data) {
        setUserData(data);
      } else {
        console.error('buu');
      }
    };
    fetchUserData();
  }, []);

  console.log(userData);

  return (
    <div style={{ color: 'black' }}>
      {/* Dane użytkownika: {userData} {token} */}
      {userData && userData?._id}
    </div>
  );
};

export default Test;
