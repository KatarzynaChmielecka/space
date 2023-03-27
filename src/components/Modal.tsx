import { createPortal } from 'react-dom';

import classes from './Modal.module.css';

interface Props {
  title: string;
  content: string;
  confirmText: string;
  cancelText: string;
  onConfirm: () => void;
  onCancel: () => void;
  showModal: boolean;
}

const Modal = ({
  title,
  content,
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
  showModal,
}: Props) => {
  // const handleBodyScroll = (showModal: boolean) => {
  //   document.body.style.overflow = showModal ? 'hidden' : 'auto';
  // };
  const modal = (
    <div className="modal">
      <div
        className={classes.modal__overlay}
        onClick={onCancel}
        onKeyDown={onCancel}
        role="button"
        tabIndex={0}
      />

      <div className={classes.modal__content}>
        <div className={classes['modal__content-header']}>
          <h1 className={classes.modal__title}>{title}</h1>
          <h2 className={classes.modal__text}>{content}</h2>
        </div>
        <div className={classes.modal__buttons}>
          <button
            className={`${classes.modal__button} ${classes['modal__button--cancel']}`}
            onClick={() => {
              // handleBodyScroll(false);
              onCancel();
            }}
          >
            {cancelText}
          </button>
          <button
            className={`${classes.modal__button} ${classes['modal__button--confirm']}`}
            onClick={onConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
  // handleBodyScroll(showModal);
  return showModal ? createPortal(modal, document.body) : null;
};

export default Modal;
