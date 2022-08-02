import { Component } from 'react';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import Decoration from '../../img/subHeader/Decoration.png';

import '../../sass/style.sass'
import './RandomCharacterInfo.sass'

class RandomCharacterInfo extends Component {
  state = {
    character: {},
    loading: true,
    error: false
  }
  marvelService = new MarvelService();

  componentDidMount() {
    this.updateCharacter();
    //this.timerId = setInterval(this.updateCharacter, 3000)
  }

  componentWillUnmount() { clearInterval(this.timerId); }

  onCharacterLoading = () => this.setState({loading: true})

  onCharacterLoaded = (character) => {
    this.setState({
      character, 
      loading: false,
    })
  }

  onError = () => {
    this.setState({
      loading: false,
      error: true
    })
  }
  
  updateCharacter = () => {
    const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
    this.onCharacterLoading()
    this.marvelService
      .getCharacter(id)
      .then(this.onCharacterLoaded)
      .catch(this.onError)
  }
  
  putCharactersOnPage = () => {
    const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
    this.marvelService
    .getAllCharacters(id)
    .then(this.onCharacterLoaded)
    .catch(this.onError)
  }


  render() {
    const {character, loading, error} = this.state;
    const errorMessage = error ? <ErrorMessage></ErrorMessage> : null;
    const spinner = loading ? <Spinner></Spinner> : null;
    const content = !(loading || error) ? <View character={character}></View> : null;

    return (
      <div className="sub__header mt__50">
        <div className="container flex__display">
          <div className="info__block flex__display">
            {errorMessage}
            {spinner}
            {content}
          </div>
          <div className="random__character__block">
            <h2>Random character for today! <br /> 
                Do you want to get to know him better?</h2>
            <h3>Or choose another one</h3>
            <button onClick={this.updateCharacter} className="btn">TRY IT</button>
            <img src={Decoration} alt={Decoration} />
          </div>   
        </div>
      </div>
    )
  }
  
}

const View = ({character}) => {
  const {name, description, thumbnail, homepage, wiki} = character;
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