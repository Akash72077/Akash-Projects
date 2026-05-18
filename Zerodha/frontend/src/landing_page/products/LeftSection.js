import React from "react";
function LeftSection({
  imageURL,
  productName,
  productDescription,
  tryDemo,
  learnMore,
  googlePlay,
  appStore,
}) {
  return (
    <div className="container">
      <div className="row p-5">
        <div className="col-6 p-5">
          <img src={imageURL} />
        </div>
        <div className="col-6 p-5 mt-5" style={{padding:"10px"}}>
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
            <a href={tryDemo} style={{ textDecoration: "none" }}>
              Try demo {" "}
              <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
            </a>
            <a
              href={learnMore}
              style={{ marginLeft: "5.5rem", textDecoration: "none" }}
            >
              Learn more
               {" "}<i class="fa fa-long-arrow-right" aria-hidden="true"></i>
            </a>
          </div>
          <div className="mt-4">
            <a href={googlePlay}>
              <img src="media/images/googlePlayBadge.svg" style={{maxWidth:"100%", height:"45px"}} />
            </a>
            <a href={appStore} style={{ marginLeft: "25px" }}>
              <img src="media/images/appstoreBadge.svg" style={{maxWidth:"100%", height:"45px"}}  />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
export default LeftSection;
