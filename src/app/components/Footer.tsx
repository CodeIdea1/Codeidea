'use client'
import React, { useRef } from 'react';
import styles from '../styles/footer.module.css';
import { FaInstagram, FaLinkedin, FaVimeoV } from "react-icons/fa";
import clsx from 'clsx';
import Swal from 'sweetalert2';

import { database } from '../lib/firebase';
import { ref, push } from "firebase/database";

const Footer: React.FC = () => {
    const contactSectionRef = useRef<HTMLDivElement | null>(null);

    const scrollToForm = () => {
        contactSectionRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const isValidEmail = (email: string): boolean => {

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!emailRegex.test(email)) {
            return false;
        }

        const validExtensions = ['.com', '.net', '.org'];

        return validExtensions.some(ext => email.toLowerCase().endsWith(ext));
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

        if (!data.name.trim() || !data.email.trim() || !data.contact.trim() || !data.project.trim()) {
            Swal.fire({
                title: 'Missing Information',
                text: 'Please fill out all fields before submitting',
                icon: 'error',
                confirmButtonText: 'OK',
                confirmButtonColor: '#069ca7',
                showCloseButton: true,
                background: '#fff',
                color: '#333'
            });
            return;
        }

        if (!isValidEmail(data.email.trim())) {
            Swal.fire({
                title: 'Invalid Email',
                text: 'Please enter a valid email address (e.g., example@gmail.com)',
                icon: 'error',
                confirmButtonText: 'OK',
                confirmButtonColor: '#069ca7',
                showCloseButton: true,
                background: '#fff',
                color: '#333'
            });
            return;
        }

        try {
            const contactsRef = ref(database, "contacts");
            await push(contactsRef, data);

            Swal.fire({
                title: 'Success!',
                text: 'Your message has been sent successfully!',
                icon: 'success',
                showConfirmButton: false,
                timer: 2500,
                timerProgressBar: true,
                toast: true,
                position: 'top-end',
                background: '#069ca7',
                color: '#fff',
                iconColor: '#fff'
            });

            form.reset();
        } catch (err) {
            console.error("Error sending data: ", err);

            Swal.fire({
                title: 'Error',
                text: 'An error occurred while sending. Please try again.',
                icon: 'error',
                confirmButtonText: 'OK',
                confirmButtonColor: '#069ca7',
                showCloseButton: true,
                background: '#fff',
                color: '#333'
            });
        }
    };

    return (
        <footer className={styles.footer} id='footer'>
            <div className={styles.container}>

                <div className={styles.orderSection}>
                    <h1 className={clsx(styles.logo, 'title')}>Codeidea</h1>

                    <p className={styles.shippingText}>Ships within 2-3 business days</p>
                </div>

                <div className={styles.footerContent}>




                    <div ref={contactSectionRef} className={styles.contactSection}>
                        <h4 className={clsx(styles.newsletterTitle, 'secondTitle')}>Get in Touch</h4>
                        <form onSubmit={handleSubmit} className={styles.contactForm}>
                            <input type="text" name="name" placeholder="Your Name" className={styles.inputField} required />
                            <input type="email" name="email" placeholder="Your Email" className={styles.inputField} required />
                            <input type="text" name="contact" placeholder="Your Contact Details" className={styles.inputField} />
                            <textarea name="project" placeholder="Project details (website type, features, business info...)" className={styles.textareaField} required />
                            <button type="submit" className={styles.submitButton}>Submit</button>
                        </form>
                    </div>



                    <div className={styles.linksSection}>
                        <div className={styles.navigationColumn}>
                            <h4 className={styles.columnTitle}>NAVIGATION</h4>
                            <ul className={styles.linksList}>
                                <a href="#hero" className={styles.link}>Home</a>
                                <li><a href="#" className={styles.link}>Projects</a></li>
                                <li><a href="#" className={styles.link}>Guides</a></li>
                                <li><a href="#" className={styles.link}>FAQ</a></li>
                            </ul>
                        </div>

                        <div className={styles.aboutColumn}>
                            <h4 className={styles.columnTitle}>WHO WE ARE</h4>
                            <p className={styles.aboutText}>Turning Ideas Into Websites</p>
                        </div>

                        <div className={styles.socialColumn}>
                            <h4 className={styles.columnTitle}>SOCIALS</h4>
                            <div className={styles.socialIcons}>
                                <a href="https://www.instagram.com/_codeidea_/" target="_blank" rel="noopener noreferrer">
                                    <FaInstagram size={22} />
                                </a>
                                <a href="https://linkedin.com/in/..." target="_blank" rel="noopener noreferrer">
                                    <FaLinkedin size={22} />
                                </a>
                                <a href="https://vimeo.com/saja99" target="_blank" rel="noopener noreferrer">
                                    <FaVimeoV size={22} />
                                </a>
                            </div>
                        </div>
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
