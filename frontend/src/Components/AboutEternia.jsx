import React from "react";
import "../css/AboutEternia.css"; // external css
import Countdown from "./Countdown";

const AboutEternia = () => {
  return (
    <section
      id="about"
      className="relative w-full min-h-screen flex flex-col items-center justify-center text-white"
    >
      <div>
        <Countdown />
      </div>
      {/* Content */}
      <div className="relative z-10 max-w-5xl px-6 md:px-12 text-center">
        <h2 className="text-4xl md:text-6xl font-extrabold text-purple-400 tracking-wide uppercase bg-purple-900/70 inline-block px-4 py-2 rounded-md">
          About Eternia
        </h2>
        <p className="mt-6 text-lg md:text-xl leading-relaxed text-gray-200">
          Eternia is one of the largest medical college fest in Northeast India —
          a four-day extravaganza that brings together culture, sports, literature,
          and pure fun in one unforgettable celebration.
        </p>
        <p className="mt-4 text-lg md:text-xl leading-relaxed text-gray-300">
          From electrifying sports tournaments and thought-provoking literary
          showdowns to cultural showcases and casual crowd-favorites like
          <span className="font-semibold"> Beg, Borrow, Steal </span> and the
          <span className="font-semibold"> Treasure Hunt</span>, Eternia has something
          for everyone. The festival reaches its crescendo each year with a grand
          finale concert, featuring a leading singer or DJ who sets the stage ablaze.
        </p>
        <p className="mt-4 text-lg md:text-xl leading-relaxed text-gray-300">
          Signature events like
          <span className="font-semibold"> Eternal Echoes</span>, the premier talk show
          that attracts eminent speakers from across India, the
          <span className="font-semibold"> SPIC-MACAY</span> performance, Band Night,
          Cultural Night, and Drama Night ensure that every evening brings a fresh
          wave of artistry, inspiration, and entertainment.
        </p>
        <p className="mt-4 text-lg md:text-xl leading-relaxed text-gray-300">
          Eternia is more than a fest — it’s a celebration of talent, creativity,
          and community that keeps growing brighter each year.
        </p>
      </div>
    </section>
  );
};

export default AboutEternia;
