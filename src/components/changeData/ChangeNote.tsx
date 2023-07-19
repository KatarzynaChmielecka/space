import * as Yup from 'yup';
import { Dispatch, SetStateAction } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import classes from '../../pages/Form.module.css';
import useChange from '../../hooks/useChange';

interface UserFormValues {
  text: string | null;
}

const UserFormSchema = () =>
  Yup.object({
    text: Yup.string()
      .required('Note is required.')
      .min(20, 'Note should have at least 20 chars.'),
  });

const ChangeNote = ({
  isEditing,
  userDataText,
  setIsEditing,
  fetchUserData,
  noteId,
  setSelectedNote,
}: {
  isEditing: boolean;
  userDataText: string | null;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
  fetchUserData: () => void;
  noteId: string | null;
  selectedNote: string | null;
  setSelectedNote: Dispatch<SetStateAction<string | null>>;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserFormValues>({
    values: { text: userDataText },
    resolver: yupResolver(UserFormSchema()),
  });

  const { onSubmit } = useChange(
    isEditing,
    setIsEditing,
    'notes',
    fetchUserData,
    reset,
    false,
    true,
    noteId,
    setSelectedNote,
  );

  const handleFormSubmit = (data: UserFormValues) => {
    onSubmit({ text: data.text as string });
  };

  return (
    <>
      {isEditing && (
        <div className={classes['form-wrapper']}>
          <form
            onSubmit={handleSubmit(handleFormSubmit)}
            className={`${classes['form-wrapper__form']} ${classes['form-wrapper__form--user-page']}`}
          >
            <fieldset>
              <div className={classes['field-wrapper']}>
                <div className={classes['field-wrapper']}>
                  <div className={classes['input-wrapper']}>
                    <label htmlFor="text" className={classes.label}>
                      text
                    </label>
                    <input
                      type="text"
                      {...register('text')}
                      placeholder="note text"
                      className={classes.input}
                    />
                  </div>
                  <p className={classes.error}>{errors.text?.message}</p>
                </div>
              </div>
            </fieldset>
            <div
              className={`${classes['form-wrapper__form-link-button-wrapper']} ${classes['form-wrapper__form-link-button-wrapper--left']}`}
            >
              <button
                onClick={() => {
                  setIsEditing(false);
                  setSelectedNote(null);
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
export default ChangeNote;
