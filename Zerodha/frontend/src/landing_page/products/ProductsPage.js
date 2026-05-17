import React from 'react';

import Navbar from '../Navbar';
import Hero from './Hero';
import LeftSection from './LeftSection';
import RightSection from './RightSection';

import Universe from './Universe';
import Footer from '../Footer';

function PricingPage() {
    return (
        <>
        <Hero/>
        <LeftSection/>
        <RightSection/>
        <Universe/>
        </>
      );
}

export default PricingPage;