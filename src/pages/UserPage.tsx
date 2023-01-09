import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { useCallback, useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useParams } from 'react-router-dom';
import { AuthContext } from '../context/auth-context';
import classes from '../pages/FormPage.module.css';
import classes2 from './UserPage.module.css';
import * as Yup from 'yup';
import { toast, ToastContentProps } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
interface UserData {
  user: {
    _id: string;
    username: string;
    email: string;
    avatar: string;
  };
}

interface UserFormValues {
  username?: string;
  email?: string;
}

const UserFormSchema = Yup.object({
  username: Yup.string()
    .min(2, 'Name should have at least 2 chars.')
    .required('Your name is required.'),
  email: Yup.string()
    .email('Invalid email.')
    .required('Your email is required.'),
});

const UserPage = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  // const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const auth = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<UserFormValues>({
    resolver: yupResolver(UserFormSchema),
  });
  const paramsUserId = useParams().userId;

  const fetchUserData = useCallback(async () => {
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
        setValue('username', data.user.username);
        setValue('email', data.user.email);
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
  }, []);
  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  function handleEditClick() {
    setIsEditing(true);
  }

  const onSubmit = handleSubmit(async (data: UserFormValues) => {
    const response = await toast.promise(
      axios.patch(
        `${process.env.REACT_APP_BACKEND_URL}/user/${paramsUserId}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
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

  return (
    <div style={{ color: 'black', fontSize: '20px' }}>
      {isEditing && auth.token && (
        <div className={classes['form-page-wrapper']}>
          <form
            onSubmit={onSubmit}
            className={classes['form-page-wrapper__form']}
          >
            <fieldset>
              <div className={classes['field-wrapper']}>
                <div className={classes['input-wrapper']}>
                  <label htmlFor="username" className={classes.label}>
                    Name
                  </label>
                  <input
                    type="text"
                    {...register('username')}
                    placeholder="name"
                    className={classes.input}
                  />
                </div>
                <p className={classes.error}>{errors.username?.message}</p>
              </div>

              <div className={classes['field-wrapper']}>
                <div className={classes['input-wrapper']}>
                  <label htmlFor="email" className={classes.label}>
                    Email
                  </label>
                  <input
                    type="email"
                    {...register('email')}
                    placeholder="email"
                    className={classes.input}
                  />
                </div>
                <p className={classes.error}>{errors.email?.message}</p>
              </div>
            </fieldset>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
            <button
              type="submit"
              className={classes['form-page-wrapper__form-button-submit']}
            >
              Save new data
            </button>
          </form>
        </div>
      )}
      {auth.token && !isEditing && userData && (
        <div className={classes2['user-card-wrapper']}>
          <img
            src={userData.user.avatar}
            alt="user avatar"
            className={classes2['user-card-wrapper__avatar']}
          />
          <div className={classes2['user-card-wrapper__user-data']}>
            <p>{userData.user.username}</p>
            <p>{userData.user.email}</p>
          </div>
          <button
            onClick={handleEditClick}
            className={classes2['user-card-wrapper__submit-button']}
          >
            Edit data
          </button>
          <button className={classes2['user-card-wrapper__submit-button']}>
            Edit avatar
          </button>
        </div>
      )}
      {!auth.token && (
        <>
          <p>{error || 'Please, login again'}</p>
          <Link to="/login">Login</Link>
        </>
      )}
    </div>
  );
};

export default UserPage;
