import '../../sass/style.sass'
import './header.sass'

function Header() {
  return (
    <header className="container pt__50 flex__display_jc">
      <span className="fsize__28"><span className="fsize__28 colored__letters">Marvel</span> information portal</span>  
      <span className="fsize__24 mt__4"><span className="fsize__24 colored__letters">Characters </span>/ Comics</span>
    </header>
  )
}

export default Header;