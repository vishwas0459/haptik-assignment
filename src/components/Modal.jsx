import React from "react";

export default function Modal({ title, onConfirm, onCancel, content }) {
  return (
    <div className="modal__wrapper">
      <h2 className="modal__heading">{title}</h2>
      <p className="modal__text">{content}</p>
      <button onClick={onConfirm} type="button" className="btn btn--primary">
        Confirm
      </button>
      <button onClick={onCancel} type="button" className="btn btn--secondary">
        Cancel
      </button>
    </div>
  );
}
