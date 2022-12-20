import * as Yup from 'yup';
import axios from 'axios';
import { ChangeEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

// import classes from './RegisterPage.module.css';

interface RegisterFormValues {
  files: any;
  username: string;
  email: string;
  password: string;
  avatar: Blob | string;
}

interface SubmitData {
  username: string;
  email: string;
  password: string;
  avatar: Blob | string;
}
const RegisterFormSchema = Yup.object({
  username: Yup.string().min(2, 'Too Shortaaa!').required('Required'),
  email: Yup.string().email('Invalid emailaaa').required('Required'),
  password: Yup.string().min(8, 'Too Short!').required('Required'),
});

const RegisterPage: React.FC = () => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [errora, setErrora] = useState(null);
  const [ok, setOk] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    // reset,
  } = useForm<RegisterFormValues>({
    resolver: yupResolver(RegisterFormSchema),
  });

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);

      console.log(previewUrl);
    }
  };

  const onSubmit = handleSubmit(async (data: SubmitData) => {
    console.log(data);
    const formData = new FormData();
    Object.entries({
      username: data.username,
      email: data.email,
      password: data.password,
      avatar: data.avatar,
    }).forEach(([key, value]) => {
      formData.set(key, value);
    });
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}user/signup`,
        // {
        //   username: data.username,
        //   email: data.email,
        //   password: data.password,
        //   avatar: data.avatar,
        // },
        formData,
      );
      console.log(response.data.message);
      setOk(response.data.message);
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        console.log('error messageaa: ', error.response?.data.message);
        // return error.message;
        setErrora(error.response?.data.message);
      } else {
        console.log('unexpected error: ', error);
        return 'An unexpected error occurred';
      }
    }
  });
  return (
    <form
      // encType="multipart/form-data"
      onSubmit={onSubmit}
      style={{ display: 'flex', flexDirection: 'column' }}
    >
      {errora && <p>{errora}</p>}
      {ok && <p>{ok}</p>}
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
