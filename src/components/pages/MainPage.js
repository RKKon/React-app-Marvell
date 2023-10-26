import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";

import RandomCharacterInfo from "../randomCharacterInfo/RandomCharacterInfo";
import CharactersList from "../charactersList/CharactersList";
import CharacterInfo from "../characterInfo/CharacterInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

import "../../sass/style.sass";
import "../app/app.sass";

import bg_man from "../../img/bg_asset.png";

const MainPage = () => {
  const [selectedCharacter, SetSelectedCharacter] = useState(null);

  const onCharacterSelected = (id) => SetSelectedCharacter(id);

  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    const checkCurScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition >= 410) {
        setScroll(scrollPosition);
      }
    };

    window.addEventListener("scroll", checkCurScroll, { passive: true });

    return () => window.removeEventListener("scroll", checkCurScroll);
  }, []);
  return (
    <>
      <Helmet>
        <meta name="description" content="Web site created using create-react-app" />
        <title>React app Marvell</title>
      </Helmet>
      <ErrorBoundary>
        <RandomCharacterInfo />
      </ErrorBoundary>
      <div className="container mt__20 flex__display character_overlay_media">
        <ErrorBoundary>
          <CharactersList onCharacterSelected={onCharacterSelected} />
        </ErrorBoundary>
        <ErrorBoundary>
          <CharacterInfo scrolled={scroll} characterId={selectedCharacter} />
        </ErrorBoundary>
      </div>
      <img className="bg__man" src={bg_man} alt={bg_man} />
    </>
  );
};

export default MainPage;
