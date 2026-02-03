import React, { useEffect } from "react";
import Intro from "./AdminLabInfo/Intro";
import Hero from "./Hero";
import InFo from "./InFo";
import CurrentmemberSlider from "./CurrentmemberSlider";
import AlumniSlider from "./AlumniSlider";
import InternSlider from "./InternSlider";
import ImageSlider from "./ImageSlider";
import Footer from "./Footer";
import Carousel from "./Slider/CardSlider";
import CardSlider from "./Slider/CardSlider";
import CircularGallery from "./Slider/CircularGallery";

function Home() {
  return (
    <div className="bg-gradient-to-r from-blue-50 via-cyan-50 to-sky-50">
      <Hero />
      <Intro />
      <InFo />
      <CurrentmemberSlider />
      <AlumniSlider />
      <InternSlider />
      {/* <CardSlider/> */}

      {/* <div style={{ height: "600px", position: "relative" }}>
        <CircularGallery
          bend={3}
          textColor="#ffffff"
          borderRadius={0.05}
          scrollEase={0.02}
        />
      </div> */}
      <ImageSlider />

      <Footer />
    </div>
  );
}

export default Home;
