import SubHeader from '../subHeader/SubHeader';
import Header from '../header/Header';

import x_men from '../../img/x-men.png';
import UW from '../../img/UW.png';

import "../../sass/style.sass"
import './comics.sass'

function Comics() {
  return (
    <div className="comics">

      <Header></Header>
      <SubHeader></SubHeader>

      <div className="container">
        <div className="flex__display comics__flex__display__wrap">
          <a href="#" className="comics__card">
              <img src={UW} alt={UW} />
              <h2>ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB</h2>
              <p>9.99$</p>
          </a>
          <a href="#" className="comics__card">
              <img src={x_men} alt={x_men} />
              <h2>X-Men: Days of Future Past</h2>
              <p>NOT AVAILABLE</p>
          </a>
          <a href="#" className="comics__card">
              <img src={UW} alt={UW} />
              <h2>ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB</h2>
              <p>9.99$</p>
          </a>
          <a href="#" className="comics__card">
              <img src={x_men} alt={x_men} />
              <h2>X-Men: Days of Future Past</h2>
              <p>NOT AVAILABLE</p>
          </a>          
          <a href="#" className="comics__card">
              <img src={UW} alt={UW} />
              <h2>ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB</h2>
              <p>9.99$</p>
          </a>
          <a href="#" className="comics__card">
              <img src={x_men} alt={x_men} />
              <h2>X-Men: Days of Future Past</h2>
              <p>NOT AVAILABLE</p>
          </a>          
          <a href="#" className="comics__card">
              <img src={UW} alt={UW} />
              <h2>ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB</h2>
              <p>9.99$</p>
          </a>
          <a href="#" className="comics__card">
              <img src={x_men} alt={x_men} />
              <h2>X-Men: Days of Future Past</h2>
              <p>NOT AVAILABLE</p>
          </a>
        </div>

        <button className="btn btn__comics__load__more">LOAD MORE</button>
      </div>

    </div>
  )
}

export default Comics;