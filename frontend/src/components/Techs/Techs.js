import "./Techs.css";
import MainTitleLine from "../MainTitleLine/MainTitleLine.js";

function Techs() {
  return (
    <section className="techs">
      <MainTitleLine text={"Технологии"} />
      <h2 className="techs__title">7 технологий</h2>
      <p className="techs__subtitle">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
      <ul className="techs__technologies">

        <li>
          <p className="techs__technology">HTML</p>
        </li>
        <li>
          <p className="techs__technology">CSS</p>
        </li>
        <li>
          <p className="techs__technology">JS</p>
        </li>
        <li>
          <p className="techs__technology">React</p>
        </li>
        <li>
          <p className="techs__technology">Git</p>
        </li>
        <li>
          <p className="techs__technology">Express.js</p>
        </li>
        <li>
          <p className="techs__technology">mongoDB</p>
        </li>

      </ul>
    </section>
  )
}

export default Techs;
