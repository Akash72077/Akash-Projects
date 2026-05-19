import React from 'react';
import Brokerage from "./Brokerage";
import Hero from "./Hero";
import OpenAccount from '../OpenAccount';

function PricingPage() {
    return ( 
        <>
        <Hero/>
         {/* start of the signup */}
        <div className="container p-5">
      <div className="row text-center border-bottom">
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
    {/* End of the signup */}
        <Brokerage/>
        </>
     );
}

export default PricingPage;