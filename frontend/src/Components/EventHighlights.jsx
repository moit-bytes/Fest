import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/Event.css";
const EventHighlights = () => {
  const navigate = useNavigate();
  const events = [
   {
  id: 1,
  title: "Sports",
  image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&q=80",
   route: "/sports"
},
    {
      id: 2,
      title: "Literary",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBIH65a_NVeFBTAjZNKSU1oDwl_p-LiOYmbAQmk4a3gaW1-zzGrK1DpmUCzCcqKSgVdj4Q76y1wLk_XjmTCU0T7fPpi3mAnmQsEBWns9EMl_8EA_kKJbZ8CbdLmy-aaQHy-W55atc5oKX5HL5Zqr793TzfE2-xdBVeKiTaZ4g2M6Nh6HFNjzgx4J4GSwijZJpepLwH9JMPHIu7BbrwCp4crqQ7HlX5tKnt935ZqVMUfxdvrXisd87Tk1KedDDdWxfAsXDy35wpWhQk",
      route: "/literary"
     
    },
    {
      id: 3,
      title: "Creative",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCFkLgtAxhUrR6M1x2BwA0l5mOg2gfN3tp5xQ5ZDtA8Lz0dTFR159yBWaMZiu0ZAnyb_8wxamrxQtICzuTdkYaqaHEAyQPCJIWWm0BnNT8iEVGgOEspF1x0O45A1y3cr4xRAXR9JRAt0-R5_FjdTxH689lBlQduaHsrHSxHVh5YbqsLDJnUa6Qm3VGDdYi-Zvw-yASu6wTcRZzp75Zfori8dYwN35_2K-sxZ5SilAT4GRAX62xcCihUn49ZqTRPCwBWIft3CTUbv98",
      route: "/creative"
    },
    {
      id: 4,
      title: "ESports",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCZnbi87xOHFrOEorWNRRqfRlGGHjKUWeTrMLVzxSK_rZ1rQFAP6cuzbmgPVtWd40Ot3eFmDCaBL6HfN9BKc_AYfzc1gIK7NKU24xOCy2sCtuLmexIjRm_GOVdOS67v-St-wknIiY2HJkbwEBerLHugG-m_AQanl56Mqxa85VZwHQXyQt92HqX2w6w1KCUXhA6hCPEEWo7H1a5FbGEF9HlcAPMoV2nFA-3P_noLabUVoCdfk5rWudoiMFxZhYNaDE3M-7rpzx2t32c",
       route: "/esports"
    },
    {
      id: 5,
      title: "informal",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAIUsnf12LjarI4buV60_Q2Lpb1ImIzA3VniFVljCAwax2uUlbHZmgG_TJd9gf2bLLWciWW4MxLUint-DcsK1i0ZgLqxhjuqRUQzoRWaGV8vr2ei2w6vsBJvcNKQ2smrg2Am89il_vajBpr7L6ZqhTzc7UTTtZKqxVY998NF1jVT94qVMvFMDxdo2vB2XODeFBA6tOwZ4FRox_vgKsBE6QCQdSYZeC5hBNC8Ys8rOAbmqzp749N9mFPN1oP4pAvavVC0xaQ_JHkS_0",
      route: "/informal"
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
 
      
      <div className="relative z-10 container mx-auto px-4">
        <h2 className="text-white text-4xl md:text-5xl font-bold tracking-tighter text-center mb-10">
          Event Highlights
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
    </section>
  );
};

export default EventHighlights;