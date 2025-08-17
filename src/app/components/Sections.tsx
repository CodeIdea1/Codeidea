'use client';

import { useEffect, useRef } from 'react';
import Image from "next/image";

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from '../styles/sections.module.css';
import { Smartphone, Zap, Layout, MousePointer, Smile, Heart } from "lucide-react";
import { FaReact, FaNodeJs, FaHtml5, FaCss3Alt, FaGitAlt } from "react-icons/fa";
import { SiNextdotjs, SiTypescript, SiJavascript, SiGreensock } from "react-icons/si";
import clsx from 'clsx';

gsap.registerPlugin(ScrollTrigger);

interface SectionsProps {
    animationDuration?: number;
    pinSpacing?: boolean;
}

export default function Sections({
    animationDuration = 2,
    pinSpacing = true,
}: SectionsProps) {
    const containerRef = useRef<HTMLElement>(null);
    const cardsWrapperRef = useRef<HTMLDivElement>(null);
    const cardsRefs = useRef<(HTMLDivElement | null)[]>([]);

    const phone1Ref = useRef<HTMLImageElement>(null);
    const phone2Ref = useRef<HTMLImageElement>(null);
    const phone3Ref = useRef<HTMLImageElement>(null);
    const phonesContainerRef = useRef<HTMLDivElement>(null);

    const setCardRef = (index: number) => (el: HTMLDivElement | null) => {
        cardsRefs.current[index] = el;
    };

    useEffect(() => {
        if (!containerRef.current || !cardsWrapperRef.current) return;

        const cards = cardsRefs.current.filter((card) => card !== null);
        if (cards.length === 0) return;

        const phones = [phone1Ref.current, phone2Ref.current, phone3Ref.current].filter(Boolean);

        const mm = gsap.matchMedia();

        mm.add("(min-width: 1025px)", () => {
            gsap.set(cards, { x: "140%" });

            if (phones.length >= 3) {
                gsap.set(phones[0], { x: 40 });
                gsap.set(phones[1], { x: 0 });
                gsap.set(phones[2], { x: -40 });
            }

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: `+=${window.innerHeight * 10}`,
                    scrub: 1.5,
                    pin: true,
                    pinSpacing: pinSpacing,
                    anticipatePin: 1,
                    markers: false,
                    refreshPriority: -1,
                    invalidateOnRefresh: true,
                },
            });

            cards.forEach((card, index) => {
                const cardCycleDuration = animationDuration * 3;
                const startTime = index * cardCycleDuration;

                tl.to(card, {
                    x: "0%",
                    duration: animationDuration,
                    ease: "power2.out",
                }, startTime);

                tl.to(card, {
                    x: "0%",
                    duration: animationDuration,
                    ease: "none",
                }, startTime + animationDuration);

                tl.to(card, {
                    x: "-140%",
                    duration: animationDuration,
                    ease: "power2.in",
                }, startTime + animationDuration * 2);
            });

            if (phones.length >= 3) {
                const cardFiveStartTime = 4 * (animationDuration * 3);
                const cardFiveDisplayTime = cardFiveStartTime + animationDuration;

                tl.to(phones[0], {
                    x: 0,
                    duration: animationDuration * 0.8,
                    ease: "power2.out"
                }, cardFiveDisplayTime);

                tl.to(phones[2], {
                    x: 0,
                    duration: animationDuration * 0.8,
                    ease: "power2.out"
                }, cardFiveDisplayTime);

                tl.to(phones[0], {
                    x: 40,
                    duration: animationDuration * 0.6,
                    ease: "power2.in"
                }, cardFiveDisplayTime + animationDuration * 1.2);

                tl.to(phones[2], {
                    x: -40,
                    duration: animationDuration * 0.6,
                    ease: "power2.in"
                }, cardFiveDisplayTime + animationDuration * 1.2);
            }

            tl.to({}, { duration: 1, ease: "none" });
        });

        mm.add("(min-width: 769px) and (max-width: 1024px)", () => {
            gsap.set(cards, {
                x: "0%",
                opacity: 0,
                y: 80,
                scale: 0.9
            });

            if (phones.length >= 3) {
                gsap.set(phones[0], { x: 40 });
                gsap.set(phones[1], { x: 0 });
                gsap.set(phones[2], { x: -40 });
            }

            if (containerRef.current) {
                containerRef.current.style.height = 'auto';
            }

            gsap.delayedCall(0.1, () => {
                cards.forEach((card, index) => {
                    if (!card) return;

                    gsap.to(card, {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 1.2,
                        ease: "power2.out",
                        delay: index * 0.15,
                        scrollTrigger: {
                            trigger: card,
                            start: "top 90%",
                            end: "bottom 10%",
                            toggleActions: "play none none reverse",
                            markers: false,
                            once: false,
                            refreshPriority: -1
                        }
                    });
                });
            });

            if (cards[4] && phones.length >= 3) {
                const tabletPhoneTimeline = gsap.timeline({
                    scrollTrigger: {
                        trigger: cards[4],
                        start: "top 80%",
                        end: "bottom 20%",
                        scrub: false,
                        toggleActions: "play none none reverse",
                        markers: false,
                        once: false
                    }
                });

                tabletPhoneTimeline.to(phones[0], {
                    x: 0,
                    duration: 0.8,
                    ease: "power2.out"
                }, 0.2);

                tabletPhoneTimeline.to(phones[2], {
                    x: 0,
                    duration: 0.8,
                    ease: "power2.out"
                }, 0.2);
            }
        });

        mm.add("(max-width: 768px)", () => {
            gsap.set(cards, {
                x: "0%",
                opacity: .7,
                y: 60,
                scale: 0.9
            });

            if (phones.length >= 3) {
                gsap.set(phones[0], { x: 0 });
                gsap.set(phones[1], { x: 0 });
                gsap.set(phones[2], { x: 0 });
            }

            if (containerRef.current) {
                containerRef.current.style.height = 'auto';
            }

            gsap.delayedCall(0.1, () => {
                cards.forEach((card, index) => {
                    if (!card) return;

                    gsap.to(card, {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 0.4,
                        ease: "power2.out",
                        delay: index * 0.2,
                        scrollTrigger: {
                            trigger: card,
                            start: "top 95%",
                            end: "bottom 5%",
                            toggleActions: "play none none reverse",
                            markers: false,
                            once: false,
                            refreshPriority: -1
                        }
                    });
                });
            });
        });

        return () => {
            mm.revert();
        };
    }, [animationDuration, pinSpacing]);

    return (
        <section ref={containerRef} className={styles.sectionsContainer}>
            <div ref={cardsWrapperRef} className={styles.cardsWrapper}>

                <div
                    ref={setCardRef(0)}
                    className={styles.card}
                    style={{ zIndex: 5 }}
                >
                    <div className={`${styles.cardContent} ${styles.cardOne}`}>
                        <video
                            className={styles.video}
                            autoPlay
                            loop
                            muted
                            playsInline
                            style={{
                                width: '100%',
                                borderRadius: '12px',
                                marginBottom: '2rem',
                            }}
                        >
                            <source src="/video.mp4" type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>

                        <h2 className={clsx(styles.cardTitle, 'secondTitle')}>Turning Ideas into Interactive Reality</h2>

                        <div className={`${styles.features} ${styles.videoFeatures}`}>
                            <div className={styles.featureItem}>
                                <MousePointer size={30} />
                                <h3>Smooth interactions</h3>
                                <p>
                                    Scroll, zoom, turn pages—even watch video—without any lag
                                </p>
                            </div>

                            <div className={styles.featureItem}>
                                <Smile size={30} />
                                <h3>A calm experience</h3>
                                <p>
                                    Stay connected with yourself and whats around you
                                </p>
                            </div>

                            <div className={styles.featureItem}>
                                <Heart size={30} />
                                <h3>For your health</h3>
                                <p>
                                    Say goodbye to eye-strain—designed for full sunlight and nighttime
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    ref={setCardRef(1)}
                    className={styles.card}
                    style={{ zIndex: 4 }}
                >
                    <div className={`${styles.cardContent} ${styles.cardTwo}`}>
                        <div className={styles.topRow}>
                            <div className={styles.item}>
                                <div className={styles.imageContainer}>
                                    <a href="https://stylish-accessories-3b34d.web.app/" target="_blank" rel="noopener noreferrer">
                                        <img src="/project1.webp" alt="Item 1" className={styles.itemImage} />
                                        <div className={styles.overlay}>
                                            <span className={clsx(styles.visitText, 'secondTitle')}>Visit Project</span>
                                        </div>
                                    </a>
                                </div>
                                <div className={styles.itemInfo}>
                                    <h4>E-Commerce Jewelry Store </h4>
                                    <p>Elegant online shop for custom jewelry, optimized for seamless shopping.</p>
                                </div>
                            </div>

                            <div className={styles.item}>
                                <div className={styles.imageContainer}>
                                    <a href="https://ferrari-sp40.web.app" target="_blank" rel="noopener noreferrer">
                                        <img src="/project2.webp" alt="Item 2" className={styles.itemImage} />
                                        <div className={styles.overlay}>
                                            <span className={clsx(styles.visitText, 'secondTitle')}>Visit Project</span>
                                        </div>
                                    </a>
                                </div>
                                <div className={styles.itemInfo}>
                                    <h4>Luxury Car Showcase</h4>
                                    <p>Immersive web experience to highlight high-end sports cars in style.</p>
                                </div>
                            </div>

                            <div className={styles.item}>
                                <div className={styles.imageContainer}>
                                    <a href="https://codeidea-67a15.firebaseapp.com/" target="_blank" rel="noopener noreferrer">
                                        <img src="/project3.webp" alt="Item 3" className={styles.itemImage} />
                                        <div className={styles.overlay}>
                                            <span className={clsx(styles.visitText, 'secondTitle')}>Visit Project</span>
                                        </div>
                                    </a>
                                </div>
                                <div className={styles.itemInfo}>
                                    <h4>Creative Agency</h4>
                                    <p>Modern, interactive platform to showcase agency services and portfolio.</p>
                                </div>
                            </div>
                        </div>

                        <div className={styles.bottomRow}>
                            <h2 className={clsx(styles.bigTitle, 'seconTitle')}>A Glimpse into My <br /> Creative Work</h2>
                            <p className={styles.bottomRowDescription}>
                                From sleek e-commerce stores to immersive showcases, we craft
                                custom websites that engage, inspire, and deliver exceptional user experiences.
                            </p>
                        </div>
                    </div>
                </div>

                <div
                    ref={setCardRef(2)}
                    className={styles.card}
                    style={{ zIndex: 3 }}
                >
                    <div className={`${styles.cardContent} ${styles.cardThree}`}>
                        <div className={styles.leftSection}>
                            <h2 className={clsx(styles.title, 'secondTitle')}>What We Build With</h2>
                            <p className={styles.description}>
                                Modern frameworks, clean code, and scalable architecture.
                            </p>
                            <div className={styles.iconGrid}>
                                <div className={styles.iconBox}><FaReact title="React" /></div>
                                <div className={styles.iconBox}><SiNextdotjs title="Next.js" /></div>
                                <div className={styles.iconBox}><SiJavascript title="JavaScript" /></div>
                                <div className={styles.iconBox}><SiTypescript title="TypeScript" /></div>
                                <div className={styles.iconBox}><FaHtml5 title="HTML5" /></div>
                                <div className={styles.iconBox}><FaCss3Alt title="CSS3" /></div>
                                <div className={styles.iconBox}><SiGreensock title="GSAP" /></div>
                                <div className={styles.iconBox}><FaNodeJs title="Node.js" /></div>
                                <div className={styles.iconBox}><FaGitAlt title="Git" /></div>
                            </div>
                        </div>

                        <div className={styles.rightSection}>
                            <img src="/project111.webp" alt="Working on code" className={styles.image} />
                        </div>
                    </div>
                </div>

                <div
                    ref={setCardRef(3)}
                    className={`${styles.card} ${styles.cardWithBackground}`}
                    style={{ zIndex: 2 }}
                >
                    <div className={`${styles.cardContent} ${styles.cardFour}`}>
                        <div className={styles.cardFourContent}>
                            <h2 className={clsx(styles.cardFourTitle, 'secondTitle')}> Its a digital space <br /> made for people.</h2>
                            <div className={styles.cardFourDescription}>
                                <p>Crafted to engage users with clean visuals and intuitive navigation.</p>
                                <p>No matter the screen size, the experience stays effortless and captivating.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    ref={setCardRef(4)}
                    className={styles.card}
                    style={{ zIndex: 1 }}
                >
                    <div className={`${styles.cardContent} ${styles.cardFive}`}>
                        <div className={styles.content}>
                            <div ref={phonesContainerRef} className={`${styles.phonesContainer} ${styles.flexCenter}`}>
                                <Image
                                    ref={phone1Ref}
                                    className={styles.phone1}
                                    src="/phone1.webp"
                                    alt="Phone 1"
                                    width={200}
                                    height={400}
                                />
                                <Image
                                    ref={phone2Ref}
                                    className={styles.phone2}
                                    src="/phone2.webp"
                                    alt="Phone 2"
                                    width={200}
                                    height={400}
                                />
                                <Image
                                    ref={phone3Ref}
                                    className={styles.phone3}
                                    src="/phone3.webp"
                                    alt="Phone 3"
                                    width={200}
                                    height={400}
                                />
                            </div>
                        </div>

                        <div className={styles.cardFiveFeatures}>
                            <div className={styles.featureItem}>
                                <div className={styles.iconColumn}>
                                    <Smartphone size={32} />
                                </div>
                                <div className={styles.textColumn}>
                                    <h3>Mobile-First Design</h3>
                                    <p>Perfect on any screen—from phones to desktops.</p>
                                </div>
                            </div>

                            <div className={styles.featureItem}>
                                <div className={styles.iconColumn}>
                                    <Zap size={32} />
                                </div>
                                <div className={styles.textColumn}>
                                    <h3>Lightning-Fast Performance</h3>
                                    <p>Smooth, instant, and optimized for every device.</p>
                                </div>
                            </div>

                            <div className={styles.featureItem}>
                                <div className={styles.iconColumn}>
                                    <Layout size={32} />
                                </div>
                                <div className={styles.textColumn}>
                                    <h3>Consistent Experience</h3>
                                    <p>Reliable and consistent on every platform.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}