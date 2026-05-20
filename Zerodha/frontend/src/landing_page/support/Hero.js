import React from "react";

const Hero = () => {
  return (
    <section className="container-fluid" id="supportHero">
      {/* Top Navbar */}
      <div className="pt-5" id="supportWrapper">
        <h4>Support Portal</h4>

        <a href="/" className="fs-5">Track Tickets</a>
      </div>
      {/* Main Content */}
      <div className="row mt-5 px-5">
        {/* Left Section */}
        <div className="col-6" style={{ paddingLeft: "120px" }}>
          <h3
            style={{
              lineHeight: "1.6",
              fontWeight: "400",
              marginBottom: "30px",
            }}
          >
            Search for an answer or browse help topics
            <br />
            to create a ticket
          </h3>

          <input
            type="text"
            placeholder="Eg: how do i activate F&O, why is my order getting rejected..."
            style={{
              width: "90%",
              padding: "18px",
              borderRadius: "5px",
              border: "none",
              marginBottom: "25px",
              fontSize: "15px",
            }}
          />

          <div
            style={{
              display: "flex",
              gap: "20px",
              flexWrap: "wrap",
              width: "90%",
            }}
          >
            <a href="/">Track account opening</a>

            <a href="/">Track segment activation</a>

            <a href="/">Intraday margins</a>

            <a href="/">Kite user manual</a>
          </div>
        </div>

        {/* Right Section */}
        <div className="col-6" style={{ paddingLeft: "80px" }}>
          <h4 style={{ marginBottom: "20px" }}>Featured</h4>

          <ol style={{ lineHeight: "2" }}>
            <li>
              <a href="/">Current Takeovers and Delisting – January 2024</a>
            </li>

            <li>
              <a href="/">Latest Intraday leverages – MIS & CO</a>
            </li>
          </ol>
        </div>
      </div>
    </section>
  );
};

export default Hero;
