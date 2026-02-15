import React, { useState, useEffect, useRef, Suspense } from 'react';
import SectionLoader from '@/components/common/SectionLoader';

interface LazySectionProps {
    children: React.ReactNode;
    threshold?: number;
    rootMargin?: string;
    minHeight?: string; // Prevent layout shift
}

const LazySection: React.FC<LazySectionProps> = ({
    children,
    threshold = 0.1,
    rootMargin = '200px', // Preload 200px before appearing
    minHeight = '50vh'
}) => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                // Determine if element is intersecting
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    // Once visible, we can stop observing to save resources
                    if (sectionRef.current) {
                        observer.unobserve(sectionRef.current);
                    }
                }
            },
            {
                root: null, // viewport
                rootMargin,
                threshold,
            }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, [threshold, rootMargin]);

    return (
        <div ref={sectionRef} style={{ minHeight }} className="w-full">
            {isVisible ? (
                <Suspense fallback={<SectionLoader />}>
                    {children}
                </Suspense>
            ) : (
                <div className="flex items-center justify-center h-full w-full" aria-hidden="true">
                    {/* Placeholder to maintain scroll height estimate */}
                </div>
            )}
        </div>
    );
};

export default LazySection;
