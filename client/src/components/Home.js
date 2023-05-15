import React from "react";
// import Layout from "./Layout";
import Login from "./Login";

import '../styles/Home.css';

const Home = () => {
  return (
    <div className="home-page">
      <div className="title">
        <div className="app-name">Mending</div>
        {/* replace with image of our app logo */}
      </div>
      <Login />
    </div>
  );
};

export default Home;