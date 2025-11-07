import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/Event.css";
import { scrollToOffsetFromBottomWhenStable } from "../utils/function";

const EventHighlights = () => {
  const navigate = useNavigate();
  const events = [
    {
      id: 1,
      title: "Sports",
      image: "https://cdn.pixabay.com/photo/2013/07/25/11/58/cricket-166931_1280.jpg",
      route: "/sports"
    },
    {
      id: 2,
      title: "Literary",
      image: "https://cdn.pixabay.com/photo/2015/11/19/21/11/book-1052014_1280.jpg",
      route: "/literary"

    },
    {
      id: 3,
      title: "Creative",
      image: "https://cdn.pixabay.com/photo/2017/08/30/12/45/girl-2696947_1280.jpg",
      route: "/creative"
    },
    {
      id: 4,
      title: "ESports",
      image: "https://cdn.pixabay.com/photo/2021/10/07/20/46/playstation-6689793_1280.jpg",
      route: "/esports"
    },
    {
      id: 5,
      title: "Informal",
      image: "https://cdn.pixabay.com/photo/2017/07/22/11/46/adventure-2528477_1280.jpg",
      route: "/informal"
    },
    {
      id: 6,
      title: "Cultural",
      image: "https://cdn.pixabay.com/photo/2023/01/21/12/04/bharatanatyam-7733729_1280.jpg",
      route: "/cultural"
    }
  ];

  const handleClick = (event) => {
    console.log("Navigating to:", event.route);
    navigate(event.route);
  };

  return (
    <section className="relative py-16">
      {/* Background gradient */}
      <div className="absolute inset-0  pointer-events-none" />

      <div className="max-w-5xl mx-auto mt-20 mb-24 px-4">
        {/* Title */}
        <h3 className="text-center text-white text-4xl md:text-5xl font-bold tracking-tight mt-20 mb-6 fade-up">
          How to Register?
        </h3>

        <p className="text-center text-gray-300 text-lg md:text-xl max-w-3xl mx-auto mb-14 fade-up">
          Here is a step-by-step guide for you to easily register and be a part of one of the largest medfest in the Northeast — ETERNIA.
        </p>

        {/* Timeline */}
        <div className="relative max-w-5xl mx-auto mb-20">

          {/* Center Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-[2px] bg-gray-600"></div>

          <div className="space-y-24">

            {/* STEP 1 - LEFT */}
            <div className="relative flex md:justify-between items-center">
              <div className="hidden md:block w-1/2 pr-12 text-right">
                <h4 className="text-white font-semibold text-2xl mb-3">Step 1 — Basic Registration (Free)</h4>
                <p className="text-gray-300 leading-relaxed">
                  Create your Eternia account by filling in your name, college, email and phone.
                  You’re officially registered!
                </p>
              </div>

              {/* Dot */}
              <div className="absolute left-1/2 transform -translate-x-1/2 bg-purple-400 w-6 h-6 rounded-full shadow-[0_0_15px_5px_rgba(168,85,247,0.6)]"></div>

              {/* Mobile */}
              <div className="md:hidden text-center px-6">
                <h4 className="text-white font-semibold text-2xl mb-3">Step 1 — Basic Registration (Free)</h4>
                <p className="text-gray-300 leading-relaxed">
                  Create your Eternia account by filling in your name, college, email and phone.
                  You’re officially registered!
                </p>
              </div>
            </div>

            {/* STEP 2 - RIGHT */}
            <div className="relative flex md:justify-between items-center">
              {/* Spacer for left */}
              <div className="hidden md:block w-1/2"></div>

              {/* Dot */}
              <div className="absolute left-1/2 transform -translate-x-1/2 bg-indigo-400 w-6 h-6 rounded-full shadow-[0_0_15px_5px_rgba(129,140,248,0.6)]"></div>

              {/* Right content */}
              <div className="md:w-1/2 pl-12 md:text-left text-center px-6">
                <h4 className="text-white font-semibold text-2xl mb-3">Step 2 — Event Registration</h4>
                <p className="text-gray-300 leading-relaxed">
                  Go to the Events section, choose a category and select the event you want to participate in. Confirm your entry.
                </p>
              </div>
            </div>

            {/* STEP 3 - LEFT */}
            <div className="relative flex md:justify-between items-center">
              <div className="hidden md:block w-1/2 pr-12 text-right">
                <h4 className="text-white font-semibold text-2xl mb-3">Step 3 — Delegate Pass</h4>
                <p className="text-gray-300 leading-relaxed">
                  Purchase your delegate pass for the main night events. Your confirmation e-ticket will be sent instantly.
                </p>
              </div>

              {/* Dot */}
              <div className="absolute left-1/2 transform -translate-x-1/2 bg-blue-400 w-6 h-6 rounded-full shadow-[0_0_15px_5px_rgba(96,165,250,0.6)]"></div>

              {/* Mobile */}
              <div className="md:hidden text-center px-6">
                <h4 className="text-white font-semibold text-2xl mb-3">Step 3 — Delegate Pass</h4>
                <p className="text-gray-300 leading-relaxed">
                  Purchase your delegate pass for the main night events. Your confirmation e-ticket will be sent instantly.
                </p>
              </div>
            </div>

            {/* STEP 4 - RIGHT */}
            <div className="relative flex md:justify-between items-center">
              <div className="hidden md:block w-1/2"></div>

              {/* Dot */}
              <div className="absolute left-1/2 transform -translate-x-1/2 bg-teal-400 w-6 h-6 rounded-full shadow-[0_0_15px_5px_rgba(45,212,191,0.6)]"></div>

              <div className="md:w-1/2 pl-12 md:text-left text-center px-6">
                <h4 className="text-white font-semibold text-2xl mb-3">Step 4 — Accommodation</h4>
                <p className="text-gray-300 leading-relaxed">
                  Need a stay? Complete the accommodation form — your hostel allocation & details will be shared instantly.
                </p>
              </div>
            </div>

          </div>


        </div>

        {/* Final Line */}
        <p className="text-center text-gray-300 text-lg md:text-xl font-medium mb-16 fade-up">
          You’re now ready for the Eternia experience — four days of unforgettable energy, culture, competition & celebration!
        </p>



        {/* Existing Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Basic Registration */}
          <button
            onClick={() => { window.open("https://docs.google.com/forms/d/e/1FAIpQLSe7IRZ59WLepZGCIx0TW63doT2vFhrJ1GNmurdiW7qJS5lfUA/viewform?usp=publish-editor", "_blank") }}
            className="group relative w-full rounded-xl bg-gradient-to-br from-gray-800 to-gray-700 py-4 px-5 shadow-xl border border-gray-600 transition-transform hover:scale-105"
          >
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/30 to-pink-500/30 opacity-0 group-hover:opacity-40 blur-lg transition-all duration-300 pointer-events-none"></div>
            <span className="relative text-white text-xl font-semibold tracking-tight">
              Basic Registration
            </span>
          </button>

          {/* Delegate Pass */}
          <button
            onClick={() => scrollToOffsetFromBottomWhenStable(200)}
            className="group relative w-full rounded-xl bg-gradient-to-br from-indigo-700 to-indigo-500 py-4 px-5 shadow-xl border border-indigo-400 transition-transform hover:scale-105"
          >
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/30 to-purple-500/30 opacity-0 group-hover:opacity-40 blur-lg transition-all duration-300 pointer-events-none"></div>
            <span className="relative text-white text-xl font-semibold tracking-tight">
              Delegate Pass
            </span>
          </button>

          {/* Accommodation Registration */}
          <button
            onClick={() => window.open("https://forms.gle/kGPjZt7WRghgHeks5", "_blank")}
            className="group relative w-full rounded-xl bg-gradient-to-br from-teal-700 to-teal-500 py-4 px-5 shadow-xl border border-teal-400 transition-transform hover:scale-105"
          >
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-teal-400/30 to-cyan-400/30 opacity-0 group-hover:opacity-40 blur-lg transition-all duration-300 pointer-events-none"></div>
            <span className="relative text-white text-xl font-semibold tracking-tight">
              Accommodation
            </span>
          </button>

        </div>

      </div>


      <div className="relative z-10 container mx-auto px-4 mt-12">
        <h2 className="text-white text-4xl md:text-5xl font-bold tracking-tighter text-center mb-10">
          Event Registrations
        </h2>

        {/* Grid layout for small/medium, horizontal scroll for large */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:hidden gap-6">
          {events.map((event) => (
            <div
              key={event.id}
              onClick={() => handleClick(event)}
              className="group relative rounded-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 cursor-pointer aspect-square md:h-80 md:aspect-auto"
            >
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <p className="absolute bottom-4 left-4 text-white text-xl font-bold">
                {event.title}
              </p>
            </div>
          ))}
        </div>

        {/* Horizontal scroll for large screens */}
        <div className="hidden lg:block overflow-x-scroll scrollbar-hide-lg">
          <div className="flex gap-6">
            {events.map((event) => (
              <div
                key={event.id}
                onClick={() => handleClick(event)}
                className="group relative flex-shrink-0 w-64 rounded-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 cursor-pointer"
              >
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <p className="absolute bottom-4 left-4 text-white text-xl font-bold">
                  {event.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section >
  );
};

export default EventHighlights;