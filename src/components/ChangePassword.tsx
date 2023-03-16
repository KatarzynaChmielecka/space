import 'react-toastify/dist/ReactToastify.css';

import * as Yup from 'yup';
import axios from 'axios';
import { Dispatch, SetStateAction, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ToastContentProps, toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AuthContext } from '../context/auth-context';

import classes from '../pages/Form.module.css';

interface UserFormValues {
  password: string;
  newPassword: string;
  newPasswordConfirmation: string;
}

const UserFormSchema = () =>
  Yup.object({
    password: Yup.string()
      .min(8, 'Password should have at least 8 chars.')
      .required('Password is required.'),
    newPassword: Yup.string()
      .min(8, 'Password should have at least 8 chars.')
      .required('Password is required.'),
    newPasswordConfirmation: Yup.string()
      .oneOf([Yup.ref('newPassword'), null], 'Passwords are different.')
      .required('Password confirmation is required'),
  });

const UserDataPassword = ({
  isEditingPassword,
  setIsEditingPassword,
}: {
  isEditingPassword: boolean;
  setIsEditingPassword: Dispatch<SetStateAction<boolean>>;
}) => {
  const auth = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserFormValues>({
    resolver: yupResolver(UserFormSchema()),
  });
  const paramsUserId = useParams().userId;

  const onSubmitPassword = handleSubmit(async (data: UserFormValues) => {
    const response = await toast.promise(
      axios.patch(
        `${process.env.REACT_APP_BACKEND_URL}/user/${paramsUserId}/password`,
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
            setIsEditingPassword(false);
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
    <>
      {isEditingPassword && auth.token && (
        <div className={classes['form-wrapper']}>
          <form
            onSubmit={onSubmitPassword}
            className={`${classes['form-wrapper__form']} ${classes['form-wrapper__form--user-page']}`}
          >
            <fieldset className={classes['fieldset-password']}>
              <div className={classes['field-wrapper']}>
                <div className={classes['input-wrapper']}>
                  <label htmlFor="password" className={classes.label}>
                    Old password
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
                  <label htmlFor="password" className={classes.label}>
                    New Password
                  </label>
                  <input
                    type="password"
                    {...register('newPassword')}
                    placeholder="password"
                    className={classes.input}
                  />
                </div>
                <p className={classes.error}>{errors.newPassword?.message}</p>
              </div>

              <div className={classes['field-wrapper']}>
                <div className={classes['input-wrapper']}>
                  <label
                    htmlFor="passwordConfirmation"
                    className={classes.label}
                  >
                    Repeat password
                  </label>
                  <input
                    type="password"
                    {...register('newPasswordConfirmation')}
                    placeholder="password"
                    className={classes.input}
                  />
                </div>
                <p className={classes.error}>
                  {errors.newPasswordConfirmation?.message}
                </p>
              </div>
            </fieldset>
            <div
              className={`${classes['form-wrapper__form-link-button-wrapper']} ${classes['form-wrapper__form-link-button-wrapper--left']}`}
            >
              <button
                onClick={() => setIsEditingPassword(false)}
                className={classes['form-wrapper__form-button-back']}
              >
                CANCEL
              </button>
              <button
                type="submit"
                className={classes['form-wrapper__form-button-submit']}
              >
                CONFIRM
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};
export default UserDataPassword;
