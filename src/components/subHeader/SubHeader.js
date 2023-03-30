import Avengers from '../../img/Avengers.png';
import Avengers_logo from '../../img/Avengers_logo.png';

import '../../sass/style.sass'
import './subHeader.sass'

function SubHeader() {
  return (
    <div className="container banner__comics mt__50 flex__display_jc">
      <img src={Avengers} alt={Avengers} />
      <h2>New comics every week! <br/> Stay tuned!</h2>
      <img src={Avengers_logo} alt={Avengers_logo} />
    </div>
  )
}

export default SubHeader;