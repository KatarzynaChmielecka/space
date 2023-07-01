import 'react-toastify/dist/ReactToastify.css';

import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { useCallback, useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import ChangeAvatar from '../changeUserData/ChangeAvatar';
import ChangeEmail from '../changeUserData/ChangeEmail';
import ChangeName from '../changeUserData/ChangeName';
import ChangePassword from '../changeUserData/ChangePassword';
import UserCard from '../UserCard';
import classes2 from '../UserCard.module.css';
import { AuthContext } from '../../context/auth-context';

interface UserData {
  user: {
    _id: string;
    username: string;
    email: string;
    avatar: string;
  };
}

const UserData = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isEditingName, setIsEditingName] = useState<boolean>(false);
  const [isEditingEmail, setIsEditingEmail] = useState<boolean>(false);
  const [isEditingAvatar, setIsEditingAvatar] = useState<boolean>(false);
  const [isEditingPassword, setIsEditingPassword] = useState<boolean>(false);

  const { token } = useContext(AuthContext);

  const { setValue } = useForm();
  const paramsUserId = useParams().userId;

  const fetchUserData = useCallback(async () => {
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
        setError("You aren't allowed to be here.Please, login.");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data.message);
      } else {
        setError('Something went wrong. Please,try again later.');
      }
    }
  }, []);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  const handleEditName = () => setIsEditingName(true);

  const handleEditAvatar = () => setIsEditingAvatar(true);

  const handleEditEmail = () => {
    setIsEditingEmail(true);
  };

  const handleEditPassword = () => setIsEditingPassword(true);

  return (
    <>
      {!token && <Link to="/login">Login</Link>}

      <div>
        <ChangeName
          isEditingName={isEditingName}
          setIsEditingName={setIsEditingName}
          userDataName={userData && userData?.user.username}
        />

        <ChangeEmail
          isEditingEmail={isEditingEmail}
          setIsEditingEmail={setIsEditingEmail}
          userDataEmail={userData && userData?.user.email}
        />

        <ChangeAvatar
          isEditingAvatar={isEditingAvatar}
          setIsEditingAvatar={setIsEditingAvatar}
        />

        <ChangePassword
          isEditingPassword={isEditingPassword}
          setIsEditingPassword={setIsEditingPassword}
        />
        {token &&
          !isEditingName &&
          !isEditingEmail &&
          !isEditingAvatar &&
          !isEditingPassword &&
          userData && (
            <UserCard
              src={userData.user.avatar}
              username={userData.user.username}
              userEmail={userData.user.email}
              editImage={handleEditAvatar}
              editName={handleEditName}
              editEmail={handleEditEmail}
              editPassword={handleEditPassword}
            />
          )}

        {!token && (
          <div className={classes2['user-page-logout']}>
            <p>{error || 'Please, login.'}</p>
            <Link to="/login" className={classes2['user-page-logout__link']}>
              Login
            </Link>
          </div>
        )}
      </div>
    </>
  );
};
export default UserData;
