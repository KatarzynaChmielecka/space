import * as Yup from 'yup';
import axios from 'axios';
import { Dispatch, SetStateAction, useContext } from 'react';
import { ToastContentProps, toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';

import classes from '../pages/Form.module.css';
import { AuthContext } from '../context/auth-context';
import { Response } from '../types/interfaces';

interface UserFormValues {
  note: string;
}
const UserFormSchema = () =>
  Yup.object({
    note: Yup.string()
      .required('Note is required.')
      .min(20, 'Note should have at least 20 chars.'),
  });
const SubmitNote = ({
  isAddingNote,
  setIsAddingNote,
  fetchUserData,
}: {
  isAddingNote: boolean;
  setIsAddingNote: Dispatch<SetStateAction<boolean>>;
  fetchUserData: () => void;
}) => {
  const paramsUserId = useParams().userId;
  const { token } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserFormValues>({
    resolver: yupResolver(UserFormSchema()),
  });

  const onSubmit = async (data: UserFormValues) => {
    const response = await toast.promise(
      axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/user/${paramsUserId}/notes`,
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
            reset();
            setIsAddingNote(false);
            fetchUserData();
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
  };
  return (
    <>
      {isAddingNote && (
        <div className={classes['form-wrapper']}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className={`${classes['form-wrapper__form']} ${classes['form-wrapper__form--user-page']}`}
          >
            <fieldset>
              <div className={classes['field-wrapper']}>
                <div className={classes['field-wrapper']}>
                  <div className={classes['input-wrapper']}>
                    <label htmlFor="note" className={classes.label}>
                      Note
                    </label>
                    <input
                      type="text"
                      {...register('note')}
                      placeholder="note"
                      className={classes.input}
                    />
                  </div>
                  <p className={classes.error}>{errors.note?.message}</p>
                </div>
              </div>
            </fieldset>
            <div
              className={`${classes['form-wrapper__form-link-button-wrapper']} ${classes['form-wrapper__form-link-button-wrapper--left']}`}
            >
              <button
                onClick={() => {
                  setIsAddingNote(false);
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
export default SubmitNote;
