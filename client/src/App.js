import React from "react";
import "./stylesheets/sitewide.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import VideoList from "./pages/VideoList/VideoList";
import VideoPlayer from "./components/VideoPlayer/VideoPlayer";
import Navigation from "./components/Navigation/Navigation";
import Footer from "./components/Footer/Footer";

const App = () => (
  <Router>
    <Navigation />

    <div className="App">
      <Switch>
        <Route exact path="/" render={(props) => <VideoList {...props} />} />

        <Route
          exact
          path="/watch/:id"
          render={(props) => <VideoPlayer {...props} />}
        />
      </Switch>
    </div>

    <ToastContainer newestOnTop={true} />

    <Footer />
  </Router>
);

export default App;
