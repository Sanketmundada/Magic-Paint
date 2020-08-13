import React, { useState, useEffect, useRef, useCallback } from "react";
import randomColor from "randomcolor";
import "./App.css";
import Name from "./components/Name";
import { ColorPicker } from "./components/ColorPicker";
import { WindowSize } from "./components/WindowSize";
import Canvas from "./components/Canvas";
import RefreshButton from "./components/RefreshButton";

function App() {
  const [colors, setColors] = useState([]);
  const [activeColor, setActiveColor] = useState(null);

  const getColor = useCallback(() => {
    const baseColor = randomColor().slice(1);
    fetch(`https://www.thecolorapi.com/scheme?hex=${baseColor}&mode=monochrome`)
      .then((res) => res.json())
      .then((res) => {
        setColors(res.colors.map((color) => color.hex.value));
        setActiveColor(res.colors[0].hex.value);
      });
  }, []);
  useEffect(getColor, []);

  const headerRef = useRef({ offsetHeight: 0 });
  return (
    <div className="App">
      <header
        ref={headerRef}
        style={{ borderTop: `10px solid ${activeColor}` }}
      >
        <div>
          <Name />
        </div>
        <div style={{ marginTop: 10 }}>
          <ColorPicker
            colors={colors}
            activeColor={activeColor}
            setActiveColor={setActiveColor}
          />
          <RefreshButton cb={getColor} />
        </div>
      </header>
      {activeColor && (
        <Canvas
          color={activeColor}
          height={window.innerHeight - headerRef.current.offsetHeight}
        />
      )}
      <WindowSize />
    </div>
  );
}

export default App;
