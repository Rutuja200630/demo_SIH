import { motion } from "framer-motion";

export default function IndianPatternBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
      {/* Traditional Indian geometric patterns */}
      <svg
        width="100%"
        height="100%"
        className="absolute inset-0"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Paisley pattern */}
          <pattern
            id="paisley"
            x="0"
            y="0"
            width="80"
            height="80"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M20,60 Q10,50 15,35 Q20,20 35,25 Q50,30 45,45 Q40,60 25,55 Q20,60 20,60"
              fill="currentColor"
              opacity="0.1"
            />
          </pattern>
          
          {/* Mandala pattern */}
          <pattern
            id="mandala"
            x="0"
            y="0"
            width="120"
            height="120"
            patternUnits="userSpaceOnUse"
          >
            <circle
              cx="60"
              cy="60"
              r="30"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              opacity="0.08"
            />
            <circle
              cx="60"
              cy="60"
              r="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              opacity="0.06"
            />
            <circle
              cx="60"
              cy="60"
              r="10"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              opacity="0.04"
            />
            {/* Petals */}
            {[...Array(8)].map((_, i) => (
              <ellipse
                key={i}
                cx="60"
                cy="40"
                rx="3"
                ry="8"
                fill="currentColor"
                opacity="0.05"
                transform={`rotate(${i * 45} 60 60)`}
              />
            ))}
          </pattern>
          
          {/* Lotus pattern */}
          <pattern
            id="lotus"
            x="0"
            y="0"
            width="100"
            height="100"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M50,70 Q40,60 45,50 Q50,40 55,50 Q60,60 50,70"
              fill="currentColor"
              opacity="0.06"
            />
            <path
              d="M50,70 Q35,65 40,50 Q50,35 60,50 Q65,65 50,70"
              fill="currentColor"
              opacity="0.04"
            />
          </pattern>
        </defs>
        
        {/* Apply patterns with Indian flag colors */}
        <rect
          width="100%"
          height="33%"
          fill="url(#paisley)"
          className="text-orange-600"
        />
        <rect
          y="33%"
          width="100%"
          height="34%"
          fill="url(#mandala)"
          className="text-green-700"
        />
        <rect
          y="67%"
          width="100%"
          height="33%"
          fill="url(#lotus)"
          className="text-orange-700"
        />
      </svg>
      
      {/* Floating heritage icons */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-20 right-20 text-orange-400/20"
      >
        🕌
      </motion.div>
      
      <motion.div
        animate={{
          y: [0, 15, 0],
          rotate: [0, -3, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute top-40 left-32 text-green-600/20"
      >
        🏛️
      </motion.div>
      
      <motion.div
        animate={{
          y: [0, -10, 0],
          rotate: [0, 2, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4,
        }}
        className="absolute bottom-32 right-40 text-orange-500/20"
      >
        🎪
      </motion.div>
      
      <motion.div
        animate={{
          y: [0, 12, 0],
          rotate: [0, -4, 0],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute bottom-20 left-20 text-green-500/20"
      >
        🏺
      </motion.div>
    </div>
  );
}