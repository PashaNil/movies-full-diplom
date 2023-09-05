import "./Login.css";
import Form from "../Form/Form.js";
import Input from "../Input/Input.js";

import { useFormWithValidation } from "../../hooks/useValidForm";
import { handlingErrorSignIn } from "../../utils/HandlingErrorMsg";

function Login({ handleLogin, errorCodeForm, preloaderStatus }) {

  // Хук валидации формы
  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();

  //Функция сабмита формы
  const handleSubmit = (e) => {
    e.preventDefault()
    if (isValid) {
      handleLogin(values);
      resetForm(values);
    }
  }

  return (
    <main className="login">
      <Form
        title={"Рады видеть!"}
        btnText={"Войти"}
        errorMsg={handlingErrorSignIn(errorCodeForm)}
        questionText={"Ещё не зарегистрированы?"}
        linkText={"Регистрация"}
        linkTo={"/signup"}
        handleInput={handleChange}
        handleSubmit={handleSubmit}
        isValid={isValid}
        preloaderStatus={preloaderStatus}
      >
        <Input
          labelText={"E-mail"}
          type={"email"}
          id={"email"}
          name={"email"}
          errValid={errors.email}
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

export default Login;
