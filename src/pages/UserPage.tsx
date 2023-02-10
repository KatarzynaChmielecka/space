import 'react-toastify/dist/ReactToastify.css';

import * as Yup from 'yup';
import axios from 'axios';
import {
  ChangeEvent,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Link, useParams } from 'react-router-dom';
import { ToastContentProps, toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import UserCard from '../components/UserCard';
import classes from '../pages/Form.module.css';
import classes2 from './UserPage.module.css';
import { AuthContext } from '../context/auth-context';

interface UserData {
  user: {
    _id: string;
    username: string;
    email: string;
    avatar: string;
  };
}

interface UserFormValues {
  username: string;
  email: string;
  avatar: string;
}

type DataChange = Omit<UserFormValues, 'avatar'>;
type AvatarChange = Pick<UserFormValues, 'avatar'>;

const UserFormSchema = (isEditingAvatar: boolean) =>
  Yup.object({
    username: Yup.string()
      .min(2, 'Name should have at least 2 chars.')
      .required('Your name is required.'),
    email: Yup.string()
      .email('Invalid email.')
      .required('Your email is required.'),
    avatar: Yup.mixed().test('avatar', 'Your avatar is required.', (value) => {
      if (isEditingAvatar && !value) {
        return false;
      }
      return true;
    }),
  });

const UserPage = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isEditingAvatar, setIsEditingAvatar] = useState<boolean>(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const auth = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<UserFormValues>({
    resolver: yupResolver(UserFormSchema(isEditingAvatar)),
    mode: 'onSubmit',
    defaultValues: {
      avatar: '',
    },
  });
  const paramsUserId = useParams().userId;

  const fetchUserData = useCallback(async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/user/${paramsUserId}`,
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
        setError('Something went wrong. Please,try again later.');
      }
    }
  }, []);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  const handleEditData = () => setIsEditing(true);

  const handleEditAvatar = () => setIsEditingAvatar(true);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
    }
  };
  const onSubmit = handleSubmit(async (data: DataChange) => {
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

  const onSubmitAvatar = handleSubmit(async (data: AvatarChange) => {
    const formData = new FormData();
    formData.append('avatar', data.avatar[0]);
    const response = await toast.promise(
      axios.patch(
        `${process.env.REACT_APP_BACKEND_URL}/user/${paramsUserId}/image`,
        formData,
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
            setPreviewUrl(null);
            setIsEditingAvatar(false);
            reset();
            fetchUserData();
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
            setPreviewUrl(null);
            setIsEditingAvatar(false);
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
        <div className={classes['form-wrapper']}>
          <form onSubmit={onSubmit} className={classes['form-wrapper__form']}>
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
            <button
              onClick={() => setIsEditing(false)}
              className={classes['form-wrapper__form-button-submit']}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={classes['form-wrapper__form-button-submit']}
            >
              Save new data
            </button>
          </form>
        </div>
      )}

      {isEditingAvatar && auth.token && (
        <div className={classes['form-wrapper']}>
          <form
            onSubmit={onSubmitAvatar}
            className={classes['form-wrapper__form']}
          >
            <fieldset>
              <div className={classes['field-wrapper']}>
                <div className={classes['input-wrapper']}>
                  <label htmlFor="avatar" className={classes.label}>
                    Avatar
                  </label>
                  <button className={classes['button-avatar']}>
                    Choose avatar
                  </button>
                  <input
                    type="file"
                    {...register('avatar')}
                    onChange={(e) => {
                      handleImageChange(e);
                      register('avatar').onChange(e);
                    }}
                    name="avatar"
                    className={classes['custom-file-input']}
                    title=""
                  />
                </div>
                {errors.avatar ? (
                  <p className={classes.error}>{errors.avatar?.message}</p>
                ) : (
                  ''
                )}
              </div>

              {previewUrl && (
                <img
                  src={previewUrl}
                  alt="Preview"
                  className={classes['image-preview']}
                />
              )}
            </fieldset>
            <button
              onClick={() => setIsEditingAvatar(false)}
              className={classes['form-wrapper__form-button-submit']}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={classes['form-wrapper__form-button-submit']}
            >
              Save new avatar
            </button>
          </form>
        </div>
      )}
      {auth.token && !isEditing && !isEditingAvatar && userData && (
        <UserCard
          src={userData.user.avatar}
          username={userData.user.username}
          userEmail={userData.user.email}
          editImage={handleEditAvatar}
          editData={handleEditData}
        />
      )}
      {!auth.token && (
        <div className={classes2['user-page-logout']}>
          <p>{error || 'Please, login.'}</p>
          <Link to="/login" className={classes2['user-page-logout__link']}>
            Login
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserPage;
