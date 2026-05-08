'use client';
import { useRef, useEffect, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
  tag?: 'div' | 'section' | 'article' | 'aside';
}

export default function RevealWrapper({ children, className = '', tag: Tag = 'div' }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag ref={ref as React.RefObject<HTMLDivElement>} className={`reveal ${className}`}>
      {children}
    </Tag>
  );
}
