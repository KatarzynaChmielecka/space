import axios from 'axios';
import { Dispatch, SetStateAction, useContext } from 'react';
import { ToastContentProps, toast } from 'react-toastify';
import { useParams } from 'react-router-dom';

import { AuthContext } from '../context/auth-context';

type Data = {
  [key: string]: string;
};
const useChange = (
  isEditing: boolean,
  setIsEditing: Dispatch<SetStateAction<boolean>>,
  path: string,
  fetchUserData: () => void,
  reset: () => void,
  isAvatar: boolean,
  setPreviewUrl: Dispatch<SetStateAction<string | null>>,
) => {
  const paramsUserId = useParams().userId;
  const { token } = useContext(AuthContext);
  const onSubmit = async (data: Data) => {
    const formData = new FormData();
    if (isAvatar) {
      formData.append('avatar', data.avatar as string);
    }

    const response = await toast.promise(
      axios.patch(
        `${process.env.REACT_APP_BACKEND_URL}/user/${paramsUserId}/${path}`,
        isAvatar ? formData : data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      ),
      {
        pending: 'Please, wait.',
        success: {
          render() {
            isAvatar && setPreviewUrl(null);
            setIsEditing(false);
            fetchUserData();
            reset();
            return <p>{response.data.message} </p>;
          },
        },
        error: {
          render({
            data,
          }: ToastContentProps<{
            response: { status: number; data: { message: string } };
            status: number;
          }>) {
            isAvatar && setPreviewUrl(null);
            reset();
            if (data && data.response && data?.response.status === 0) {
              return (
                <p>
                  Sorry, we have problem with database connection. Please try
                  again later.
                </p>
              );
            }
            if (data && data.response && data.response.data) {
              return <p>{data.response.data.message} </p>;
            }
            return <p>Something went wrong, please try again later.</p>;
          },
        },
      },
      { position: 'top-center' },
    );
  };

  return { onSubmit, isEditing };
};

export default useChange;
