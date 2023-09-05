import React from "react";
import "./Input.css";

function Input({
  labelText,
  type,
  id,
  name,
  errValid,
  preloaderStatus
}) {

  return (
    <label className="input" htmlFor={id}>
      {labelText}
      <input
        className="input__input"
        type={type}
        id={id}
        name={name}
        placeholder={labelText}
        required
        minLength="2"
        maxLength="30"
        disabled={preloaderStatus}
      />
      <span className="input__error">{errValid}</span>
    </label>
  )
}

export default Input;
