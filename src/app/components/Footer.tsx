import React from 'react';
import styles from '../styles/footer.module.css';
import { FaInstagram, FaLinkedin, FaVimeoV } from "react-icons/fa";

import clsx from 'clsx';

const Footer: React.FC = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>

                <div className={styles.orderSection}>
                    <h1 className={clsx(styles.logo, 'title')}>Codeidea</h1>
                    <button className={styles.orderButton}>
                        GET IN TOUCH
                    </button>
                    <p className={styles.shippingText}>Ships within 2-3 business days</p>
                </div>


                <div className={styles.footerContent}>

                    <div className={clsx(styles.description, 'title')}>
                        Custom Websites <br /> That Elevate <br /> Your Business
                    </div>


                    <div className={styles.linksSection}>
                        <div className={styles.navigationColumn}>
                            <h4 className={styles.columnTitle}>NAVIGATION</h4>
                            <ul className={styles.linksList}>
                                <li><a href="#" className={styles.link}>Home</a></li>
                                <li><a href="#" className={styles.link}>Product</a></li>
                                <li><a href="#" className={styles.link}>Guides</a></li>
                                <li><a href="#" className={styles.link}>FAQ</a></li>
                            </ul>
                        </div>

                        <div className={styles.aboutColumn}>
                            <h4 className={styles.columnTitle}>WHO WE ARE</h4>
                            <p className={styles.aboutText}>A more caring computer company</p>
                        </div>

                        <div className={styles.socialColumn}>
                            <h4 className={styles.columnTitle}>SOCIALS</h4>
                            <div className={styles.socialIcons}>
                                <a href="https://instagram.com/..." aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                                    <FaInstagram size={22} />
                                </a>
                                <a href="https://linkedin.com/in/..." aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                                    <FaLinkedin size={22} />
                                </a>
                                <a href="https://vimeo.com/..." aria-label="Vimeo" target="_blank" rel="noopener noreferrer">
                                    <FaVimeoV size={22} />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.newsletterSection}>
                    <h4 className={styles.newsletterTitle}>GET UPDATES</h4>
                    <div className={styles.newsletterForm}>
                        <input
                            type="email"
                            placeholder="E-MAIL"
                            className={styles.emailInput}
                        />
                        <button className={styles.updateButton}>GET UPDATES</button>
                    </div>
                </div>

                <div className={styles.bottomSection}>
                    <div className={styles.copyright}>
                        <p>© 2025 • Codeidea — Creative Web Solutions • Crafted by Saja Ahmed</p>
                    </div>
                    <div className={styles.legalLinks}>
                        <a href="#" className={styles.legalLink}>Privacy Policy</a>
                        <span className={styles.separator}>•</span>
                        <a href="#" className={styles.legalLink}>Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;