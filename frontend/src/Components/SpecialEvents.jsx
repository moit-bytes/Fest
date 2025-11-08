import { motion } from "framer-motion";

const imagePairs = [
    { left: "/fashion.PNG", right: "/equinox.PNG" },
    { left: "/talkShow.PNG", right: "/djNight.PNG" },
    { left: "/starNight.PNG", right: "/special.PNG" },
];
export default function SpecialEvents() {
    return (
        <section className="w-full py-20 bg-black flex flex-col items-center justify-center">
            <h2 className="text-white text-4xl md:text-5xl font-bold mb-16 text-center">
                Special Events
            </h2>

            <div className="flex flex-col gap-14 w-full max-w-6xl px-4">
                {imagePairs.map((pair, index) => (
                    <div
                        key={index}
                        className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 overflow-hidden"
                    >
                        {/* Left Image */}
                        <motion.img
                            src={pair.left}
                            alt={`Event Left ${index + 1}`}
                            className="w-64 md:w-80 lg:w-96 object-contain"
                            initial={{ opacity: 0, x: -180 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            style={{ cursor: "pointer" }}
                            transition={{ duration: 0.9, ease: "easeOut" }}
                            viewport={{ amount: 0.3 }}
                            onClick={() => window.open("https://docs.google.com/forms/d/e/1FAIpQLSduZgP4yNtQFUF-Oga138uom9rN1jaxEGrxHLb8525cUL_S-A/viewform?usp=dialog", "_blank")}
                        />

                        {/* Right Image */}
                        <motion.img
                            src={pair.right}
                            alt={`Event Right ${index + 1}`}
                            className="w-64 md:w-80 lg:w-96 object-contain"
                            initial={{ opacity: 0, x: 180 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            style={{ cursor: "pointer" }}
                            transition={{ duration: 0.9, ease: "easeOut" }}
                            viewport={{ amount: 0.3 }}
                        // onClick={() => window.open("https://docs.google.com/forms/d/e/1FAIpQLSduZgP4yNtQFUF-Oga138uom9rN1jaxEGrxHLb8525cUL_S-A/viewform?usp=dialog", "_blank")}
                        />
                    </div>
                ))}
            </div>
        </section>
    );
}
