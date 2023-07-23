import { Dispatch, SetStateAction } from 'react';

import Edit from '../assets/shared/edit.png';
import Modal from './Modal';
import NoteModal from './NoteModal';
import Remove from '../assets/shared/delete.png';
import classes from './Notes.module.css';
import { Note } from '../types/interfaces';
import { formatDate } from '../utils/formateDate';

interface NotesProps {
  note: Note;
  handleDeleteClick: (id: string) => void;
  setIsFullNote: Dispatch<SetStateAction<boolean>>;
  setSelectedFullNote: Dispatch<SetStateAction<string | null>>;
  handleEditNote: () => void;
  onDelete: () => void;
  showModal: boolean;
  noteToDelete: string | null;
  onCancel: () => void;
  isFullNote: boolean;
  selectedFullNote: string | null;
}
const Notes = ({
  note,
  handleDeleteClick,
  setIsFullNote,
  setSelectedFullNote,
  handleEditNote,
  onDelete,
  showModal,
  noteToDelete,
  onCancel,
  isFullNote,
  selectedFullNote,
}: NotesProps) => {
  return (
    <div className={classes.note} style={{ width: '1090px', display: 'flex' }}>
      <span className={classes['note__date']}>
        {formatDate(note.createdAt)}
      </span>

      <div
        className={classes['note__text-wrapper']}
        style={{ position: 'relative' }}
      >
        <p
          className={classes['note__text']}
          style={{
            width: '250px',
            whiteSpace: 'nowrap' /* Zapobiega zawijaniu tekstu na nową linię */,
            overflow: 'hidden' /* Ukrywa tekst, który nie mieści się w divie */,
            textOverflow:
              'ellipsis' /* Dodaje "..." na końcu, jeśli tekst jest zbyt długi */,
          }}
        >
          {note.text}
        </p>
        <button
          className={classes['note__full-button']}
          tabIndex={0}
          onClick={() => {
            setIsFullNote(true);
            setSelectedFullNote(note._id);
          }}
          onKeyDown={() => setIsFullNote(true)}
          style={{
            position: 'absolute',
            width: '100%',
            top: 0,
            outline: 'none',
            opacity: '0',
          }}
        >
          Full
        </button>
      </div>
      <div className={classes['note__buttons-wrapper']}>
        <button
          onClick={handleEditNote}
          style={{ border: 'none', background: 'none' }}
        >
          <img src={Edit} alt="Edit note icon" />
        </button>
        <button
          onClick={onDelete}
          style={{ border: 'none', background: 'none' }}
        >
          <img src={Remove} alt="Remove note icon" />
        </button>
      </div>
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
          onCancel={onCancel}
          modalOnClick={true}
        />
      )}
      {isFullNote && selectedFullNote === note._id && (
        <NoteModal
          date={formatDate(note.createdAt)}
          text={note.text}
          onCancel={() => setIsFullNote(false)}
        />
      )}
    </div>
  );
};
export default Notes;
