import { useState, useEffect } from 'react';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import setContent from '../../utils/setContent';

import Decoration from '../../img/subHeader/Decoration.png';

import '../../sass/style.sass'
import './RandomCharacterInfo.sass'

const RandomCharacterInfo = (props) => {
  const [character, setCharacter] = useState({})

  const {loading, error, getCharacter, clearError, process, setProcess} = useMarvelService();

  useEffect(() => {
    updateCharacter()
    //timerId = setInterval(updateCharacter, 6000)
    //return () => clearInterval(timerId)
  }, []);

  const onCharacterLoaded = (character) => {
    // setLoading(false)
    // setError(false)
    setCharacter(character)
  }

  //const onCharacterLoading = () => setLoading(true)
  // const onError = () => {
  //   setLoading(false)
  //   setError(true)
  // }
  
  const updateCharacter = () => {
    clearError();
    const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
    getCharacter(id)
      .then(onCharacterLoaded)
      .then(() => setProcess('confirmed'))
  }
  

  // const errorMessage = error ? <ErrorMessage></ErrorMessage> : null;
  // const spinner = loading ? <Spinner></Spinner> : null;
  // const content = !(loading || error) ? <View character={character}></View> : null;

  return (
    <div className="sub__header mt__50">
      <div className="container flex__display">
        <div className="info__block flex__display">
          {setContent(process, View, character)}
          {/* {errorMessage}
          {spinner}
          {content} */}
        </div>
        <div className="random__character__block">
          <h2>Random character for today! <br /> 
              Do you want to get to know him better?</h2>
          <h3>Or choose another one</h3>
          <button onClick={updateCharacter} className="btn">TRY IT</button>
          <img src={Decoration} alt='mjolnir' />
        </div>   
      </div>
    </div>
  )  
}

const View = ({data}) => {
  const {name, description, thumbnail, homepage, wiki} = data;
  return (
    <div className="info__block flex__display">
      <div>
          <img className='random__character__main__img' src={thumbnail} alt='Random character' />
      </div>
      <div>
          <h2>{name}</h2>
          <p>{description}</p>
          <a href={homepage}><button className="btn">HOMEPAGE</button></a>
          <a href={wiki}><button className="btn grey__btn">WIKI</button></a>
      </div>
    </div>
  )
}

export default RandomCharacterInfo;