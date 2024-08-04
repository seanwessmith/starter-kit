import React, { useEffect, useState } from "react";
import colors from "../assets/colors.json";

interface Color {
  index: number;
  name: string;
  slug: string;
  cmyk_array: number[];
  cmyk: string;
  rgb_array: number[];
  rgb: string;
  hex: string;
  combinations: number[];
  use_count: number;
}

const ColorPalette = () => {
  const [selectedColor, setSelectedColor] = useState<Color | null>(null);
  const [copiedHexes, setCopiedHexes] = useState<
    { hex: string; timestamp: number }[]
  >([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCopiedHexes((hexes) =>
        hexes.filter((hex) => Date.now() - hex.timestamp < 1000)
      );
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleColorClick = (color: Color) => {
    setSelectedColor(color);
    navigator.clipboard.writeText(color?.hex || "");
    setCopiedHexes((hexes) => [
      ...hexes,
      { hex: color.hex, timestamp: Date.now() },
    ]);
  };
  const handleSubColorClick = (hex?: string) => {
    if (!hex) return;
    setCopiedHexes((hexes) => [...hexes, { hex, timestamp: Date.now() }]);
  };

  // Converts the hex string to RGB values using parseInt and bitwise operations.
  // Calculates the relative luminance of the color using the formula recommended by the W3C
  // for determining color brightness. This formula takes into account the different
  // sensitivity of the human eye to different wavelengths of light.
  // luminance > 0.5 (i.e., a bright color) => return black else return white
  function getTextColor(bgColor: string): string {
    // Convert hex color to RGB values
    const r = parseInt(bgColor.slice(1, 3), 16);
    const g = parseInt(bgColor.slice(3, 5), 16);
    const b = parseInt(bgColor.slice(5, 7), 16);

    // Calculate the relative luminance
    // (using the formula from W3C for color brightness)
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

    // Return black for bright colors, white for dark colors
    return luminance > 0.5 ? "#000000" : "#FFFFFF";
  }

  const copiedDiv = (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        color: "#fff",
        padding: "5px 10px",
        borderRadius: "5px",
        zIndex: 2,
      }}
    >
      Copied!
    </div>
  );

  const nameDiv = (color: Color) => (
    <p
      style={{
        color: getTextColor(color.hex),
      }}
      className="text-xs absolute bottom-0 left-1"
    >
      {selectedColor?.hex === color.hex && selectedColor.name}
    </p>
  );

  return (
    <div className="flex max-w-vw">
      <div className="w-2/3">
        <h1 className="ml-3">A Dictionary of Color Combinations</h1>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {colors.map((color) => (
            <div
              key={color.index}
              onClick={() => handleColorClick(color)}
              style={{
                position: "relative",
                backgroundColor: color.hex,
                width: "100px",
                height: "100px",
                margin: "10px",
                cursor: "pointer",
                fontWeight: "bold",
                color: getTextColor(color.hex),
                border:
                  selectedColor && selectedColor.index === color.index
                    ? "3px solid black"
                    : "3px solid transparent",
                boxSizing: "border-box",
              }}
            >
              {selectedColor?.hex === color.hex ? color.hex : ""}
              {copiedHexes.map((cp) => cp.hex).includes(color.hex) && copiedDiv}
              {selectedColor?.name === color.name && nameDiv(selectedColor)}
            </div>
          ))}
        </div>
      </div>
      <div className="-mt-3 w-1/3">
        <h2>{selectedColor?.name}</h2>
        <div className="flex -ml-3 flex-col overflow-hidden">
          {selectedColor?.combinations.map((combIndex) => {
            const combinationColors = colors.filter((c) =>
              c.combinations.includes(combIndex)
            );
            console.log(combinationColors);
            return (
              <div className="mt-10 flex flex-row" key={combIndex}>
                <p className="ml-3 w-12">{combIndex}</p>
                <div className="flex flex-wrap flex-row gap-4">
                  {combinationColors.map((color) => (
                    <div
                      key={combIndex + color.index}
                      onClick={() => handleSubColorClick(color?.hex)}
                      className={`relative min-w-24 min-h-24 border-transparent border-4 hover:border-black cursor-pointer`}
                      style={{
                        backgroundColor: color?.hex,
                        boxSizing: "border-box",
                        color: color?.hex ? getTextColor(color.hex) : "",
                      }}
                    >
                      {color?.hex}
                      {copiedHexes
                        .map((cp) => cp.hex)
                        .includes(color?.hex || "") && copiedDiv}
                      {nameDiv(color)}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ColorPalette;
