import React, { useRef, useState, MouseEvent, useEffect } from 'react';

// Constants for parallax effect
const PERSPECTIVE = '1000px';
const SCALE = '1.05';
const ROTATION_STRENGTH_DESKTOP = 10; // Higher value = more rotation
const ROTATION_STRENGTH_MOBILE = 2.5; // Lower value for subtle effect on mobile

interface ParallaxCardProps {
  children: React.ReactNode;
}

const ParallaxCard: React.FC<ParallaxCardProps> = ({ children }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState({});
  const [permissionNeeded, setPermissionNeeded] = useState(false);
  const isMobile = typeof window.orientation !== 'undefined' || navigator.userAgent.indexOf('IEMobile') !== -1;

  // Helper to generate the transform style
  const getTransformStyle = (rotateX: number, rotateY: number) => ({
    transform: `perspective(${PERSPECTIVE}) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${SCALE}, ${SCALE}, ${SCALE})`,
    transition: 'transform 0.1s linear',
  });

  useEffect(() => {
    const addOrientationListener = () => {
       window.addEventListener('deviceorientation', handleOrientation);
    };

    if (isMobile && window.DeviceOrientationEvent) {
      // For iOS 13+, we need to request permission to access device orientation
      if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
        setPermissionNeeded(true);
      } else {
        addOrientationListener();
      }
    }

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation);
    };
  }, [isMobile]);

  const requestDeviceOrientationPermission = async () => {
    try {
        const permissionState = await (DeviceOrientationEvent as any).requestPermission();
        if (permissionState === 'granted') {
            setPermissionNeeded(false);
            window.addEventListener('deviceorientation', handleOrientation);
        } else {
            alert('Permission for device orientation was not granted.');
            setPermissionNeeded(false);
        }
    } catch(error) {
        console.error("Error requesting device orientation permission:", error);
        alert('Your device or browser does not support this feature.');
        setPermissionNeeded(false);
    }
  };

  const handleOrientation = (event: DeviceOrientationEvent) => {
    const { beta, gamma } = event; // beta: X-axis (front/back), gamma: Y-axis (left/right)

    if (beta === null || gamma === null) return;
    
    // Clamp values for a smoother, less extreme effect
    const clampedBeta = Math.max(-45, Math.min(45, beta));
    const clampedGamma = Math.max(-45, Math.min(45, gamma));

    const rotateX = clampedBeta / ROTATION_STRENGTH_MOBILE;
    const rotateY = clampedGamma / ROTATION_STRENGTH_MOBILE;

    setStyle(getTransformStyle(rotateX, rotateY));
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (isMobile || !cardRef.current) return;

    const { clientX, clientY } = e;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();

    const x = clientX - left;
    const y = clientY - top;

    const rotateX = -((y / height) * 2 - 1) * ROTATION_STRENGTH_DESKTOP;
    const rotateY = ((x / width) * 2 - 1) * ROTATION_STRENGTH_DESKTOP;

    setStyle(getTransformStyle(rotateX, rotateY));
  };

  const handleMouseLeave = () => {
    if (isMobile) return;
    setStyle({
      transform: `perspective(${PERSPECTIVE}) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`,
      transition: 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)',
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={style}
      className="relative transform-style-preserve-3d transition-transform duration-500 ease-in-out shadow-2xl rounded-2xl"
    >
      {permissionNeeded && (
         <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm rounded-2xl p-4 text-center">
            <p className="text-white text-lg font-medium mb-4">Tap to enable the 3D effect on your phone</p>
            <button
              onClick={requestDeviceOrientationPermission}
              className="bg-pink-500 text-white font-bold py-2 px-6 rounded-lg shadow-lg hover:bg-pink-600 focus:outline-none focus:ring-4 focus:ring-pink-300 transition-all duration-300"
            >
              Activate
            </button>
         </div>
      )}
      {children}
    </div>
  );
};

export default ParallaxCard;