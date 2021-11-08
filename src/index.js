import React from "react";
import ReactDOM from "react-dom";
// import { BrowserRouter as Routes, Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";

// import AllMeetupsPage from "./pages/AllMeetups";
// import FavoritesPage from "./pages/Favorites";
// import NewMeetup from "./pages/NewMeetup";
import "./index.css";
import App from "./App";
import { FavoritesContextProvider } from "./store/favorites";

ReactDOM.render(
  <FavoritesContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </FavoritesContextProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
