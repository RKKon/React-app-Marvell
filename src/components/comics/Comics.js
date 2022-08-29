import { useState, useEffect} from 'react';

import SubHeader from '../subHeader/SubHeader';
import Header from '../header/Header';
import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';

import "../../sass/style.sass"
import './comics.sass'
import Spinner from '../spinner/Spinner';

const Comics = (props) => {
  const [comicsList, setComicsList] = useState([]);
  const [newComicsLoading, setNewComicsLoading] = useState(false);
  const [offset, setOffset] = useState(5);
  const [comicsEnded, setComicsEnded] = useState(false);

  const {loading, error, getAllComics} = useMarvelService();

  const onRequest = (offset, initial) => { // отрисовывает extra characters on click etc.
    initial ? setNewComicsLoading(false) : setNewComicsLoading(true)
    getAllComics(offset)
    .then(onComicsListLoaded)
  }

  useEffect(() => onRequest(offset, true), []);// отрисовывает comics when created page

  const onComicsListLoaded = (newComicsList) => {
    let ended = false;
    if (newComicsList.length < 8) { ended = true; }

    setComicsList(comicsList => [...comicsList, ...newComicsList])
    setNewComicsLoading(newComicsLoading => false)
    setOffset(offset => offset + 8)
    setComicsEnded(comicsEnded => ended)
  }

  // чтобы не помещать такую конструкцию в метод render/return
  const renderItems = (arr) => {
    const comics = arr.map((item, i) => {
      let imgStyle = {'objectFit' : 'cover'}
      if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        // eslint-disable-next-line
        imgStyle = {'objectFit' : 'unset'}
      }

      return (
        <li tabIndex={0} key={item.id} className="comics__card">
          <a href="#">
            <img src={item.thumbnail} alt={item.title}   />
            <h2>{item.title} </h2>
            <p>{item.price} </p>
          </a>
        </li>
      )
    })

    return (
      <ul className="flex__display comics__flex__display__wrap">
        {comics}
      </ul>
    )
  }

  const comics = renderItems(comicsList);
  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading && !newComicsLoading ? <Spinner /> : null;

  return (
    <div className="comics">
      <Header></Header>
      <SubHeader></SubHeader>
      {errorMessage}
      {spinner}

      <div className="container">
        {comics}

        <button onClick={() => onRequest(offset)}
                disabled={newComicsLoading}
                //style={{'display': comicsEnded ? 'none' : 'block'}}
                className="btn btn__comics__load__more">LOAD MORE</button>
      </div>
    </div>
  )
}

export default Comics;