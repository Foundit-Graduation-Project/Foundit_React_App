import React from "react";
import { motion } from "framer-motion";

const MovingBackground = () => {
    return (
        <div className="fixed inset-0 z-0 overflow-hidden bg-slate-50 dark:bg-slate-950">
            {/* Soft mesh gradient blobs */}
            <motion.div
                animate={{
                    x: [0, 100, -50, 0],
                    y: [0, -50, 100, 0],
                    scale: [1, 1.2, 0.8, 1],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute -top-24 -left-24 w-96 h-96 bg-blue-500/40 rounded-full blur-[60px]"
            />
            <motion.div
                animate={{
                    x: [0, -150, 100, 0],
                    y: [0, 100, -50, 0],
                    scale: [1, 0.8, 1.2, 1],
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute top-1/4 -right-48 w-[500px] h-[500px] bg-indigo-500/30 rounded-full blur-[80px]"
            />
            <motion.div
                animate={{
                    x: [0, 80, -120, 0],
                    y: [0, 150, 50, 0],
                    scale: [1, 1.1, 0.9, 1],
                }}
                transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute -bottom-48 left-1/4 w-[600px] h-[600px] bg-blue-400/30 rounded-full blur-[100px]"
            />
            <motion.div
                animate={{
                    x: [0, -100, 50, 0],
                    y: [0, -100, 150, 0],
                }}
                transition={{
                    duration: 22,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute top-3/4 right-1/4 w-80 h-80 bg-blue-600/25 rounded-full blur-[40px]"
            />

            {/* Subtle Noise Texture Overlay (Premium Inline Noise) */}
            <div 
                className="absolute inset-0 opacity-[0.03] pointer-events-none" 
                style={{ 
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` 
                }}
            ></div>
            
            {/* Grid Pattern Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
        </div>
    );
};

export default MovingBackground;
