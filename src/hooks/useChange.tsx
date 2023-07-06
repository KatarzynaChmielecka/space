import axios from 'axios';
import { Dispatch, SetStateAction, useContext, useState } from 'react';
import { ToastContentProps, toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import { AuthContext } from '../context/auth-context';

type FormValues = {
  fieldName: string;
};
const useChange = (
  data: string,
  isEditing: boolean,
  setIsEditing: Dispatch<SetStateAction<boolean>>,
  // input: string,
  fieldName: string,
  fetchUserData: () => void,
) => {
  // const [isEditing, setIsEditing] = useState({});
  const { handleSubmit, reset } = useForm<FormValues>();
  const paramsUserId = useParams().userId;
  const { token } = useContext(AuthContext);
  const onSubmit = handleSubmit(async () => {
    const response = await toast.promise(
      axios.patch(
        `${process.env.REACT_APP_BACKEND_URL}/user/${paramsUserId}/${fieldName}`,
        data,
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
  });

  return { onSubmit, isEditing };
};

export default useChange;
