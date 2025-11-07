import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Countdown = () => {
    const targetDate = new Date("November 26, 2025 00:00:00").getTime();
    const [timeLeft, setTimeLeft] = useState(getTimeLeft());

    function getTimeLeft() {
        const now = Date.now();
        const diff = targetDate - now;

        return {
            days: Math.floor(diff / (1000 * 60 * 60 * 24)),
            hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((diff / (1000 * 60)) % 60),
            seconds: Math.floor((diff / 1000) % 60),
        };
    }

    useEffect(() => {
        const interval = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
        return () => clearInterval(interval);
    }, []);

    const blocks = [
        { label: "Days", value: timeLeft.days },
        { label: "Hrs", value: timeLeft.hours },
        { label: "Min", value: timeLeft.minutes },
        { label: "Sec", value: timeLeft.seconds },
    ];

    return (
        <div className="flex flex-col items-center justify-center py-8 text-white">
            <motion.h1
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-[8px] sm:text-[9px] font-light tracking-[0.2em] text-gray-500 uppercase mb-1"
            >
                Coming Soon!
            </motion.h1>



            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mt-2">
                {blocks.map((b, i) => (
                    <div
                        key={i}
                        className="backdrop-blur-md bg-white/5 border border-white/10 rounded-lg
                 px-3 py-2 sm:px-4 sm:py-3 shadow-[0_0_12px_rgba(255,255,255,0.05)]
                 flex flex-col items-center w-16 sm:w-20 transition-all hover:bg-white/10"
                    >
                        <AnimatePresence mode="popLayout">
                            <motion.span
                                key={b.value}
                                initial={{ scale: 0.4, opacity: 0, rotateX: 90 }}
                                animate={{ scale: 1, opacity: 1, rotateX: 0 }}
                                exit={{ scale: 0.4, opacity: 0, rotateX: -90 }}
                                transition={{ duration: 0.35 }}
                                className="text-lg sm:text-2xl font-semibold tracking-wide"
                            >
                                {b.value < 0 ? 0 : b.value}
                            </motion.span>
                        </AnimatePresence>

                        <span className="text-[9px] sm:text-[10px] text-gray-300 mt-1 uppercase tracking-wide">
                            {b.label}
                        </span>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default Countdown;
