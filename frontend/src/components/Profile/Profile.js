import React from "react";
import "./Profile.css";
import Header from "../Header/Header.js";

import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useFormWithValidation } from "../../hooks/useValidForm";
import { regExInputName, regExInputEmail } from "../../utils/regularExpressions";
import { handlingErrorProfile } from "../../utils/HandlingErrorMsg";

function Profile(
  {
    loggedIn,
    errorCodeForm,
    handleUpdateProfile,
    handleLogOut,
    preloaderStatus
  }
) {

  // Доступ к контексту данных пользователя
  const currentUser = React.useContext(CurrentUserContext)

  // Хук валидации формы
  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();

  // Cброс на дефотные значения формы
  React.useEffect(() => {
    resetForm(currentUser)
  }, [currentUser, resetForm])

  // Сброс валидации если данные не изменились
  React.useEffect(() => {
    if (currentUser.name === values.name && currentUser.email === values.email) {
      resetForm(currentUser, {}, false)
    }
  }, [values, currentUser, resetForm])

  //Функция сабмита формы
  const handleSubmit = (e) => {
    e.preventDefault()
    handleUpdateProfile(values);
  }

  return (
    <>
      <Header loggedIn={loggedIn} />
      <main className="profile">
        <h1 className="profile__title">Привет,&nbsp;{currentUser.name}!</h1>
        <form className="profile__form" noValidate onSubmit={handleSubmit} onChange={handleChange}>

          <label className="profile__label" htmlFor="name">
            Имя
            <input
              className="profile__input"
              type="text"
              id="name"
              name="name"
              placeholder={currentUser.name}
              minLength="2"
              maxLength="30"
              pattern={regExInputName}
              title="Имя может содержать от 2 до 30 знаков, пробелы и дефисы"
              required
              defaultValue={currentUser.name}
              disabled={preloaderStatus}
            />
            <span className="profile__input-error">{errors.name}</span>
          </label>
          <label className="profile__label" htmlFor="email">
            E-mail
            <input
              className="profile__input"
              type="email"
              id="email"
              name="email"
              placeholder={currentUser.email}
              minLength="2"
              maxLength="30"
              pattern={regExInputEmail}
              title="Email должен состоять из латинских символов. Пример user@adress.ru"
              required
              defaultValue={currentUser.email}
              disabled={preloaderStatus}
            />
            <span className="profile__input-error profile__input-error_email">{errors.email}</span>
          </label>
          <p className="profile__error-form">{errorCodeForm && handlingErrorProfile(errorCodeForm)}</p>
          <button
            className={`profile__btn ${!isValid || preloaderStatus ? "profile__btn_disabled" : ""}`}
            type="submit"
            disabled={!isValid}
          >
            Редактировать
          </button>
          <button className="profile__btn-exit" type="button" onClick={handleLogOut}>Выйти из аккаунта</button>
        </form>
      </main>
    </>
  )
}

export default Profile;
