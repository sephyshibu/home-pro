import React from "react";
import FAQ from "./FAQ";
import Header from "./Header";
import CallAction from "./CallAction";
import Works from "./Works";
import Gaurentee from "./Gaurentee";
import Services from "./Services";
import Hero from "./Hero";
// import Footer from "./Footer";
import AboutSection from "./About";
const App:React.FC=()=>{
    return(
      <div className="font-sans">
      <Header />
      <section><Hero /></section>

      {/* Section Wrapper with Padding */}
      <div className="px-4 md:px-10 lg:px-20 py-8 space-y-16">
       
        <section><AboutSection /></section>
        <section><Services /></section>
        <section><Gaurentee /></section>
        <section><Works /></section>
        <section><FAQ /></section>
        <section><CallAction /></section>
      </div>

      {/* <Footer /> */}
    </div>
    )
}

export default App