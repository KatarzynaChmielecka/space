import axios from 'axios';
import { ToastContentProps, toast } from 'react-toastify';
import { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';

import AvatarEmail from '../AvatarEmail';
import ChangeNote from '../changeData/ChangeNote';
import Loader from '../Loader';
import Modal from '../Modal';
import Notes from '../Notes';
import SubmitNote from '../SubmitNote';
import useGet from '../../hooks/useGet';
import { AuthContext } from '../../context/auth-context';
import { Note, Response } from '../../types/interfaces';

const UserNotes = () => {
  const [selectedNote, setSelectedNote] = useState<string | null>(null);
  const [isEditingNote, setIsEditingNote] = useState<boolean>(false);
  const [isFullNote, setIsFullNote] = useState<boolean>(false);
  const [selectedFullNote, setSelectedFullNote] = useState<string | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [noteToDelete, setNoteToDelete] = useState<string | null>(null);
  const [isAddingNote, setIsAddingNote] = useState<boolean>(false);
  const paramsUserId = useParams().userId;

  const { token } = useContext(AuthContext);
  const { userData, setValue, fetchUserData, loading, error } = useGet();

  const handleEditNote = (note: Note) => {
    setValue('text', note.text);
    setSelectedNote(note._id);
    setIsEditingNote(true);
  };

  const onDelete = (id: string) => {
    setShowModal(true);
    setNoteToDelete(id);
  };

  const handleDeleteClick = async (id: string) => {
    await toast.promise(
      axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/user/${paramsUserId}/notes/${id}`,

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
            fetchUserData();
            setSelectedNote(null);
            return <p>Your note was removed. </p>;
          },
        },
        error: {
          render({
            data,
          }: ToastContentProps<{
            response: Response;
          }>) {
            setSelectedNote(null);
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

  document.body.style.overflow = 'auto';

  return (
    <div
    // style={{ outline: '1px solid red', overflowY: 'hidden', height: '100%' }}
    >
      {loading ? <Loader /> : null}

      <ChangeNote
        isEditing={isEditingNote}
        userDataText={
          userData?.user?.notes.find((note) => note._id === selectedNote)
            ?.text as string
        }
        setIsEditing={setIsEditingNote}
        fetchUserData={fetchUserData}
        noteId={selectedNote}
        selectedNote={selectedNote}
        setSelectedNote={setSelectedNote}
      />

      <SubmitNote
        isAddingNote={isAddingNote}
        setIsAddingNote={setIsAddingNote}
        fetchUserData={fetchUserData}
      />

      {!isAddingNote && userData && !isEditingNote && (
        <button onClick={() => setIsAddingNote(true)}>add note</button>
      )}
      {userData && (
        <AvatarEmail src={userData.user.avatar} email={userData.user.email} />
      )}
      <div
      // style={{
      //   background: '#ffffff1a',
      //   // maxHeight: '300px',
      //   height: '300px',
      //   overflowY: 'scroll',
      // }}
      >
        {userData &&
          !isEditingNote &&
          !isAddingNote &&
          userData.user.notes.map((note: Note) => (
            <Notes
              key={note._id}
              note={note}
              handleDeleteClick={handleDeleteClick}
              isFullNote={isFullNote}
              setIsFullNote={setIsFullNote}
              setSelectedFullNote={setSelectedFullNote}
              handleEditNote={() => handleEditNote(note)}
              onDelete={() => onDelete(note._id)}
              showModal={showModal}
              noteToDelete={noteToDelete}
              onCancel={() => setNoteToDelete(null)}
              selectedFullNote={selectedFullNote}
            />
          ))}
      </div>

      {error && (
        <Modal
          title="Something went wrong"
          content={
            error
              ? error
              : 'Time has gone or something weird went wrong. Please log in again or refresh page.'
          }
          modalOnClick={false}
          showModal={true}
        />
      )}
    </div>
  );
};
export default UserNotes;
