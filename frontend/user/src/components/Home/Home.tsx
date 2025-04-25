import React from "react";
import FAQ from "./FAQ";
import Header from "./Header";
import CallAction from "./CallAction";
import Works from "./Works";
import Gaurentee from "./Gaurentee";
import Services from "./Services";
import Hero from "./Hero";
import Footer from "./Footer";
import AboutSection from "./About";
const App:React.FC=()=>{
    return(
        <div className="font-sans">
      <Header />
      <Hero />
      <AboutSection/>
      <Services />
      <Gaurentee />
      <Works />
      <FAQ />
      <CallAction/>
      <Footer />
    </div>
    )
}

export default App