import React from "react";
import { useLocation } from "react-router";
import "./SearchForm.css";
import searchFormIcon from "../../images/searchFormIcon.svg";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

import { regExInputSearch } from "../../utils/regularExpressions";

function SearchForm(
  {
    submit,
    setErrorCodeMovie,
    checkBoxStatus,
    handleCheckBox
  }
) {
  const location = useLocation().pathname === "/movies";

  // Стейт поля ввода
  const [inputValue, setInputValue] = React.useState("");

  // Выгрузка данных input с локалки исходя от адресса сайта
  React.useEffect(() => {
    if (location) {
      localStorage.search && setInputValue(JSON.parse(localStorage.getItem("search")))
    }
  }, [location]);

  // Функция самбита
  function handleSubmit(e) {
    e.preventDefault()
    if (!inputValue.match(regExInputSearch)) {
      setErrorCodeMovie(400);
    } else {
      submit(inputValue);
    }
  }

  // Слушатель поля ввода
  const handleChange = (e) => setInputValue(e.target.value);

  return (
    <section className="searchForm">
      <form className="searchForm__form" noValidate onSubmit={handleSubmit}>
        <input
          className="searchForm__input"
          type="text"
          name="movie"
          id="movie"
          placeholder={`Фильм`}
          value={inputValue}
          required
          onChange={handleChange}
        />
        <button className="searchForm__btn">
          <img className="searchForm__img-btn" src={searchFormIcon} alt="Кнопка поиска" />
        </button>
      </form>
      <div className="searchForm__filter-container">
        <p className="searchForm__filter-caption">Короткометражки</p>
        <FilterCheckbox
          handleCheckBox={handleCheckBox}
          checkBoxStatus={checkBoxStatus}
        />
      </div>
    </section>
  )
}

export default SearchForm;
