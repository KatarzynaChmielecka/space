import * as Yup from 'yup';
import axios from 'axios';
import { ChangeEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

// import classes from './RegisterPage.module.css';

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
  const [errorBackend, setErrorBackend] = useState(null);
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

      setOkResponse(response.data.message);
      setPreviewUrl(null);
      reset();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrorBackend(error.response?.data.message);
      } else {
        return 'An unexpected error occurred';
      }
    }
  });

  return (
    <form
      onSubmit={onSubmit}
      style={{ display: 'flex', flexDirection: 'column' }}
    >
      {errorBackend && <p>{errorBackend}</p>}
      {okResponse && <p>{okResponse}</p>}
      <label htmlFor="username">Name</label>
      <input type="text" {...register('username')} name="username" />
      <p>{errors.username?.message}</p>

      <label htmlFor="email">email</label>
      <input type="email" {...register('email')} />
      <p>{errors.email?.message}</p>

      <label htmlFor="password">Password</label>
      <input type="password" {...register('password')} />
      <p>{errors.password?.message}</p>

      <label htmlFor="avatar">Avatar</label>
      <input
        type="file"
        {...register('avatar')}
        onChange={handleImageChange}
        name="avatar"
      />
      <p>{errors.avatar?.message}</p>
      {previewUrl && (
        <img
          src={previewUrl}
          alt="Preview"
          style={{ width: '50px', height: '50px' }}
        />
      )}

      <button type="submit">Register</button>
    </form>
  );
};
export default RegisterPage;
