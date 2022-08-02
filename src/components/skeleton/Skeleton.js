import { Component } from 'react';

import './Skeleton.sass'
import '../../sass/style.sass'

class Skeleton extends Component {
  render() {
    return (
      <div className="character__search">
      <h2>Please select a character to see information</h2>
      <div className="skeleton">
          <div className="pulse skeleton__header">
              <div className="pulse skeleton__circle"></div>
              <div className="pulse skeleton__mini"></div>
          </div>
          <div className="pulse skeleton__block"></div>
          <div className="pulse skeleton__block"></div>
          <div className="pulse skeleton__block"></div>
      </div>    
    </div> 
    )
  }
}

export default Skeleton;

