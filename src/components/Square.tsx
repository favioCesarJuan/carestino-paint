'use client'
import { memo, useState } from "react";

const Square = memo(({ colorRef }) => {
  const [currentColor, setCurrentColor] = useState('#fff');
  
  const toggleColor = () => {
    setCurrentColor(prev => prev === '#fff' ? colorRef.current : '#fff');
  };

  return (
    <div
      onClick={toggleColor}
      className="w-[1vw] border border-gray-400 box-border transition-colors duration-100"
      style={{ backgroundColor: currentColor }}
    />
  );
});

Square.displayName = 'Square'; // Para React DevTools
export { Square };