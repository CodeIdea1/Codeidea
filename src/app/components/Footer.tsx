'use client'
import React, { useRef } from 'react';
import styles from '../styles/footer.module.css';
import { FaInstagram, FaLinkedin, FaVimeoV } from "react-icons/fa";
import clsx from 'clsx';

// ✅ Firebase Realtime Database
import { database } from '../lib/firebase';
import { ref, push } from "firebase/database";

const Footer: React.FC = () => {
    const contactSectionRef = useRef<HTMLDivElement | null>(null);

    const scrollToForm = () => {
        contactSectionRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);

        const data = {
            name: formData.get("name") as string,
            email: formData.get("email") as string,
            contact: formData.get("contact") as string,
            project: formData.get("project") as string,
            createdAt: new Date().toISOString(),
        };

        try {
            const contactsRef = ref(database, "contacts");
            await push(contactsRef, data);
            alert("✅ تم إرسال بياناتك بنجاح!");
            form.reset();
        } catch (err) {
            console.error("Error sending data: ", err);
            alert("❌ حدث خطأ أثناء الإرسال. حاول مرة أخرى.");
        }
    };

    return (
        <footer className={styles.footer}>
            <div className={styles.container}>

                {/* Section العلوي */}
                <div className={styles.orderSection}>
                    <h1 className={clsx(styles.logo, 'title')}>Codeidea</h1>
                    <button onClick={scrollToForm} className={styles.orderButton}>
                        GET IN TOUCH
                    </button>
                    <p className={styles.shippingText}>Ships within 2-3 business days</p>
                </div>

                {/* باقي محتوى الفوتر */}
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
                                <a href="https://instagram.com/..." target="_blank" rel="noopener noreferrer">
                                    <FaInstagram size={22} />
                                </a>
                                <a href="https://linkedin.com/in/..." target="_blank" rel="noopener noreferrer">
                                    <FaLinkedin size={22} />
                                </a>
                                <a href="https://vimeo.com/..." target="_blank" rel="noopener noreferrer">
                                    <FaVimeoV size={22} />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ✅ Contact Form */}
                <div ref={contactSectionRef} className={styles.contactSection}>
                    <h4 className={styles.newsletterTitle}>Get in Touch</h4>
                    <form onSubmit={handleSubmit} className={styles.contactForm}>
                        <input type="text" name="name" placeholder="Your Name" className={styles.inputField} required />
                        <input type="email" name="email" placeholder="Your Email" className={styles.inputField} required />
                        <input type="text" name="contact" placeholder="Your Contact Details" className={styles.inputField} />
                        <textarea name="project" placeholder="Project details (website type, features, business info...)" className={styles.textareaField} required />
                        <button type="submit" className={styles.submitButton}>Submit</button>
                    </form>
                </div>

                {/* Bottom Section */}
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
