import { Link, useLocation } from "react-router-dom";
import "./Navigation.css";
import crossMenu from "../../images/crossMenu.svg";
import AccountLink from "../AccountLink/AccountLink";

function Navigation({ openNav, setOpenNav }) {
  const location = useLocation().pathname;
  return (
    <div className={`navigation ${openNav && "navigation_opened"}`}>
      <div className="navigation__container">
        <nav className="navigation__links">
          <Link className={`navigation__link ${location === "/" && "navigation__link_active"}`} to="/">Главная</Link>
          <Link className={`navigation__link ${location === "/movies" && "navigation__link_active"}`} to="/movies">Фильмы</Link>
          <Link className={`navigation__link ${location === "/saved-movies" && "navigation__link_active"}`} to="/saved-movies">Сохранённые фильмы</Link>
        </nav>
        <nav className="navigation__links">
          <AccountLink />
        </nav>
        <img className="navigation__close" src={crossMenu} alt="Закрыть меню" onClick={() => setOpenNav(false)} />
      </div>
    </div>
  )
}

export default Navigation;
