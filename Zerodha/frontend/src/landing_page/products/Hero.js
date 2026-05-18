import React from "react";
function Hero() {
  return (
    <div>
      <div className="container text-center border-bottom" style={{ padding: "100px 20px" }}>
        <h1
          className="mt-2"
          style={{
            fontSize: "28px",
            color: "#424242",
            fontFamily: "sans-serif",
            fontWeight: "500",
          }}
        >
          Zerodha Products
        </h1>
        <p
          className="mt-2"
          style={{
            fontSize: "20px",
            color: "#424242",
            fontFamily: "sans-serif",
          }}
        >
          Sleek, modern, and intuitive trading platforms
        </p>

        <p
          className="mt-2"
          style={{
            fontSize: "16px",
            color: "#424242",
            fontFamily: "sans-serif",
            fontWeight: "500",
          }}
        >
          Check out our{" "}
          <a href="" style={{ textDecoration: "none", fontWeight: "500" }}>
            investment offerings{" "}
            <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
          </a>
        </p>
      </div>
    </div>
  );
}
export default Hero;
