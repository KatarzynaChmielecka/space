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
const UserPage = () => {
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

  const [name, setName] = useState<string>('John');
  const [age, setAge] = useState<number>(30);
  const [photo, setPhoto] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  function handleNameChange(event: React.ChangeEvent<HTMLInputElement>) {
    setName(event.target.value);
  }

  function handleAgeChange(event: React.ChangeEvent<HTMLInputElement>) {
    setAge(event.target.valueAsNumber);
  }

  function handlePhotoChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  function handleEditClick() {
    setIsEditing(true);
  }

  function handleSaveClick() {
    setIsEditing(false);

   
  }
  return (
    <div style={{ color: 'black' }}>
      {isEditing && (
        <>
          <label>
            Name:
            <input value={name} onChange={handleNameChange} />
          </label>
          <br />
          <label>
            Age:
            <input value={age} onChange={handleAgeChange} type="number" />
          </label>
          <br />
          <label>
            Photo:
            <input type="file" onChange={handlePhotoChange} />
          </label>
          <br />
          <button onClick={handleSaveClick}>Save</button>
        </>
      )}
      {auth.token && !isEditing ? (
        userData && (
          <div>
            <img
              src={userData.user.avatar}
              alt="user avatar"
              style={{ width: '50px', height: '50px', borderRadius: '50%' }}
            />
            <p>{userData.user.username}</p>
            <button onClick={handleEditClick}>Edit</button>
            <p>{userData.user.email}</p>
          </div>
        )
      ) : (
        <>
          <p>{error || 'Please, login again'}</p>
          <Link to="/login">Login</Link>
        </>
      )}

      <button>Logout</button>
    </div>
  );
};

export default UserPage;
