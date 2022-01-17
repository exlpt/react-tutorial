import styleClasses from "../../styles/layout/Layout.module.css";

import MainNav from "./MainNav.js";

function Layout(props) {
	/* Defines the layout of all pages */
  return (
    <div>
      <nav>
        <MainNav />
      </nav>
      <main className={styleClasses.main}>{props.children}</main>
    </div>
  );
}

export default Layout;
