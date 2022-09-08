import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';

import useMarvelService from '../../../services/MarvelService';
import ErrorMessage from '../../errorMessage/ErrorMessage';
import Spinner from '../../spinner/Spinner';
import SubHeader from '../../subHeader/SubHeader';

import '../../../sass/style.sass'
import './SingleCharacterPage.sass'

function SingleCharacterPage(props) {
  const {characterId} = useParams();
  const [characterPage, setCharacterPage] = useState(null)

  const {loading, error, getCharacter, clearError} = useMarvelService();

  const onComicLoaded = (characterPage) => {
    setCharacterPage(characterPage)
  }

  const updateComic = () => {
    clearError();
    getCharacter(characterId)
      .then(onComicLoaded)
  }

  useEffect(() => {
    updateComic();
  }, [characterId])

  const errorMessage = error ? <ErrorMessage></ErrorMessage> : null;
  const spinner = loading ? <Spinner></Spinner> : null;
  const content = !(loading || error || !characterPage) ? <View characterPage={characterPage}></View> : null;

  return (
    <>
      {errorMessage}
      {spinner}
      {content}
      </>
  )
}

const View = ({characterPage}) => {
  const {name, description, thumbnail} = characterPage
  return (
    
    <div className="CharacterPage">
      <Helmet>
        <meta
        name="description"
        content={`${name}`}
        />
        <title>{name}</title>
      </Helmet>
      <SubHeader></SubHeader>

      <div className="container flex__display ">
        <div className="character_img">
          <img src={thumbnail} alt={name} />
        </div>
        <div className="character_text">
          <h2>{name}</h2>
          <p>{description}</p>
        </div>  
      </div> 

    </div>
  )
}

export default SingleCharacterPage;