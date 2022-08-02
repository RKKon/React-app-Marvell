import React, { Component } from 'react';
import PropTypes from 'prop-types';

import MarvelService from '../../services/MarvelService'
import ErrorMessage from '../errorMessage/ErrorMessage'
import Spinner from '../spinner/Spinner'

import '../../sass/style.sass'
import './charactersList.sass'

class CharactersList extends Component {
  state = {
    charactersList: [],
    loading: true,
    error: false,
    newItemLoading: false,
    offset: 210,
    charEnded: false,
    
  }

  marvelService = new MarvelService();

  myRef = React.createRef();
  //componentDidMount() { this.myRef.current.focus(); }
  /* ref={this.myRef} */

  componentDidMount() {
    this.onRequest();
  } // отрисовывает characters when create page

  onRequest = (offset) => { // отрисовывает extra characters on click etc. 
    this.onCharacterListLoading()
    this.marvelService.getAllCharacters(offset)
      .then(this.onCharactersListLoaded)
      .catch(this.onError)
  }

  onCharacterListLoading = () => { this.setState({newItemLoading: true}) }

  onCharactersListLoaded = (newCharactersList) => {
    let ended = false;
    if (newCharactersList.length < 9) { ended = true; }

    this.setState(({offset, charactersList}) => ({
        charactersList: [...charactersList, ...newCharactersList], 
        loading: false,
        newItemLoading: false,
        offset: offset + 9,
        charEnded: ended,
    }))
  }

  onError = () => {
    this.setState({
      loading: false,
      error: true
    })
  }

  itemRefs = []
  setRef = ref => { this.itemRefs.push(ref)}
  focusOnItem = id => {
    this.itemRefs.forEach(item => item.classList.remove('card__active'));
    this.itemRefs[id].classList.add('card__active');
    this.itemRefs[id].focus();
  }

  // чтобы не помещать такую конструкцию в метод render
  renderItems(arr) {
    const items = arr.map((item, i) => {
      let imgStyle = {'objectFit' : 'cover'}
      if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = {'objectFit' : 'unset'}
      }
      return (
        <li className={`characters__card`} tabIndex={0} ref={this.setRef } key={item.id} 
        onClick={() => {
          this.props.onCharacterSelected(item.id);
          this.focusOnItem(i);
          }}
          onKeyPress={e => {
            if (e.key === ' ' || e.key === 'Enter') {
              this.props.onCharacterSelected(item.id);
              this.focusOnItem(i);
            }
          }}>
          <img src={item.thumbnail} alt={item.name} />
          <h2>{item.name}</h2>
        </li>
      )

    }) 
    return (
      <ul className="flex__display__content contetnt__container mb__50">
        {items}
      </ul>
    )
  }

  
  render() {
    const {charactersList, loading, error, newItemLoading, offset, charEnded} = this.state;

    const items = this.renderItems(charactersList);
    const errorMessage = error ? <ErrorMessage></ErrorMessage> : null;
    const spinner = loading ? <Spinner></Spinner> : null;
    const content = !(loading || error) ? items : null;

    return (
      <div className="characters">
        {/* <ul className="flex__display__content contetnt__container mb__50"> */}
          {errorMessage}
          {spinner}
          {content}
        {/* </ul> */}
        <button disabled={newItemLoading} onClick={() => this.onRequest(offset)}
        style={{'display': charEnded ? 'none' : 'block'}} className="btn btn__load__more">LOAD MORE</button>
      </div>
    )
  }
}

CharactersList.protoTypes = {
  onCharacterSelected: PropTypes.number
}

export default CharactersList;