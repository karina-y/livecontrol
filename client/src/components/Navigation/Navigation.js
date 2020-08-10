import React from "react";
import "./Navigation.scss";
import { Link } from "react-router-dom";

const Navigation = () => (
  <div className="Navigation">
    <Link to={"/"}>
      <img src="/images/logo.png" title="LiveControl" alt="navigation logo" />
    </Link>
  </div>
);

export default Navigation;
