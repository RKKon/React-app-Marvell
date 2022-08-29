import { Link, NavLink } from 'react-router-dom';

import '../../sass/style.sass'
import './header.sass'

function Header() {
  return (
    <header className="container pt__50 flex__display_jc">
      <span className="fsize__28">
        <Link to="/" className="fsize__28 colored__letters">Marvel</Link> information portal
      </span>  
      <nav className="fsize__24 mt__4">
        <NavLink exact activeClassName='colored__letters' to="/" className="fsize__24">Characters</NavLink> 
        <NavLink exact activeClassName='colored__letters' to='/comics' className="fsize__24"> / Comics</NavLink>
      </nav>
    </header>
  )
}

export default Header;