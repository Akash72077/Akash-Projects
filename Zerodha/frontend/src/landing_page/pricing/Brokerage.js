import React from "react";

function Brokerage() {
  return (
    <div className="container">
      <div className="row p-5 mt-5  text-center">
        <div className="col-8 p-4 ">
          <h3 className="fs-4"  style={{color:"#387ED1"}}>
            <a href="" style={{ textDecoration: "none" }}>
              Brokerage calculator
            </a>
          </h3>
          <ul className="text-muted" style={{textAlign:"left"}}>
            <li>
              Call & Trade and RMS auto-squareoff: Additional charges of ₹50 +
              GST per order.
            </li>
            <li>Digital contract notes will be sent via e-mail.</li>
            <li>
              Physical copies of contract notes, if required, shall be charged
              ₹20 per contraa=ct note. Courier charges apply.
            </li>
            <li>
              For NRI account (non-PIS), 0.5% or &#8377;100 per executed order
              for equity (whichever is lower.){" "}
            </li>
            <li>
              For NRI account (PIS), 0.5% or &#8377;200 per executed order for
              equity (whichever is lower.){" "}
            </li>
            <li>
              if the account is in debit balance, any order place will be
              charged &#8377;40 per executed order instead of &#8377;20 per
              executed order.
            </li>
          </ul>
        </div>
        <div className="col-4 p-4 ">
          <h3 className="fs-4" style={{color:"#387ED1"}}>
            <a href="" style={{ textDecoration: "none" }}>
              List of charges
            </a>
          </h3>
        </div>
      </div>
    </div>
  );
}
export default Brokerage;
