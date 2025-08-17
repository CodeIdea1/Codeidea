'use client';
import Image from 'next/image';
import { useState, ChangeEvent, KeyboardEvent, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from '../styles/header.module.css';
import clsx from 'clsx'

gsap.registerPlugin(ScrollTrigger);

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');
    const newsletterRef = useRef<HTMLDivElement>(null);

    const toggleMenu = (): void => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleSubscribe = (): void => {
        if (email.trim()) {
            console.log('Subscribe email:', email);
            setEmail('');
            alert('تم الاشتراك بنجاح!');
        }
    };

    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setEmail(e.target.value);
    };

    const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>): void => {
        if (e.key === 'Enter') {
            handleSubscribe();
        }
    };

    useEffect(() => {
        if (!newsletterRef.current) return;

        const navLinksElement = document.querySelector(`.${styles.navLinks}`);

        gsap.set(newsletterRef.current, {
            y: 0,
        });

        if (navLinksElement) {
            gsap.set(navLinksElement, {
                borderRadius: "10px 10px 0 0"
            });
        }

        const scrollTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: document.body,
                start: "top -50px",
                end: "top -100px",
                scrub: 1,
                onUpdate: (self) => {
                }
            }
        });

        scrollTimeline.to(newsletterRef.current, {
            y: -50,
            height: 40,
            duration: 0.3,
            ease: "power2.out"
        }, 2);

        if (navLinksElement) {
            scrollTimeline.to(navLinksElement, {
                borderRadius: "10px",
                duration: 0.3,
                ease: "power2.out"
            }, 2);
        }

        return () => {
            scrollTimeline.kill();
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    return (
        <>
            <header className={styles.header}>
                <div className={styles.container}>
                    <div className={styles.logo}>
                        <Image
                            src='/logo.webp'
                            alt='logo'
                            width={70}
                            height={70}
                        />
                    </div>

                    <nav className={styles.desktopNav}>
                        <div className={styles.navLinks}>
                            <a href="#" className={`${styles.navLink} ${styles.active}`}>Home</a>
                            <a href="#" className={styles.navLink}>Product</a>
                            <a href="#" className={styles.navLink}>FAQ</a>
                            <button className={styles.orderBtn}>GET IN TOUCH</button>
                        </div>

                        <hr className={styles.hrLine} />

                        <div
                            ref={newsletterRef}
                            className={styles.newsletterSection}
                        >
                            <div className={styles.newsletterHeader}>
                                <h3 className={clsx(styles.newsletterTitle, 'title')}>Newsletter</h3>
                                <p className={styles.newsletterSubtitle}>GET UPDATES • NO SPAM</p>
                            </div>

                            <div className={styles.emailForm}>
                                <input
                                    type="email"
                                    placeholder="E-MAIL"
                                    value={email}
                                    onChange={handleEmailChange}
                                    className={styles.emailInput}
                                    onKeyPress={handleKeyPress}
                                />
                                <button onClick={handleSubscribe} className={styles.subscribeBtn}>
                                    SUBSCRIBE
                                </button>
                            </div>
                        </div>
                    </nav>
                </div>
            </header>

            <header className={styles.mobileHeader}>
                <div className={styles.mobileContainer}>
                    <div className={styles.logo}>
                        <Image
                            src='/logo.webp'
                            alt='logo'
                            width={50}
                            height={50}
                        />
                    </div>

                    <div className={styles.mobileNavSection}>
                        <button className={styles.mobileOrderBtn}>GET IN TOUCH</button>

                        <button
                            className={`${styles.hamburger} ${isMenuOpen ? styles.active : ''}`}
                            onClick={toggleMenu}
                            aria-label="Toggle menu"
                        >
                            <div className={styles.hamburgerLine}></div>
                            <div className={styles.hamburgerLine}></div>
                            <div className={styles.hamburgerLine}></div>
                        </button>
                    </div>
                </div>

                <div className={`${styles.mobileMenu} ${isMenuOpen ? styles.mobileMenuOpen : ''}`}>
                    <nav>
                        <a href="#" className={styles.mobileNavLink} onClick={toggleMenu}>Home</a>
                        <a href="#" className={styles.mobileNavLink} onClick={toggleMenu}>Product</a>
                        <a href="#" className={styles.mobileNavLink} onClick={toggleMenu}>FAQ</a>
                    </nav>

                    <div className={styles.mobileNewsletterSection}>
                        <h3 className={styles.mobileNewsletterTitle}>Newsletter</h3>
                        <p className={styles.mobileNewsletterSubtitle}>GET UPDATES • NO SPAM</p>

                        <div className={styles.emailForm}>
                            <input
                                type="email"
                                placeholder="E-MAIL"
                                value={email}
                                onChange={handleEmailChange}
                                className={styles.emailInput}
                                onKeyPress={handleKeyPress}
                            />
                            <button onClick={handleSubscribe} className={styles.subscribeBtn}>
                                SUBSCRIBE
                            </button>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
}