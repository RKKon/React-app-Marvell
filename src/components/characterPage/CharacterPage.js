import SubHeader from '../subHeader/SubHeader';
import Header from '../header/Header';

import loki from '../../img/Characters/loki.png'

import '../../sass/style.sass'
import './characterPage.sass'

function CharacterPage() {
  return (
    <div className='CharacterPage'>
      
      <Header></Header>
      <SubHeader></SubHeader>

      <div className="container flex__display ">
        <div className="character_img">
          <img src={loki} alt={loki} />
        </div>
        <div className="character_text">
          <h2>Loki</h2>
          <p>In Norse mythology, Loki is a god or jötunn (or both). Loki is the son of Fárbauti and Laufey, and the brother of Helblindi and Býleistr. By the jötunn Angrboða, Loki is the father of Hel, the wolf Fenrir, and the world serpent Jörmungandr. By Sigyn, Loki is the father of Nari and/or Narfi and with the stallion Svaðilfari as the father, Loki gave birth—in the form of a mare—to the eight-legged horse Sleipnir. In addition, Loki is referred to as the father of Váli in the Prose Edda.</p>
        </div>  
      </div>
      
    </div>   
  )
}

export default CharacterPage;