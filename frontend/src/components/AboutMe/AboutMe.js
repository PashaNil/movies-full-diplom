import "./AboutMe.css";
import MainTitleLine from "../MainTitleLine/MainTitleLine.js";
import Portfolio from "../Portfolio/Portfolio";
import imgStudent from "../../images/imgStudent.jpg"

function AboutMe() {
  return (
    <section className="aboutMe">
      <MainTitleLine text={"Студент"} />
      <img className="aboutMe__student-img" src={imgStudent} alt="Фотография студента" />
      <h2 className="aboutMe__student-name">Павел</h2>
      <p className="aboutMe__student-job">Фронтенд-разработчик, 28 лет</p>
      <p className="aboutMe__student-description">
      Я&nbsp;родился и&nbsp;живу в&nbsp;Пскове, обучался по&nbsp;направлениям &laquo;Информационные технологии&raquo; и&nbsp;&laquo;Управление персоналом&raquo;, работал в&nbsp;итоге фотографом и&nbsp;вокалистам в&nbsp;cover-band коллективе. Увлекаюсь плаваньем в&nbsp;бассейне, музыкальными инструментами и&nbsp;путешествиями. Со&nbsp;временем понял, что хочу работать по&nbsp;диплому и&nbsp;решил пройти курс по&nbsp;веб-разработке, узнал много нового и&nbsp;теперь стремлюсь стать полноценным разработчиком.
      </p>
      <a
        className="aboutMe__student-github-link"
        href="https://github.com/PashaNil"
        target="_blank"
        rel="noreferrer"
      >Github</a>
      <Portfolio />
    </section>
  );
}

export default AboutMe;
