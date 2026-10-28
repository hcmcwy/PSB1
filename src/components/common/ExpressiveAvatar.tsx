import React from 'react';
import { EmotionType } from '../../types/game';

interface AvatarProps {
  emotion?: EmotionType | 'neutral' | 'speaking';
  showAccessory?: 'violin' | 'trophy' | 'medal' | 'star' | 'palette' | 'book' | 'none';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  isAnimated?: boolean;
}

export const ExpressiveAvatar: React.FC<AvatarProps> = ({
  emotion = 'neutral',
  showAccessory = 'violin',
  size = 'md',
  className = '',
  isAnimated = true,
}) => {
  const sizeMap = {
    sm: 'w-16 h-16',
    md: 'w-28 h-28',
    lg: 'w-40 h-40',
    xl: 'w-56 h-56',
  };

  return (
    <div className={`relative inline-block ${sizeMap[size]} ${className} ${isAnimated ? 'animate-float' : ''}`}>
      <svg
        viewBox="0 0 200 200"
        className="w-full h-full drop-shadow-md select-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="skinGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fed7aa" />
            <stop offset="100%" stopColor="#fdba74" />
          </linearGradient>
          <linearGradient id="hairGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1e293b" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>
          <linearGradient id="shirtGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>
          <linearGradient id="collarGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1e3a8a" />
            <stop offset="100%" stopColor="#1e40af" />
          </linearGradient>
          <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fde047" />
            <stop offset="50%" stopColor="#eab308" />
            <stop offset="100%" stopColor="#ca8a04" />
          </linearGradient>
        </defs>

        {/* Halo / Aura */}
        <circle cx="100" cy="100" r="92" fill={
          emotion === 'proud' ? '#fef3c7' :
          emotion === 'excited' ? '#ffe4e6' :
          emotion === 'content' ? '#ecfdf5' :
          emotion === 'frustrated' ? '#f1f5f9' : '#f8fafc'
        } />
        
        {/* Soft decorative background ring */}
        <circle cx="100" cy="100" r="88" stroke={
          emotion === 'proud' ? '#fcd34d' :
          emotion === 'excited' ? '#fda4af' :
          emotion === 'content' ? '#a7f3d0' :
          emotion === 'frustrated' ? '#cbd5e1' : '#e2e8f0'
        } strokeWidth="3" fill="none" strokeDasharray="6 4" />

        {/* Shoulders & School Uniform (Yellow shirt with Navy collar matching PDF) */}
        <path
          d="M 45 190 C 45 155, 75 145, 100 145 C 125 145, 155 155, 155 190 Z"
          fill="url(#shirtGrad)"
        />
        {/* Navy Collar */}
        <path
          d="M 85 145 L 100 168 L 115 145 Z"
          fill="url(#collarGrad)"
        />
        <path
          d="M 68 147 L 85 152 L 80 162 Z"
          fill="#1e3a8a"
        />
        <path
          d="M 132 147 L 115 152 L 120 162 Z"
          fill="#1e3a8a"
        />

        {/* Neck */}
        <rect x="88" y="125" width="24" height="25" rx="6" fill="url(#skinGrad)" />

        {/* Ears */}
        <circle cx="56" cy="100" r="11" fill="url(#skinGrad)" />
        <circle cx="56" cy="100" r="6" fill="#fca5a5" opacity="0.6" />
        <circle cx="144" cy="100" r="11" fill="url(#skinGrad)" />
        <circle cx="144" cy="100" r="6" fill="#fca5a5" opacity="0.6" />

        {/* Face */}
        <ellipse cx="100" cy="98" rx="44" ry="46" fill="url(#skinGrad)" />

        {/* Hair - Neat stylish fringe from PDF */}
        <path
          d="M 54 85 C 50 60, 70 42, 100 42 C 130 42, 150 60, 146 85 C 142 66, 128 58, 105 58 C 85 58, 65 68, 54 85 Z"
          fill="url(#hairGrad)"
        />
        {/* Hair bangs */}
        <path
          d="M 58 72 C 72 65, 85 75, 96 68 C 108 76, 126 66, 142 75 C 134 60, 115 52, 100 52 C 78 52, 65 62, 58 72 Z"
          fill="url(#hairGrad)"
        />

        {/* Eyebrows */}
        {emotion === 'proud' && (
          <g stroke="#1e293b" strokeWidth="3" strokeLinecap="round" fill="none">
            <path d="M 72 80 Q 82 74 90 78" />
            <path d="M 110 78 Q 118 74 128 80" />
          </g>
        )}
        {emotion === 'excited' && (
          <g stroke="#1e293b" strokeWidth="3" strokeLinecap="round" fill="none">
            <path d="M 72 76 Q 82 70 90 74" />
            <path d="M 110 74 Q 118 70 128 76" />
          </g>
        )}
        {emotion === 'content' && (
          <g stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" fill="none">
            <path d="M 74 81 Q 82 78 88 80" />
            <path d="M 112 80 Q 118 78 126 81" />
          </g>
        )}
        {emotion === 'frustrated' && (
          <g stroke="#1e293b" strokeWidth="3" strokeLinecap="round" fill="none">
            <path d="M 72 82 Q 80 84 88 80" />
            <path d="M 112 80 Q 120 84 128 82" />
          </g>
        )}
        {(emotion === 'neutral' || emotion === 'speaking') && (
          <g stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" fill="none">
            <path d="M 74 80 Q 82 76 90 80" />
            <path d="M 110 80 Q 118 76 126 80" />
          </g>
        )}

        {/* Eyes */}
        {emotion === 'content' ? (
          // Peaceful curved eyes
          <g stroke="#1e293b" strokeWidth="3.2" strokeLinecap="round" fill="none">
            <path d="M 73 95 Q 81 101 89 95" />
            <path d="M 111 95 Q 119 101 127 95" />
          </g>
        ) : emotion === 'excited' ? (
          // Sparkling wide eyes
          <g>
            <circle cx="81" cy="94" r="9" fill="#1e293b" />
            <circle cx="78" cy="91" r="3.5" fill="#ffffff" />
            <circle cx="84" cy="97" r="1.5" fill="#ffffff" />
            <circle cx="119" cy="94" r="9" fill="#1e293b" />
            <circle cx="116" cy="91" r="3.5" fill="#ffffff" />
            <circle cx="122" cy="97" r="1.5" fill="#ffffff" />
          </g>
        ) : emotion === 'frustrated' ? (
          // Troubled downward eyes
          <g>
            <circle cx="81" cy="96" r="7" fill="#1e293b" />
            <circle cx="79" cy="94" r="2.5" fill="#ffffff" />
            <circle cx="119" cy="96" r="7" fill="#1e293b" />
            <circle cx="117" cy="94" r="2.5" fill="#ffffff" />
            {/* Cute sweat drop */}
            <path d="M 134 85 Q 138 88 135 93 Q 131 93 134 85 Z" fill="#60a5fa" />
          </g>
        ) : (
          // Bright confident eyes
          <g>
            <circle cx="81" cy="95" r="7.5" fill="#1e293b" />
            <circle cx="79" cy="92" r="3" fill="#ffffff" />
            <circle cx="119" cy="95" r="7.5" fill="#1e293b" />
            <circle cx="117" cy="92" r="3" fill="#ffffff" />
          </g>
        )}

        {/* Cute rosy cheeks */}
        <circle cx="68" cy="105" r="7" fill="#f43f5e" opacity={emotion === 'frustrated' ? '0.2' : '0.35'} />
        <circle cx="132" cy="105" r="7" fill="#f43f5e" opacity={emotion === 'frustrated' ? '0.2' : '0.35'} />

        {/* Nose */}
        <path d="M 98 100 Q 100 104 102 100" stroke="#f97316" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.6" />

        {/* Mouth */}
        {emotion === 'proud' && (
          <path d="M 85 114 Q 100 128 115 114" stroke="#dc2626" strokeWidth="3.5" strokeLinecap="round" fill="#fff1f2" />
        )}
        {emotion === 'excited' && (
          <ellipse cx="100" cy="116" rx="11" ry="8" fill="#be123c" />
        )}
        {emotion === 'content' && (
          <path d="M 88 115 Q 100 122 112 115" stroke="#991b1b" strokeWidth="3" strokeLinecap="round" fill="none" />
        )}
        {emotion === 'frustrated' && (
          <path d="M 87 122 Q 100 114 113 122" stroke="#475569" strokeWidth="3" strokeLinecap="round" fill="none" />
        )}
        {emotion === 'speaking' && (
          <ellipse cx="100" cy="116" rx="8" ry="7" fill="#be123c" stroke="#991b1b" strokeWidth="2" />
        )}
        {emotion === 'neutral' && (
          <path d="M 88 115 Q 100 124 112 115" stroke="#991b1b" strokeWidth="3" strokeLinecap="round" fill="none" />
        )}

        {/* Accessories */}
        {showAccessory === 'violin' && (
          <g transform="translate(132, 115) rotate(15) scale(0.48)">
            {/* Wooden violin body */}
            <path
              d="M 30 10 C 15 15, 10 35, 25 50 C 12 60, 10 85, 30 100 C 50 85, 48 60, 35 50 C 50 35, 45 15, 30 10 Z"
              fill="#b45309"
              stroke="#78350f"
              strokeWidth="3"
            />
            {/* F-holes */}
            <path d="M 24 45 Q 26 55 23 65" stroke="#451a03" strokeWidth="2" fill="none" />
            <path d="M 36 45 Q 34 55 37 65" stroke="#451a03" strokeWidth="2" fill="none" />
            {/* Neck & scroll */}
            <rect x="27" y="-25" width="6" height="36" fill="#78350f" />
            <circle cx="30" cy="-28" r="6" fill="#451a03" />
            {/* Bow */}
            <line x1="-15" y1="35" x2="75" y2="65" stroke="#fcd34d" strokeWidth="2.5" />
            <line x1="-13" y1="38" x2="73" y2="68" stroke="#ffffff" strokeWidth="1" opacity="0.8" />
          </g>
        )}

        {showAccessory === 'trophy' && (
          <g transform="translate(136, 120) scale(0.44)">
            <path d="M 15 10 L 45 10 L 40 40 Q 30 55 20 40 Z" fill="url(#goldGrad)" stroke="#b45309" strokeWidth="2" />
            <path d="M 15 15 Q 5 25 15 35" stroke="#ca8a04" strokeWidth="3" fill="none" />
            <path d="M 45 15 Q 55 25 45 35" stroke="#ca8a04" strokeWidth="3" fill="none" />
            <rect x="26" y="50" width="8" height="15" fill="url(#goldGrad)" />
            <rect x="18" y="65" width="24" height="10" rx="3" fill="#92400e" />
            {/* Star on trophy */}
            <polygon points="30,22 32,27 38,28 34,32 35,37 30,34 25,37 26,32 22,28 28,27" fill="#ffffff" />
          </g>
        )}

        {showAccessory === 'medal' && (
          <g transform="translate(138, 124) scale(0.45)">
            <polygon points="20,0 27,24 13,24" fill="#ef4444" />
            <polygon points="30,0 37,24 23,24" fill="#3b82f6" />
            <circle cx="25" cy="38" r="15" fill="url(#goldGrad)" stroke="#d97706" strokeWidth="2" />
            <text x="25" y="44" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#78350f">1</text>
          </g>
        )}

        {showAccessory === 'star' && (
          <g transform="translate(142, 126) scale(0.48)">
            <polygon
              points="25,5 31,18 45,19 34,28 38,42 25,34 12,42 16,28 5,19 19,18"
              fill="url(#goldGrad)"
              stroke="#ca8a04"
              strokeWidth="2"
            />
          </g>
        )}
      </svg>
    </div>
  );
};
