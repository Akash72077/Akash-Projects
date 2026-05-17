import React from "react";
function Team() {
  return (
    <div className="container">
      <div className="row p-5 mt-5 mb-5 "></div>
      <div
        className="row p-5 mt-5 "
        style={{
          lineHeight: "1.8",
          fontSize: "16px",
          color: "#424242",
          marginBottom: "15px",
          fontFamily: "sans-serif",
        }}
      >
        <h2 style={{ textAlign: "center", color: "#424242", marginLeft:"2.5rem", fontSize:"24px" }}>People</h2>
        <div className="col-6 p-5 text-center" >
          <img
            src="media/images/nithinKamath.jpg"
            alt="Image not Found"
            style={{
              borderRadius: "50%",
              maxWidth: "100%",
              height: "295px",
              marginLeft: "20px",
            }}
          ></img>
          <h5 style={{color:"#424242",fontSize:"18px" , fontFamily:"sans-serif", } } className="mt-3">Nithin Kamath</h5>
          <p style={{color:"#666666",fontSize:"14.4px" , fontFamily:"sans-serif"} } >Founder, CEO</p>
        </div>

        <div className="col-6 p-5" style={{ marginLeft: "-90px" }}>
          <p>
            Nithin bootstrapped and founded Zerodha in 2010 to overcome the
            hurdles he faced during his decade long stint as a trader. Today,
            Zerodha has changed the landscape of the Indian broking industry.
          </p>
          <p>
            He is a member of the SEBI Secondary Market Advisory Committee
            (SMAC) and the Market Data Advisory Committee (MDAC).
          </p>
          <p>Playing basketball is his zen.</p>
          <p>
            Connect on{" "}
            <a href="" className="about-para">
              Homepage
            </a>{" "}
            /{" "}
            <a href="" className="about-para">
              TradingQnA
            </a>{" "}
            /{" "}
            <a href="" className="about-para">
              Twitter
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
export default Team;