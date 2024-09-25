import { useState, useEffect } from 'react';

// FIXME: this has hydration issue :[
//   (╯︵╰)
// i'm fine
const useScreenSize = () => {
  const [screenSize, setScreenSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 700,
    height: typeof window !== 'undefined' ? window.innerWidth : 700,
  });

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return screenSize;
};

export default useScreenSize;