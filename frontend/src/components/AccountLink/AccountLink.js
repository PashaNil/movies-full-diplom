import { Link } from "react-router-dom";
import "./AccountLink.css";
import accountIcon from "../../images/accountIcon.svg";
import accountIconBlack from "../../images/accountIconBlack.svg"

function AccountLink({ main }) {
  return (
    <Link className={`accountLink ${main && "accountLink_green"}`} to="/profile">
      Аккаунт
      <img
        className={`accountLink__icon ${main && "accountLink__icon_white"}`}
        src={main ? accountIconBlack : accountIcon}
        alt="Иконка аккантуа"
      />
    </Link>
  )
}

export default AccountLink;
