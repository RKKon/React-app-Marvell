import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Form from '../form/Form';
import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import Skeleton from '../skeleton/Skeleton'

import '../../sass/style.sass'
import './characterInfo.sass'

const CharacterInfo = (props) => {
  const [character, setCharacter] = useState(null);

  const {loading, error, getCharacter, clearError} = useMarvelService();

  const onCharacterLoaded = (character) => {
    setCharacter(character)
  }

  const updateCharacter = () => {
    const {characterId} = props;
    if (!characterId) { return; }
    clearError();

    getCharacter(characterId)
      .then(onCharacterLoaded)
  }

  useEffect(() => {
    updateCharacter();
  },[props.characterId])

  const skeleton = character || loading || error ? null : <Skeleton></Skeleton>;
  const errorMessage = error ? <ErrorMessage></ErrorMessage> : null;
  const spinner = loading ? <Spinner></Spinner> : null;
  const content = !(loading || error || !character) ? <View character={character}></View> : null;
  return (
    <div className='need_flex_style_if_use_itself'>
      <div className="character__info__active">
        {skeleton}
        {errorMessage}
        {spinner}
        {content}
      </div>
      <Form></Form>
    </div>
  )
}

const View = ({character}) => {
  const {name, description, thumbnail, homepage, wiki, comics} = character;
  return (
    <>
      <img src={thumbnail} alt={name} />
      <h2 className="character__info__active__h2">{name}</h2>
      <a href={homepage}><button className="btn first__character__btn">HOMEPAGE</button></a>
      <a href={wiki}><button className="btn grey__btn second__character__btn">WIKI</button></a>
      <p>{description}</p>
      <h3>Comics:</h3>
      <ul className='character__info__ul'>
        {comics.length > 0 ? null : 'There is no comics for that character'}
        {
          comics.map((item, i) => {
            // eslint-disable-next-line
            if (i > 9) return; //limit 10 comics
            return (
              <li key={i}><a href="#">{item.name}</a></li>
            )
          })
        }       
      </ul>
    </>
  )
}

CharacterInfo.propTypes = {
  characterId: PropTypes.number 
}

export default CharacterInfo;