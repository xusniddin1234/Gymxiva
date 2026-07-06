import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Flame, 
  Dumbbell, 
  Search, 
  ChevronDown, 
  ChevronUp, 
  Play, 
  Check, 
  Clock, 
  Sparkles, 
  AlertCircle,
  TrendingUp,
  Info
} from 'lucide-react';
import { Exercise, MuscleGroup } from '../types';
import { EXERCISES } from '../data/exercises';
import ExerciseIllustration from './ExerciseIllustration';

interface WorkoutSectionProps {
  completedExercises: { [exerciseId: string]: number };
  logExerciseSet: (exerciseId: string, setsCount: number) => void;
}

const MUSCLE_GROUPS: { name: string; key: MuscleGroup | 'Hamma' }[] = [
  { name: 'Hamma mashiqlar', key: 'Hamma' },
  { name: 'Ko\'krak', key: 'Ko\'krak' },
  { name: 'Orqa', key: 'Orqa' },
  { name: 'Yelka', key: 'Yelka' },
  { name: 'Oyoqlar', key: 'Oyoqlar' },
  { name: 'Qo\'llar', key: 'Qo\'llar' },
  { name: 'Press', key: 'Press' },
];

export default function WorkoutSection({ completedExercises, logExerciseSet }: WorkoutSectionProps) {
  const [selectedGroup, setSelectedGroup] = useState<MuscleGroup | 'Hamma'>('Hamma');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedExerciseId, setExpandedExerciseId] = useState<string | null>(null);
  
  // Active workout states (Rest timer)
  const [activeExerciseId, setActiveExerciseId] = useState<string | null>(null);
  const [currentSet, setCurrentSet] = useState(1);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [timerActive, setTimerActive] = useState(false);

  // Filter exercises
  const filteredExercises = EXERCISES.filter(ex => {
    const matchesGroup = selectedGroup === 'Hamma' || ex.target === selectedGroup;
    const matchesSearch = ex.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          ex.target.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesGroup && matchesSearch;
  });

  // Timer effect
  useEffect(() => {
    let interval: any = null;
    if (timerActive && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds(prev => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0) {
      setTimerActive(false);
    }
    return () => clearInterval(interval);
  }, [timerActive, timerSeconds]);

  // Start active exercise session
  const handleStartExercise = (exercise: Exercise) => {
    setActiveExerciseId(exercise.id);
    setCurrentSet(completedExercises[exercise.id] ? completedExercises[exercise.id] + 1 : 1);
    setTimerSeconds(0);
    setTimerActive(false);
    setExpandedExerciseId(exercise.id); // auto expand
  };

  // Complete a set and start resting
  const handleCompleteSet = (exercise: Exercise) => {
    const nextSet = currentSet + 1;
    const totalSetsRequired = exercise.sets;
    
    // Log in database
    const currentlyDone = completedExercises[exercise.id] || 0;
    logExerciseSet(exercise.id, currentlyDone + 1);

    if (currentlyDone + 1 >= totalSetsRequired) {
      // Finished all sets
      setActiveExerciseId(null);
      setTimerSeconds(0);
      setTimerActive(false);
    } else {
      // Continue to next set, trigger 45s rest timer
      setCurrentSet(nextSet);
      setTimerSeconds(45);
      setTimerActive(true);
    }
  };

  // Pre-configured split planner
  const splits = [
    {
      title: "Dushanba / Payshanba (Ko'krak, Yelka va Qo'l)",
      desc: "Yuqori tana yuklamasi",
      exercises: ['chest_floor_press', 'shoulder_press', 'arms_bicep_curl', 'chest_floor_fly', 'arms_overhead_ext', 'shoulder_lateral']
    },
    {
      title: "Seshanba / Juma (Oyoqlar, Orqa va Press)",
      desc: "Pastki tana va tana asosi (Core)",
      exercises: ['legs_squat', 'back_bent_row', 'legs_lunge', 'back_deadlift', 'abs_crunch', 'abs_russian_twist']
    },
    {
      title: "Chorshanba / Shanba (Faol dam olish)",
      desc: "Kardio, yengil cho'zilish va suzish / yugurish",
      exercises: []
    }
  ];

  return (
    <div className="space-y-6" id="workout_section_tab">
      
      {/* Title & Workout Spliter Toggle */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-xl font-black text-white flex items-center gap-2 uppercase tracking-tight italic">
            <Dumbbell className="h-5 w-5 text-[#a3e635] animate-bounce" />
            2 Ta Gantelli Professional Mashqlar
          </h2>
          <p className="text-zinc-400 text-xs mt-0.5">
            Hech qanday murakkab trenajorlarsiz, faqat 2 ta gantel yordamida har bir mushak guruhini chiniqtiring.
          </p>
        </div>

        {/* Quick Tips */}
        <div className="flex gap-3 bg-zinc-900 border border-zinc-800 p-3 rounded-2xl text-xs text-zinc-300">
          <Clock className="h-4 w-4 text-[#a3e635] flex-shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-[#a3e635] block uppercase tracking-wider text-[10px]">Tavsiya qilingan dam olish:</span>
            Setlar orasida 45-60 soniya dam oling.
          </div>
        </div>
      </div>

      {/* Weekly Splits Routine Panel */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5 shadow-sm">
        <h3 className="text-xs font-black text-zinc-500 tracking-widest uppercase mb-4 flex items-center gap-1.5">
          <Sparkles className="h-3.5 w-3.5 text-[#a3e635]" />
          Haftalik Mashg'ulot Rejasi (3 Kunlik Split)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          {splits.map((split, i) => (
            <div key={i} className="bg-zinc-950/80 p-4 rounded-2xl border border-zinc-800 flex flex-col justify-between">
              <div>
                <h4 className="text-xs font-black text-[#a3e635] font-sans tracking-wide uppercase italic">{split.title}</h4>
                <p className="text-[11px] text-zinc-500 mt-1">{split.desc}</p>
                
                {split.exercises.length > 0 ? (
                  <div className="mt-3 space-y-1.5">
                    {split.exercises.map((id) => {
                      const ex = EXERCISES.find(e => e.id === id);
                      return ex ? (
                        <div key={id} className="text-xs text-zinc-300 flex items-center gap-1.5 py-0.5">
                          <div className="h-1.5 w-1.5 bg-[#a3e635] rounded-full" />
                          <span className="truncate">{ex.name}</span>
                        </div>
                      ) : null;
                    })}
                  </div>
                ) : (
                  <p className="text-xs text-zinc-500 italic mt-3">Bugun tana to'liq tiklanishi uchun yengil mashq qiling yoki toza havoda yuring.</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Search and Category Filters */}
      <div className="flex flex-col md:flex-row gap-3">
        {/* Search Bar */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
          <input 
            type="text" 
            placeholder="Mashg'ulotlarni qidirish (masalan: squat, press)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl py-2.5 pl-10 pr-4 text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-[#a3e635] transition-colors"
          />
        </div>
        
        {/* Muscle group select filters */}
        <div className="flex gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          {MUSCLE_GROUPS.map((group) => (
            <button
              key={group.key}
              onClick={() => setSelectedGroup(group.key)}
              className={`px-3 py-1.5 text-xs font-bold rounded-xl border transition-all whitespace-nowrap cursor-pointer ${
                selectedGroup === group.key
                  ? 'bg-[#a3e635] border-[#a3e635] text-black font-black'
                  : 'bg-zinc-900 border-zinc-800 text-zinc-450 hover:border-zinc-700 hover:text-white'
              }`}
            >
              {group.name}
            </button>
          ))}
        </div>
      </div>

      {/* Active Workout Floating Session Board */}
      {activeExerciseId && (
        (() => {
          const activeEx = EXERCISES.find(e => e.id === activeExerciseId);
          if (!activeEx) return null;
          const completedCount = completedExercises[activeExerciseId] || 0;
          return (
            <motion.div 
              layoutId="active-session"
              className="bg-[#a3e635] text-black p-5 rounded-3xl shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border border-[#a3e635]/25"
            >
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1 bg-black/10 px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest">
                  Faol Mashg'ulot
                </div>
                <h3 className="text-xl font-black leading-tight italic uppercase tracking-tight">{activeEx.name}</h3>
                <p className="text-xs font-medium text-zinc-900">
                  Maqsad: <span className="font-bold">{activeEx.sets} set</span> x <span className="font-bold">{activeEx.reps} marta</span> | Bajarildi: <span className="font-black underline font-mono text-sm">{completedCount} ta set</span>
                </p>
              </div>

              <div className="flex items-center gap-3 w-full md:w-auto self-stretch justify-between md:justify-end">
                {/* Rest Timer or CTA */}
                {timerSeconds > 0 ? (
                  <div className="flex items-center gap-2 bg-black/90 text-[#a3e635] px-4 py-2 rounded-xl text-xs font-bold font-mono">
                    <Clock className="h-4 w-4 animate-spin text-[#a3e635]" />
                    Dam oling: {timerSeconds}s
                  </div>
                ) : (
                  <div className="text-[10px] font-black uppercase tracking-wider bg-black/10 px-3 py-2 rounded-xl text-black">
                    Soldingi setga tayyorlaning!
                  </div>
                )}

                <button
                  onClick={() => handleCompleteSet(activeEx)}
                  className="bg-black hover:bg-zinc-900 text-white py-2.5 px-5 rounded-xl text-xs font-black flex items-center gap-1.5 shadow-md transition-all cursor-pointer uppercase tracking-wider"
                >
                  <Check className="h-4 w-4 stroke-[3px] text-[#a3e635]" />
                  <span>{currentSet}-Setni Tugatish</span>
                </button>
              </div>
            </motion.div>
          );
        })()
      )}

      {/* Exercises List / Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredExercises.map((exercise) => {
          const isExpanded = expandedExerciseId === exercise.id;
          const completedSets = completedExercises[exercise.id] || 0;
          const isCompleted = completedSets >= exercise.sets;

          return (
            <motion.div 
              key={exercise.id}
              layout="position"
              className={`rounded-3xl border transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-sm ${
                isCompleted 
                  ? 'bg-zinc-900/40 border-lime-500/20' 
                  : isExpanded 
                    ? 'bg-zinc-900 border-zinc-700 ring-1 ring-[#a3e635]/25' 
                    : 'bg-zinc-900 border-zinc-800 hover:border-zinc-750'
              }`}
            >
              {/* Header Box */}
              <div className="p-5 flex gap-4 items-start">
                {/* Miniature Animated Vector illustration */}
                <div className="w-24 h-24 flex-shrink-0 rounded-2xl overflow-hidden bg-zinc-950 border border-zinc-850">
                  <ExerciseIllustration imageType={exercise.imageType} isActive={isExpanded} />
                </div>

                {/* Info Text */}
                <div className="flex-1 min-w-0 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-black text-[#a3e635] bg-[#a3e635]/10 border border-[#a3e635]/20 px-2 py-0.5 rounded uppercase tracking-wider">
                      {exercise.target}
                    </span>
                    <span className={`text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-wider ${
                      exercise.difficulty === 'Boshlovchi' ? 'bg-zinc-800 text-zinc-300 border border-zinc-700' :
                      exercise.difficulty === 'O\'rta' ? 'bg-zinc-800 text-zinc-300 border border-zinc-700' :
                      'bg-[#a3e635]/10 text-[#a3e635] border border-[#a3e635]/20'
                    }`}>
                      {exercise.difficulty}
                    </span>
                  </div>

                  <h3 className="text-sm font-black text-white truncate">{exercise.name}</h3>
                  
                  {/* Sets & Reps Details */}
                  <div className="flex items-center gap-3 text-xs text-zinc-400 font-mono mt-1">
                    <span className="flex items-center gap-1 text-zinc-200">
                      <Flame className="h-3.5 w-3.5 text-[#a3e635]" />
                      {exercise.sets} set
                    </span>
                    <span>•</span>
                    <span>{exercise.reps} marta</span>
                  </div>

                  {/* Completed Badge */}
                  {completedSets > 0 && (
                    <div className="flex items-center gap-2 mt-2">
                      <div className="h-2 w-20 bg-zinc-950 rounded-full overflow-hidden border border-zinc-850">
                        <div 
                          className={`h-full ${isCompleted ? 'bg-[#a3e635]' : 'bg-[#a3e635]/50'}`} 
                          style={{ width: `${(completedSets / exercise.sets) * 100}%` }} 
                        />
                      </div>
                      <span className={`text-[10px] font-black font-mono ${isCompleted ? 'text-[#a3e635]' : 'text-zinc-400'}`}>
                        {completedSets}/{exercise.sets} set
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Expansion Details */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="border-t border-zinc-800 bg-zinc-950/40"
                  >
                    <div className="p-5 space-y-4 text-xs">
                      {/* Step by Step list */}
                      <div className="space-y-1.5">
                        <h4 className="font-bold text-white flex items-center gap-1 uppercase tracking-wide text-[10px]">
                          <Check className="h-3.5 w-3.5 text-[#a3e635]" />
                          Bajarish texnikasi:
                        </h4>
                        <ol className="list-decimal pl-4 space-y-1 text-zinc-400 leading-relaxed">
                          {exercise.instructions.map((inst, index) => (
                            <li key={index}>{inst}</li>
                          ))}
                        </ol>
                      </div>

                      {/* Breathing Rules */}
                      <div className="bg-zinc-900 p-3 rounded-2xl border border-zinc-800 flex gap-2.5 items-start text-zinc-300">
                        <Info className="h-4 w-4 text-[#a3e635] flex-shrink-0 mt-0.5" />
                        <div>
                          <span className="font-black text-white block mb-0.5 uppercase tracking-wide text-[10px]">Nafas olish qoidasi:</span>
                          <p className="text-zinc-400 leading-relaxed">{exercise.breathing}</p>
                        </div>
                      </div>

                      {/* Trainer Tips */}
                      <div className="space-y-1">
                        <h4 className="font-bold text-[#a3e635] flex items-center gap-1 uppercase tracking-wide text-[10px]">
                          <Sparkles className="h-3.5 w-3.5" />
                          Professional sirlar:
                        </h4>
                        <ul className="list-disc pl-4 space-y-1 text-zinc-400 leading-relaxed">
                          {exercise.tips.map((tip, index) => (
                            <li key={index} className="italic">{tip}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Action row */}
              <div className="border-t border-zinc-800 px-4 py-3 flex items-center justify-between bg-zinc-950/20 text-xs">
                <button
                  onClick={() => setExpandedExerciseId(isExpanded ? null : exercise.id)}
                  className="text-zinc-450 hover:text-white font-bold py-1 flex items-center gap-1 cursor-pointer"
                >
                  {isExpanded ? (
                    <>
                      <span>Tafsilotlarni yopish</span>
                      <ChevronUp className="h-3.5 w-3.5 text-[#a3e635]" />
                    </>
                  ) : (
                    <>
                      <span>Ko'rsatmalarni o'qish</span>
                      <ChevronDown className="h-3.5 w-3.5 text-[#a3e635]" />
                    </>
                  )}
                </button>

                {activeExerciseId === exercise.id ? (
                  <span className="text-[10px] bg-[#a3e635] text-black font-black tracking-widest px-2.5 py-1 rounded uppercase">
                    Hozir bajarilmoqda...
                  </span>
                ) : (
                  <button
                    onClick={() => handleStartExercise(exercise)}
                    className="bg-[#a3e635] hover:bg-[#a3e635]/90 text-black font-black px-4 py-1.5 rounded-xl flex items-center gap-1 transition-all cursor-pointer uppercase tracking-wider text-[10px]"
                  >
                    <Play className="h-3 w-3 fill-black text-black" />
                    <span>{completedSets > 0 ? "Davom ettirish" : "Boshlash"}</span>
                  </button>
                )}
              </div>

            </motion.div>
          );
        })}
      </div>

    </div>
  );
}
