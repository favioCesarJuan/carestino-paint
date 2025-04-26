"use client";
import Image from "next/image";
import { Square } from "../components/Square";
import { useEffect, useState, useRef, useCallback } from "react";
import { colors } from "./aux/colors";
import { Pallette } from "../components/Pallette";

export default function Home() {
  const [finalSquares, setFinalSquares] = useState([]);
  const [color, setColor] = useState("blue");
  const [selectorActive, setSelectorActive] = useState(false);
  const selectorRef = useRef(null);
  const colorRef = useRef(color);

  useEffect(() => {
    colorRef.current = color;
  }, [color]);

  const calculateGrid = useCallback(() => {
    const viewportWidth = window.innerWidth;
    const cellSize = viewportWidth / 100;
    const rows = Math.ceil(window.innerHeight / cellSize);

    const squares = [...Array(100 * rows).keys()].map((index) => (
      <Square key={index} colorRef={colorRef} />
    ));

    setFinalSquares(squares);
  }, []);

  useEffect(() => {
    const debouncedResize = debounce(calculateGrid, 100);
    calculateGrid();
    window.addEventListener("resize", debouncedResize);
    return () => window.removeEventListener("resize", debouncedResize);
  }, [calculateGrid]);

  const debounce = (func, wait = 100) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  };

  const handleClick = (e) => {
    e.preventDefault();
    setColor(e.target.style.backgroundColor);
  };

  const toggleSelectorStatus = (event) => {
    event.preventDefault();
    setSelectorActive(true);
  };

  const handleMouseLeave = (event) => {
    if (!selectorRef.current?.contains(event.relatedTarget)) {
      setSelectorActive(false);
    }
  };

  return (
    <div className="w-screen h-screen overflow-hidden relative">
      <div
        className="grid w-[100vw] h-[100vh]"
        style={{
          gridTemplateColumns: "repeat(100, 1vw)",
          gridAutoRows: "1vw",
        }}
        onContextMenu={toggleSelectorStatus}
      >
        {finalSquares}
      </div>
      {selectorActive && (
        <Pallette
          onClick={handleClick}
          onMouseLeave={handleMouseLeave}
          ref={selectorRef}
          colors={colors}
        />
      )}
    </div>
  );
}
