import { Link } from 'react-router-dom';
import { createPortal } from 'react-dom';

import classes from './Modal.module.css';

interface Props {
  title: string;
  content: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  showModal?: boolean;
  modalOnClick: boolean;
  notFound?: boolean;
}

const Modal = ({
  title,
  content,
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
  showModal,
  modalOnClick,
  notFound,
}: Props) => {
  const handleBodyScroll = (showModal: boolean) => {
    document.body.style.overflow = showModal ? 'hidden' : 'auto';
  };
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
          {modalOnClick && (
            <>
              <button
                className={`${classes.modal__button} ${classes['modal__button--cancel']}`}
                onClick={() => {
                  handleBodyScroll(false);
                  modalOnClick && onCancel && onCancel();
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
            </>
          )}

          {!modalOnClick && (
            <>
              {!notFound && (
                <>
                  <button
                    className={`${classes.modal__button} ${classes['modal__button--cancel']}`}
                    onClick={() => {
                      handleBodyScroll(false);
                      window.location.reload();
                    }}
                  >
                    Refresh
                  </button>
                  <Link
                    className={`${classes.modal__button} ${classes['modal__button--confirm']}`}
                    to={'/login'}
                  >
                    Log in
                  </Link>
                </>
              )}

              {notFound && (
                <>
                  <Link
                    className={`${classes.modal__button} ${classes['modal__button--confirm']}`}
                    to={'/'}
                  >
                    Home
                  </Link>
                  <Link
                    className={`${classes.modal__button} ${classes['modal__button--confirm']}`}
                    to={'/login'}
                  >
                    Log in
                  </Link>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
  showModal && handleBodyScroll(showModal);
  return showModal ? createPortal(modal, document.body) : null;
};

export default Modal;
