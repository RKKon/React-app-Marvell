import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import useMarvelService from '../../services/MarvelService'
import ErrorMessage from '../errorMessage/ErrorMessage'
import Spinner from '../spinner/Spinner'

import '../../sass/style.sass'
import './charactersList.sass'

const setContent = (process, Component, newItemLoading) => {
  switch (process) {
    case 'waiting': 
      return <Spinner/>
    case 'loading': 
      return newItemLoading ? <Component/> : <Spinner/>
    case 'confirmed': 
      return <Component/>
    case 'error': 
      return <ErrorMessage/>
    default: 
      throw new Error('Unexpected process state')
  }
}

const CharactersList = (props) => {
  const [charactersList, setCharactersList] = useState([]);
  const [newItemLoading, setNewItemLoading] = useState(false);
  const [offset, setOffset] = useState(211);
  const [charEnded, setCharEnded] = useState(false);

  const {loading, error, getAllCharacters, process, setProcess} = useMarvelService();

  const onRequest = (offset, initial) => { // отрисовывает extra characters on click etc. 
    initial ? setNewItemLoading(false)  : setNewItemLoading(true)
    getAllCharacters(offset)
      .then(onCharactersListLoaded)
      .then(() => setProcess('confirmed'))
  }

  useEffect(() => { onRequest(offset, true) }, []) // отрисовывает characters when create page

  const onCharactersListLoaded = (newCharactersList) => {
    let ended = false;
    if (newCharactersList.length < 9) { ended = true; }

    setCharactersList(charactersList => [...charactersList, ...newCharactersList])
    setNewItemLoading(newItemLoading => false)
    setOffset(offset => offset + 9)
    setCharEnded(charEnded => ended)
  }

  const itemRefs = useRef([])
  const focusOnItem = id => {
    itemRefs.current.forEach(item => item.classList.remove('card__active'));
    itemRefs.current[id].classList.add('card__active');
    itemRefs.current[id].focus();
  }

  // чтобы не помещать такую конструкцию в метод render/return
  function renderItems(arr) {
    const items = arr.map((item, i) => {
      let imgStyle = {'objectFit' : 'cover'}
      if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        // eslint-disable-next-line
        imgStyle = {'objectFit' : 'unset'}
      }
      return (
        <li className={`characters__card`} tabIndex={0} key={item.id} 
        ref={el => itemRefs.current[i] = el}  
        onClick={() => {
          props.onCharacterSelected(item.id);
          focusOnItem(i);
          }}
          onKeyPress={e => {
            if (e.key === ' ' || e.key === 'Enter') {
              props.onCharacterSelected(item.id);
              focusOnItem(i);
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

  // const items = renderItems(charactersList);
  // const errorMessage = error ? <ErrorMessage /> : null;
  // const spinner = loading && !newItemLoading ? <Spinner /> : null;


  return (
    <div className="characters">
        {setContent(process, () =>  renderItems(charactersList), newItemLoading )}
        {/* {errorMessage}
        {spinner}
        {items} */}
      <button disabled={newItemLoading} 
              onClick={() => onRequest(offset)}
              style={{'display': charEnded ? 'none' : 'block'}} 
              className="btn btn__load__more">LOAD MORE</button>
    </div>
  )
}

CharactersList.protoTypes = {
  onCharacterSelected: PropTypes.number
}

export default CharactersList;