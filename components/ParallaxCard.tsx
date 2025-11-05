import React, { useRef, useState, MouseEvent } from 'react';

interface ParallaxCardProps {
  children: React.ReactNode;
}

const ParallaxCard: React.FC<ParallaxCardProps> = ({ children }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState({});

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const { clientX, clientY } = e;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();

    const x = clientX - left;
    const y = clientY - top;

    const rotateX = -((y / height) * 2 - 1) * 10; // Max rotation 10 degrees
    const rotateY = ((x / width) * 2 - 1) * 10; // Max rotation 10 degrees

    setStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`,
      transition: 'transform 0.1s ease-out',
    });
  };

  const handleMouseLeave = () => {
    setStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      transition: 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)',
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={style}
      className="transform-style-preserve-3d transition-transform duration-500 ease-in-out shadow-2xl rounded-2xl"
    >
      {children}
    </div>
  );
};

export default ParallaxCard;
