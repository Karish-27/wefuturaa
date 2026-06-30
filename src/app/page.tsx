'use client';

import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { motion, useScroll, useTransform, AnimatePresence, useSpring, useMotionValue, useMotionTemplate } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useIsMobile } from "@/hooks/useIsMobile";

import { Sparkles, Mail, ArrowRight, ArrowDown } from 'lucide-react';
import { LoadingScreen } from '@/components/layout';
import { TextPressure } from '@/components/ui/TextPressure';
import { portfolioData } from '@/data/portfolio';
import { cn } from "@/lib/utils";
import { SocialCorner } from '@/components/layout/SocialCorner';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const Footer = dynamic(() => import("@/components/layout/Footer").then(mod => mod.Footer), {
    ssr: false
});

const Hyperspeed = dynamic(() => import('@/components/ui/Hyperspeed'), { ssr: false });
const { hyperspeedPresets } = require('@/components/ui/Hyperspeed');

const Scene3D = dynamic(() => import('@/components/three/Scene3D').then(mod => ({ default: mod.Scene3D })), {
    ssr: false,
    loading: () => null
});

const AboutSection = dynamic(() => import("@/components/sections/AboutSection"), {
    ssr: false,
    loading: () => <div className="h-[600px] w-full animate-pulse bg-zinc-100/5 dark:bg-zinc-800/5" />
});

const ExpertiseSection = dynamic(() => import("@/components/sections/ExpertiseSection"), {
    ssr: false,
    loading: () => <div className="h-[500px] w-full animate-pulse bg-zinc-100/5 dark:bg-zinc-800/5" />
});

const HeroVisual = dynamic(() => import("@/components/sections/HeroVisual").then(mod => mod.HeroVisual), {
    ssr: false
});

const InnovativeExperienceHero = dynamic(() => import("@/components/sections/InnovativeExperienceHero").then(mod => mod.InnovativeExperienceHero), {
    ssr: false,
    loading: () => <div className="h-[500px] w-full animate-pulse bg-zinc-100/5 dark:bg-zinc-800/5" />
});

// ─── Helpers (Keeping Original Design) ───────────────────────────────────────


const MetricCTAHijack = () => {
    return (
        <div className="relative bg-background dark:bg-black">
            <div className="h-[10vh]" />
            <CTASection />
            <div className="h-20" />
        </div>
    );
};

const CTASection = dynamic(() => import("@/components/sections/CTASection"), {
    ssr: false,
    loading: () => <div className="h-[400px] w-full animate-pulse bg-zinc-100/5 dark:bg-zinc-800/5" />
});

// ─── Main Page ───────────────────────────────────────────────────────────────

export default function HomePage() {
    const [isLoading, setIsLoading] = useState(true);
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        const hasLoaded = sessionStorage.getItem('portfolioLoaded');
        if (hasLoaded) {
            setIsLoading(false);
            setIsExiting(true);
        }

        if (typeof window === 'undefined' || !('ResizeObserver' in window)) return;
        const refreshLayout = () => {
            window.dispatchEvent(new Event('resize'));
            ScrollTrigger.refresh();
        };
        const resizeObserver = new ResizeObserver(() => { refreshLayout(); });
        resizeObserver.observe(document.body);
        window.addEventListener('load', refreshLayout);
        return () => {
            resizeObserver.disconnect();
            window.removeEventListener('load', refreshLayout);
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);

    useEffect(() => {
        if (isExiting && !isLoading) {
            const timer = setTimeout(() => {
                ScrollTrigger.refresh();
            }, 1500); // Once, after transition is likely done
            return () => clearTimeout(timer);
        }
    }, [isExiting, isLoading]);

    const handleLoadingComplete = () => {
        setIsLoading(false);
        window.scrollTo({ top: 0, behavior: 'instant' });
        sessionStorage.setItem('portfolioLoaded', 'true');
        setTimeout(() => { ScrollTrigger.refresh(); }, 100);
    };

    const handleExitStart = () => {
        setIsExiting(true);
    };

    return (
        <>
            {isLoading && <LoadingScreen onComplete={handleLoadingComplete} onExitStart={handleExitStart} duration={2500} />}
            <motion.main
                initial={{ opacity: 0, y: 40 }}
                animate={isExiting ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                transition={{
                    duration: 1.4,
                    ease: [0.16, 1, 0.3, 1], // Expo out for snappy yet smooth feel
                    opacity: { duration: 0.8 }
                }}
                className="relative overflow-x-clip overflow-y-visible will-change-transform will-change-opacity"
            >
                {/* 
                   Hero di-mount bersamaan dengan LoadingScreen agar "nyambung".
                   Komponen internal Hero menggunakan state isExiting untuk memulai animasinya.
                */}
                <HeroVisual isExiting={isExiting || !isLoading} />

                {!isLoading && (
                    <>
                        <ExpertiseSection />
                        <AboutSection />
                        <InnovativeExperienceHero
                            type="journey"
                            title="Explore The Industries"
                            highlight="We've Served"
                            description="Delivering innovative digital solutions across multiple industries with proven expertise and modern technologies."
                        />
                        <MetricCTAHijack />
                        <SocialCorner className="fixed bottom-12 right-12 z-[30]" />
                    </>
                )}
            </motion.main>
        </>
    );
}
