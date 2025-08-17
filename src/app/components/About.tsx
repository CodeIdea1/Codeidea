'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from '../styles/about.module.css';
import clsx from 'clsx';

gsap.registerPlugin(ScrollTrigger);

interface AboutProps {
    animationDuration?: number;
    pinSpacing?: boolean;
}

export default function About({
    animationDuration = 2,
    pinSpacing = true
}: AboutProps) {
    const sectionRef = useRef<HTMLElement>(null);
    const description1Ref = useRef<HTMLParagraphElement>(null);
    const visionDescription1Ref = useRef<HTMLParagraphElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!sectionRef.current || !description1Ref.current || !visionDescription1Ref.current) return;

        const description1 = description1Ref.current;
        const visionDescription1 = visionDescription1Ref.current;

        const desc1Text = description1.textContent || '';
        description1.innerHTML = desc1Text.split(' ').map(word =>
            `<span class="${styles.descWord}" style="opacity: 0;">${word}</span>`
        ).join(' ');

        const visionDesc1Text = visionDescription1.textContent || '';
        visionDescription1.innerHTML = visionDesc1Text.split(' ').map(word =>
            `<span class="${styles.descWord}" style="opacity: 0;">${word}</span>`
        ).join(' ');

        const desc1Words = description1.querySelectorAll(`.${styles.descWord}`);
        const visionDesc1Words = visionDescription1.querySelectorAll(`.${styles.descWord}`);

        gsap.set(visionDescription1, { opacity: 0 });

        const mm = gsap.matchMedia();

        mm.add({
            isMobile: "(max-width: 768px)",
            isTablet: "(max-width: 1024px) and (min-width: 769px)",
            isDesktop: "(min-width: 1025px)"
        }, (context) => {
            const { isMobile, isTablet } = context.conditions || {};

            const getHeaderHeight = () => {
                const header = document.querySelector('header');
                return header?.offsetHeight || 80;
            };

            const headerHeight = getHeaderHeight();

            let sectionHeight;
            if (isMobile && window.innerWidth <= 480) {
                sectionHeight = window.innerHeight * 1.2;
            } else if (isMobile) {
                sectionHeight = window.innerHeight * 1.4;
            } else if (isTablet) {
                sectionHeight = window.innerHeight * 2.5;
            } else {
                sectionHeight = window.innerHeight * 4;
            }

            const wordAnimationDuration = isMobile ? 0.04 : 0.1;
            const pauseDuration = isMobile ? 0.15 : 0.5;

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: isMobile ? 'top top' : `top+=${headerHeight} top`,
                    end: `+=${sectionHeight}`,
                    scrub: 1,
                    pin: true,
                    pinSpacing: pinSpacing,
                    anticipatePin: 1,
                    markers: false,
                    refreshPriority: -1,
                    invalidateOnRefresh: true,
                    onRefresh: () => {
                        const newHeaderHeight = getHeaderHeight();
                        let newSectionHeight;

                        if (isMobile && window.innerWidth <= 480) {
                            newSectionHeight = window.innerHeight * 1.2;
                        } else if (isMobile) {
                            newSectionHeight = window.innerHeight * 1.4;
                        } else if (isTablet) {
                            newSectionHeight = window.innerHeight * 2.5;
                        } else {
                            newSectionHeight = window.innerHeight * 4;
                        }

                        if (tl.scrollTrigger) {
                            tl.scrollTrigger.vars.start = isMobile ? 'top top' : `top+=${newHeaderHeight} top`;
                            tl.scrollTrigger.vars.end = `+=${newSectionHeight}`;
                        }
                    }
                }
            });

            desc1Words.forEach((word, index) => {
                tl.to(word, {
                    opacity: 1,
                    duration: wordAnimationDuration,
                    ease: 'none'
                });
            });

            tl.to({}, { duration: pauseDuration });

            desc1Words.forEach((word, index) => {
                tl.to(word, {
                    opacity: 0,
                    duration: wordAnimationDuration,
                    ease: 'none'
                });
            });

            tl.set(description1, { opacity: 0 })
                .set(visionDescription1, { opacity: 1 });

            visionDesc1Words.forEach((word, index) => {
                tl.to(word, {
                    opacity: 1,
                    duration: wordAnimationDuration,
                    ease: 'none'
                });
            });

            return () => {
                tl.scrollTrigger?.kill();
                tl.kill();
            };
        });

        const handleResize = () => {
            setTimeout(() => {
                ScrollTrigger.refresh();
            }, 150);
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('orientationchange', handleResize);

        return () => {
            mm.kill();
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('orientationchange', handleResize);
        };
    }, [animationDuration, pinSpacing]);

    return (
        <section ref={sectionRef} className={styles.aboutSection}>
            <div ref={contentRef} className={styles.container}>
                <div className={styles.content}>
                    <p ref={description1Ref} className={clsx(styles.description, 'secondTitle')}>
                        Crafting unforgettable digital journeys where creativity meets technology.
                    </p>

                    <p ref={visionDescription1Ref} className={clsx(styles.description, 'secondTitle')} style={{ position: 'absolute', top: 0, left: 0, right: 0, opacity: 0 }}>
                        Empowering brands with designs that inspire and experiences that last.
                    </p>
                </div>
            </div>
        </section>
    );
}