import 'react-toastify/dist/ReactToastify.css';

import * as Yup from 'yup';
import { Dispatch, SetStateAction, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import classes from '../../pages/Form.module.css';
import useChange from '../../hooks/useChange';
import { AuthContext } from '../../context/auth-context';

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

const ChangePassword = ({
  isEditing,
  setIsEditing,
  fetchUserData,
  setPreviewUrl,
}: {
  isEditing: boolean;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
  fetchUserData: () => void;
  setPreviewUrl: Dispatch<SetStateAction<string | null>>;
}) => {
  const { token } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserFormValues>({
    resolver: yupResolver(UserFormSchema()),
  });

  const { onSubmit } = useChange(
    isEditing,
    setIsEditing,
    'password',
    fetchUserData,
    reset,
    false,
    setPreviewUrl,
  );

  const handleFormSubmit = (data: UserFormValues) => {
    onSubmit({
      password: data.password as string,
      newPassword: data.newPassword as string,
      newPasswordConfirmation: data.newPasswordConfirmation as string,
    });
  };
  return (
    <>
      {isEditing && token && (
        <div className={classes['form-wrapper']}>
          <form
            onSubmit={handleSubmit(handleFormSubmit)}
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
                onClick={() => setIsEditing(false)}
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
export default ChangePassword;
