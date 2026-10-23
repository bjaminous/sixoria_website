import React, { useEffect, useRef, useState } from 'react';

interface UseRevealOptions {
    threshold?: number;
    rootMargin?: string;
}

export const useReveal = (options: UseRevealOptions = {}) => {
    const ref = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            {
                threshold: options.threshold ?? 0.1,
                rootMargin: options.rootMargin ?? '0px 0px -50px 0px',
            }
        );

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return { ref, isVisible };
};

interface RevealProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    direction?: 'up' | 'left' | 'right' | 'none';
}

export const Reveal: React.FC<RevealProps> = ({
    children,
    className = '',
    delay = 0,
    direction = 'up',
}) => {
    const { ref, isVisible } = useReveal();

    const directionClass = {
        up: 'translate-y-8',
        left: '-translate-x-8',
        right: 'translate-x-8',
        none: '',
    }[direction];

    return (
        <div
            ref={ref}
            className={`transition-all duration-700 ease-out ${isVisible
                    ? 'opacity-100 translate-y-0 translate-x-0'
                    : `opacity-0 ${directionClass}`
                } ${className}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
};

export default Reveal;
