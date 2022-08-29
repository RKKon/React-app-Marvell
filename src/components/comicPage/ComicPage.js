import SubHeader from '../subHeader/SubHeader';
import Header from '../header/Header';
import useMarvelService from '../../services/MarvelService';

import x_men from '../../img/x-men.png';

import "../../sass/style.sass"
import './comicPage.sass'

const ComicPage = (props) => {

  return(
    <div className="comicPage">

      <Header></Header>
      <SubHeader></SubHeader>

      <div className="container flex__display">
        <div className="comic__img">
          <img src={x_men} alt={x_men} />
        </div>
        <div className="comic__text">
          <div className="container flex__display_jc">
            <h2>X-Men: Days of Future Past</h2>
            <a href="#">Back to all</a>
          </div>  
          <p>Re-live the legendary first journey into the dystopian future of 2013 - where Sentinels stalk the Earth, and the X-Men are humanity's only hope...until they die! Also featuring the first appearance of Alpha Flight, the return of the Wendigo, the history of the X-Men from Cyclops himself...and a demon for Christmas!?</p>
          <p className="mb__25">144 pages</p>
          <p className="mb__25">Language: en-us</p>
          <a href="#" className="mb__25 comic__price">9.99$</a>
        </div> 
      </div>
    </div>
  )
}

export default ComicPage;