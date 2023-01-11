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

import classes from '../pages/FormPage.module.css';
import classes2 from './UserPage.module.css';
import photo from '../assets/shared/photo.png';
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

const UserFormSchema = Yup.object({
  username: Yup.string()
    .min(2, 'Name should have at least 2 chars.')
    .required('Your name is required.'),
  email: Yup.string()
    .email('Invalid email.')
    .required('Your email is required.'),
  avatar: Yup.mixed(),
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

  const handleEditClick = () => setIsEditing(true);

  const handleEditClickAvatar = () => setIsEditingAvatar(true);

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
    Object.entries({
      avatar: data.avatar[0] as unknown as Blob,
    }).forEach(([key, value]) => {
      formData.set(key, value);
    });

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
            <button
              onClick={() => setIsEditing(false)}
              className={classes['form-page-wrapper__form-button-submit']}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={classes['form-page-wrapper__form-button-submit']}
            >
              Save new data
            </button>
          </form>
        </div>
      )}

      {isEditingAvatar && auth.token && (
        <div className={classes['form-page-wrapper']}>
          <form
            onSubmit={onSubmitAvatar}
            className={classes['form-page-wrapper__form']}
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
              className={classes['form-page-wrapper__form-button-submit']}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={classes['form-page-wrapper__form-button-submit']}
            >
              Save new avatar
            </button>
          </form>
        </div>
      )}
      {auth.token && !isEditing && !isEditingAvatar && userData && (
        <div className={classes2['user-card-wrapper']}>
          <div
            style={{
              position: 'relative',
            }}
          >
            <img
              src={userData.user.avatar}
              alt="user avatar"
              className={classes2['user-card-wrapper__avatar']}
            />
            <div
              role="button"
              onClick={handleEditClickAvatar}
              onKeyDown={handleEditClickAvatar}
              tabIndex={0}
              style={{
                width: 'fit-content',
                height: 'fit-content',
                position: 'absolute',
                bottom: 0,
                right: 0,
              }}
            >
              <img src={photo} alt="" />
            </div>
          </div>
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
