// src/App.tsx
import React, { useEffect, useState } from 'react';
import Balloon from './components/Balloon';
import confetti from 'canvas-confetti';
import { motion } from 'framer-motion';

interface BalloonData {
  id: number;
  color: string;
  left: string;
  delay: number;
  duration: number;
  size: number;
}

const App: React.FC = () => {
  // อ่านชื่อจาก URL param ?name=...
  const [name, setName] = useState<string>('');
  // ลูกโป่ง background
  const [balloons, setBalloons] = useState<BalloonData[]>([]);

  // ฟังก์ชันสุ่มลูกโป่ง
  const generateBalloons = () => {
    // โทนสีพาสเทลหรือ neutral ตามต้องการ
    const colors = ['#F28AB2', '#A3D5FF', '#FFD8A8', '#C8FACC', '#E0E0E0'];
    const count = 10;
    const temp: BalloonData[] = Array.from({ length: count }).map((_, i) => {
      // สุ่ม size: 30–60 px
      const size = Math.round(Math.random() * 30 + 30);
      // left: 10%–90%
      const left = `${Math.random() * 80 + 10}%`;
      // delay: 0–5s
      const delay = Math.random() * 5;
      // duration: 8–14s
      const duration = Math.random() * 6 + 8;
      // color: วนตาม index หรือจะสุ่มก็ได้
      const color = colors[i % colors.length];
      return { id: i, color, left, delay, duration, size };
    });
    setBalloons(temp);
  };

  // ฟังก์ชันยิง confetti เล็กน้อย
  const celebrate = () => {
    generateBalloons();
    const duration = 1.2 * 1000;
    const end = Date.now() + duration;
    // สี confetti ให้เข้ากับโทน minimal/pastel
    const colors = ['#BB86FC', '#03DAC5', '#CF6679', '#E0E0E0'];
    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors,
      });
      confetti({
        particleCount: 5,
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

  // เมื่อ mount: อ่าน param name, สร้างลูกโป่ง และยิง confetti เบาๆ
  useEffect(() => {
    // อ่านชื่อ
    const params = new URLSearchParams(window.location.search);
    const nameParam = params.get('name')?.trim() || '';
    setName(nameParam);

    // สร้างลูกโป่ง background
    generateBalloons();

    // ยิง confetti ครั้งแรก ถ้ามีชื่อ หรือถ้าไม่ต้องก็ comment ออก
    celebrate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // กรณีต้องการ fallback เมื่อไม่มี nameParam: name === '' ก็จะแสดง "Happy Birthday!" ทั่วไป

  return (
    <div className="relative min-h-screen bg-white flex items-center justify-center overflow-hidden p-4">
      {/* Canvas สำหรับ confetti */}
      <canvas id="confetti-canvas"></canvas>

      {/* Background balloons */}
      {balloons.map((b) => (
        <Balloon
          key={b.id}
          color={b.color}
          left={b.left}
          delay={b.delay}
          duration={b.duration}
          size={b.size}
        />
      ))}

      {/* Card กลาง */}
      <motion.div
        className="bg-white card-container p-6 max-w-sm w-full mx-auto text-center relative z-10"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        {/* Greeting */}
        <motion.h1
          className="subtle-gradient-text text-3xl sm:text-4xl md:text-5xl mb-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {name ? `Happy Birthday, ${name}!` : 'Happy Birthday!'}
        </motion.h1>

        {/* ข้อความเสริม */}
        <motion.p
          className="text-gray-600 text-sm sm:text-base mb-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          Wishing you a day filled with joy and wonderful moments.
        </motion.p>

        {/* Cake SVG: colorful มากขึ้น */}
        <motion.div
          className="w-24 sm:w-28 md:w-32 mx-auto mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          {/* Cake SVG แบบหลายเลเยอร์ สีสัน และ sprinkles */}
          <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <defs>
              {/* Gradient icing ด้านบน */}
              <linearGradient id="icingGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FFB6C1" />   {/* สีชมพูอ่อน */}
                <stop offset="100%" stopColor="#FF69B4" /> {/* สีชมพูเข้ม */}
              </linearGradient>
              {/* Gradient middle layer */}
              <linearGradient id="middleGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FFFACD" />   {/* สี yellow-cream */}
                <stop offset="100%" stopColor="#FFEFD5" /> {/* pastel */}
              </linearGradient>
              {/* Gradient bottom layer */}
              <linearGradient id="bottomGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#E0FFFF" />   {/* pastel cyan */}
                <stop offset="100%" stopColor="#AFEEEE" /> {/* darker pastel */}
              </linearGradient>
              {/* Sprinkles gradients/colors */}
              <radialGradient id="sprinkleGrad1" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FFD700" stopOpacity="1" />  {/* gold */}
                <stop offset="100%" stopColor="#FFD700" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="sprinkleGrad2" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ADFF2F" stopOpacity="1" />  {/* green-yellow */}
                <stop offset="100%" stopColor="#ADFF2F" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="sprinkleGrad3" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#87CEFA" stopOpacity="1" />  {/* light sky blue */}
                <stop offset="100%" stopColor="#87CEFA" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="sprinkleGrad4" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FF69B4" stopOpacity="1" />  {/* hot pink */}
                <stop offset="100%" stopColor="#FF69B4" stopOpacity="0" />
              </radialGradient>
            </defs>
            {/* Bottom layer */}
            <rect x={8} y={34} width={48} height={14} rx={4} ry={4} fill="url(#bottomGrad)" stroke="#CCC" strokeWidth={1} />
            {/* Middle layer */}
            <rect x={12} y={26} width={40} height={12} rx={4} ry={4} fill="url(#middleGrad)" stroke="#BBB" strokeWidth={1} />
            {/* Icing/top layer */}
            <path
              d="M12 26
                 C14 18, 50 18, 52 26
                 L52 34
                 C50 32, 14 32, 12 34
                 Z"
              fill="url(#icingGrad)"
              stroke="#FF69B4"
              strokeWidth={1}
            />
            {/* Sprinkles: วาดเป็นวงกลมเล็กๆ บน icing */}
            {[
              { cx: 20, cy: 24, grad: 'sprinkleGrad1', r: 1.5 },
              { cx: 30, cy: 22, grad: 'sprinkleGrad2', r: 1.5 },
              { cx: 40, cy: 24, grad: 'sprinkleGrad3', r: 1.5 },
              { cx: 25, cy: 28, grad: 'sprinkleGrad4', r: 1.5 },
              { cx: 35, cy: 27, grad: 'sprinkleGrad1', r: 1.5 },
              // เพิ่มจุด sprinkles ตามต้องการ
            ].map((s, idx) => (
              <circle key={idx} cx={s.cx} cy={s.cy} r={s.r} fill={`url(#${s.grad})`} />
            ))}
            {/* Candles: ปรับสีเทียนให้เข้มขึ้น พร้อมเปลวไฟ */}
            {[...Array(3)].map((_, i) => {
              const x = 18 + i * 12;
              return (
                <g key={i}>
                  {/* แท่งเทียน */}
                  <rect x={x} y={12} width={4} height={12} fill="#FFD700" /> {/* สีทอง */}
                  {/* เปลวไฟ */}
                  <path
                    d={`
                      M${x + 2} 12
                      C${x + 3} 8, ${x - 1} 8, ${x + 2} 4
                      C${x + 5} 8, ${x + 1} 8, ${x + 2} 12
                    `}
                    fill="#FFA500"
                    className="animate-flicker-subtle"
                  />
                </g>
              );
            })}
          </svg>
        </motion.div>

        {/* ปุ่ม Celebrate Again */}
        <motion.button
          onClick={celebrate}
          className="mt-4 px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg shadow transition"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          🎉 Celebrate Again
        </motion.button>
      </motion.div>
    </div>
  );
};

export default App;
