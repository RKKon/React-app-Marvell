import { Link, NavLink } from "react-router-dom";
import { useState } from "react";

import "../../sass/style.sass";
import "./header.sass";

function Header() {
  const [itemActive, setItemActive] = useState(0);

  const changeMenuItem = (index) => setItemActive(index);

  return (
    <header className="container pt__50 flex__display_jc header_media">
      <span className="fsize__28">
        <Link to="/React-app-Marvell" className="fsize__28 colored__letters">
          Marvel
        </Link>{" "}
        information portal
      </span>
      <nav className="fsize__24 mt__4">
        <NavLink
          end
          to="/React-app-Marvell"
          className={`fsize__24 ${itemActive === 0 ? "colored__letters" : ""}`}
          onClick={() => changeMenuItem(0)}
        >
          Characters
        </NavLink>
        <NavLink
          to="/comics"
          className={`fsize__24 ${itemActive === 1 ? "colored__letters" : ""}`}
          onClick={() => changeMenuItem(1)}
        >
          {" "}
          / Comics
        </NavLink>
      </nav>
    </header>
  );
}

export default Header;
