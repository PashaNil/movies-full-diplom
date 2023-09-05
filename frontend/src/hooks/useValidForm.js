import React, { useCallback } from "react";
import { regExInputName, regExInputEmail } from "../utils/regularExpressions";

//хук управления формой и валидации формы
function useFormWithValidation() {
  const [values, setValues] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);

  const handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    setValues({ ...values, [name]: value });
    customValidMsg(target, name, value)
    setIsValid(target.closest("form").checkValidity());
  };

  const customValidMsg = (target, name, value) => {
    if (value.length === 0) {
      target.setCustomValidity("Это обязательно поле")
    } else if (name === "name" && !value.match(regExInputName)) {
      target.setCustomValidity("Имя может содержать от 2 до 30 знаков, пробелы и дефисы")
    } else if (name === "email" && !value.match(regExInputEmail)) {
      target.setCustomValidity("Некорректный Email. Пример: user@movies.com")
    } else {
      target.setCustomValidity("")
    }
    setErrors({ ...errors, [name]: target.validationMessage });
  }

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );



  return { values, handleChange, errors, isValid, resetForm };
}

export { useFormWithValidation };
