import * as Yup from 'yup';
import axios from 'axios';
import { ChangeEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import classes from './RegisterPage.module.css';

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
  const [error, setError] = useState<string | null>(null);
  const [okResponse, setOkResponse] = useState(null);
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

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}user/signup`,
        formData,
      );

      if (response.status === 201) {
        console.log(response);
      } else {
        setError('aaddddbuuu');
      }
      setOkResponse(response.data.message);
      setPreviewUrl(null);
      reset();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data.message);
      }

      setError('Something went wrong. Please try again later');
    }
  });

  return (
    <div className={classes['register-page-wrapper']}>
      <form
        onSubmit={onSubmit}
        className={classes['register-page-wrapper__form']}
      >
        {/* error and okResponse will be toasts */}
        {error && <p>{error}</p>}
        {okResponse && <p>{okResponse}</p>}
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
              />
            </div>
            <p>{errors.username?.message}</p>
          </div>

          <div className={classes['field-wrapper']}>
            <div className={classes['input-wrapper']}>
              <label htmlFor="email" className={classes.label}>
                Email
              </label>
              <input type="email" {...register('email')} placeholder="email" />
            </div>
            <p>{errors.email?.message}</p>
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
              />
            </div>
            <p>{errors.password?.message}</p>
          </div>

          <div className={classes['field-wrapper']}>
            <div className={classes['input-wrapper']}>
              <label htmlFor="avatar" className={classes.label}>
                Avatar
              </label>
              <input
                type="file"
                {...register('avatar')}
                onChange={handleImageChange}
                name="avatar"
                className={classes['custom-file-input']}
              />
            </div>
            <p>{errors.avatar?.message}</p>
          </div>

          {previewUrl && (
            <img
              src={previewUrl}
              alt="Preview"
              style={{ width: '50px', height: '50px' }}
            />
          )}
        </fieldset>
        <button type="submit" style={{ fontSize: '24px' }}>
          Register
        </button>
      </form>
    </div>
  );
};
export default RegisterPage;
