import React, { useRef, useEffect, useCallback } from 'react';

interface AnimatedGridBackgroundProps {
    className?: string;
}

const AnimatedGridBackground: React.FC<AnimatedGridBackgroundProps> = ({ className = '' }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouseRef = useRef({ x: -1000, y: -1000 });
    const animationRef = useRef<number>(0);
    const dotsRef = useRef<{ x: number; y: number; baseAlpha: number; alpha: number; pulse: number }[]>([]);
    const timeRef = useRef(0);

    const GRID_SPACING = 40;
    const DOT_RADIUS = 1.2;
    const MOUSE_RADIUS = 180;
    const BASE_ALPHA_MIN = 0.08;
    const BASE_ALPHA_MAX = 0.2;

    const initDots = useCallback((width: number, height: number) => {
        const dots: typeof dotsRef.current = [];
        const cols = Math.ceil(width / GRID_SPACING) + 1;
        const rows = Math.ceil(height / GRID_SPACING) + 1;

        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                dots.push({
                    x: i * GRID_SPACING,
                    y: j * GRID_SPACING,
                    baseAlpha: BASE_ALPHA_MIN + Math.random() * (BASE_ALPHA_MAX - BASE_ALPHA_MIN),
                    alpha: 0,
                    pulse: Math.random() * Math.PI * 2,
                });
            }
        }
        dotsRef.current = dots;
    }, []);

    const draw = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number) => {
        timeRef.current += 0.008;
        ctx.clearRect(0, 0, width, height);

        const mx = mouseRef.current.x;
        const my = mouseRef.current.y;

        for (const dot of dotsRef.current) {
            // Subtle pulse
            const pulse = Math.sin(timeRef.current * 1.5 + dot.pulse) * 0.04;
            const baseBrightness = dot.baseAlpha + pulse;

            // Mouse proximity glow
            const dx = dot.x - mx;
            const dy = dot.y - my;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const mouseFactor = dist < MOUSE_RADIUS
                ? (1 - dist / MOUSE_RADIUS) * 0.8
                : 0;

            // Smoothly interpolate alpha
            const targetAlpha = baseBrightness + mouseFactor;
            dot.alpha += (targetAlpha - dot.alpha) * 0.1;

            // Draw dot
            const radius = DOT_RADIUS + (mouseFactor > 0 ? mouseFactor * 1.5 : 0);

            if (mouseFactor > 0.2) {
                // Glow for close dots
                ctx.beginPath();
                ctx.arc(dot.x, dot.y, radius + 4, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(129, 140, 248, ${mouseFactor * 0.15})`;
                ctx.fill();
            }

            ctx.beginPath();
            ctx.arc(dot.x, dot.y, radius, 0, Math.PI * 2);
            const colorIntensity = mouseFactor > 0
                ? `rgba(165, 180, 252, ${dot.alpha})`
                : `rgba(255, 255, 255, ${dot.alpha})`;
            ctx.fillStyle = colorIntensity;
            ctx.fill();
        }

        // Draw faint grid lines near mouse
        if (mx > -500) {
            ctx.strokeStyle = `rgba(99, 102, 241, 0.03)`;
            ctx.lineWidth = 0.5;
            const startCol = Math.max(0, Math.floor((mx - MOUSE_RADIUS) / GRID_SPACING));
            const endCol = Math.min(Math.ceil(width / GRID_SPACING), Math.ceil((mx + MOUSE_RADIUS) / GRID_SPACING));
            const startRow = Math.max(0, Math.floor((my - MOUSE_RADIUS) / GRID_SPACING));
            const endRow = Math.min(Math.ceil(height / GRID_SPACING), Math.ceil((my + MOUSE_RADIUS) / GRID_SPACING));

            for (let i = startCol; i <= endCol; i++) {
                const x = i * GRID_SPACING;
                const distFromMouse = Math.abs(x - mx);
                if (distFromMouse < MOUSE_RADIUS) {
                    const lineAlpha = (1 - distFromMouse / MOUSE_RADIUS) * 0.06;
                    ctx.strokeStyle = `rgba(99, 102, 241, ${lineAlpha})`;
                    ctx.beginPath();
                    ctx.moveTo(x, startRow * GRID_SPACING);
                    ctx.lineTo(x, endRow * GRID_SPACING);
                    ctx.stroke();
                }
            }
            for (let j = startRow; j <= endRow; j++) {
                const y = j * GRID_SPACING;
                const distFromMouse = Math.abs(y - my);
                if (distFromMouse < MOUSE_RADIUS) {
                    const lineAlpha = (1 - distFromMouse / MOUSE_RADIUS) * 0.06;
                    ctx.strokeStyle = `rgba(99, 102, 241, ${lineAlpha})`;
                    ctx.beginPath();
                    ctx.moveTo(startCol * GRID_SPACING, y);
                    ctx.lineTo(endCol * GRID_SPACING, y);
                    ctx.stroke();
                }
            }
        }
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const resize = () => {
            const dpr = window.devicePixelRatio || 1;
            const rect = canvas.parentElement?.getBoundingClientRect();
            const w = rect?.width || window.innerWidth;
            const h = rect?.height || window.innerHeight;
            canvas.width = w * dpr;
            canvas.height = h * dpr;
            canvas.style.width = `${w}px`;
            canvas.style.height = `${h}px`;
            ctx.scale(dpr, dpr);
            initDots(w, h);
        };

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouseRef.current = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            };
        };

        const handleMouseLeave = () => {
            mouseRef.current = { x: -1000, y: -1000 };
        };

        // Touch support
        const handleTouchMove = (e: TouchEvent) => {
            const touch = e.touches[0];
            const rect = canvas.getBoundingClientRect();
            mouseRef.current = {
                x: touch.clientX - rect.left,
                y: touch.clientY - rect.top,
            };
        };

        const handleTouchEnd = () => {
            mouseRef.current = { x: -1000, y: -1000 };
        };

        resize();
        window.addEventListener('resize', resize);
        canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('mouseleave', handleMouseLeave);
        canvas.addEventListener('touchmove', handleTouchMove, { passive: true });
        canvas.addEventListener('touchend', handleTouchEnd);

        const animate = () => {
            const rect = canvas.parentElement?.getBoundingClientRect();
            const w = rect?.width || window.innerWidth;
            const h = rect?.height || window.innerHeight;
            draw(ctx, w, h);
            animationRef.current = requestAnimationFrame(animate);
        };
        animate();

        return () => {
            window.removeEventListener('resize', resize);
            canvas.removeEventListener('mousemove', handleMouseMove);
            canvas.removeEventListener('mouseleave', handleMouseLeave);
            canvas.removeEventListener('touchmove', handleTouchMove);
            canvas.removeEventListener('touchend', handleTouchEnd);
            cancelAnimationFrame(animationRef.current);
        };
    }, [initDots, draw]);

    return (
        <canvas
            ref={canvasRef}
            className={`absolute inset-0 z-0 ${className}`}
            style={{ pointerEvents: 'auto' }}
        />
    );
};

export default AnimatedGridBackground;
