import React from "react";

const CreateTicket = () => {
  const linkStyle = {
    textDecoration: "none",
    color: "#387ED1",
    fontSize: "15px",
    lineHeight: "1.8",
  };

  return (
    <div className="container" style={{ padding: "80px 20px" }}>
      {/* Heading */}
      <div className="text-center mb-5">
        <h2 className="fw-bold">To create a ticket, select a relevant topic</h2>
      </div>

      {/* Cards Row */}
      <div className="row g-4 mb-5">
        {/* Column 1 */}
        <div className="col-lg-4 col-md-6 col-12">
          <div className="border rounded p-4 h-100 shadow-sm">
            <h4 className="mb-4">
              <i class="fa fa-plus-circle" aria-hidden="true"></i> Account
              Opening
            </h4>

            <p>
              <a href="#" style={linkStyle}>
                Online Account Opening
              </a>
            </p>
            <p>
              <a href="#" style={linkStyle}>
                Offline Account Opening
              </a>
            </p>
            <p>
              <a href="#" style={linkStyle}>
                Company, Partnership and HUF Account
              </a>
            </p>
            <p>
              <a href="#" style={linkStyle}>
                NRI Account Opening
              </a>
            </p>
            <p>
              <a href="#" style={linkStyle}>
                Charges At Zerodha
              </a>
            </p>
            <p>
              <a href="#" style={linkStyle}>
                Zerodha IDFC FIRST Bank 3-in-1 Account
              </a>
            </p>
            <p>
              <a href="#" style={linkStyle}>
                Getting Started
              </a>
            </p>
          </div>
        </div>

        {/* Column 2 */}
        <div className="col-lg-4 col-md-6 col-12">
          <div className="border rounded p-4 h-100 shadow-sm">
            <h4 className="mb-4">
              <i class="fa fa-user" aria-hidden="true"></i> Your Zerodha Account
            </h4>

            <p>
              <a href="#" style={linkStyle}>
                Login Credentials
              </a>
            </p>
            <p>
              <a href="#" style={linkStyle}>
                Account Modification and Segment Addition
              </a>
            </p>
            <p>
              <a href="#" style={linkStyle}>
                DP ID and Bank Details
              </a>
            </p>
            <p>
              <a href="#" style={linkStyle}>
                Your Profile
              </a>
            </p>
            <p>
              <a href="#" style={linkStyle}>
                Transfer and Conversion of Shares
              </a>
            </p>
          </div>
        </div>

        {/* Column 3 */}
        <div className="col-lg-4 col-md-12 col-12">
          <div className="border rounded p-4 h-100 shadow-sm">
            <h4 className="mb-4">Trading & Platforms</h4>

            <p>
              <a href="#" style={linkStyle}>
                Margin/Leverage, Product and Order Types
              </a>
            </p>
            <p>
              <a href="#" style={linkStyle}>
                Kite Web and Mobile
              </a>
            </p>
            <p>
              <a href="#" style={linkStyle}>
                Trading FAQs
              </a>
            </p>
            <p>
              <a href="#" style={linkStyle}>
                Corporate Actions
              </a>
            </p>
            <p>
              <a href="#" style={linkStyle}>
                Sentinel
              </a>
            </p>
            <p>
              <a href="#" style={linkStyle}>
                Kite API
              </a>
            </p>
            <p>
              <a href="#" style={linkStyle}>
                Pi and Other Platforms
              </a>
            </p>
            <p>
              <a href="#" style={linkStyle}>
                Stock Reports+
              </a>
            </p>
            <p>
              <a href="#" style={linkStyle}>
                GTT
              </a>
            </p>
          </div>
        </div>
      </div>
      <div className="row g-4 mt-5">
        {/* Column 1 */}
        <div className="col-lg-4 col-md-6 col-12">
          <div className="border rounded p-4 h-100 shadow-sm">
            <h4 className="mb-4">Funds</h4>

            <p>
              <a href="#" style={linkStyle}>
                Adding Funds
              </a>
            </p>
            <p>
              <a href="#" style={linkStyle}>
                Fund Withdrawal
              </a>
            </p>
            <p>
              <a href="#" style={linkStyle}>
                eMandates
              </a>
            </p>
            <p>
              <a href="#" style={linkStyle}>
                Adding Bank Accounts
              </a>
            </p>
          </div>
        </div>

        {/* Column 2 */}
        <div className="col-lg-4 col-md-6 col-12">
          <div className="border rounded p-4 h-100 shadow-sm">
            <h4 className="mb-4">Console</h4>

            <p>
              <a href="#" style={linkStyle}>
                Reports
              </a>
            </p>
            <p>
              <a href="#" style={linkStyle}>
                Ledger{" "}
              </a>
            </p>
            <p>
              <a href="#" style={linkStyle}>
                Portfolio{" "}
              </a>
            </p>
            <p>
              <a href="#" style={linkStyle}>
                60 Day Challange{" "}
              </a>
            </p>
            <p>
              <a href="#" style={linkStyle}>
                IPO{" "}
              </a>
            </p>
            <p>
              <a href="#" style={linkStyle}>
                Refferal Program{" "}
              </a>
            </p>
          </div>
        </div>

        {/* Column 3 */}
        <div className="col-lg-4 col-md-12 col-12">
          <div className="border rounded p-4 h-100 shadow-sm">
            <h4 className="mb-4">Coin</h4>

            <p>
              <a href="#" style={linkStyle}>
                Understanding Mutual Funds
              </a>
            </p>
            <p>
              <a href="#" style={linkStyle}>
                About Coin
              </a>
            </p>
            <p>
              <a href="#" style={linkStyle}>
                Buying and Selling through Coin{" "}
              </a>
            </p>
            <p>
              <a href="#" style={linkStyle}>
                Starting an SIP{" "}
              </a>
            </p>
            <p>
              <a href="#" style={linkStyle}>
                Managing your Portfolio
              </a>
            </p>
            <p>
              <a href="#" style={linkStyle}>
                Coin App{" "}
              </a>
            </p>
            <p>
              <a href="#" style={linkStyle}>
                Moving to Coin{" "}
              </a>
            </p>
            <p>
              <a href="#" style={linkStyle}>
                Government Securities{" "}
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTicket;
