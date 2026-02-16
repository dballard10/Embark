import { useCallback, useRef } from 'react';

export function useScreenShake() {
  const animFrameRef = useRef<number>(0);

  const shake = useCallback((intensity: number, duration: number) => {
    const container = document.getElementById('shake-container');
    if (!container) return;

    const start = performance.now();

    const step = (now: number) => {
      const elapsed = now - start;
      const progress = elapsed / duration;

      if (progress >= 1) {
        container.style.transform = '';
        return;
      }

      // Decay intensity over time
      const decay = 1 - progress;
      const maxOffset = intensity * 12 * decay;

      const x = (Math.random() - 0.5) * 2 * maxOffset;
      const y = (Math.random() - 0.5) * 2 * maxOffset;

      container.style.transform = `translate(${x}px, ${y}px)`;
      animFrameRef.current = requestAnimationFrame(step);
    };

    cancelAnimationFrame(animFrameRef.current);
    animFrameRef.current = requestAnimationFrame(step);
  }, []);

  return { shake };
}
