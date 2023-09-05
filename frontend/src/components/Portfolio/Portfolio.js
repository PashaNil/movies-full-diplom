import "./Portfolio.css";
import imgArrowPortfolio from "../../images/imgArrowPortfolio.svg"

function Portfolio() {
  return (
    <div className="portfolio">
      <h3 className="portfolio__title">Портфолио</h3>
      <nav className="portfolio__links">
        <a className="portfolio__link" href="https://pashanil.github.io/mesto" target="_blank" rel="noreferrer">
          Статичный сайт
          <img className="portfolio__link-img" src={imgArrowPortfolio} alt="навигационная стрелка" />
        </a>

        <a className="portfolio__link" href="https://pashanil.github.io/russian-travel" target="_blank" rel="noreferrer">
          Адаптивный сайт
          <img className="portfolio__link-img" src={imgArrowPortfolio} alt="навигационная стрелка" />
        </a>

        <a className="portfolio__link" href="https://pashanil.github.io/mesto" target="_blank" rel="noreferrer">
          Одностраничное приложение
          <img className="portfolio__link-img" src={imgArrowPortfolio} alt="навигационная стрелка" />
        </a>
      </nav>
    </div>
  );
}

export default Portfolio;
