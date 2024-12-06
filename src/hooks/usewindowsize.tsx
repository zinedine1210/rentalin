import { useState, useEffect } from 'react';

export const useWindowSize = () => {
  // State to store window width
  const [windowWidth, setWindowWidth] = useState<number>(0);

  useEffect(() => {
    // Function to update the width state
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Set initial width on component mount
    handleResize();

    // Add event listener to track window resize
    window.addEventListener('resize', handleResize);

    // Clean up the event listener when component unmounts
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowWidth;
};
