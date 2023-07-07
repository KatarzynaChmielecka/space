import * as Yup from 'yup';
import { Dispatch, SetStateAction, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import classes from '../../pages/Form.module.css';
import useChange from '../../hooks/useChange';
import { AuthContext } from '../../context/auth-context';

interface UserFormValues {
  username: string | null;
}
const UserFormSchema = () =>
  Yup.object({
    username: Yup.string()
      .min(2, 'Name should have at least 2 chars.')
      .required('Your name is required.'),
  });

const ChangeName = ({
  isEditing,
  userDataName,
  setIsEditing,
  fetchUserData,
}: {
  isEditing: boolean;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
  userDataName: string | null;
  fetchUserData: () => void;
}) => {
  const { token } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserFormValues>({
    values: { username: userDataName },
    resolver: yupResolver(UserFormSchema()),
  });

  const { onSubmit } = useChange(
    isEditing,
    setIsEditing,
    'name',
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
                    <label htmlFor="name" className={classes.label}>
                      Name
                    </label>
                    <input
                      type="name"
                      {...register('username')}
                      placeholder="name"
                      className={classes.input}
                    />
                  </div>
                  <p className={classes.error}>{errors.username?.message}</p>
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
export default ChangeName;
