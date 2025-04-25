'use client'
export const ColorSelector = ({onClick, color='#000'}) => {
  return (
    <div className="aspect-square cursor-pointer border-2 border-black w-8 hover:opacity-65" style={{ backgroundColor: color }} onClick={onClick}
    ></div>
    
  );
};
