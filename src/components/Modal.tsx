interface Props {
  title: string;
  content: string;
  confirmText: string;
  cancelText: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const Modal = ({
  title,
  content,
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
}: Props) => {
  return (
    <div className="modal">
      <div
        className="modal__overlay"
        onClick={onCancel}
        onKeyDown={onCancel}
        role="button"
        tabIndex={0}
      />
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <p className="modal__text">{content}</p>
        <div className="modal__buttons">
          <button
            className="modal__button modal__button--confirm"
            onClick={onConfirm}
          >
            {confirmText}
          </button>
          <button
            className="modal__button modal__button--cancel"
            onClick={onCancel}
          >
            {cancelText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
