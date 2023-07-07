import * as Yup from 'yup';
import { Dispatch, SetStateAction, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import classes from '../../pages/Form.module.css';
import useChange from '../../hooks/useChange';
import { AuthContext } from '../../context/auth-context';

interface UserFormValues {
  email: string | null;
}
const UserFormSchema = () =>
  Yup.object({
    email: Yup.string()
      .email('Invalid email.')
      .required('Your email is required.'),
  });

const ChangeEmail = ({
  isEditing,
  userDataEmail,
  setIsEditing,
  fetchUserData,
}: {
  isEditing: boolean;
  userDataEmail: string | null;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
  fetchUserData: () => void;
}) => {
  const { token } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserFormValues>({
    values: { email: userDataEmail },
    resolver: yupResolver(UserFormSchema()),
  });

  const { onSubmit } = useChange(
    isEditing,
    setIsEditing,
    'email',
    fetchUserData,
    reset,
  );
  return (
    <>
      {isEditing && token && (
        <div className={classes['form-wrapper']}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className={`${classes['form-wrapper__form']} ${classes['form-wrapper__form--user-page']}`}
          >
            <fieldset>
              <div className={classes['field-wrapper']}>
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
              </div>
            </fieldset>
            <div
              className={`${classes['form-wrapper__form-link-button-wrapper']} ${classes['form-wrapper__form-link-button-wrapper--left']}`}
            >
              <button
                onClick={() => {
                  setIsEditing(false);
                  reset();
                }}
                className={classes['form-wrapper__form-button-back']}
              >
                Cancel
              </button>
              <button
                type="submit"
                className={classes['form-wrapper__form-button-submit']}
              >
                Save new data
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};
export default ChangeEmail;
