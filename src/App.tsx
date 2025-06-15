import React, { useEffect, useState } from 'react';

const App: React.FC = () => {
  // ถ้าใช้ลูกโป่ง
  const [balloons, setBalloons] = useState<
    { id: number; color: string; left: string; duration: number; delay: number }[]
  >([]);

  useEffect(() => {
    generateBalloons();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const generateBalloons = () => {
    // อาจเลือกโทนสีพาสเทลอ่อน หรือสีเรียบ เช่น #E0E0E0, #F5F5F5, #CCCCCC
    const colors = ['#E0E0E0', '#CCCCCC', '#F5F5F5'];
    const count = 8; // ลดจำนวนให้ minimal
    const temp = Array.from({ length: count }).map((_, i) => ({
      id: i,
      color: colors[i % colors.length],
      left: `${Math.random() * 80 + 10}%`,
      duration: Math.random() * 5 + 6,
      delay: Math.random() * 5,
    }));
    setBalloons(temp);
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      {/* Card Container */}
      <div className="relative bg-white shadow-lg rounded-xl border border-gray-200 p-6 max-w-md w-full text-center overflow-hidden">
        {/* ข้อความหลัก */}
        <h1 className="subtle-gradient-text text-3xl sm:text-4xl md:text-5xl mb-2 opacity-0 animate-fade-in">
          Happy Birthday!
        </h1>
        {/* ข้อความเสริม */}
        <p className="text-gray-600 text-sm sm:text-base mb-4 opacity-0 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          Wishing you a wonderful day full of joy.
        </p>

        {/* Cake SVG */}
        <div className="w-24 sm:w-28 md:w-32 mx-auto mb-4 float-subtle">
          <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            {/* Cake layers: ปรับสีเรียบ */}
            <rect x={8} y={24} width={48} height={24} rx={4} ry={4} fill="#FFFFFF" stroke="#CCCCCC" strokeWidth={1} />
            <rect x={12} y={20} width={40} height={8} rx={4} ry={4} fill="#F7F7F7" />
            {/* Candles */}
            {[...Array(3)].map((_, i) => {  // ลดเหลือ 3 เล่ม
              const x = 18 + i * 12;
              return (
                <g key={i}>
                  <rect x={x} y={12} width={4} height={8} fill="#CCCCCC" />
                  <path
                    className="flicker-subtle"
                    d={`M${x + 2} 12 L${x + 4} 8 L${x} 8 Z`}
                    fill="#E0E0E0"
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
            className="balloon absolute animate-rise-subtle"
            style={{
              left: b.left,
              bottom: '-30px',
              backgroundColor: b.color,
              animationDuration: `${b.duration}s`,
              animationDelay: `${b.delay}s`,
            }}
          />
        ))}

        {/* ปุ่มกลับหรือตามต้องการ (Optional) */}
        {/* 
        <button className="mt-4 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg transition">
          Celebrate Again
        </button>
        */}
      </div>
    </div>
  );
};

export default App;
