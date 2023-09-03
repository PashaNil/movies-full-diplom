import "./AboutProject.css";
import MainTitleLine from "../MainTitleLine/MainTitleLine.js";

function AboutProject() {
  return (
    <section className="about-project">
      <MainTitleLine text={"О проекте"} />
      <ul className="about-project__table">
        <li>
          <h3 className="about-project__table-title">Дипломный проект включал 5 этапов</h3>
          <p className="about-project__table-text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </li>
        <li>
          <h3 className="about-project__table-title">На выполнение диплома ушло 5 недель</h3>
          <p className="about-project__table-text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </li>
      </ul>

      <ul className="about-project__timeline">
        <li>
          <p className="about-project__timeline-text-one">1 неделя</p>
        </li>
        <li>
          <p className="about-project__timeline-text-four">4 недели</p>
        </li>
        <li>
          <p className="about-project__timeline-text-development">Back-end</p>
        </li>
        <li>
          <p className="about-project__timeline-text-development">Front-end</p>
        </li>
      </ul>

    </section>
  );
};

export default AboutProject;
