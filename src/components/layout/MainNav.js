import styleClasses from "../../styles/layout/MainNav.module.css";

import { Link } from "react-router-dom";
import { useContext } from "react";

import FavoritesContext from "../../store/favorites-context";

function MainNav() {
	const favoritesContext = useContext(FavoritesContext);
	
  return (
    <header className={styleClasses.header}>
      <div className={styleClasses.logo}>Meetups</div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>

          <li>
            <Link to="/new-meetup">New Meetup</Link>
          </li>

          <li>
            <Link to="/favorites">Favorites <span className={styleClasses.badge}>{favoritesContext.totalFavorites}</span></Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNav;
