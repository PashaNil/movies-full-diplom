import Promo from "../Promo/Promo.js";
import Header from "../Header/Header.js"
import AboutProject from "../AboutProject/AboutProject.js";
import Techs from "../Techs/Techs.js";
import AboutMe from "../AboutMe/AboutMe.js";
import Footer from "../Footer/Footer.js"

function Main({ loggedIn }) {
  return (
    <>
      <Header loggedIn={loggedIn} />
      <main>
        <Promo />
        <AboutProject />
        <Techs />
        <AboutMe />
      </main>
      <Footer />
    </>
  );
}

export default Main;
