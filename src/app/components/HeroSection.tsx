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
    const [isMobile, setIsMobile] = useState(false);
    const [shouldLoadVideo, setShouldLoadVideo] = useState(false);

    // تحديد إذا كان الجهاز موبايل
    useEffect(() => {
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        checkIfMobile();
        window.addEventListener('resize', checkIfMobile);

        return () => {
            window.removeEventListener('resize', checkIfMobile);
        };
    }, []);

    // تأكيد أن الصورة مرئية في الموبايل بدون GSAP
    useEffect(() => {
        if (isMobile && imageRef.current) {
            imageRef.current.style.opacity = '1';
        }
    }, [isMobile]);

    // تحميل الفيديو بتأخير في الموبايل لتحسين الأداء
    useEffect(() => {
        if (isMobile) {
            // تأخير تحميل الفيديو في الموبايل
            const timer = setTimeout(() => {
                setShouldLoadVideo(true);
            }, 1000); // تأخير ثانية واحدة

            return () => clearTimeout(timer);
        } else {
            setShouldLoadVideo(true);
        }
    }, [isMobile]);

    // تحديد مصدر الصورة حسب نوع الجهاز
    const currentImageSrc = isMobile ? '/b2.webp' : imageSrc;

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
            const { isMobile, isDesktop } = context.conditions as { isMobile: boolean; isDesktop: boolean };

            // فقط تطبيق الانيميشن في شاشات سطح المكتب
            if (isDesktop) {
                const headerHeight = getHeaderHeight();

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: `top+=${headerHeight} top+=${headerHeight}`,
                        end: `+=${window.innerHeight - headerHeight}`,
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
                                tl.scrollTrigger.vars.start = `top+=${newHeaderHeight} top+=${newHeaderHeight}`;
                                tl.scrollTrigger.vars.end = `+=${window.innerHeight - newHeaderHeight}`;
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
            }

            // في شاشات الموبايل، نتأكد من أن الصورة مرئية
            if (isMobile && imageRef.current) {
                gsap.set(imageRef.current, { opacity: 1 });
            }

            return () => { };
        });

        const handleResize = () => {
            setTimeout(() => {
                ScrollTrigger.refresh();
            }, 100);
        };

        // تطبيق event listeners فقط في شاشات سطح المكتب
        if (window.innerWidth > 768) {
            window.addEventListener('resize', handleResize);
            window.addEventListener('orientationchange', handleResize);
        }

        return () => {
            mm.kill();
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('orientationchange', handleResize);
        };
    }, [animationDuration, pinSpacing]);

    const handleVideoHover = () => {
        if (videoRef.current && !isMobile) { // تعطيل التشغيل التلقائي في الموبايل
            videoRef.current.play();
        }
    };

    const handleVideoLeave = () => {
        if (videoRef.current && !isMobile) {
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
        <section ref={sectionRef} className={styles.heroSection} id='hero'>
            <div className={styles.container}>
                <div ref={imageRef} className={styles.background2}>
                    <Image
                        className={styles.background2Img}
                        src={currentImageSrc}
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
                    {shouldLoadVideo ? (
                        <video
                            ref={videoRef}
                            className={styles.video}
                            muted
                            loop
                            playsInline
                            // ✅ في الموبايل ما يتحملش إلا عند النقر
                            preload={isMobile ? "none" : "metadata"}
                            // ✅ صورة مصغرة للموبايل فقط
                            poster={isMobile ? "/video-thumbnail.jpg" : undefined}
                        >
                            <source src={videoSrc} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>

                    ) : (
                        // صورة placeholder أثناء التحميل
                        <div className={styles.videoPlaceholder} style={{
                            width: '100%',
                            height: '100%',
                            background: 'linear-gradient(45deg, #f0f0f0, #e0e0e0)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#999'
                        }}>
                            Loading...
                        </div>
                    )}
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