import React from 'react';

interface IllustrationProps {
  imageType: string;
  isActive?: boolean;
}

export default function ExerciseIllustration({ imageType, isActive = true }: IllustrationProps) {
  // Common styling classes for animations
  const strokeColor = '#374151'; // Charcoal Gray for body bones
  const activeColor = '#f59e0b'; // Amber-500 for targeted muscles
  const dumbbellColor = '#ef4444'; // Red for weights
  const trackColor = '#3b82f6'; // Blue for motion path
  
  // Custom CSS keyframes inserted into the SVG
  const animationStyles = `
    @keyframes press {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-16px); }
    }
    @keyframes fly {
      0%, 100% { transform: scaleX(1) translateY(0px); }
      50% { transform: scaleX(0.4) translateY(-10px); }
    }
    @keyframes curl {
      0%, 100% { transform: rotate(0deg); }
      50% { transform: rotate(-55deg); }
    }
    @keyframes squat {
      0%, 100% { transform: translateY(0px) scaleY(1); }
      50% { transform: translateY(18px) scaleY(0.85); }
    }
    @keyframes row {
      0%, 100% { transform: translateY(12px); }
      50% { transform: translateY(-8px); }
    }
    @keyframes raise {
      0%, 100% { transform: rotate(0deg); }
      50% { transform: rotate(-65deg); }
    }
    @keyframes pulse-muscle {
      0%, 100% { opacity: 0.4; }
      50% { opacity: 1; }
    }
    .animate-press { animation: press 3s infinite ease-in-out; transform-origin: 100px 110px; }
    .animate-fly { animation: fly 3s infinite ease-in-out; transform-origin: 100px 100px; }
    .animate-curl { animation: curl 2.5s infinite ease-in-out; transform-origin: 100px 95px; }
    .animate-squat { animation: squat 3.2s infinite ease-in-out; transform-origin: 100px 150px; }
    .animate-row { animation: row 2.8s infinite ease-in-out; }
    .animate-raise { animation: raise 3s infinite ease-in-out; transform-origin: 100px 75px; }
    .pulse-target { animation: pulse-muscle 1.5s infinite ease-in-out; }
  `;

  const renderIllustration = () => {
    switch (imageType) {
      // --- KO'KRAK (CHEST) ---
      case 'chest_press':
        return (
          <svg viewBox="0 0 200 160" className="w-full h-full max-h-48 bg-slate-900 rounded-xl border border-slate-800">
            <style>{animationStyles}</style>
            {/* Floor/Bench */}
            <line x1="20" y1="130" x2="180" y2="130" stroke="#4b5563" strokeWidth="4" strokeLinecap="round" />
            
            {/* Torso/Body lying down */}
            <rect x="50" y="112" width="100" height="18" rx="4" fill="#1f2937" stroke={strokeColor} strokeWidth="2" />
            <circle cx="145" cy="104" r="10" fill="#374151" stroke={strokeColor} strokeWidth="2" />
            
            {/* Highlighted active muscle (Ko'krak) */}
            <ellipse cx="100" cy="112" rx="14" ry="7" fill={activeColor} className="pulse-target" opacity="0.8" />
            
            {/* Arms & Dumbbells (Moving up/down) */}
            <g className={isActive ? "animate-press" : ""}>
              {/* Left Arm & Dumbbell */}
              <line x1="75" y1="112" x2="75" y2="75" stroke={strokeColor} strokeWidth="5" strokeLinecap="round" />
              <rect x="63" y="65" width="24" height="10" rx="2" fill="#4b5563" />
              <circle cx="63" cy="70" r="8" fill={dumbbellColor} />
              <circle cx="87" cy="70" r="8" fill={dumbbellColor} />
              
              {/* Right Arm & Dumbbell */}
              <line x1="125" y1="112" x2="125" y2="75" stroke={strokeColor} strokeWidth="5" strokeLinecap="round" />
              <rect x="113" y="65" width="24" height="10" rx="2" fill="#4b5563" />
              <circle cx="113" cy="70" r="8" fill={dumbbellColor} />
              <circle cx="137" cy="70" r="8" fill={dumbbellColor} />
            </g>
            
            {/* Guide Arrows */}
            <path d="M90 75 L90 55 M110 75 L110 55" stroke={trackColor} strokeWidth="2" strokeDasharray="3,3" strokeLinecap="round" />
            <polygon points="90,50 86,56 94,56" fill={trackColor} />
            <polygon points="110,50 106,56 114,56" fill={trackColor} />
            
            <text x="10" y="25" fill="#9ca3af" className="text-[10px] font-mono">Floor Press (Ko'krak)</text>
          </svg>
        );

      case 'chest_fly':
        return (
          <svg viewBox="0 0 200 160" className="w-full h-full max-h-48 bg-slate-900 rounded-xl border border-slate-800">
            <style>{animationStyles}</style>
            <line x1="20" y1="130" x2="180" y2="130" stroke="#4b5563" strokeWidth="4" strokeLinecap="round" />
            
            {/* Body */}
            <rect x="60" y="112" width="80" height="18" rx="4" fill="#1f2937" stroke={strokeColor} strokeWidth="2" />
            <circle cx="135" cy="104" r="9" fill="#374151" stroke={strokeColor} strokeWidth="2" />
            
            {/* Muscle highlight */}
            <ellipse cx="100" cy="112" rx="12" ry="6" fill={activeColor} className="pulse-target" opacity="0.8" />
            
            {/* Fly movement (open/close arc) */}
            <g className={isActive ? "animate-fly" : ""}>
              {/* Left Fly Arm */}
              <path d="M 80 112 Q 50 85 60 65" fill="none" stroke={strokeColor} strokeWidth="4" strokeLinecap="round" />
              <circle cx="60" cy="65" r="7" fill={dumbbellColor} />
              
              {/* Right Fly Arm */}
              <path d="M 120 112 Q 150 85 140 65" fill="none" stroke={strokeColor} strokeWidth="4" strokeLinecap="round" />
              <circle cx="140" cy="65" r="7" fill={dumbbellColor} />
            </g>

            {/* Path indicator */}
            <path d="M 50 80 Q 100 40 150 80" fill="none" stroke={trackColor} strokeWidth="1.5" strokeDasharray="3,3" />
            
            <text x="10" y="25" fill="#9ca3af" className="text-[10px] font-mono">Floor Flyes (Razvodka)</text>
          </svg>
        );

      case 'pullover':
        return (
          <svg viewBox="0 0 200 160" className="w-full h-full max-h-48 bg-slate-900 rounded-xl border border-slate-800">
            <style>{animationStyles}</style>
            <line x1="20" y1="130" x2="180" y2="130" stroke="#4b5563" strokeWidth="4" strokeLinecap="round" />
            
            {/* Body */}
            <rect x="50" y="115" width="100" height="15" rx="3" fill="#1f2937" stroke={strokeColor} strokeWidth="2" />
            <circle cx="65" cy="107" r="8" fill="#374151" stroke={strokeColor} strokeWidth="2" />
            
            {/* Pullover highlight - Chest and Latissimus */}
            <ellipse cx="100" cy="115" rx="14" ry="5" fill={activeColor} className="pulse-target" opacity="0.8" />
            
            {/* Arm moving from head to chest */}
            <g className={isActive ? "animate-raise" : ""} style={{ transformOrigin: '110px 115px' }}>
              <line x1="110" y1="115" x2="50" y2="70" stroke={strokeColor} strokeWidth="4" strokeLinecap="round" />
              {/* Dumbbell held with both hands */}
              <circle cx="50" cy="70" r="9" fill={dumbbellColor} />
              <line x1="42" y1="70" x2="58" y2="70" stroke="#fff" strokeWidth="2" />
            </g>

            {/* Movement guide path */}
            <path d="M 45 65 Q 110 20 120 75" fill="none" stroke={trackColor} strokeWidth="1.5" strokeDasharray="3,3" />
            <text x="10" y="25" fill="#9ca3af" className="text-[10px] font-mono">Dumbbell Pullover</text>
          </svg>
        );

      // --- ORQA (BACK) ---
      case 'back_row':
      case 'one_arm_row':
        return (
          <svg viewBox="0 0 200 160" className="w-full h-full max-h-48 bg-slate-900 rounded-xl border border-slate-800">
            <style>{animationStyles}</style>
            {/* Flat support */}
            <line x1="25" y1="135" x2="175" y2="135" stroke="#4b5563" strokeWidth="3" />
            
            {/* Bent-Over Body */}
            {/* Legs */}
            <line x1="130" y1="135" x2="120" y2="95" stroke={strokeColor} strokeWidth="5" strokeLinecap="round" />
            {/* Spine engashgan (bent 45 degrees) */}
            <line x1="120" y1="95" x2="65" y2="70" stroke={strokeColor} strokeWidth="6" strokeLinecap="round" />
            {/* Head */}
            <circle cx="53" cy="63" r="8" fill="#374151" stroke={strokeColor} strokeWidth="2" />
            
            {/* Highlighted active muscles (Orqa / Latissimus) */}
            <path d="M 85 75 Q 110 85 105 90 Z" fill={activeColor} className="pulse-target" opacity="0.9" />
            
            {/* Pulling Arm with Dumbbell */}
            <g className={isActive ? "animate-row" : ""}>
              <line x1="85" y1="80" x2="85" y2="115" stroke={strokeColor} strokeWidth="4" strokeLinecap="round" />
              <circle cx="85" cy="115" r="8" fill={dumbbellColor} />
              <rect x="75" y="112" width="20" height="6" rx="1" fill="#fff" opacity="0.3" />
            </g>

            {/* Guide arrow */}
            <path d="M 95 110 L 95 85" stroke={trackColor} strokeWidth="2" strokeDasharray="3,3" />
            <polygon points="95,80 91,86 99,86" fill={trackColor} />
            
            <text x="10" y="25" fill="#9ca3af" className="text-[10px] font-mono">Dumbbell Row (Orqa tortish)</text>
          </svg>
        );

      case 'deadlift':
      case 'legs_romanian':
        return (
          <svg viewBox="0 0 200 160" className="w-full h-full max-h-48 bg-slate-900 rounded-xl border border-slate-800">
            <style>{animationStyles}</style>
            <line x1="20" y1="140" x2="180" y2="140" stroke="#4b5563" strokeWidth="4" strokeLinecap="round" />
            
            {/* Hip and spine bending */}
            <g className={isActive ? "animate-squat" : ""}>
              {/* Legs */}
              <line x1="100" y1="140" x2="100" y2="105" stroke={strokeColor} strokeWidth="5" strokeLinecap="round" />
              {/* Hip to neck (bending forward and down) */}
              <line x1="100" y1="105" x2="70" y2="75" stroke={strokeColor} strokeWidth="5.5" strokeLinecap="round" />
              <circle cx="62" cy="67" r="8" fill="#374151" stroke={strokeColor} strokeWidth="2" />
              
              {/* Dumbbell sliding down the leg */}
              <line x1="85" y1="95" x2="85" y2="120" stroke={strokeColor} strokeWidth="3" />
              <circle cx="85" cy="120" r="7" fill={dumbbellColor} />
              <circle cx="85" cy="100" r="7" fill={dumbbellColor} />
              
              {/* Target Highlight: Hamstrings, Glutes and Lower Back */}
              <ellipse cx="102" cy="115" rx="7" ry="14" fill={activeColor} className="pulse-target" opacity="0.8" />
              <path d="M85 90 Q 102 100 100 105" stroke={activeColor} strokeWidth="3" fill="none" />
            </g>
            
            <text x="10" y="25" fill="#9ca3af" className="text-[10px] font-mono">Romanian Deadlift (Orqa zanjir)</text>
          </svg>
        );

      // --- YELKA (SHOULDERS) ---
      case 'shoulder_press':
        return (
          <svg viewBox="0 0 200 160" className="w-full h-full max-h-48 bg-slate-900 rounded-xl border border-slate-800">
            <style>{animationStyles}</style>
            {/* Stand */}
            <line x1="50" y1="140" x2="150" y2="140" stroke="#4b5563" strokeWidth="3" />
            
            {/* Human body standing */}
            <line x1="100" y1="140" x2="100" y2="90" stroke={strokeColor} strokeWidth="6" strokeLinecap="round" />
            <circle cx="100" cy="50" r="10" fill="#374151" stroke={strokeColor} strokeWidth="2" />
            
            {/* Active Shoulder Muscle */}
            <circle cx="88" cy="65" r="6" fill={activeColor} className="pulse-target" opacity="0.8" />
            <circle cx="112" cy="65" r="6" fill={activeColor} className="pulse-target" opacity="0.8" />
            
            {/* Arms overhead press */}
            <g className={isActive ? "animate-press" : ""} style={{ transformOrigin: '100px 75px' }}>
              {/* Left Shoulder to Dumbbell */}
              <line x1="88" y1="65" x2="75" y2="35" stroke={strokeColor} strokeWidth="4" strokeLinecap="round" />
              <circle cx="75" cy="35" r="7" fill={dumbbellColor} />
              
              {/* Right Shoulder to Dumbbell */}
              <line x1="112" y1="65" x2="125" y2="35" stroke={strokeColor} strokeWidth="4" strokeLinecap="round" />
              <circle cx="125" cy="35" r="7" fill={dumbbellColor} />
            </g>
            
            <text x="10" y="25" fill="#9ca3af" className="text-[10px] font-mono">Shoulder Press (Yelka)</text>
          </svg>
        );

      case 'shoulder_lateral':
      case 'shoulder_rear':
        return (
          <svg viewBox="0 0 200 160" className="w-full h-full max-h-48 bg-slate-900 rounded-xl border border-slate-800">
            <style>{animationStyles}</style>
            <line x1="40" y1="140" x2="160" y2="140" stroke="#4b5563" strokeWidth="3" />
            <line x1="100" y1="140" x2="100" y2="75" stroke={strokeColor} strokeWidth="6" strokeLinecap="round" />
            <circle cx="100" cy="58" r="9" fill="#374151" stroke={strokeColor} strokeWidth="2" />
            
            {/* Lateral Delts highlighted */}
            <circle cx="90" cy="72" r="5" fill={activeColor} className="pulse-target" />
            <circle cx="110" cy="72" r="5" fill={activeColor} className="pulse-target" />
            
            {/* Rotating arms yonga */}
            <g className={isActive ? "animate-raise" : ""} style={{ transformOrigin: '100px 75px' }}>
              {/* Left arm */}
              <line x1="90" y1="75" x2="50" y2="90" stroke={strokeColor} strokeWidth="3.5" strokeLinecap="round" />
              <circle cx="50" cy="90" r="7" fill={dumbbellColor} />
              
              {/* Right arm (needs opposite rotation) */}
              <g style={{ transform: 'scaleX(-1)', transformOrigin: '100px 75px' }}>
                <line x1="90" y1="75" x2="50" y2="90" stroke={strokeColor} strokeWidth="3.5" strokeLinecap="round" />
                <circle cx="50" cy="90" r="7" fill={dumbbellColor} />
              </g>
            </g>
            
            {/* Arc paths */}
            <path d="M 50 110 A 40 40 0 0 1 50 75" fill="none" stroke={trackColor} strokeWidth="1.5" strokeDasharray="3,3" />
            <path d="M 150 110 A 40 40 0 0 0 150 75" fill="none" stroke={trackColor} strokeWidth="1.5" strokeDasharray="3,3" />
            
            <text x="10" y="25" fill="#9ca3af" className="text-[10px] font-mono">Lateral Raises (Yonga ko'tarish)</text>
          </svg>
        );

      // --- OYOQLAR (LEGS) ---
      case 'legs_squat':
      case 'legs_goblet':
        return (
          <svg viewBox="0 0 200 160" className="w-full h-full max-h-48 bg-slate-900 rounded-xl border border-slate-800">
            <style>{animationStyles}</style>
            <line x1="20" y1="140" x2="180" y2="140" stroke="#4b5563" strokeWidth="4" strokeLinecap="round" />
            
            {/* Moving Lower Body */}
            <g className={isActive ? "animate-squat" : ""}>
              {/* Torso & Head */}
              <line x1="100" y1="90" x2="100" y2="55" stroke={strokeColor} strokeWidth="6" strokeLinecap="round" />
              <circle cx="100" cy="42" r="8" fill="#374151" stroke={strokeColor} strokeWidth="2" />
              
              {/* Active thighs highlight (Oyoqlar) */}
              <ellipse cx="100" cy="115" rx="10" ry="15" fill={activeColor} className="pulse-target" opacity="0.8" />
              
              {/* Hips to knees */}
              <line x1="100" y1="90" x2="85" y2="115" stroke={strokeColor} strokeWidth="5" strokeLinecap="round" />
              <line x1="100" y1="90" x2="115" y2="115" stroke={strokeColor} strokeWidth="5" strokeLinecap="round" />
              
              {/* Knees to ankles */}
              <line x1="85" y1="115" x2="85" y2="140" stroke={strokeColor} strokeWidth="5" strokeLinecap="round" />
              <line x1="115" y1="115" x2="115" y2="140" stroke={strokeColor} strokeWidth="5" strokeLinecap="round" />
              
              {/* Dumbbells in hand */}
              <circle cx="70" cy="95" r="7" fill={dumbbellColor} />
              <line x1="70" y1="88" x2="70" y2="102" stroke="#fff" strokeWidth="2" />
              <circle cx="130" cy="95" r="7" fill={dumbbellColor} />
              <line x1="130" y1="88" x2="130" y2="102" stroke="#fff" strokeWidth="2" />
            </g>
            
            <text x="10" y="25" fill="#9ca3af" className="text-[10px] font-mono">Squat (O'tirib-turish)</text>
          </svg>
        );

      case 'legs_lunge':
        return (
          <svg viewBox="0 0 200 160" className="w-full h-full max-h-48 bg-slate-900 rounded-xl border border-slate-800">
            <style>{animationStyles}</style>
            <line x1="20" y1="140" x2="180" y2="140" stroke="#4b5563" strokeWidth="4" strokeLinecap="round" />
            
            {/* Static structure for showing a lunge */}
            {/* Rear Leg (bended) */}
            <path d="M 60 140 L 95 130 L 110 100" fill="none" stroke={strokeColor} strokeWidth="4.5" strokeLinecap="round" />
            
            {/* Front Leg (90-degrees) */}
            <path d="M 145 140 L 145 105 L 110 100" fill="none" stroke={strokeColor} strokeWidth="5" strokeLinecap="round" />
            
            {/* Torso and head standing straight */}
            <line x1="110" y1="100" x2="110" y2="60" stroke={strokeColor} strokeWidth="6.5" strokeLinecap="round" />
            <circle cx="110" cy="48" r="8" fill="#374151" stroke={strokeColor} strokeWidth="2" />
            
            {/* Highlighting active Quadriceps & Glutes */}
            <ellipse cx="145" cy="118" rx="7" ry="11" fill={activeColor} className="pulse-target" opacity="0.8" />
            <ellipse cx="98" cy="115" rx="8" ry="8" fill={activeColor} className="pulse-target" opacity="0.6" />
            
            {/* Dumbbells hanging */}
            <circle cx="95" cy="95" r="7" fill={dumbbellColor} />
            <circle cx="125" cy="95" r="7" fill={dumbbellColor} />
            
            <text x="10" y="25" fill="#9ca3af" className="text-[10px] font-mono">Lunge (Oldinga qadam)</text>
          </svg>
        );

      // --- QO'LLAR (ARMS) ---
      case 'arms_bicep':
      case 'arms_hammer':
        return (
          <svg viewBox="0 0 200 160" className="w-full h-full max-h-48 bg-slate-900 rounded-xl border border-slate-800">
            <style>{animationStyles}</style>
            <line x1="40" y1="140" x2="160" y2="140" stroke="#4b5563" strokeWidth="3" />
            
            {/* Standing body */}
            <line x1="100" y1="140" x2="100" y2="70" stroke={strokeColor} strokeWidth="6.5" strokeLinecap="round" />
            <circle cx="100" cy="55" r="9" fill="#374151" stroke={strokeColor} strokeWidth="2" />
            
            {/* Humerus (Upper Arm - static) */}
            <line x1="100" y1="75" x2="100" y2="105" stroke={strokeColor} strokeWidth="4.5" strokeLinecap="round" />
            
            {/* Highlighted Bicep */}
            <path d="M 95 85 Q 90 95 100 100" stroke={activeColor} strokeWidth="4" fill="none" className="pulse-target" />
            
            {/* Forearm Curling */}
            <g className={isActive ? "animate-curl" : ""} style={{ transformOrigin: '100px 105px' }}>
              <line x1="100" y1="105" x2="100" y2="135" stroke={strokeColor} strokeWidth="4" strokeLinecap="round" />
              {/* Dumbbell in hand */}
              <rect x="88" y="132" width="24" height="6" rx="1.5" fill="#4b5563" />
              <circle cx="88" cy="135" r="6" fill={dumbbellColor} />
              <circle cx="112" cy="135" r="6" fill={dumbbellColor} />
            </g>

            <path d="M 80 125 A 25 25 0 0 1 80 85" fill="none" stroke={trackColor} strokeWidth="1.5" strokeDasharray="3,3" />
            
            <text x="10" y="25" fill="#9ca3af" className="text-[10px] font-mono">Bicep Curl (Bikops)</text>
          </svg>
        );

      case 'arms_tricep_overhead':
        return (
          <svg viewBox="0 0 200 160" className="w-full h-full max-h-48 bg-slate-900 rounded-xl border border-slate-800">
            <style>{animationStyles}</style>
            <line x1="50" y1="140" x2="150" y2="140" stroke="#4b5563" strokeWidth="3" />
            
            {/* Standing body */}
            <line x1="100" y1="140" x2="100" y2="80" stroke={strokeColor} strokeWidth="6" strokeLinecap="round" />
            <circle cx="100" cy="65" r="9" fill="#374151" stroke={strokeColor} strokeWidth="2" />
            
            {/* Upper arm (raised up high next to head) */}
            <line x1="100" y1="80" x2="100" y2="45" stroke={strokeColor} strokeWidth="4" strokeLinecap="round" />
            
            {/* Tricep Highlight */}
            <path d="M 103 55 Q 108 65 100 75" stroke={activeColor} strokeWidth="4.5" fill="none" className="pulse-target" />
            
            {/* Forearm flexing behind head */}
            <g className={isActive ? "animate-curl" : ""} style={{ transformOrigin: '100px 45px' }}>
              <line x1="100" y1="45" x2="100" y2="15" stroke={strokeColor} strokeWidth="3.5" strokeLinecap="round" />
              <circle cx="100" cy="15" r="7" fill={dumbbellColor} />
            </g>
            
            <text x="10" y="25" fill="#9ca3af" className="text-[10px] font-mono">Tricep Overhead Press</text>
          </svg>
        );

      case 'arms_kickback':
        return (
          <svg viewBox="0 0 200 160" className="w-full h-full max-h-48 bg-slate-900 rounded-xl border border-slate-800">
            <style>{animationStyles}</style>
            <line x1="30" y1="135" x2="170" y2="135" stroke="#4b5563" strokeWidth="3" />
            
            {/* Bent body */}
            <line x1="120" y1="135" x2="110" y2="90" stroke={strokeColor} strokeWidth="5" strokeLinecap="round" />
            <line x1="110" y1="90" x2="55" y2="80" stroke={strokeColor} strokeWidth="6" strokeLinecap="round" />
            <circle cx="45" cy="73" r="8" fill="#374151" stroke={strokeColor} strokeWidth="2" />
            
            {/* Upper arm (parallel to torso, aligned backwards) */}
            <line x1="85" y1="83" x2="115" y2="83" stroke={strokeColor} strokeWidth="4" strokeLinecap="round" />
            {/* Tricep target highlight */}
            <ellipse cx="100" cy="79" rx="10" ry="3" fill={activeColor} className="pulse-target" />
            
            {/* Forearm swinging backwards */}
            <g className={isActive ? "animate-curl" : ""} style={{ transformOrigin: '85px 83px' }}>
              <line x1="85" y1="83" x2="85" y2="113" stroke={strokeColor} strokeWidth="3.5" strokeLinecap="round" />
              <circle cx="85" cy="113" r="6.5" fill={dumbbellColor} />
            </g>
            
            <text x="10" y="25" fill="#9ca3af" className="text-[10px] font-mono">Tricep Kickback</text>
          </svg>
        );

      // --- PRESS (ABS) ---
      case 'abs_crunch':
        return (
          <svg viewBox="0 0 200 160" className="w-full h-full max-h-48 bg-slate-900 rounded-xl border border-slate-800">
            <style>{animationStyles}</style>
            <line x1="20" y1="130" x2="180" y2="130" stroke="#4b5563" strokeWidth="4" />
            
            {/* Lower body (pelvis static) */}
            <rect x="95" y="112" width="55" height="18" rx="4" fill="#1f2937" />
            
            {/* Upper body crunching */}
            <g className={isActive ? "animate-press" : ""} style={{ transformOrigin: '110px 120px' }}>
              <line x1="110" y1="120" x2="65" y2="105" stroke={strokeColor} strokeWidth="5.5" strokeLinecap="round" />
              <circle cx="55" cy="98" r="8" fill="#374151" stroke={strokeColor} strokeWidth="2" />
              {/* Holding dumbbell at chest */}
              <circle cx="72" cy="108" r="6" fill={dumbbellColor} />
              
              {/* Highlight Abs */}
              <ellipse cx="90" cy="112" rx="8" ry="5" fill={activeColor} className="pulse-target" />
            </g>
            
            <text x="10" y="25" fill="#9ca3af" className="text-[10px] font-mono">Weighted Crunch (Press)</text>
          </svg>
        );

      case 'abs_russian':
        return (
          <svg viewBox="0 0 200 160" className="w-full h-full max-h-48 bg-slate-900 rounded-xl border border-slate-800">
            <style>{animationStyles}</style>
            <line x1="20" y1="130" x2="180" y2="130" stroke="#4b5563" strokeWidth="4" />
            
            {/* Russian Twist setup */}
            <line x1="120" y1="130" x2="100" y2="90" stroke={strokeColor} strokeWidth="5" />
            <line x1="100" y1="90" x2="60" y2="100" stroke={strokeColor} strokeWidth="6" strokeLinecap="round" />
            <circle cx="50" cy="92" r="8" fill="#374151" stroke={strokeColor} strokeWidth="2" />
            
            {/* Oblique muscle highlight */}
            <ellipse cx="80" cy="95" rx="8" ry="8" fill={activeColor} className="pulse-target" />
            
            {/* Rotating Dumbbell */}
            <g className={isActive ? "animate-fly" : ""} style={{ transformOrigin: '80px 95px' }}>
              <circle cx="65" cy="110" r="7" fill={dumbbellColor} />
              <circle cx="95" cy="110" r="7" fill={dumbbellColor} />
              <line x1="65" y1="110" x2="95" y2="110" stroke="#fff" strokeWidth="2" />
            </g>
            
            <text x="10" y="25" fill="#9ca3af" className="text-[10px] font-mono">Russian Twist (Yon press)</text>
          </svg>
        );

      default:
        return (
          <div className="w-full h-32 flex items-center justify-center bg-slate-900 rounded-xl border border-slate-800">
            <span className="text-slate-500 font-mono text-xs">Gantel Mashqi</span>
          </div>
        );
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col justify-between">
      {renderIllustration()}
    </div>
  );
}
