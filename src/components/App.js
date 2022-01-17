import { Route, Routes } from "react-router-dom";

import PageAllMeetups from "../pages/AllMeetups.js";
import PageNewMeetup from "../pages/NewMeetup.js";
import PageFavorites from "../pages/Favorites.js";
import Layout from "./layout/Layout.js";

function App() {
  return (
		/* Pass page into <Layout> element (<Layout> handles the rest)*/
    <Layout>
      <Routes>
        <Route exact path="/" element={<PageAllMeetups />} />
        <Route exact path="/new-meetup" element={<PageNewMeetup />} />
        <Route exact path="/favorites" element={<PageFavorites />} />
      </Routes>
    </Layout>
  );
}

export default App;
