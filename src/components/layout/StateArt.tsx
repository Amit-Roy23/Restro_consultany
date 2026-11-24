import type { ReactNode } from "react";

import type { LanguageCode } from "@/i18n/languages";

/**
 * Colourful illustrations for the language picker: a famous sight from the
 * state (or region) where each language is spoken. Hand-drawn SVG — no image
 * requests, crisp at any size, no licensing.
 */
export const stateArtCaptions: Record<LanguageCode, string> = {
  en: "India Gate · Delhi",
  hi: "Taj Mahal · Uttar Pradesh",
  bn: "Howrah Bridge · West Bengal",
  gu: "Uttarayan kites · Gujarat",
  mr: "Gateway of India · Maharashtra",
  ta: "Meenakshi Temple · Tamil Nadu",
  te: "Charminar · Telangana",
  kn: "Mysuru Palace · Karnataka",
  ml: "Backwaters · Kerala",
  pa: "Golden Temple · Punjab",
  or: "Konark Sun Temple · Odisha",
  as: "Tea gardens · Assam",
};

const SKIES: Record<LanguageCode, [string, string]> = {
  en: ["#ff8a5c", "#ffd88a"],
  hi: ["#b8a4ff", "#ffd2b3"],
  bn: ["#ff7e67", "#ffcf87"],
  gu: ["#3fb8ff", "#c4f1ff"],
  mr: ["#78b4ff", "#ffdca3"],
  ta: ["#ffa53d", "#ffe48f"],
  te: ["#ff97c1", "#ffd8a8"],
  kn: ["#241f63", "#6b4a9c"],
  ml: ["#7de0c0", "#effcc9"],
  pa: ["#ffc65c", "#fff2c7"],
  or: ["#ff7139", "#ffc25a"],
  as: ["#a8e3ff", "#eafff0"],
};

export function StateArt({
  code,
  className,
}: {
  code: LanguageCode;
  className?: string;
}) {
  const [top, bottom] = SKIES[code];
  const sky = `art-${code}-sky`;
  return (
    <svg
      viewBox="0 0 160 100"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label={stateArtCaptions[code]}
      className={className}
    >
      <defs>
        <linearGradient id={sky} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={top} />
          <stop offset="1" stopColor={bottom} />
        </linearGradient>
      </defs>
      <rect width="160" height="100" fill={`url(#${sky})`} />
      {SCENES[code]}
    </svg>
  );
}

/* ------------------------------------------------------------------ */

const range = (n: number) => Array.from({ length: n }, (_, i) => i);

const SCENES: Record<LanguageCode, ReactNode> = {
  /* India Gate, Delhi */
  en: (
    <>
      <circle cx="124" cy="28" r="14" fill="#fff3c4" opacity="0.85" />
      <rect y="84" width="160" height="16" fill="#4caf50" />
      <rect y="84" width="160" height="3" fill="#7bd17f" />
      <circle cx="22" cy="80" r="9" fill="#2e7d32" />
      <circle cx="138" cy="80" r="9" fill="#2e7d32" />
      <rect x="48" y="81" width="64" height="5" fill="#a9552a" />
      <path d="M56 82V34h48v48H90V58a10 10 0 0 0-20 0v24z" fill="#d47a45" />
      <rect x="60" y="36" width="3" height="46" fill="#a9552a" opacity="0.35" />
      <rect x="97" y="36" width="3" height="46" fill="#a9552a" opacity="0.35" />
      <rect x="52" y="28" width="56" height="7" fill="#b9602f" />
      <rect x="62" y="18" width="36" height="11" fill="#d47a45" />
      <rect x="65" y="22" width="30" height="2" fill="#a9552a" opacity="0.6" />
      <path d="M71 18q9-9 18 0z" fill="#b9602f" />
    </>
  ),

  /* Taj Mahal, Uttar Pradesh */
  hi: (
    <>
      <rect y="80" width="160" height="20" fill="#7cc6ea" />
      <rect x="76" y="80" width="8" height="20" fill="#bfe6f7" />
      {[12, 24, 136, 148].map((x) => (
        <ellipse key={x} cx={x} cy="72" rx="4" ry="11" fill="#2f6b3a" />
      ))}
      <rect x="30" y="74" width="100" height="7" fill="#efe5d3" />
      {[33, 123].map((x) => (
        <g key={x}>
          <rect x={x} y="40" width="4" height="34" fill="#fffdf7" />
          <rect x={x - 1} y="52" width="6" height="2" fill="#e6dccb" />
          <path d={`M${x - 1} 40q3-7 6 0z`} fill="#fffdf7" />
        </g>
      ))}
      <rect x="52" y="48" width="56" height="27" fill="#fffdf7" />
      <path d="M72 75V60q8-10 16 0v15z" fill="#e7dcc8" />
      <path d="M57 74v-9q3-4 6 0v9zM97 74v-9q3-4 6 0v9z" fill="#e7dcc8" />
      <circle cx="58" cy="46" r="5" fill="#fffdf7" />
      <circle cx="102" cy="46" r="5" fill="#fffdf7" />
      <path d="M62 48q0-22 18-30 18 8 18 30z" fill="#fffdf7" />
      <path d="M80 18q8 4 13 14" stroke="#e7dcc8" strokeWidth="1.5" fill="none" />
      <rect x="79.3" y="7" width="1.4" height="12" fill="#d4b26a" />
    </>
  ),

  /* Howrah Bridge, West Bengal */
  bn: (
    <>
      <circle cx="30" cy="30" r="12" fill="#fff1c9" opacity="0.8" />
      <rect y="68" width="160" height="32" fill="#2f78a8" />
      {range(5).map((i) => (
        <rect
          key={i}
          x={10 + i * 30}
          y={78 + (i % 2) * 8}
          width="16"
          height="1.5"
          fill="#8fc6e8"
        />
      ))}
      <path
        d="M0 54L39 24l41 22 41-22 39 30"
        stroke="#4a5568"
        strokeWidth="3"
        fill="none"
      />
      {range(17).map((i) => {
        const x = i * 10;
        const topY =
          x <= 39
            ? 54 - (x / 39) * 30
            : x <= 80
              ? 24 + ((x - 39) / 41) * 22
              : x <= 121
                ? 46 - ((x - 80) / 41) * 22
                : 24 + ((x - 121) / 39) * 30;
        return (
          <line
            key={i}
            x1={x}
            y1={topY}
            x2={x + 5}
            y2="66"
            stroke="#5b6577"
            strokeWidth="1.2"
          />
        );
      })}
      <rect x="35" y="22" width="7" height="46" fill="#3c4555" />
      <rect x="118" y="22" width="7" height="46" fill="#3c4555" />
      <rect y="64" width="160" height="4" fill="#3c4555" />
      <rect x="58" y="59" width="9" height="5" rx="1" fill="#ffd400" />
      <rect x="94" y="59" width="9" height="5" rx="1" fill="#ffd400" />
      <path d="M64 86h22l-3 4H67z" fill="#7a4a24" />
      <path d="M75 86V76l7 9z" fill="#fff" />
    </>
  ),

  /* Uttarayan kites, Gujarat */
  gu: (
    <>
      <ellipse cx="34" cy="22" rx="16" ry="5" fill="#fff" opacity="0.8" />
      <ellipse cx="126" cy="14" rx="14" ry="4" fill="#fff" opacity="0.8" />
      {[
        [40, 46, 13, "#ff2d87", "#ffd400"],
        [92, 30, 15, "#ff7a00", "#2ecc71"],
        [128, 52, 11, "#7b2ff7", "#00c2ff"],
        [70, 66, 9, "#e53935", "#ffeb3b"],
        [18, 74, 8, "#00b894", "#ff6b6b"],
      ].map(([cx, cy, s, a, b]) => {
        const x = cx as number;
        const y = cy as number;
        const z = s as number;
        return (
          <g key={`${x}-${y}`}>
            <path
              d={`M${x} ${y + z}q-6 20 10 40`}
              stroke="#ffffff"
              strokeWidth="0.8"
              fill="none"
              opacity="0.8"
            />
            <path
              d={`M${x} ${y - z}L${x + z * 0.8} ${y}L${x} ${y + z}z`}
              fill={b as string}
            />
            <path
              d={`M${x} ${y - z}L${x - z * 0.8} ${y}L${x} ${y + z}z`}
              fill={a as string}
            />
            <path d={`M${x - 2} ${y + z}l2 4 2-4z`} fill={a as string} />
          </g>
        );
      })}
      {[
        [0, 86, 26, "#f4a259"],
        [26, 82, 22, "#e76f51"],
        [48, 88, 30, "#f6bd60"],
        [78, 84, 24, "#84a59d"],
        [102, 80, 30, "#f28482"],
        [132, 86, 28, "#f6bd60"],
      ].map(([x, y, w, c]) => (
        <rect
          key={x as number}
          x={x as number}
          y={y as number}
          width={w as number}
          height="20"
          fill={c as string}
        />
      ))}
    </>
  ),

  /* Gateway of India, Mumbai */
  mr: (
    <>
      <rect y="78" width="160" height="22" fill="#2b7bb9" />
      {range(4).map((i) => (
        <path
          key={i}
          d={`M${8 + i * 40} ${86 + (i % 2) * 6}q5-3 10 0`}
          stroke="#9fd0f5"
          strokeWidth="1.2"
          fill="none"
        />
      ))}
      <rect x="40" y="72" width="80" height="8" fill="#b9833d" />
      <rect x="48" y="38" width="64" height="36" fill="#dca85e" />
      <path d="M70 74V54q10-12 20 0v20z" fill="#7c5426" />
      {[52, 101].map((x) => (
        <rect key={x} x={x} y="50" width="7" height="12" rx="3.5" fill="#b9833d" />
      ))}
      <rect x="64" y="32" width="32" height="7" fill="#c8924a" />
      {[46, 58, 96, 108].map((x) => (
        <g key={x}>
          <rect x={x} y="26" width="6" height="14" fill="#dca85e" />
          <circle cx={x + 3} cy="26" r="4" fill="#c8924a" />
        </g>
      ))}
      <path d="M124 84h18l-3 4h-12z" fill="#fff" />
      <path d="M132 84V72l7 11z" fill="#ff7043" />
    </>
  ),

  /* Meenakshi temple gopuram, Tamil Nadu */
  ta: (
    <>
      <rect y="88" width="160" height="12" fill="#c98b4b" />
      <rect x="36" y="76" width="88" height="13" fill="#c62828" />
      <path d="M74 89V81q6-6 12 0v8z" fill="#4e1a12" />
      {range(7).map((i) => {
        const w = 76 - i * 9;
        const colors = [
          "#1e88e5",
          "#43a047",
          "#fdd835",
          "#8e24aa",
          "#fb8c00",
          "#00acc1",
          "#e53935",
        ];
        const c = colors[i]!;
        const y = 76 - (i + 1) * 8;
        return (
          <g key={i}>
            <rect x={80 - w / 2} y={y} width={w} height="8" fill={c} />
            {range(Math.max(2, Math.floor(w / 7))).map((j) => (
              <rect
                key={j}
                x={80 - w / 2 + 3 + j * 7}
                y={y + 2}
                width="3"
                height="5"
                rx="1"
                fill={i % 2 ? "#fff3" : "#0003"}
              />
            ))}
          </g>
        );
      })}
      <path d="M64 20q16-12 32 0v-2H64z" fill="#e53935" />
      <rect x="64" y="18" width="32" height="3" fill="#e53935" />
      {[68, 74, 80, 86, 92].map((x) => (
        <circle key={x} cx={x} cy="13" r="2" fill="#ffc400" />
      ))}
    </>
  ),

  /* Charminar, Hyderabad */
  te: (
    <>
      <rect y="86" width="160" height="14" fill="#d9a066" />
      {[58, 98].map((x) => (
        <rect key={x} x={x} y="22" width="4" height="20" fill="#f0d3a6" />
      ))}
      <rect x="52" y="44" width="56" height="42" fill="#e6bf87" />
      <path d="M64 86V64q16-18 32 0v22z" fill="#8a5a2c" />
      <rect x="52" y="38" width="56" height="7" fill="#d4a66a" />
      {range(6).map((i) => (
        <rect
          key={i}
          x={56 + i * 8.6}
          y="39.5"
          width="4"
          height="4"
          rx="2"
          fill="#8a5a2c"
        />
      ))}
      {[44, 110].map((x) => (
        <g key={x}>
          <rect x={x} y="16" width="6" height="70" fill="#e6bf87" />
          <rect x={x - 1.5} y="40" width="9" height="3" fill="#c99a5c" />
          <rect x={x - 1.5} y="28" width="9" height="3" fill="#c99a5c" />
          <circle cx={x + 3} cy="14" r="4.5" fill="#d4a66a" />
          <rect x={x + 2.4} y="5" width="1.2" height="6" fill="#a87a3c" />
        </g>
      ))}
    </>
  ),

  /* Mysuru Palace lit at night, Karnataka */
  kn: (
    <>
      {[
        [16, 12],
        [40, 22],
        [70, 8],
        [120, 16],
        [146, 30],
        [100, 6],
        [28, 40],
      ].map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="0.9" fill="#fff" />
      ))}
      <rect y="84" width="160" height="16" fill="#2c2147" />
      <rect x="22" y="52" width="116" height="32" fill="#e9b949" />
      <rect x="68" y="34" width="24" height="50" fill="#f2c14e" />
      <path d="M68 34q12-20 24 0z" fill="#c0392b" />
      <rect x="79.4" y="10" width="1.2" height="6" fill="#ffd54f" />
      {[28, 124].map((x) => (
        <g key={x}>
          <rect x={x} y="40" width="10" height="12" fill="#f2c14e" />
          <path d={`M${x} 40q5-9 10 0z`} fill="#c0392b" />
        </g>
      ))}
      {range(5).map((i) => (
        <path key={i} d={`M${30 + i * 8} 84v-10q3-4 6 0v10z`} fill="#7a4a12" />
      ))}
      {range(5).map((i) => (
        <path key={i} d={`M${96 + i * 8} 84v-10q3-4 6 0v10z`} fill="#7a4a12" />
      ))}
      <path d="M74 84V66q6-7 12 0v18z" fill="#7a4a12" />
      {/* string lights along every edge */}
      {range(30).map((i) => (
        <circle key={`a${i}`} cx={22 + i * 4} cy="52" r="0.9" fill="#fff6b0" />
      ))}
      {range(13).map((i) => (
        <circle key={`b${i}`} cx="68" cy={34 + i * 4} r="0.9" fill="#fff6b0" />
      ))}
      {range(13).map((i) => (
        <circle key={`c${i}`} cx="92" cy={34 + i * 4} r="0.9" fill="#fff6b0" />
      ))}
      {range(9).map((i) => {
        const t = i / 8;
        return (
          <circle
            key={`d${i}`}
            cx={68 + t * 24}
            cy={34 - Math.sin(t * Math.PI) * 15}
            r="0.9"
            fill="#fff6b0"
          />
        );
      })}
    </>
  ),

  /* Kerala backwaters */
  ml: (
    <>
      <circle cx="122" cy="26" r="11" fill="#fff59d" opacity="0.9" />
      <rect y="58" width="160" height="10" fill="#4f9a3f" />
      <rect y="66" width="160" height="34" fill="#1d8a8a" />
      {range(5).map((i) => (
        <rect
          key={i}
          x={6 + i * 32}
          y={74 + (i % 2) * 10}
          width="14"
          height="1.2"
          fill="#8fe0d6"
        />
      ))}
      {[
        [18, 0.9],
        [36, 1.1],
        [142, 1],
      ].map(([x, s]) => {
        const px = x as number;
        const k = s as number;
        return (
          <g key={px} transform={`translate(${px} 62) scale(${k})`}>
            <path d="M0 0q2-18 8-34" stroke="#7b5232" strokeWidth="2.5" fill="none" />
            {[-60, -25, 10, 45, 80].map((a) => (
              <path
                key={a}
                d="M8-34q10-2 18 8"
                stroke="#2e7d32"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                transform={`rotate(${a} 8 -34)`}
              />
            ))}
          </g>
        );
      })}
      <path d="M50 70q34-26 66 0z" fill="#d9a35b" />
      <path d="M54 70q30-20 58 0" stroke="#b07a35" strokeWidth="1" fill="none" />
      <rect x="62" y="64" width="42" height="7" fill="#f3e3c2" />
      {range(5).map((i) => (
        <rect key={i} x={65 + i * 8} y="65.5" width="4" height="4" fill="#6d4c2f" />
      ))}
      <path d="M42 72q41 16 82 0l-4 6q-37 10-74 0z" fill="#6d4c2f" />
    </>
  ),

  /* Golden Temple, Amritsar */
  pa: (
    <>
      <rect y="54" width="160" height="14" fill="#f5efe6" />
      {range(10).map((i) => (
        <rect key={i} x={4 + i * 16} y="57" width="6" height="8" rx="3" fill="#e2d6c3" />
      ))}
      <rect y="68" width="160" height="32" fill="#3b7dd8" />
      <rect y="66" width="56" height="3" fill="#fffaf0" />
      <g>
        <rect x="56" y="56" width="48" height="14" fill="#e9a825" />
        <rect x="64" y="44" width="32" height="12" fill="#f4c430" />
        <path d="M70 44q0-15 10-19 10 4 10 19z" fill="#f6c945" />
        <rect x="79.4" y="18" width="1.2" height="8" fill="#e9a825" />
        {[58, 100].map((x) => (
          <circle key={x} cx={x} cy="55" r="3" fill="#f6c945" />
        ))}
        {range(4).map((i) => (
          <path key={i} d={`M${60 + i * 11} 70v-7q2.5-3 5 0v7z`} fill="#b87d0e" />
        ))}
      </g>
      {/* golden reflection with ripples */}
      <g opacity="0.75" transform="translate(0 140) scale(1 -1)">
        <rect x="58" y="56" width="44" height="14" fill="#f6c945" />
        <rect x="65" y="46" width="30" height="10" fill="#f8d468" />
        <path d="M71 46q0-13 9-17 9 4 9 17z" fill="#fadc7a" />
      </g>
      {[74, 78, 82, 86, 90, 94].map((y) => (
        <rect key={y} x="54" y={y} width="52" height="1.2" fill="#3b7dd8" opacity="0.9" />
      ))}
    </>
  ),

  /* Konark Sun Temple wheel, Odisha */
  or: (
    <>
      <circle cx="80" cy="50" r="46" fill="#ffd27a" opacity="0.45" />
      <g transform="translate(80 50)">
        <circle r="36" fill="none" stroke="#8d5a33" strokeWidth="7" />
        <circle
          r="36"
          fill="none"
          stroke="#b07a4a"
          strokeWidth="1.5"
          strokeDasharray="2 3"
        />
        <circle r="26" fill="none" stroke="#8d5a33" strokeWidth="2.5" />
        {range(16).map((i) => (
          <line
            key={i}
            x1="0"
            y1="0"
            x2={Math.cos((i * Math.PI) / 8) * 33}
            y2={Math.sin((i * Math.PI) / 8) * 33}
            stroke="#8d5a33"
            strokeWidth={i % 2 === 0 ? 4 : 1.6}
          />
        ))}
        {range(16).map((i) => (
          <circle
            key={`b${i}`}
            cx={Math.cos(((i + 0.5) * Math.PI) / 8) * 30}
            cy={Math.sin(((i + 0.5) * Math.PI) / 8) * 30}
            r="1.4"
            fill="#6b4024"
          />
        ))}
        <circle r="7" fill="#8d5a33" />
        <circle r="3" fill="#b07a4a" />
      </g>
    </>
  ),

  /* Assam tea gardens */
  as: (
    <>
      <circle cx="128" cy="24" r="11" fill="#fff9c4" />
      <path d="M0 58q40-26 80-6t80-10v58H0z" fill="#9ccc65" />
      <path d="M0 70q50-22 100-4t60-6v40H0z" fill="#689f38" />
      <path d="M0 82q60-18 120-2t40-2v22H0z" fill="#33691e" />
      {range(4).map((i) => (
        <path
          key={i}
          d={`M0 ${74 + i * 6}q50-20 100-4t60-6`}
          stroke="#8bc34a"
          strokeWidth="2.4"
          strokeDasharray="3 2"
          fill="none"
          strokeLinecap="round"
        />
      ))}
      {[
        [34, 50],
        [112, 54],
      ].map(([x, y]) => (
        <g key={x}>
          <rect x={x - 0.8} y={y} width="1.6" height="14" fill="#5d4037" />
          <ellipse cx={x} cy={y} rx="10" ry="3.5" fill="#2e7d32" />
        </g>
      ))}
    </>
  ),
};
