import Image from "next/image";
import checkmark from "./checkmark.svg";

export function RenderLoadingOrSuccess(
  isLoading: boolean,
  isLoaded: boolean,
  backgroundColor: string,
  text: string,
  seconds: number
) {
  // CSS for the sliding background
  const staticStyle = {
    width: 300,
    borderRadius: 5,
    backgroundColor,
    marginBottom: 10,
    height: 30,
  };

  const animatedStyle = {
    ...staticStyle,
    animationName: "slide",
    animationDuration: `${seconds}s`,
    animationTimingFunction: "linear",
    animationIterationCount: "infinite",
    backgroundSize: "200% 100%",
    backgroundImage: `linear-gradient(to right, ${backgroundColor} 50%, #ccc 50%)`,
  };

  // Apply the appropriate style based on loading state
  const appliedStyle = isLoading ? animatedStyle : staticStyle;

  if (isLoading || isLoaded) {
    return (
      <div
        className="loading-div"
        style={{
          ...appliedStyle,
          width: 300,
          borderRadius: 5,
          marginBottom: 10,
          height: 30,
        }}
      >
        {isLoading ? (
          <>
            <div className="spinner" />
            <div className="text">fetching {text}...</div>
          </>
        ) : (
          <div style={{ display: "flex" }}>
            <Image
              style={{ marginLeft: 10, marginRight: -30 }}
              src={checkmark}
              width={20}
              height={20}
              alt="check"
            />
            <div style={{ marginLeft: 40 }} className="text">
              fetched {text}
            </div>
          </div>
        )}
      </div>
    );
  }

  return null;
}
