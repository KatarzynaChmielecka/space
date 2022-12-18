import * as Yup from 'yup';
import { ChangeEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

// import classes from './RegisterPage.module.css';

interface RegisterFormValues {
  username: string;
  email: string;
  password: string;
  avatar: File | null;
}

const RegisterFormSchema = Yup.object({
  username: Yup.string().min(2, 'Too Shortaaa!').required('Required'),
  email: Yup.string().email('Invalid emailaaa').required('Required'),
});

const RegisterPage: React.FC = () => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

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

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });
  return (
    <form
      onSubmit={onSubmit}
      style={{ display: 'flex', flexDirection: 'column' }}
    >
      <label htmlFor="username">Name</label>
      <input type="text" {...register('username')} />
      <p>{errors.username?.message}</p>

      <label htmlFor="email">email</label>
      <input type="email" {...register('email')} />
      <p>{errors.email?.message}</p>

      <label htmlFor="password">Password</label>
      <input type="password" {...register('password')} />
      <p>{errors.password?.message}</p>

      <label htmlFor="Avatar">Avatar</label>
      <input type="file" {...register('avatar')} onChange={handleImageChange} />
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
