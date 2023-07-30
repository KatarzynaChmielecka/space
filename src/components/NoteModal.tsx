import { createPortal } from 'react-dom';

import classes from './NoteModal.module.css';

const NoteModal = ({
  date,
  text,
  onCancel,
}: {
  date: string;
  text: string;
  onCancel: () => void;
}) => {
  document.body.style.overflow = 'hidden';
  const modal = (
    <div className={classes['note-modal']}>
      <div
        className={classes['note-modal__overlay']}
        onClick={onCancel}
        onKeyDown={onCancel}
        role="button"
        tabIndex={0}
      />
      <div className={classes['note-modal__content']}>
        <h6 className={classes['note-modal__date']}>DATE: {date}</h6>
        <p className={classes['note-modal__text']}>{text}</p>
        <button className={classes['note-modal__back']} onClick={onCancel}>
          BACK
        </button>
      </div>
    </div>
  );
  return createPortal(modal, document.body);
};
export default NoteModal;
