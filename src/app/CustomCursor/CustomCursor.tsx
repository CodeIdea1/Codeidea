'use client';

import { useState, useEffect } from 'react';
import styles from '../styles/CustomCursor.module.css';

interface CursorPosition {
    x: number;
    y: number;
}

const CustomCursor: React.FC = () => {
    const [position, setPosition] = useState<CursorPosition>({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState<boolean>(false);
    const [isVisible, setIsVisible] = useState<boolean>(false);

    useEffect(() => {
        const updateCursorPosition = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY });
            setIsVisible(true);
        };

        const handleMouseEnter = () => setIsHovering(true);
        const handleMouseLeave = () => setIsHovering(false);
        const handleMouseOut = () => setIsVisible(false);

        document.body.style.cursor = 'none';

        document.addEventListener('mousemove', updateCursorPosition);
        document.addEventListener('mouseout', handleMouseOut);

        const interactiveElements = document.querySelectorAll(
            'a, button, input, textarea, select, video, [role="button"], .interactive'
        );

        interactiveElements.forEach((element) => {
            (element as HTMLElement).style.cursor = 'none';
            element.addEventListener('mouseenter', handleMouseEnter);
            element.addEventListener('mouseleave', handleMouseLeave);
        });

        return () => {
            document.body.style.cursor = 'auto';
            document.removeEventListener('mousemove', updateCursorPosition);
            document.removeEventListener('mouseout', handleMouseOut);

            interactiveElements.forEach((element) => {

                (element as HTMLElement).style.cursor = '';
                element.removeEventListener('mouseenter', handleMouseEnter);
                element.removeEventListener('mouseleave', handleMouseLeave);
            });
        };
    }, []);

    return (
        <div
            className={`${styles.customCursor} ${isHovering ? styles.hovering : ''} ${isVisible ? styles.visible : ''
                }`}
            style={{
                left: `${position.x}px`,
                top: `${position.y}px`,
            }}
        >
            <div className={styles.cursorDot}></div>
            <div className={styles.cursorRing}></div>
        </div>
    );
};

export default CustomCursor;