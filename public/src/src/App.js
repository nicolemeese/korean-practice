import React, { useState } from "react";
import CanvasDraw from "react-canvas-draw";

const vocab = [
  { korean: "사과", english: "apple" },
  { korean: "물", english: "water" },
  { korean: "불", english: "fire" },
];

export default function App() {
  const [i, setI] = useState(0);
  const [show, setShow] = useState(false);

  const play = () => {
    const u = new SpeechSynthesisUtterance(vocab[i].korean);
    u.lang = "ko-KR";
    speechSynthesis.speak(u);
  };

  return (
    <div style={{ padding: 20, fontFamily: "sans-serif", textAlign: "center" }}>
      <h2>🧠 Korean Practice</h2>
      <p><b>English:</b> {vocab[i].english}</p>

      {show && <p style={{ fontSize: 24 }}>{vocab[i].korean}</p>}
      <button onClick={() => setShow(!show)}>
        {show ? "Hide" : "Reveal Korean"}
      </button>

      <div style={{ marginTop: 10 }}>
        <button onClick={play}>🔊 Play Audio</button>
      </div>

      <CanvasDraw
        brushRadius={3}
        canvasWidth={300}
        canvasHeight={200}
        brushColor="#000"
      />

      <div style={{ marginTop: 20 }}>
        <button onClick={() => setI((i + 1) % vocab.length)}>Next ➡️</button>
      </div>
    </div>
  );
}
