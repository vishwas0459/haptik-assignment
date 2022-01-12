import React from "react";

export default function Modal({ title, onConfirm, onCancel, content }) {
  return (
    <div className="modal__wrapper" data-testid="confirm-modal">
      <h2 className="modal__heading">{title}</h2>
      <p className="modal__text">{content}</p>
      <button
        onClick={onConfirm}
        type="button"
        className="btn btn--primary"
        data-testid="confirm-btn"
      >
        Confirm
      </button>
      <button
        onClick={onCancel}
        type="button"
        className="btn btn--secondary"
        data-testid="cancel-btn"
      >
        Cancel
      </button>
    </div>
  );
}
