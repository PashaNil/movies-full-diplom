import "./Logo.css";
import logoHeader from "../../images/logoHeader.svg";
import { Link } from "react-router-dom";

function Logo() {
  return (
    <Link className="logo" to="/">
      <img className="logo__img" src={logoHeader} alt="Логотип" />
    </Link>
  )
}

export default Logo;
