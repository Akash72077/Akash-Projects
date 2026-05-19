import React from "react";
function Universe() {
  const imageStyle = {
    width: "180px",
    height: "60px",
    objectFit: "contain",
  };

  return (
    <div className="container " style={{ padding: "80px 20px 0px 20px" }}>
      <div className="row text-center">
        <h2
          style={{
            fontSize: "24px",
            color: "#424242",
            fontFamily: "sans-serif",
            padding: "0px 0px 20px",
            fontWeight: "400",
          }}
        >
          The Zerodha Universe
        </h2>
        <p
          style={{
            fontSize: "16px",
            color: "#424242",
            fontFamily: "sans-serif",
            margin: "12px 0px ",
          }}
        >
          Extend your trading and investment experience even further with our
          partner platforms
        </p>
        <div className="col-4 p-3 mb-5">
          <img src="media/images/smallcaseLogo.png" style={imageStyle} />
          <p
            className=" text-muted mt-3"
            style={{
              fontSize: "12px ",
              fontFamily: "sans-serif",
            }}
          >
            Thematic investing platform that helps you invest in diversified
            baskets of stocks on ETFs.
          </p>
        </div>

        <div className="col-4 p-3 mb-5">
          <img src="media/images/streakLogo.png" style={imageStyle} />
          <p
            className="text-muted mt-3"
            style={{
              fontSize: "12px ",
              fontFamily: "sans-serif",
            }}
          >
            Systematic trading platform that allows you to create and backtest
            strategies without coding.
          </p>
        </div>
        <div className="col-4 p-3 mb-5">
          <img src="media/images/sensibullLogo.svg" style={imageStyle} />
          <p
            className="text-muted mt-3"
            style={{
              fontSize: "12px ",
              fontFamily: "sans-serif",
            }}
          >
            Options trading platform that lets you create strategies, analyze
            positions, and examine data points like open interest, FII/DII, and
            more.
          </p>
        </div>
        <div className="col-4 p-3 mt-2">
          <img src="media/images/zerodhaFundhouse.png" style={imageStyle} />
          <p
            className="text-muted mt-3"
            style={{
              fontSize: "12px ",
              fontFamily: "sans-serif",
            }}
          >
            Our asset management venture that is creating simple and transparent
            index funds to help you save for your goals.
          </p>
        </div>

        <div className="col-4 p-3  mt-2">
          <img src="media/images/goldenpiLogo.png" style={imageStyle} />
          <p
            className="text-muted mt-3"
            style={{
              fontSize: "12px ",
              fontFamily: "sans-serif",
            }}
          >
            Personalized advice on life and health insurance. No spam and no
            mis-selling. Sign up for free
          </p>
        </div>
        <div className="col-4 p-3  mt-2">
          <img src="media/images/dittoLogo.png" style={imageStyle} />
          <p
            className="text-muted mt-3"
            style={{
              fontSize: "12px ",
              fontFamily: "sans-serif",
            }}
          >
            Options trading platform that lets you create strategies, analyze
            positions, and examine data points like open interest, FII/DII, and
            more.
          </p>
        </div>
        <button className="signup-btn">Sign up for free</button>
      </div>
    </div>
  );
}
export default Universe;
