import React from "react";

export default function Button({ type = "button", onClick, content }) {
  return (
    <button type={type} onClick={onClick}>
      {content}
    </button>
  );
}
