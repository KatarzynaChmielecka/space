import 'react-toastify/dist/ReactToastify.css';

import * as Yup from 'yup';
import axios from 'axios';
import { ToastContentProps, toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import classes from './LoginPage.module.css';
import { AuthContext } from '../context/auth-context';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

interface LoginFormValues {
  email: string;
  password: string;
}

interface SubmitData {
  email: string;
  password: string;
}

const LoginFormSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email.')
    .required('Your email is required.'),
  password: Yup.string()
    .min(8, 'Password should have at least 8 chars.')
    .required('Password is required.'),
});

const LoginPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormValues>({
    resolver: yupResolver(LoginFormSchema),
  });

  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const onSubmit = handleSubmit(async (data: SubmitData) => {
    const response = await toast.promise(
      axios.post(`${process.env.REACT_APP_BACKEND_URL}/user/login`, data),
      {
        pending: 'Please, wait.',
        success: {
          render() {
            reset();
            console.log(response.data);
            auth.login(response.data.token);
            navigate('/test');
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
    <div className={classes['login-page-wrapper']}>
      <form onSubmit={onSubmit} className={classes['login-page-wrapper__form']}>
        <fieldset>
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
        </fieldset>

        <button
          type="submit"
          className={classes['register-page-wrapper__form-button-login']}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
