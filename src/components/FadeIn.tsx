import { useEffect, useState } from "react";

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

const FadeIn = ({ children, delay = 0, duration = 1000, className = "" }: FadeInProps) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShow(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  return (
    <div
      className={`transition-opacity ${className}`}
      style={{
        opacity: show ? 1 : 0,
        transitionDuration: `${duration}ms`,
      }}
    >
      {children}
    </div>
  );
};

export default FadeIn;
