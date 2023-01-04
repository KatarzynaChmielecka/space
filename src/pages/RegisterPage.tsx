import 'react-toastify/dist/ReactToastify.css';

import * as Yup from 'yup';
import axios from 'axios';
import { ChangeEvent, useState } from 'react';
import { ToastContentProps, toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import classes from './FormPage.module.css';

interface RegisterFormValues {
  username: string;
  email: string;
  password: string;
  avatar: FileList[];
}

interface SubmitData {
  username: string;
  email: string;
  password: string;
  avatar: FileList[];
}

const RegisterFormSchema = Yup.object({
  username: Yup.string()
    .min(2, 'Name should have at least 2 chars.')
    .required('Your name is required.'),
  email: Yup.string()
    .email('Invalid email.')
    .required('Your email is required.'),
  password: Yup.string()
    .min(8, 'Password should have at least 8 chars.')
    .required('Password is required.'),
  avatar: Yup.mixed().test('avatar', 'Your avatar is required.', (value) => {
    if (value.length > 0) {
      return true;
    }
    return false;
  }),
});

const RegisterPage: React.FC = () => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegisterFormValues>({
    resolver: yupResolver(RegisterFormSchema),
  });

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
    }
  };

  const onSubmit = handleSubmit(async (data: SubmitData) => {
    const formData = new FormData();
    Object.entries({
      username: data.username,
      email: data.email,
      password: data.password,
      avatar: data.avatar[0] as unknown as Blob,
    }).forEach(([key, value]) => {
      formData.set(key, value);
    });

    const response = await toast.promise(
      axios.post(`${process.env.REACT_APP_BACKEND_URL}/user/signup`, formData),
      {
        pending: 'Please, wait.',
        success: {
          render() {
            setPreviewUrl(null);
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
            setPreviewUrl(null);
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
    <div className={classes['form-page-wrapper']}>
      <form onSubmit={onSubmit} className={classes['form-page-wrapper__form']}>
        <fieldset>
          <div className={classes['field-wrapper']}>
            <div className={classes['input-wrapper']}>
              <label htmlFor="username" className={classes.label}>
                Name
              </label>
              <input
                type="text"
                {...register('username')}
                name="username"
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

          <div className={classes['field-wrapper']}>
            <div className={classes['input-wrapper']}>
              <label htmlFor="password" className={classes.label}>
                Password
              </label>
              <input
                type="password"
                {...register('password')}
                placeholder="password"
                className={classes.input}
              />
            </div>
            <p className={classes.error}>{errors.password?.message}</p>
          </div>

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
          type="submit"
          className={classes['form-page-wrapper__form-button-submit']}
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
