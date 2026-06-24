"use client";

import { motion, useTransform, easeInOut } from "framer-motion";
import { useTheme } from "next-themes";
import { ToolsSection } from "@/components/sections/skills/ToolsSection";

interface IdentitySequenceProps {
    scrollYProgress: any;
    isVisible: boolean;
}

export const IdentitySequence = ({ scrollYProgress }: IdentitySequenceProps) => {
    const localProgress = useTransform(scrollYProgress, [0.4, 0.85], [0, 1]);

    const cardScale = useTransform(localProgress, [0, 0.2], [0.95, 1], { ease: easeInOut });
    const cardBorderRadius = useTransform(localProgress, [0, 0.2], ["20px", "0px"], { ease: easeInOut });

    const cardBg = useTransform(localProgress, [0.8, 1], ["#EBEBEB", "#FFFFFF"]);
    const cardBgDark = useTransform(localProgress, [0.8, 1], ["#18181b", "#000000"]);

    const { resolvedTheme } = useTheme();
    const cardBgValue = resolvedTheme === 'dark' ? cardBgDark : cardBg;

    return (
        <div className="relative w-screen h-full flex flex-col items-center justify-center overflow-hidden bg-background dark:bg-black">
            <motion.div
                style={{
                    scale: cardScale,
                    borderRadius: cardBorderRadius,
                    backgroundColor: cardBgValue,
                    willChange: "transform, background-color",
                }}
                className="relative w-full h-full flex flex-col overflow-y-auto overflow-x-hidden origin-bottom z-10"
            >
                <ToolsSection />
            </motion.div>
        </div>
    );
};
