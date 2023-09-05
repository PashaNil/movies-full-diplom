import "./Promo.css";
import webEarth from "../../images/webEarth.svg"

function Promo() {
  return (
    <section className="promo">
      <img className="promo__img" src={webEarth} alt="Изображение планеты из слов web" />
      <h1 className="promo__title">Учебный проект студента факультета Веб&#8209;разработки.</h1>
      <p className="promo__subtitle">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
      <button
        className="promo__scroll"
        type="button"
        onClick={() => window.scrollTo(0, 700)}>
        Узнать больше
      </button>
    </section>
  );
}

export default Promo;
