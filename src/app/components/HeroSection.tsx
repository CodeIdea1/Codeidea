'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from '../styles/heroSection.module.css';
import Image from 'next/image';
import clsx from 'clsx';

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
    imageSrc?: string;
    animationDuration?: number;
    pinSpacing?: boolean;
    videoSrc?: string;
}

export default function Hero({
    imageSrc = '/b1.webp',
    animationDuration = 2,
    pinSpacing = true,
    videoSrc = '/video.mp4'
}: HeroProps) {
    const imageRef = useRef<HTMLDivElement>(null);
    const sectionRef = useRef<HTMLElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isVideoOpen, setIsVideoOpen] = useState(false);

    useEffect(() => {
        if (!imageRef.current || !sectionRef.current) return;

        const getHeaderHeight = () => {
            const header = document.querySelector('header');
            return header?.offsetHeight || 80;
        };

        const mm = gsap.matchMedia();

        mm.add({
            isMobile: "(max-width: 768px)",
            isDesktop: "(min-width: 769px)"
        }, (context) => {
            const { isMobile } = context.conditions as { isMobile: boolean; isDesktop: boolean };
            const headerHeight = getHeaderHeight();

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: isMobile ? 'top top' : `top+=${headerHeight} top+=${headerHeight}`,
                    end: `+=${window.innerHeight - (isMobile ? 0 : headerHeight)}`,
                    scrub: 1,
                    pin: true,
                    pinSpacing: pinSpacing,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                    refreshPriority: -1,
                    markers: false,
                    onRefresh: () => {
                        const newHeaderHeight = getHeaderHeight();

                        if (tl.scrollTrigger) {
                            tl.scrollTrigger.vars.start = isMobile ? 'top top' : `top+=${newHeaderHeight} top+=${newHeaderHeight}`;
                            tl.scrollTrigger.vars.end = `+=${window.innerHeight - (isMobile ? 0 : newHeaderHeight)}`;
                        }
                    }
                }
            });

            tl.to(imageRef.current, {
                opacity: 0,
                duration: animationDuration,
                ease: 'power2.inOut'
            });

            return () => {
                tl.scrollTrigger?.kill();
                tl.kill();
            };
        });

        const handleResize = () => {
            setTimeout(() => {
                ScrollTrigger.refresh();
            }, 100);
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('orientationchange', handleResize);

        return () => {
            mm.kill();
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('orientationchange', handleResize);
        };
    }, [animationDuration, pinSpacing]);

    const handleVideoHover = () => {
        if (videoRef.current) {
            videoRef.current.play();
        }
    };

    const handleVideoLeave = () => {
        if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
        }
    };

    const handleVideoClick = () => {
        setIsVideoOpen(true);
    };

    const closeVideoModal = () => {
        setIsVideoOpen(false);
    };

    return (
        <section ref={sectionRef} className={styles.heroSection}>
            <div className={styles.container}>
                <div ref={imageRef} className={styles.background2}>
                    <Image
                        className={styles.background2Img}
                        src={imageSrc}
                        alt="background"
                        fill
                        priority
                        sizes="100vw"
                        quality={90}
                    />
                </div>
            </div>

            <div className={styles.overlayContent}>
                <h1 className={clsx(styles.title, 'title')}>
                    Custom Websites That Elevate Your Business
                </h1>
                <p className={styles.description}>
                    Innovative digital solutions that turn ideas into reality — delivering
                    top quality and smooth user experiences every step of the way.
                </p>
            </div>

            <div className={styles.videoContainer}>
                <div
                    className={styles.videoWrapper}
                    onMouseEnter={handleVideoHover}
                    onMouseLeave={handleVideoLeave}
                    onClick={handleVideoClick}
                >
                    <video
                        ref={videoRef}
                        className={styles.video}
                        muted
                        loop
                        playsInline
                    >
                        <source src={videoSrc} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                    <div className={styles.playButton}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M8 5v14l11-7z" fill="white" />
                        </svg>
                    </div>
                </div>
            </div>

            {isVideoOpen && (
                <div className={styles.videoModal} onClick={closeVideoModal}>
                    <div className={styles.videoModalContent} onClick={(e) => e.stopPropagation()}>
                        <button
                            type="button"
                            className={styles.closeButton}
                            onClick={closeVideoModal}
                            aria-label="Close video modal"
                            title="Close video"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                <path d="M18 6L6 18M6 6l12 12" stroke="white" strokeWidth="2" />
                            </svg>
                        </button>
                        <video
                            className={styles.modalVideo}
                            controls
                            autoPlay
                            loop
                        >
                            <source src={videoSrc} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                </div>
            )}
        </section>
    );
}