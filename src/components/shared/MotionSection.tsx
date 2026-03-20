"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface MotionSectionProps {
  children: React.ReactNode;
  className?: string;
  delayMs?: number;
}

export function MotionSection({
  children,
  className,
  delayMs = 0,
}: MotionSectionProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.18, rootMargin: "0px 0px -40px 0px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn("reveal-on-scroll", visible && "is-visible", className)}
      style={{ transitionDelay: `${delayMs}ms` }}
    >
      {children}
    </div>
  );
}
