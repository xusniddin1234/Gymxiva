import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Trophy, 
  Calendar, 
  TrendingUp, 
  Activity, 
  Flame, 
  Award, 
  Check, 
  Sparkles,
  Weight,
  Target,
  ChevronRight,
  User,
  Ruler
} from 'lucide-react';
import { DailyLog, UserProfile } from '../types';
import { calculateNutritionTargets } from '../utils';

interface ProgressSectionProps {
  profile: UserProfile;
  dailyLogs: { [dateStr: string]: DailyLog };
  updateProfile: (updated: Partial<UserProfile>) => void;
  selectedDate: string;
}

export default function ProgressSection({ 
  profile, 
  dailyLogs, 
  updateProfile,
  selectedDate 
}: ProgressSectionProps) {

  const [nameInput, setNameInput] = useState(profile.name);
  const [lastNameInput, setLastNameInput] = useState(profile.lastName || '');
  const [ageInput, setAgeInput] = useState<number | ''>(profile.age || 25);
  const [birthDateInput, setBirthDateInput] = useState(profile.birthDate || '');
  const [genderInput, setGenderInput] = useState<'Erkak' | 'Ayol'>(profile.gender || 'Erkak');
  const [heightInput, setHeightInput] = useState<number | ''>(profile.height || 175);
  const [weightInput, setWeightInput] = useState(profile.weight);
  const [targetWeightInput, setTargetWeightInput] = useState(profile.targetWeight);
  const [activityLevelInput, setActivityLevelInput] = useState<'Past' | 'O\'rtacha' | 'Faol'>(profile.activityLevel || 'O\'rtacha');
  const [successMessage, setSuccessMessage] = useState('');

  // Calculations for logs
  const logsArray = Object.values(dailyLogs);
  
  // Calculate streaks (consecutive days with at least one exercise or meal logged)
  const currentStreak = logsArray.filter(log => {
    const totalSets = Object.values(log.completedExercises).reduce((a, b) => a + b, 0);
    return totalSets > 0 || log.mealsEaten.length > 0;
  }).length;

  const handleUpdateStats = (e: React.FormEvent) => {
    e.preventDefault();
    
    const targets = calculateNutritionTargets({
      weight: Number(weightInput),
      height: Number(heightInput || 175),
      age: Number(ageInput || 25),
      gender: genderInput,
      activityLevel: activityLevelInput,
      targetWeight: Number(targetWeightInput)
    });

    updateProfile({
      name: nameInput,
      lastName: lastNameInput,
      age: Number(ageInput || 25),
      birthDate: birthDateInput,
      height: Number(heightInput || 175),
      gender: genderInput,
      activityLevel: activityLevelInput,
      weight: Number(weightInput),
      targetWeight: Number(targetWeightInput),
      goal: targets.goal,
      targetCalories: targets.calories,
      targetProtein: targets.protein,
      targetCarbs: targets.carbs,
      targetFats: targets.fats
    });

    setSuccessMessage('Ma\'lumotlar muvaffaqiyatli saqlandi va qayta hisoblandi! 💪');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  // Predefined Achievements
  const achievements = [
    {
      id: 'first_workout',
      title: 'Temir Irodali',
      desc: 'Birinchi gantel mashqlar setini to\'liq yakunlash',
      isUnlocked: logsArray.some(log => Object.values(log.completedExercises).length > 0),
      iconColor: 'text-amber-400 bg-amber-500/10'
    },
    {
      id: 'full_nutrition',
      title: 'Sog\'lom tana parhezi',
      desc: 'Kuniga 5 mahal belgilangan ovqatni hammasini iste\'mol qilish',
      isUnlocked: logsArray.some(log => log.mealsEaten.length >= 5),
      iconColor: 'text-emerald-400 bg-emerald-500/10'
    },
    {
      id: 'water_king',
      title: 'Suv qiroli',
      desc: 'Bir kunda kamida 3000ml toza suv ichish rejasini bajarish',
      isUnlocked: logsArray.some(log => log.waterIntake >= 3000),
      iconColor: 'text-blue-400 bg-blue-500/10'
    },
    {
      id: 'streak_3',
      title: 'Sog\'lom odat boshlovchisi',
      desc: 'Ketma-ket kamida 3 kun davomida faollik ko\'rsatish',
      isUnlocked: currentStreak >= 3,
      iconColor: 'text-purple-400 bg-purple-500/10'
    }
  ];

  return (
    <div className="space-y-6" id="progress_section_tab">
      
      {/* Title block */}
      <div>
        <h2 className="text-xl font-black text-white flex items-center gap-2 uppercase tracking-tight italic">
          <TrendingUp className="h-5 w-5 text-[#a3e635]" />
          Kunlik Faollik va Maqsadlar Kundaligi
        </h2>
        <p className="text-zinc-400 text-xs mt-0.5">
          O'zingizning tana og'irligi ko'rsatkichlaringizni kuzatib boring, maqsadlarni yangilang va yutuqlarni oching.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Profile and Weights Editor */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 shadow-sm space-y-4">
          <h3 className="text-xs font-black text-zinc-500 tracking-widest uppercase flex items-center gap-1.5">
            <Weight className="h-4 w-4 text-[#a3e635]" />
            Vazn va Ism Ma'lumotlari
          </h3>

          <form onSubmit={handleUpdateStats} className="space-y-4 text-xs">
            
            {/* Name and Last Name Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-wide">Ism</label>
                <input 
                  type="text" 
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-2 px-3 text-zinc-200 focus:outline-none focus:border-[#a3e635] font-bold"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-wide">Familiya</label>
                <input 
                  type="text" 
                  value={lastNameInput}
                  onChange={(e) => setLastNameInput(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-2 px-3 text-zinc-200 focus:outline-none focus:border-[#a3e635] font-bold"
                  required
                />
              </div>
            </div>

            {/* Age and Birthday */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-wide">Tug'ilgan kun</label>
                <input 
                  type="date" 
                  value={birthDateInput}
                  onChange={(e) => {
                    setBirthDateInput(e.target.value);
                    if (e.target.value) {
                      const birth = new Date(e.target.value);
                      const diff = Date.now() - birth.getTime();
                      const ageDate = new Date(diff);
                      const calculatedAge = Math.abs(ageDate.getUTCFullYear() - 1970);
                      setAgeInput(calculatedAge || 18);
                    }
                  }}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-2 px-3 text-zinc-200 focus:outline-none focus:border-[#a3e635] font-bold font-mono"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-wide">Yosh</label>
                <input 
                  type="number" 
                  value={ageInput}
                  onChange={(e) => setAgeInput(e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-2 px-3 text-zinc-200 focus:outline-none focus:border-[#a3e635] font-bold font-mono"
                  required
                />
              </div>
            </div>

            {/* Gender and Height */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-wide">Jins</label>
                <select
                  value={genderInput}
                  onChange={(e) => setGenderInput(e.target.value as 'Erkak' | 'Ayol')}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-2 px-3 text-zinc-200 focus:outline-none focus:border-[#a3e635] font-bold"
                >
                  <option value="Erkak">Erkak</option>
                  <option value="Ayol">Ayol</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-wide">Bo'y (sm)</label>
                <input 
                  type="number" 
                  value={heightInput}
                  onChange={(e) => setHeightInput(e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-2 px-3 text-zinc-200 focus:outline-none focus:border-[#a3e635] font-bold font-mono"
                  required
                />
              </div>
            </div>

            {/* Weights grid */}
            <div className="grid grid-cols-2 gap-3">
              {/* Current weight */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-wide flex items-center gap-1">
                  Hozirgi vazn (kg)
                </label>
                <input 
                  type="number" 
                  step="0.1"
                  value={weightInput}
                  onChange={(e) => setWeightInput(Number(e.target.value))}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-2 px-3 text-zinc-200 font-mono font-bold focus:outline-none focus:border-[#a3e635]"
                  required
                />
              </div>

              {/* Target weight */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-wide flex items-center gap-1">
                  <Target className="h-3 w-3 text-[#a3e635]" /> Maqsad vazn (kg)
                </label>
                <input 
                  type="number" 
                  step="0.1"
                  value={targetWeightInput}
                  onChange={(e) => setTargetWeightInput(Number(e.target.value))}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-2 px-3 text-zinc-200 font-mono font-bold focus:outline-none focus:border-[#a3e635]"
                  required
                />
              </div>
            </div>

            {/* Activity Level */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-zinc-500 uppercase tracking-wide">Faollik Darajasi</label>
              <select
                value={activityLevelInput}
                onChange={(e) => setActivityLevelInput(e.target.value as 'Past' | 'O\'rtacha' | 'Faol')}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-2 px-3 text-zinc-200 focus:outline-none focus:border-[#a3e635] font-bold"
              >
                <option value="Past">Kam harakat (Past)</option>
                <option value="O'rtacha">O'rtacha faollik</option>
                <option value="Faol">Yuqori faollik (Faol)</option>
              </select>
            </div>

            {successMessage && (
              <div className="bg-[#a3e635]/10 border border-[#a3e635]/20 text-[#a3e635] p-2.5 rounded-xl text-center font-bold">
                {successMessage}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-2.5 bg-[#a3e635] hover:bg-[#a3e635]/90 text-black font-black rounded-xl transition-all shadow-md cursor-pointer text-center uppercase tracking-wider text-[10px]"
            >
              Ma'lumotlarni Yangilash va Sozlash ⚡
            </button>
          </form>

          {/* Simple Dynamic Weight Target Progress Bar */}
          <div className="pt-4 border-t border-zinc-800 space-y-2">
            <div className="flex justify-between text-[11px] font-bold text-zinc-400">
              <span>Hozirgi: {profile.weight} kg</span>
              <span>Maqsad: {profile.targetWeight} kg</span>
            </div>
            
            {/* Weight remaining logic */}
            {(() => {
              const diff = profile.weight - profile.targetWeight;
              if (diff === 0) {
                return <p className="text-[11px] text-[#a3e635] font-bold italic">Siz o'z maqsadingizga erishdingiz! 🎉</p>;
              } else if (diff > 0) {
                return <p className="text-[11px] text-[#a3e635] font-bold italic">Maqsadgacha yana {diff.toFixed(1)} kg ozishingiz kerak.</p>;
              } else {
                return <p className="text-[11px] text-[#a3e635] font-bold italic">Vazn yig'ish maqsadigacha yana {Math.abs(diff).toFixed(1)} kg bor.</p>;
              }
            })()}
          </div>

        </div>

        {/* Streak & Active Stats Logs */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 shadow-sm space-y-4 md:col-span-2 flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="text-xs font-black text-zinc-500 tracking-widest uppercase flex items-center gap-1.5">
              <Activity className="h-4 w-4 text-[#a3e635]" />
              Tizimdagi Umumiy Tarixiy Faollik
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-zinc-200">
              {/* Streak Card */}
              <div className="bg-zinc-950 p-4 rounded-2xl border border-zinc-800 flex items-center gap-3.5">
                <div className="p-2.5 bg-[#a3e635]/10 text-[#a3e635] rounded-xl">
                  <Flame className="h-6 w-6 animate-pulse" />
                </div>
                <div>
                  <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-wide">FAOL KUNLAR</div>
                  <div className="text-xl font-mono font-black">{currentStreak} kun</div>
                </div>
              </div>

              {/* Total Exercises Sets Done */}
              <div className="bg-zinc-950 p-4 rounded-2xl border border-zinc-800 flex items-center gap-3.5">
                <div className="p-2.5 bg-[#a3e635]/10 text-[#a3e635] rounded-xl">
                  <Award className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-wide">JAMI MASHQLAR</div>
                  <div className="text-xl font-mono font-black">
                    {logsArray.reduce((total, log) => total + Object.values(log.completedExercises).reduce((a, b) => a + b, 0), 0)} sets
                  </div>
                </div>
              </div>

              {/* Total Water Eaten */}
              <div className="bg-zinc-950 p-4 rounded-2xl border border-zinc-800 flex items-center gap-3.5">
                <div className="p-2.5 bg-[#a3e635]/10 text-[#a3e635] rounded-xl">
                  <Calendar className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-wide">KUNDALIK LOGLAR</div>
                  <div className="text-xl font-mono font-black">{logsArray.length} kun</div>
                </div>
              </div>
            </div>

            {/* Dynamic Activity Calendar list */}
            <div className="space-y-2">
              <h4 className="text-[10px] font-black text-zinc-500 uppercase tracking-wide">Kunlik loglar ro'yxati:</h4>
              <div className="max-h-40 overflow-y-auto space-y-1.5 pr-1 text-xs scrollbar-none">
                {logsArray.length > 0 ? (
                  logsArray.slice().reverse().map((log, idx) => {
                    const sets = Object.values(log.completedExercises).reduce((a, b) => a + b, 0);
                    return (
                      <div key={idx} className="flex justify-between items-center p-3 bg-zinc-950/60 border border-zinc-850 rounded-xl">
                        <div className="font-bold text-zinc-300 font-mono">
                          {new Date(log.date).toLocaleDateString('uz-UZ', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </div>
                        <div className="flex gap-3 text-[11px]">
                          <span className="text-[#a3e635] font-black font-mono">{sets} ta set mashq</span>
                          <span className="text-[#a3e635] font-black font-mono">{log.mealsEaten.length}/5 mahal ovqat</span>
                          <span className="text-[#a3e635] font-black font-mono">{log.waterIntake}ml suv</span>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-xs text-zinc-500 italic">Hali saqlangan kunlik loglar mavjud emas.</p>
                )}
              </div>
            </div>
          </div>

          <div className="text-[11px] text-zinc-500 pt-3 border-t border-zinc-800">
            Sana o'zgarganda saytdagi ko'rsatkichlar avtomatik saqlanib boradi.
          </div>
        </div>

      </div>

      {/* Gamified Achievements Box */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 shadow-sm space-y-4">
        <h3 className="text-xs font-black text-zinc-500 tracking-widest uppercase flex items-center gap-1.5">
          <Trophy className="h-4 w-4 text-[#a3e635] animate-pulse" />
          Muvaffaqiyatlar va Chempionlik Unvonlari
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {achievements.map((ach) => (
            <div 
              key={ach.id} 
              className={`p-4 rounded-2xl border flex flex-col justify-between space-y-3 transition-all ${
                ach.isUnlocked 
                  ? 'bg-zinc-950 border-lime-500/20 ring-1 ring-lime-500/10' 
                  : 'bg-zinc-950/40 border-zinc-900/60 opacity-40'
              }`}
            >
              <div className="space-y-2.5">
                <div className={`h-9 w-9 rounded-xl flex items-center justify-center ${
                  ach.isUnlocked ? 'text-[#a3e635] bg-[#a3e635]/10' : 'text-zinc-600 bg-zinc-900'
                }`}>
                  <Award className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-zinc-200">{ach.title}</h4>
                  <p className="text-[10px] text-zinc-500 mt-1 leading-relaxed">{ach.desc}</p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-zinc-900">
                <span className={`text-[9px] font-black uppercase tracking-wider ${ach.isUnlocked ? 'text-[#a3e635]' : 'text-zinc-600'}`}>
                  {ach.isUnlocked ? 'OCHILDI 🏆' : 'QULFLANGAN 🔒'}
                </span>
                {ach.isUnlocked && (
                  <div className="h-4.5 w-4.5 rounded-full bg-[#a3e635] flex items-center justify-center text-black">
                    <Check className="h-3 w-3 stroke-[3px]" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
