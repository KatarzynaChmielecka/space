import 'react-toastify/dist/ReactToastify.css';

import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';

import ChangeAvatar from '../changeUserData/ChangeAvatar';
import ChangeEmail from '../changeUserData/ChangeEmail';
import ChangeName from '../changeUserData/ChangeName';
import ChangePassword from '../changeUserData/ChangePassword';
import UserCard from '../UserCard';
import classes2 from '../UserCard.module.css';
import useGet from '../../hooks/useGet';
import { AuthContext } from '../../context/auth-context';

const UserData = () => {
  const [isEditingName, setIsEditingName] = useState<boolean>(false);
  // const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isEditingEmail, setIsEditingEmail] = useState<boolean>(false);
  const [isEditingAvatar, setIsEditingAvatar] = useState<boolean>(false);
  const [isEditingPassword, setIsEditingPassword] = useState<boolean>(false);
  const { userData, error, fetchUserData, loading } = useGet();
  const { token } = useContext(AuthContext);

  const handleEditName = () => setIsEditingName(true);

  const handleEditAvatar = () => setIsEditingAvatar(true);

  const handleEditEmail = () => {
    setIsEditingEmail(true);
  };

  const handleEditPassword = () => setIsEditingPassword(true);

  // (piszę do siebie bo zgubię wątek, a stacjonarki nie chce mi się już włączać 😛). kilka useState w userdata, setState przekazane propsami do komponentu i hook tam użyty bierze setstate. np. <ChangeName isopen={isOpenName} setIsOpen={setIsopenname} /> <ChangeEmail isOpen={isOpenEmail} setIsopen={setIsOpenEmail} /> a whooku użycie setisopen(false)
  return (
    <>
      {!token && <Link to="/login">Login</Link>}

      <div>
        <ChangeName
          fetchUserData={fetchUserData}
          isEditing={isEditingName}
          setIsEditing={setIsEditingName}
          userDataName={userData && userData?.user.username}
        />

        <ChangeEmail
          fetchUserData={fetchUserData}
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
        {loading ? <p>Loading user data...</p> : null}
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
