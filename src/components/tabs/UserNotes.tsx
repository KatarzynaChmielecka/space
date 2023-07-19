import axios from 'axios';
import { ToastContentProps, toast } from 'react-toastify';
import { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';

import ChangeNote from '../changeData/ChangeNote';
import Loader from '../Loader';
import Modal from '../Modal';
import SubmitNote from '../SubmitNote';
import useGet from '../../hooks/useGet';
import { AuthContext } from '../../context/auth-context';
import { Response } from '../../types/interfaces';

interface Note {
  _id: string;
  createdAt: string;
  text: string;
}

const UserNotes = () => {
  const [selectedNote, setSelectedNote] = useState<string | null>(null);
  const [isEditingNote, setIsEditingNote] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [noteToDelete, setNoteToDelete] = useState<string | null>(null);
  const [isAddingNote, setIsAddingNote] = useState<boolean>(false);
  const paramsUserId = useParams().userId;

  const { token } = useContext(AuthContext);
  const { userData, setValue, fetchUserData, loading } = useGet();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}.${month}.${day}`;
  };

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
    <>
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

      {!isAddingNote && (
        <button onClick={() => setIsAddingNote(true)}>add note</button>
      )}

      {userData &&
        !isEditingNote &&
        !isAddingNote &&
        userData.user.notes.map((note: Note) => (
          <div key={note._id} style={{ width: '1090px', display: 'flex' }}>
            <span>{formatDate(note.createdAt)}</span>

            <p>{note.text}</p>
            <div>
              <button onClick={() => handleEditNote(note)}>Edit</button>
              <button onClick={() => onDelete(note._id)}>Remove</button>

              {showModal && noteToDelete === note._id && (
                <Modal
                  title="Deleting note"
                  content="Are you sure?"
                  confirmText="Delete"
                  cancelText="Cancel"
                  showModal={showModal}
                  onConfirm={() => {
                    handleDeleteClick(note._id);
                  }}
                  onCancel={() => setNoteToDelete(null)}
                  modalOnClick={true}
                />
              )}
            </div>
          </div>
        ))}
    </>
  );
};
export default UserNotes;
