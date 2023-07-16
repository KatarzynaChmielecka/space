import * as Yup from 'yup';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import classes from '../../pages/Form.module.css';
import useGet from '../../hooks/useGet';
import { AuthContext } from '../../context/auth-context';

interface Note {
  _id: string;
  createdAt: string;
  text: string;
}

interface UserFormValues {
  text: string;
}

const UserFormSchema = () =>
  Yup.object({
    note: Yup.string()
      .min(20, 'Note should have at least 20 chars.')
      .required('Note is required.'),
  });
const UserNotes = () => {
  const {
    userData,
    // error, fetchUserData, loading
  } = useGet();
  // const [note, setNote] = useState('');
  const { token } = useContext(AuthContext);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UserFormValues>({
    resolver: yupResolver(UserFormSchema()),
    // values: { text: selectedNote?.text || '' },
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}.${month}.${day}`;
  };

  const handleEditNote = (note: Note) => {
    setValue('text', note.text);
    setSelectedNote(note);
  };

  const handleCloseModal = () => setSelectedNote(null);

  const handleFormSubmit = () => console.log('test');
  return (
    <>
      {selectedNote && (
        <div className={classes['form-wrapper']}>
          <form
            onSubmit={handleSubmit(handleFormSubmit)}
            className={`${classes['form-wrapper__form']} ${classes['form-wrapper__form--user-page']}`}
          >
            <fieldset className={classes['fieldset-password']}>
              <div className={classes['field-wrapper']}>
                <div className={classes['input-wrapper']}>
                  <label htmlFor="note" className={classes.label}>
                    Note
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
            </fieldset>
            <div
              className={`${classes['form-wrapper__form-link-button-wrapper']} ${classes['form-wrapper__form-link-button-wrapper--left']}`}
            >
              <button
                onClick={() => setSelectedNote(null)}
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
      {userData &&
        !selectedNote &&
        userData.user.notes.map((note: Note) => (
          <div key={note._id} style={{ width: '1090px', display: 'flex' }}>
            <span>{formatDate(note.createdAt)}</span>

            <p>{note.text}</p>
            <div>
              <button onClick={() => handleEditNote(note)}>Edit</button>
              <button onClick={() => console.log(note)}>Remove</button>
              {/* {selectedNote && selectedNote._id === note._id && (
                <div className="modal">
                  <div className="modal-content">
                    <form
                    // onSubmit={handleUpdateNote}
                    >
                      <input
                        {...register('text')}
                        defaultValue={selectedNote.text}
                      />
                      <button type="submit">Save</button>
                      <button onClick={handleCloseModal}>Close</button>
                    </form>
                  </div>
                </div>
              )} */}
            </div>
          </div>
        ))}
    </>
  );
};
export default UserNotes;
