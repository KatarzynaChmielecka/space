import * as Yup from 'yup';
import axios from 'axios';
import { Dispatch, SetStateAction, useContext } from 'react';
import { ToastContentProps, toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';

import classes from '../../pages/Form.module.css';
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
  isEditingName,
  setIsEditingName,
  userDataName,
}: {
  isEditingName: boolean;
  setIsEditingName: Dispatch<SetStateAction<boolean>>;
  userDataName: string | null;
}) => {
  const { token } = useContext(AuthContext);
  const paramsUserId = useParams().userId;
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserFormValues>({
    values: { username: userDataName },
    resolver: yupResolver(UserFormSchema()),
  });

  const onSubmitName = handleSubmit(async (data: UserFormValues) => {
    const response = await toast.promise(
      axios.patch(
        `${process.env.REACT_APP_BACKEND_URL}/user/${paramsUserId}/name`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      ),
      {
        pending: 'Please, wait.',
        success: {
          render() {
            setIsEditingName(false);
            // fetchUserData();
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
      {isEditingName && token && (
        <div className={classes['form-wrapper']}>
          <form
            onSubmit={onSubmitName}
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
                  setIsEditingName(false);
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
