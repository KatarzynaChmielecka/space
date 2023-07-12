import 'react-toastify/dist/ReactToastify.css';

import { useContext, useEffect, useState } from 'react';

import ChangeAvatar from '../changeUserData/ChangeAvatar';
import ChangeEmail from '../changeUserData/ChangeEmail';
import ChangeName from '../changeUserData/ChangeName';
import ChangePassword from '../changeUserData/ChangePassword';
import Modal from '../Modal';
import UserCard from '../UserCard';
import useGet from '../../hooks/useGet';
import { AuthContext } from '../../context/auth-context';

const UserData = () => {
  const [isEditingName, setIsEditingName] = useState<boolean>(false);
  const [isEditingEmail, setIsEditingEmail] = useState<boolean>(false);
  const [isEditingAvatar, setIsEditingAvatar] = useState<boolean>(false);
  const [isEditingPassword, setIsEditingPassword] = useState<boolean>(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const { userData, error, fetchUserData, loading } = useGet();
  const { token } = useContext(AuthContext);

  useEffect(() => {
    document.body.style.overflow = 'auto';
  }, []);

  const handleEditName = () => setIsEditingName(true);

  const handleEditAvatar = () => setIsEditingAvatar(true);

  const handleEditEmail = () => {
    setIsEditingEmail(true);
  };

  const handleEditPassword = () => setIsEditingPassword(true);

  return (
    <div>
      {loading ? <p>Loading user data...</p> : null}

      <ChangeName
        fetchUserData={fetchUserData}
        isEditing={isEditingName}
        setIsEditing={setIsEditingName}
        userDataName={userData && userData?.user.username}
        setPreviewUrl={setPreviewUrl}
      />

      <ChangeEmail
        fetchUserData={fetchUserData}
        isEditing={isEditingEmail}
        setIsEditing={setIsEditingEmail}
        userDataEmail={userData && userData?.user.email}
        setPreviewUrl={setPreviewUrl}
      />

      <ChangeAvatar
        fetchUserData={fetchUserData}
        isEditing={isEditingAvatar}
        setIsEditing={setIsEditingAvatar}
        previewUrl={previewUrl}
        setPreviewUrl={setPreviewUrl}
      />

      <ChangePassword
        fetchUserData={fetchUserData}
        isEditing={isEditingPassword}
        setIsEditing={setIsEditingPassword}
        setPreviewUrl={setPreviewUrl}
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

      {!userData && !loading && (
        <Modal
          title="Something went wrong"
          content={
            error
              ? error
              : 'Time has gone or something weird went wrong. Please log in again or refresh page.'
          }
          modalOnClick={false}
          showModal={true}
        />
      )}

      {!token && (
        <Modal
          title="Something went wrong"
          content={error ? error : 'Time has gone. Please log in again.'}
          modalOnClick={false}
          showModal={true}
        />
      )}
    </div>
  );
};
export default UserData;
