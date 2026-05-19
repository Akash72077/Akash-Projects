import React from "react";
function RightSection({
  imageURL,
  productName,
  productDescription,
  anchorName,
}) {
  return (
    <div className="container">
      <div className="row">
        <div
          className="col-5 p-5"
          style={{ padding: "50px", marginLeft: "50px", marginTop: "100px" }}
        >
          <h2
            className="mt-2"
            style={{
              fontSize: "24px",
              color: "#424242",
              fontFamily: "sans-serif",
              fontWeight: "500",
            }}
          >
            {productName}
          </h2>

          <p
            className="mt-2"
            style={{
              fontSize: "16px",
              color: "#424242",
              fontFamily: "sans-serif",
            }}
          >
            {productDescription}
          </p>
          <div>
            <a
              href=""
              style={{
                textDecoration: "none",
              }}
            >
              {anchorName}{" "}
              <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
            </a>
          </div>
        </div>

        <div className="col-6">
          <img src={imageURL} alt="Product" style={{ maxWidth: "100%" }} />
        </div>
        <div className="col-1"></div>
      </div>
    </div>
  );
}

export default RightSection;
