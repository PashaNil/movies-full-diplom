import React from "react";
import "./Form.css";
import Logo from "../Logo/Logo.js";
import { Link } from "react-router-dom";

function Form({
  title,
  btnText,
  children,
  errorMsg,
  questionText,
  linkText,
  linkTo,
  handleInput,
  handleSubmit,
  isValid,
  preloaderStatus
}) {

  return (
    <div className="form">
      <Logo />
      <h1 className="form__title">{title}</h1>
      <form className="form__form" noValidate onChange={handleInput} onSubmit={handleSubmit}>
        <fieldset className="form__fieldset">
          {children}
        </fieldset>
        <p className="form__error">{errorMsg}</p>
        <button
          className={`form__btn ${!isValid || preloaderStatus ? "form__btn_disabled" : ""}`}
          disabled={!isValid || preloaderStatus}
          type="submit">
          {btnText}
        </button>
      </form>
      <p className="form__question">
        {questionText}
        <Link className="form__link" to={linkTo}>{linkText}</Link>
      </p>
    </div>
  )
}

export default Form;
