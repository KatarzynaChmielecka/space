import 'react-toastify/dist/ReactToastify.css';

import { useContext, useState } from 'react';

import ChangeAvatar from '../changeData/ChangeAvatar';
import ChangeEmail from '../changeData/ChangeEmail';
import ChangeName from '../changeData/ChangeName';
import ChangePassword from '../changeData/ChangePassword';
import Loader from '../Loader';
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

  document.body.style.overflow = 'auto';

  const handleEditName = () => setIsEditingName(true);

  const handleEditAvatar = () => setIsEditingAvatar(true);

  const handleEditEmail = () => {
    setIsEditingEmail(true);
  };

  const handleEditPassword = () => setIsEditingPassword(true);

  return (
    <div>
      {loading ? <Loader /> : null}

      <ChangeName
        fetchUserData={fetchUserData}
        isEditing={isEditingName}
        setIsEditing={setIsEditingName}
        userDataName={userData && userData?.user.username}
      />

      <ChangeEmail
        fetchUserData={fetchUserData}
        isEditing={isEditingEmail}
        setIsEditing={setIsEditingEmail}
        userDataEmail={userData && userData?.user.email}
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

      {error && (
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
    </div>
  );
};
export default UserData;
