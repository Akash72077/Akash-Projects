import React from 'react';
function OpenAccount() {
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

        <h1 className="mt-5">Open a Zerodha account</h1>
        <p className="p-2 text-muted">
          Modern platforms and apps, ₹0 investments, and flat
          ₹20 intraday and F&O trades
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

export default OpenAccount;