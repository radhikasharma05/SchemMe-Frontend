import React, { useEffect, useRef, useState } from 'react';

interface FloatingLinesProps {
  linesGradient: string[];
  enabledWaves?: ('top' | 'middle' | 'bottom')[];
  lineCount?: [number, number, number];
  lineDistance?: [number, number, number];
  topWavePosition?: { x: number; y: number; rotate: number };
  middleWavePosition?: { x: number; y: number; rotate: number };
  bottomWavePosition?: { x: number; y: number; rotate: number };
  animationSpeed?: number;
  interactive?: boolean;
  bendRadius?: number;
  bendStrength?: number;
  mouseDamping?: number;
  parallax?: boolean;
  parallaxStrength?: number;
  mixBlendMode?: string;
}

export const FloatingLines: React.FC<FloatingLinesProps> = ({
  linesGradient,
  enabledWaves = ['top', 'middle', 'bottom'],
  lineCount = [12, 20, 12],
  lineDistance = [3, 2.5, 3.5],
  topWavePosition = { x: 9.0, y: 0.55, rotate: -0.25 },
  middleWavePosition = { x: 4.5, y: 0.0, rotate: 0.12 },
  bottomWavePosition = { x: 2.0, y: -0.65, rotate: -0.6 },
  animationSpeed = 0.35,
  interactive = true,
  bendRadius = 3.5,
  bendStrength = -0.25,
  mouseDamping = 0.025,
  parallax = true,
  parallaxStrength = 0.08,
  mixBlendMode = 'normal',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const timeRef = useRef(0);
  const animationFrameRef = useRef<number | undefined>(undefined);

  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      if (!interactive) return;
      mouseRef.current.targetX = e.clientX / dimensions.width;
      mouseRef.current.targetY = e.clientY / dimensions.height;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Wave configurations
    const waves = [
      enabledWaves.includes('top') && {
        count: lineCount[0],
        distance: lineDistance[0],
        position: topWavePosition,
        type: 'top' as const,
      },
      enabledWaves.includes('middle') && {
        count: lineCount[1],
        distance: lineDistance[1],
        position: middleWavePosition,
        type: 'middle' as const,
      },
      enabledWaves.includes('bottom') && {
        count: lineCount[2],
        distance: lineDistance[2],
        position: bottomWavePosition,
        type: 'bottom' as const,
      },
    ].filter(Boolean);

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Smooth mouse position
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * mouseDamping;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * mouseDamping;

      timeRef.current += animationSpeed * 0.001;

      waves.forEach((wave) => {
        if (!wave) return;

        const { count, distance, position, type } = wave;
        const baseY = canvas.height * (0.5 + position.y);
        const baseX = position.x * 50;
        const rotation = position.rotate;

        // Parallax offset based on mouse
        const parallaxX = parallax ? (mouseRef.current.x - 0.5) * parallaxStrength * canvas.width : 0;
        const parallaxY = parallax ? (mouseRef.current.y - 0.5) * parallaxStrength * canvas.height : 0;

        for (let i = 0; i < count; i++) {
          const lineProgress = i / count;
          const colorIndex = Math.floor(lineProgress * (linesGradient.length - 1));
          const colorProgress = (lineProgress * (linesGradient.length - 1)) % 1;
          
          const color1 = linesGradient[colorIndex];
          const color2 = linesGradient[Math.min(colorIndex + 1, linesGradient.length - 1)];
          
          const color = interpolateColor(color1, color2, colorProgress);

          ctx.save();
          
          // Apply transformations
          ctx.translate(canvas.width / 2 + parallaxX, baseY + parallaxY);
          ctx.rotate(rotation);
          
          const offsetY = (i - count / 2) * distance;
          
          ctx.beginPath();
          
          // Draw flowing wave line
          const points = 100;
          for (let p = 0; p <= points; p++) {
            const t = p / points;
            const x = (t - 0.5) * canvas.width * 2.5 + baseX;
            
            // Multiple sine waves for organic flow
            const wave1 = Math.sin(x * 0.003 + timeRef.current + i * 0.2) * 15;
            const wave2 = Math.sin(x * 0.005 - timeRef.current * 0.7 + i * 0.15) * 10;
            const wave3 = Math.sin(x * 0.002 + timeRef.current * 0.5 + i * 0.1) * 20;
            
            let y = offsetY + wave1 + wave2 + wave3;
            
            // Interactive bend effect
            if (interactive) {
              const canvasMouseX = (mouseRef.current.x * canvas.width - canvas.width / 2 - parallaxX);
              const canvasMouseY = (mouseRef.current.y * canvas.height - baseY - parallaxY);
              
              const cos = Math.cos(-rotation);
              const sin = Math.sin(-rotation);
              const rotatedMouseX = canvasMouseX * cos - canvasMouseY * sin;
              const rotatedMouseY = canvasMouseX * sin + canvasMouseY * cos;
              
              const dx = x - rotatedMouseX;
              const dy = y - rotatedMouseY;
              const dist = Math.sqrt(dx * dx + dy * dy);
              const maxDist = bendRadius * 100;
              
              if (dist < maxDist) {
                const influence = (1 - dist / maxDist) * bendStrength * 100;
                y += influence * (dy / dist);
              }
            }
            
            if (p === 0) {
              ctx.moveTo(x, y);
            } else {
              ctx.lineTo(x, y);
            }
          }
          
          ctx.strokeStyle = color;
          ctx.lineWidth = 2.5;
          ctx.lineCap = 'round';
          ctx.globalAlpha = 0.6;
          ctx.stroke();
          
          ctx.restore();
        }
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [
    dimensions,
    linesGradient,
    enabledWaves,
    lineCount,
    lineDistance,
    topWavePosition,
    middleWavePosition,
    bottomWavePosition,
    animationSpeed,
    interactive,
    bendRadius,
    bendStrength,
    mouseDamping,
    parallax,
    parallaxStrength,
  ]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{
        mixBlendMode: mixBlendMode as any,
      }}
    />
  );
};

// Helper function to interpolate between two hex colors
function interpolateColor(color1: string, color2: string, progress: number): string {
  const c1 = hexToRgb(color1);
  const c2 = hexToRgb(color2);
  
  const r = Math.round(c1.r + (c2.r - c1.r) * progress);
  const g = Math.round(c1.g + (c2.g - c1.g) * progress);
  const b = Math.round(c1.b + (c2.b - c1.b) * progress);
  
  return `rgb(${r}, ${g}, ${b})`;
}

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : { r: 0, g: 0, b: 0 };
}
