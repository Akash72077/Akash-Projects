import React from "react";
function LeftSection(
  imageURL,
  productName,
  productDescription,
  tryDemo,
  learnMore,
  googlePlay,
  appStore,
) {
  return (
    <div className="container">
      <div className="row">
        <div className="col-6 p-3">
          <img src={imageURL} />
        </div>
        <div className="col-6">
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
          <a href={tryDemo} style={{ }}>
            Try demo
            <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
          </a>
          <a href={learnMore} style={{ textDecoration: "none" }}>
            Learn more
            <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
          </a>
          <a href={googlePlay} style={{ textDecoration: "none" }}>
            <img src="media\images\googlePlayBadge.svg" />
          </a>
          <a href={appStore} style={{ textDecoration: "none" }}>
            <img src="media\images\appstoreBadge.svg" />
          </a>
        </div>
      </div>
    </div>
  );
}
export default LeftSection;
