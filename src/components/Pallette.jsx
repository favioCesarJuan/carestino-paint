'use client'

import { ColorSelector } from "./ColorSelector";

export const Pallette = ({ onMouseLeave, ref, onClick, colors = [] }) => {
  return (
    <div
      className="flex gap-1 px-3 py-4  bg-amber-200 justify-between fixed bottom-4 left-1/2 -translate-x-1/2 z-50 rounded-sm shadow-xl/20"
      onMouseLeave={onMouseLeave}
      ref={ref}
    >
      {
        colors.map(color => <ColorSelector key={color} onClick={onClick} color={color} />)
      }
    </div>
  )
};
