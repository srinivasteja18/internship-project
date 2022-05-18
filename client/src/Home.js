import React from "react";
import { Link } from "react-router-dom";
import Base from "./core/Base";
import animationData from "./anims/anim.json";
import Lottie from "react-lottie";

const Home = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <>
      <Base className="middle-section" title="" description="">
        <div className="home-container">
          <div className="home-div">
            <h1>Welcome</h1>
            <h3>Please Schedule and Appointment</h3>
            <Link to="/appointment/create" className="link-button">
              Schedule your Appointment
            </Link>
          </div>
          <div className="home-anim-div">
            <Lottie
              className="lottie-anim"
              width="400px"
              height="400px"
              options={defaultOptions}
            />
          </div>
        </div>
      </Base>
    </>
  );
};

export default Home;
