import 'react-toastify/dist/ReactToastify.css';

import * as Yup from 'yup';
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ToastContentProps, toast } from 'react-toastify';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import classes from './Form.module.css';
import classes2 from './LoginPage.module.css';
import { AuthContext } from '../context/auth-context';
import { Response } from '../types/interfaces';

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
  const path = useLocation().pathname;
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormValues>({
    resolver: yupResolver(LoginFormSchema),
  });

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  document.body.style.overflow = 'auto';

  const onSubmit = handleSubmit(async (data: SubmitData) => {
    const response = await toast.promise(
      axios.post(`${process.env.REACT_APP_BACKEND_URL}/user/login`, data),
      {
        pending: 'Please, wait.',
        success: {
          render() {
            reset();
            login(response.data.token, response.data.user._id);
            const userIdFromData = response.data.user._id;
            navigate(`/user/${userIdFromData}`);
            return <p>{response.data.message} </p>;
          },
        },
        error: {
          render({
            data,
          }: ToastContentProps<{
            response: Response;
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
    <div className={classes2['login-page-wrapper']}>
      <h6 className={classes2['login-page-wrapper__title']}>
        <span>04</span> LOG IN
      </h6>
      <div
        className={
          path === '/login'
            ? `${classes['form-wrapper']} ${classes['form-wrapper--login']}`
            : classes['form-wrapper']
        }
      >
        <form
          onSubmit={onSubmit}
          className={`${classes['form-wrapper__form']} ${classes['form-wrapper__form--login']}`}
        >
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

          <div
            className={`${classes['form-wrapper__form-link-button-wrapper']} ${classes['form-wrapper__form-link-button-wrapper--login']}`}
          >
            <Link
              to="/register"
              className={classes['form-wrapper__form-link-login']}
            >
              JOIN US
            </Link>

            <button
              type="submit"
              className={classes['form-wrapper__form-button-submit']}
            >
              LOG IN
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
