import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import useMarvelService from "../../services/MarvelService";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";
import Skeleton from "../skeleton/Skeleton";
import Form from "../form/Form";

import "../../sass/style.sass";
import "./characterInfo.sass";

const CharacterInfo = ({ characterId, scrolled }) => {
  const [character, setCharacter] = useState(null);

  const { loading, error, getCharacter, clearError } = useMarvelService();

  const onCharacterLoaded = (character) => {
    setCharacter(character);
  };

  const updateCharacter = () => {
    if (!characterId) return;

    clearError();

    getCharacter(characterId).then(onCharacterLoaded);
  };

  useEffect(() => {
    updateCharacter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [characterId]);

  const skeleton = character || loading || error ? null : <Skeleton />;
  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error || !character) ? <View character={character} /> : null;

  return (
    <div
      style={{ marginTop: `${scrolled >= 450 ? scrolled - 450 + 20 : 0}px` }}
      className="need_flex_style_if_use_itself"
    >
      <div className="character__info__active">
        {skeleton}
        {errorMessage}
        {spinner}
        {content}
      </div>
      <Form></Form>
    </div>
  );
};

const View = ({ character }) => {
  const { name, description, thumbnail, homepage, wiki, comics } = character;

  const show10Comics = comics.map((item, i) => {
    // eslint-disable-next-line array-callback-return
    if (i > 9) return; //limit 10 comics
    return (
      <li key={i}>
        <Link to={`/comics/${item.resourceURI.substring(43)}`}>{item.name}</Link>
      </li>
    );
  });

  return (
    <>
      <img src={thumbnail} alt={name} />
      <h2 className="character__info__active__h2">{name}</h2>
      <a href={homepage}>
        <button className="btn first__character__btn">HOMEPAGE</button>
      </a>
      <a href={wiki}>
        <button className="btn grey__btn second__character__btn">WIKI</button>
      </a>
      <p>{description}</p>
      <h3>Comics:</h3>
      <ul className="character__info__ul">
        {comics.length > 0 ? null : "There is no comics for that character"}
        {show10Comics}
      </ul>
    </>
  );
};

CharacterInfo.propTypes = {
  characterId: PropTypes.number,
};

export default CharacterInfo;
