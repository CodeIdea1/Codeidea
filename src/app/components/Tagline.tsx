'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from '../styles/tagline.module.css';
import clsx from 'clsx';

gsap.registerPlugin(ScrollTrigger);

interface TaglineProps {
    animationDuration?: number;
    pinSpacing?: boolean;
    imageSource?: string;
    initialImageScale?: number;
    imageAnimationMultiplier?: number;
    scrollHeight?: number;
    imageTranslateX?: string;
}

export default function Tagline({
    animationDuration = 2,
    pinSpacing = true,
    imageSource = '/tablet2.png',
    initialImageScale = 30,
    imageAnimationMultiplier = 6,
    scrollHeight = 15,
    imageTranslateX = '-50%'
}: TaglineProps) {
    const sectionRef = useRef<HTMLElement>(null);
    const taglineRef = useRef<HTMLParagraphElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);
    const textContentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!sectionRef.current || !taglineRef.current || !imageRef.current || !textContentRef.current) return;

        const tagline = taglineRef.current;
        const image = imageRef.current;
        const textContent = textContentRef.current;

        const taglineText = tagline.textContent || '';
        const words = taglineText.split(' ');

        tagline.innerHTML = words.map(word =>
            `<span class="${styles.taglineWord}">${word}</span>`
        ).join(' ');

        const taglineWords = tagline.querySelectorAll(`.${styles.taglineWord}`);

        const title = textContent.querySelector('h2');
        const subtitle = textContent.querySelector('p');
        const features = textContent.querySelectorAll('.feature');
        const featureIcons = textContent.querySelectorAll('.feature-icon');
        const featureTitles = textContent.querySelectorAll('.feature-title');
        const featureDescriptions = textContent.querySelectorAll('.feature-description');

        gsap.set(tagline, {
            x: '0%'
        });

        gsap.set(taglineWords, {
            opacity: 0,
            y: 50,
            rotationX: -90,
            color: '#ffffff'
        });

        gsap.set(textContent, {
            opacity: 0,
            x: '100%'
        });

        gsap.set([title, subtitle], {
            opacity: 0,
            y: 30
        });

        gsap.set(features, {
            opacity: 0,
            x: 50,
            y: 20
        });

        const mm = gsap.matchMedia();

        mm.add("(max-width: 480px)", () => {
            gsap.set(image, {
                scale: 15,
                opacity: 0,
                x: '0%'
            });

            if (imageRef.current?.parentElement) {
                gsap.set(imageRef.current.parentElement, {
                    x: '0%'
                });
            }

            gsap.set(tagline, {
                fontSize: '18px',
                width: '90%',
                top: '45%'
            });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top top',
                    end: `+=${window.innerHeight * scrollHeight}`,
                    scrub: .4,
                    pin: true,
                    pinSpacing: pinSpacing,
                    anticipatePin: 1,
                    markers: false,
                    refreshPriority: -1,
                    invalidateOnRefresh: true
                }
            });

            tl.to(taglineWords, {
                opacity: 1,
                y: 0,
                rotationX: 0,
                duration: 3,
                stagger: {
                    amount: 0.6,
                    from: "start"
                },
                ease: 'power1.out'
            })
                .to(taglineWords, {
                    opacity: 1,
                    duration: 0.4,
                    ease: 'none'
                })
                .to([image, taglineWords], {
                    opacity: 1,
                    color: '#000000',
                    duration: animationDuration * imageAnimationMultiplier * 0.1,
                    ease: 'power0.1.in'
                }, "-=0.3")
                .to(image, {
                    scale: 1.4,
                    duration: animationDuration * imageAnimationMultiplier * 1.1,
                    ease: 'power0.1.out'
                }, "-=6")
                .to(image, {
                    scale: 1.4,
                    opacity: 1,
                    duration: animationDuration * 1.5,
                    ease: 'none'
                })
                .to(tagline, {
                    x: '-120%',
                    opacity: 0,
                    duration: 2,
                    ease: 'power2.inOut'
                }, "-=2")
                .to(imageRef.current?.parentElement || imageRef.current, {
                    x: '-80%',
                    opacity: 0,
                    duration: 2,
                    ease: 'power2.inOut'
                }, "<")
                .to(textContent, {
                    opacity: 1,
                    x: '0%',
                    duration: 1.5,
                    ease: 'power2.out'
                }, "-=1.5")
                .to(title, {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: 'power2.out'
                }, "-=1")
                .to(subtitle, {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: 'power2.out'
                }, "-=0.7")
                .to(features, {
                    opacity: 1,
                    x: 0,
                    y: 0,
                    duration: 1.2,
                    stagger: {
                        amount: 0.8,
                        from: "start"
                    },
                    ease: 'power2.out'
                }, "-=0.5")
                .to([textContent], {
                    duration: 2,
                    ease: 'none'
                });

        });

        mm.add("(min-width: 481px) and (max-width: 768px)", () => {
            gsap.set(image, {
                scale: 20,
                opacity: 0,
                x: '0%'
            });

            if (imageRef.current?.parentElement) {
                gsap.set(imageRef.current.parentElement, {
                    x: '0%'
                });
            }

            gsap.set(tagline, {
                fontSize: '24px',
                width: '80%',
                top: '50%'
            });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top top',
                    end: `+=${window.innerHeight * scrollHeight}`,
                    scrub: .4,
                    pin: true,
                    pinSpacing: pinSpacing,
                    anticipatePin: 1,
                    markers: false,
                    refreshPriority: -1,
                    invalidateOnRefresh: true
                }
            });

            tl.to(taglineWords, {
                opacity: 1,
                y: 0,
                rotationX: 0,
                duration: 3,
                stagger: {
                    amount: 0.6,
                    from: "start"
                },
                ease: 'power1.out'
            })
                .to(taglineWords, {
                    opacity: 1,
                    duration: 0.4,
                    ease: 'none'
                })
                .to([image, taglineWords], {
                    opacity: 1,
                    color: '#000000',
                    duration: animationDuration * imageAnimationMultiplier * 0.1,
                    ease: 'power0.1.in'
                }, "-=0.3")
                .to(image, {
                    scale: 1.2,
                    duration: animationDuration * imageAnimationMultiplier * 1.1,
                    ease: 'power0.1.out'
                }, "-=6")
                .to(image, {
                    scale: 1.2,
                    opacity: 1,
                    duration: animationDuration * 1.5,
                    ease: 'none'
                })
                .to(tagline, {
                    x: '-100%',
                    opacity: 0,
                    duration: 2,
                    ease: 'power2.inOut'
                }, "-=2")
                .to(imageRef.current?.parentElement || imageRef.current, {
                    x: '-70%',
                    opacity: 0,
                    duration: 2,
                    ease: 'power2.inOut'
                }, "<")
                .to(textContent, {
                    opacity: 1,
                    x: '0%',
                    duration: 1.5,
                    ease: 'power2.out'
                }, "-=1.5")
                .to(title, {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: 'power2.out'
                }, "-=1")
                .to(subtitle, {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: 'power2.out'
                }, "-=0.7")
                .to(features, {
                    opacity: 1,
                    x: 0,
                    y: 0,
                    duration: 1.2,
                    stagger: {
                        amount: 0.8,
                        from: "start"
                    },
                    ease: 'power2.out'
                }, "-=0.5")
                .to([textContent], {
                    duration: 2,
                    ease: 'none'
                });

        });

        mm.add("(min-width: 769px)", () => {
            gsap.set(image, {
                scale: initialImageScale,
                opacity: 0,
                x: '0%'
            });

            if (imageRef.current?.parentElement) {
                gsap.set(imageRef.current.parentElement, {
                    x: '0%'
                });
            }

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top top',
                    end: `+=${window.innerHeight * scrollHeight}`,
                    scrub: .4,
                    pin: true,
                    pinSpacing: pinSpacing,
                    anticipatePin: 1,
                    markers: false,
                    refreshPriority: -1,
                    invalidateOnRefresh: true
                }
            });

            tl.to(taglineWords, {
                opacity: 1,
                y: 0,
                rotationX: 0,
                duration: 3,
                stagger: {
                    amount: 0.6,
                    from: "start"
                },
                ease: 'power1.out'
            })
                .to(taglineWords, {
                    opacity: 1,
                    duration: 0.4,
                    ease: 'none'
                })
                .to([image, taglineWords], {
                    opacity: 1,
                    color: '#000000',
                    duration: animationDuration * imageAnimationMultiplier * 0.1,
                    ease: 'power0.1.in'
                }, "-=0.3")
                .to(image, {
                    scale: 1,
                    duration: animationDuration * imageAnimationMultiplier * 1.1,
                    ease: 'power0.1.out'
                }, "-=6")
                .to(image, {
                    scale: 1,
                    opacity: 1,
                    duration: animationDuration * 1.5,
                    ease: 'none'
                })
                .to(tagline, {
                    x: '-110%',
                    duration: 2,
                    ease: 'power2.inOut'
                }, "-=2")
                .to(imageRef.current?.parentElement || imageRef.current, {
                    x: imageTranslateX,
                    duration: 2,
                    ease: 'power2.inOut'
                }, "<")
                .to(textContent, {
                    opacity: 1,
                    x: '0%',
                    duration: 1.5,
                    ease: 'power2.out'
                }, "-=1.5")
                .to(title, {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: 'power2.out'
                }, "-=1")
                .to(subtitle, {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: 'power2.out'
                }, "-=0.7")
                .to(features, {
                    opacity: 1,
                    x: 0,
                    y: 0,
                    duration: 1.2,
                    stagger: {
                        amount: 0.8,
                        from: "start"
                    },
                    ease: 'power2.out'
                }, "-=0.5")
                .to([textContent], {
                    duration: 2,
                    ease: 'none'
                });

        });

        return () => {
            mm.revert();
            ScrollTrigger.getAll().forEach(st => {
                if (st.trigger === sectionRef.current) {
                    st.kill();
                }
            });
        };
    }, [animationDuration, pinSpacing, imageSource, initialImageScale, imageAnimationMultiplier, scrollHeight, imageTranslateX]);

    return (
        <section ref={sectionRef} className={styles.taglineSection}>
            <div ref={contentRef} className={styles.container}>
                <div className={styles.content}>
                    <p ref={taglineRef} className={clsx(styles.tagline, 'title')}>
                        Crafting digital experiences that inspire, engage, and transform your vision into extraordinary realities.
                    </p>

                    <div className={styles.mainContent}>
                        <div className={styles.imageContainer}>
                            <img
                                ref={imageRef}
                                src={imageSource}
                                alt="Hero Image"
                                className={styles.imageSource}
                            />
                        </div>

                        <div ref={textContentRef} className={styles.textContent}>
                            <h2 className={clsx(styles.title, 'secondTitle')}>Innovative Web Design</h2>
                            <p className={styles.subtitle}>
                                We create modern, high-performing websites that captivate your audience and elevate your brand.
                            </p>

                            <div className={styles.features}>
                                <div className="feature">
                                    <div className="feature-icon">🌟</div>
                                    <div className={styles.featureText}>
                                        <h3 className={styles.featureTitle}>Creative UI</h3>
                                        <p className={styles.featureDescription}>Unique and engaging designs tailored to your brand identity.</p>
                                    </div>
                                </div>

                                <div className="feature">
                                    <div className="feature-icon">⚡</div>
                                    <div className={styles.featureText}>
                                        <h3 className={styles.featureTitle}>High Performance</h3>
                                        <p className={styles.featureDescription}>Optimized for speed, SEO, and flawless user experience.</p>
                                    </div>
                                </div>

                                <div className="feature">
                                    <div className="feature-icon">📱</div>
                                    <div className={styles.featureText}>
                                        <h3 className={styles.featureTitle}>Fully Responsive</h3>
                                        <p className={styles.featureDescription}>Perfect look and function on any device or screen size.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}