// src/components/Balloon.tsx
import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

interface BalloonProps {
  color: string;      // สีหลักของลูกโป่ง (hex)
  left: string;       // ตำแหน่งซ้าย (เช่น "20%")
  delay: number;      // delay ก่อนเริ่ม animate
  duration: number;   // ระยะเวลา animate (ลอยขึ้น)
  size: number;       // ขนาด base width in px (e.g. 30–60)
}

const gradientIdFromColor = (color: string) => {
  return 'grad_' + color.replace('#', '');
};

const Balloon: React.FC<BalloonProps> = ({ color, left, delay, duration, size }) => {
  // คำนวณ dimensions: width=size px, height = size * 1.4 px
  const width = size;
  const height = Math.round(size * 1.4);
  // สุ่ม sway amplitude เล็กน้อยตาม size (relative): e.g. 5–15 px
  const swayAmp = Math.max(5, Math.min(15, Math.round(size * 0.3)));
  // สร้าง IDs สำหรับ gradient, memoize เพื่อไม่ให้เปลี่ยนทุก render
  const gradId = useMemo(() => gradientIdFromColor(color), [color]);
  const highlightId = gradId + '_hl';

  // คำนวณระยะ vertical ที่ลอย: ใช้ window.innerHeight + extra
  // แต่ Framer Motion ไม่แนะนำให้ใช้ window ใน SSR; assume run client-side.
  // สำหรับ safety: เริ่ม animate ทีหลัง mount
  // Here, we'll animate y จาก 0 → -(viewportHeight + height)
  // แต่ Framer Motion ต้องการค่า concrete; เราใช้ useMemo, หรือใช้ viewport units via CSS?
  // Simpler: animate y: [0, -150vh] เพราะ 150vh มากพอสำหรับลอยพ้น top
  const yTarget = '-150vh';

  return (
    <motion.div
      style={{
        position: 'absolute',
        left,
        bottom: `-${height}px`, // เริ่มใต้ viewport เล็กน้อย
        width: `${width}px`,
        height: `${height}px`,
        pointerEvents: 'none',
        zIndex: 1, // ต่ำกว่า Card (Card ใช้ z-10)
      }}
      initial={{ y: 0, opacity: 0 }}
      animate={{
        y: yTarget,
        opacity: [0, 1, 1, 0], // เริ่มโปร่ง, fade-in, คง, fade-out
        x: [0, swayAmp, -swayAmp, 0], // sway ซ้ายขวา
      }}
      transition={{
        delay,
        duration,
        repeat: Infinity,
        ease: 'linear',
      }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${width} ${height}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id={gradId} cx="50%" cy="30%" r="60%">
            <stop offset="0%" stopColor={color} stopOpacity="1" />
            <stop offset="100%" stopColor={color} stopOpacity="0.7" />
          </radialGradient>
          <radialGradient id={highlightId} cx="30%" cy="25%" r="30%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
        </defs>
        {/* วาดลูกโป่งเป็น ellipse */}
        <ellipse
          cx={width / 2}
          cy={height * 0.4}
          rx={width * 0.45}
          ry={height * 0.4}
          fill={`url(#${gradId})`}
          stroke="rgba(0,0,0,0.1)"
          strokeWidth={Math.max(1, Math.round(size * 0.03))}
        />
        {/* Highlight */}
        <ellipse
          cx={width * 0.35}
          cy={height * 0.3}
          rx={width * 0.15}
          ry={height * 0.15}
          fill={`url(#${highlightId})`}
        />
        {/* เชือกลูกโป่ง: path ปรับตาม size */}
        <path
          d={`
            M${width / 2} ${height * 0.8}
            C${width / 2 - size * 0.1} ${height * 0.9},
             ${width / 2 + size * 0.1} ${height * 0.9},
             ${width / 2} ${height + size * 0.1}
          `}
          stroke="rgba(0,0,0,0.2)"
          strokeWidth={Math.max(1, Math.round(size * 0.02))}
          fill="none"
        />
      </svg>
    </motion.div>
  );
};

export default Balloon;
