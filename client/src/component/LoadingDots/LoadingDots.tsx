import { useState, useEffect } from "react";

const LoadingDots: React.FC = () => {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 300);

    return () => clearInterval(interval);
  }, []);

  return <span>{dots}</span>;
};

export default LoadingDots;