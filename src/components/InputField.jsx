import React from "react";

export default function InputField({
  name,
  onChange,
  onKeyPress,
  placeholder,
  value,
  error,
}) {
  return (
    <div className="input__wrapper">
      <input
        className={`input__text ${error ? "error-field" : ""}`}
        name={name}
        onChange={onChange}
        onKeyPress={onKeyPress}
        placeholder={placeholder}
        type="text"
        value={value}
        minLength={3}
        maxLength={15}
      />
      {error && <p className="input__error">{error}</p>}
    </div>
  );
}
