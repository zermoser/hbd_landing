import React, { useEffect, useState, useRef } from 'react';
import confetti from 'canvas-confetti';

const App: React.FC = () => {
  // สุ่มลูกโป่ง
  const [balloons, setBalloons] = useState<
    { id: number; color: string; left: string; duration: number; delay: number }[]
  >([]);
  // ref สำหรับ canvas confetti
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // สุ่มลูกโป่งตอน mount
  useEffect(() => {
    generateBalloons();
    // initial confetti ครั้งแรก
    launchConfetti();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const generateBalloons = () => {
    const colors = ['#FF5C5C', '#FFB56B', '#FFD56B', '#8CD790', '#5C9EFF', '#D56BFF'];
    const temp = Array.from({ length: 12 }).map((_, i) => ({
      id: i,
      color: colors[Math.floor(Math.random() * colors.length)],
      left: `${Math.random() * 80 + 10}%`, // เว้นขอบซ้ายขวา 10%
      duration: Math.random() * 5 + 6,
      delay: Math.random() * 5,
    }));
    setBalloons(temp);
  };

  const launchConfetti = () => {
    // ใช้ canvas-confetti ยิงแบบหลายครั้ง
    const duration = 2 * 1000;
    const end = Date.now() + duration;

    const colors = ['#bb0000', '#ffffff', '#fffa65', '#00bbff'];
    // ยิง confetti ซ้ำจนกว่าจะหมดเวลา
    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors,
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors,
      });
      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  };

  return (
    <div className="relative w-screen min-h-screen overflow-hidden flex flex-col items-center justify-center text-center bg-gradient-to-br from-purple-500 via-pink-500 to-yellow-300 bg-[length:200%_200%] animate-bg-gradient p-4">
      {/* Canvas สำหรับ confetti */}
      <canvas id="confetti-canvas" ref={canvasRef}></canvas>

      {/* ข้อความหลัก */}
      <h1 className="rainbow-text text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold animate-pulse mb-4">
        Happy Birthday!
      </h1>
      {/* ข้อความเสริม */}
      <p className="text-white text-sm sm:text-base md:text-lg mb-6 max-w-md">
        Wishing you a day filled with love, joy, and all your favorite things!
      </p>

      {/* Cake SVG */}
      <div className="w-32 sm:w-40 md:w-48 lg:w-56 mb-6 animate-float">
        <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
          {/* Cake layers */}
          <rect x={8} y={24} width={48} height={24} rx={4} ry={4} fill="#fff" stroke="#d49a6a" strokeWidth={2} />
          <rect x={12} y={20} width={40} height={8} rx={4} ry={4} fill="#f8c6a0" />
          {/* Candles */}
          {[...Array(5)].map((_, i) => {
            const x = 16 + i * 8;
            return (
              <g key={i}>
                <rect x={x} y={12} width={4} height={8} fill="#FF5C5C" />
                <path
                  className="animate-flicker"
                  d={`M${x + 2} 12 L${x + 4} 8 L${x} 8 Z`}
                  fill="#FFD56B"
                />
              </g>
            );
          })}
        </svg>
      </div>

      {/* ลูกโป่งลอย */}
      {balloons.map((b) => (
        <div
          key={b.id}
          className="balloon absolute animate-rise"
          style={{
            left: b.left,
            bottom: '-40px',
            backgroundColor: b.color,
            animationDuration: `${b.duration}s`,
            animationDelay: `${b.delay}s`,
          }}
        />
      ))}

      {/* ปุ่ม Celebrate Again */}
      <button
        onClick={() => {
          generateBalloons();
          launchConfetti();
        }}
        className="mt-8 px-6 py-2 bg-white bg-opacity-80 hover:bg-opacity-100 text-purple-700 font-semibold rounded-2xl shadow-lg transition"
      >
        Celebrate Again 🎉
      </button>
    </div>
  );
};

export default App;
