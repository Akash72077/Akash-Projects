import React from "react";

function Hero() {
  return (
    //p-5 is a class in bootstrap which provides padding of 5%
    <div className="container p-5">
      <div className="row text-center">
        {/* //mb-5 is a class in bootstrap which provides margin buttom of 5% */}
        <img
          src="media/images/homeHero.png"
          alt="Hero image"
          className="mb-5"
        />

        <h1 className="mt-5">Invest in everything</h1>
        <p className="p-2">
          Online platform to invest in stocks, derivatives, mutual funds, and
          more
        </p>
        <button
          // p-2 is padding 2% fs is font size
          className="p-2 btn btn-primary fs-5 mb-5"
          style={{ width: "15%", margin: "0 auto" }}
        >
          Signup Now
        </button>
      </div>
    </div>
  );
}

export default Hero;
