import React from "react";

import Navbar from "../Navbar";
import Hero from "./Hero";
import LeftSection from "./LeftSection";
import RightSection from "./RightSection";

import Universe from "./Universe";
import Footer from "../Footer";

function PricingPage() {
  return (
    <>
      <Hero />

      {/* Kite */}
      <LeftSection
        imageURL="media/images/kite.png"
        productName="Kite"
        productDescription="Our ultra-fast flagship trading platform with streaming market data, advanced charts, an elegant UI, and more. Enjoy the Kite experience seamlessly on your Android and iOS devices."
        tryDemo=""
        learnMore=""
        googlePlay=""
        appStore=""
        showDemoLinks={true}
        coinLink={false}
      />

      <RightSection />

      {/* Coin */}
      <LeftSection
        imageURL="media/images/coin.png"
        productName="Coin"
        productDescription="Buy direct mutual funds online, commission-free, delivered directly to your Demat account. Enjoy the investment experience on your Android and iOS devices."
        googlePlay=""
        appStore=""
        coinLink={true}
      />

      <RightSection />

      {/* Varsity */}
      <LeftSection
        imageURL="media/images/varsity.png"
        productName="Varsity mobile"
        productDescription="An easy to grasp, collection of stock market lessons with in-depth coverage and illustrations. Content is broken down into bite-size cards to help you learn on the go."
        googlePlay=""
        appStore=""
        coinLink={false}
      />

      <Universe />
    </>
  );
}

export default PricingPage;