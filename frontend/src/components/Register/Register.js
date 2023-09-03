import React from "react";
import "./Register.css";
import Form from "../Form/Form";
import Input from "../Input/Input";

import { useFormWithValidation } from "../../hooks/useValidForm";
import { regExInputName, regExInputEmail } from "../../utils/regularExpressions";
import { handlingErrorSignUp } from "../../utils/HandlingErrorMsg";

function Register({ handleRegister, errorCodeForm, preloaderStatus }) {
  // Хук валидации формы
  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();

  //Функция сабмита формы
  const handleSubmit = (e) => {
    e.preventDefault()
    if (isValid) {
      handleRegister(values);
      resetForm(values);
    }
  }

  return (
    <main className="register">
      <Form
        title={"Добро пожаловать!"}
        btnText={"Зарегистрироваться"}
        errorMsg={handlingErrorSignUp(errorCodeForm)}
        questionText={"Уже зарегистрированы?"}
        linkText={"Войти"}
        linkTo={"/signin"}
        handleInput={handleChange}
        handleSubmit={handleSubmit}
        isValid={isValid}
        preloaderStatus={preloaderStatus}
      >
        <Input
          labelText={"Имя"}
          type={"text"}
          id={"name"}
          name={"name"}
          errValid={errors.name}
          pattern={regExInputName}
          titlePattern={"Имя может содержать от 2 до 30 знаков, пробелы и дефисы"}
          preloaderStatus={preloaderStatus}
        />
        <Input
          labelText={"E-mail"}
          type={"email"}
          id={"email"}
          name={"email"}
          errValid={errors.email}
          pattern={regExInputEmail}
          titlePattern={"Email должен состоять из латинских символов. Пример user@adress.ru"}
          preloaderStatus={preloaderStatus}
        />
        <Input
          labelText={"Пароль"}
          type={"password"}
          id={"password"}
          name={"password"}
          errValid={errors.password}
          preloaderStatus={preloaderStatus}
        />
      </ Form>
    </main>
  )
}

export default Register;
