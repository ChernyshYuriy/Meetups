import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";

import AllMeetupsPage from "./pages/AllMeetups";
import FavoritesPage from "./pages/Favorites";
import NewMeetup from "./pages/NewMeetup";
import EditMeetup from "./pages/EditMeetup";
import Layout from "./components/layout/Layout";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<AllMeetupsPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/new-meetup" element={<NewMeetup />} />
        <Route path="/edit" element={<EditMeetup />} />
      </Routes>
    </Layout>
  );
}

export default App;
