import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';

import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import SubHeader from '../subHeader/SubHeader';

import "../../sass/style.sass"
import './SingleComicPage.sass'

const SingeComic = (props) => {
  const {comicId} = useParams();
  const [comic, setComic] = useState(null)

  const {loading, error, getComic, clearError} = useMarvelService();

  const onComicLoaded = (comic) => {
    setComic(comic)
  }

  const updateComic = () => {
    clearError();
    getComic(comicId)
      .then(onComicLoaded)
  }

  useEffect(() => {
    updateComic();
  }, [comicId])

  const errorMessage = error ? <ErrorMessage></ErrorMessage> : null;
  const spinner = loading ? <Spinner></Spinner> : null;
  const content = !(loading || error || !comic) ? <View comic={comic}></View> : null;

  return(
    <>
      {errorMessage}
      {spinner}
      {content}
    </>
  )
}

const View = ({comic}) => {
  const {title, description, thumbnail, language, pages, price} = comic
  return (
    
    <div className="comicPage">
      <Helmet>
        <meta
        name="description"
        content={`${title} comics book`}
        />
        <title>{title}</title>
      </Helmet>
      <SubHeader></SubHeader>

      <div className="container flex__display single_comics_media">
        <div className="comic__img">
          <img src={thumbnail} alt={title} />
        </div>
        <div className="comic__text">
          <div className="container flex__display_jc">
            <h2>{title}</h2>
            <Link to='/comics'>Back to all</Link>
          </div>  
          <p>{description}</p>
          <p className="mb__25">{pages}</p>
          <p className="mb__25">Language: {language}</p>
          <p className="mb__25 comic__price">{price}</p>
        </div> 
      </div>
    </div>
  )
}

export default SingeComic;