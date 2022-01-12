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
        minLength={4}
        maxLength={15}
        data-testid="input-name"
      />
      {error && (
        <p data-testid="error-msg" className="input__error">
          {error}
        </p>
      )}
    </div>
  );
}
