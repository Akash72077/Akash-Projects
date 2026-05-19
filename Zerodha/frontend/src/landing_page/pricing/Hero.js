import React from "react";
function Hero() {
  return (
    <div className="container">
      <div className="row p-5 mt-5 border-bottom text-center">
        <h1>Pricing</h1>
        <h3 className="text-muted mt-3 fs-5">
          Free equity investments and flat ₹20 traday and F&O trades
        </h3>
      </div>
      {/* the below code is used to show the pricing */}
      <div className="row p-5 mt-5 border-bottom">
        <div className="col-4 p-5 text-center">
          <img src="media/images/pricing0.svg" style={{ width: "70%" }} />
          <h2 className="text-center text-muted">Free equity delivery</h2>
          <p className="text-muted text-center mt-4">
            All equity delivery investments (NSE, BSE), are absolutely free — ₹
            0 brokerage.
          </p>
        </div>
        <div className="col-4 p-5 text-center">
          <img src="media/images/intradayTrades.svg" style={{ width: "70%", }} />
          <h2 className="text-center text-muted fs-3">Intraday and F&O trades</h2>
          <p className="text-muted text-center mt-4">
            Flat ₹ 20 or 0.03% (whichever is lower) per executed order on
            intraday trades across equity, currency, and commodity trades. Flat
            ₹20 on all option trades.
          </p>
        </div>
        <div className="col-4 p-5 text-center">
          <img src="media/images/pricing0.svg" style={{ width: "70%" }} />
          <h2 className="text-center text-muted">Free direct MF</h2>
          <p className="text-muted text-center mt-4">
            All direct mutual fund investments are absolutely free — ₹ 0
            commissions & DP charges.
          </p>
        </div>
      </div>
    </div>
  );
}
export default Hero;
