import React from 'react';
import { motion } from 'motion/react';
import { 
  Flame, 
  Utensils, 
  Droplet, 
  Award, 
  Calendar, 
  ChevronRight, 
  TrendingUp, 
  Sparkles,
  CheckCircle2,
  Dumbbell
} from 'lucide-react';
import { DailyLog, UserProfile, Meal } from '../types';
import { EXERCISES } from '../data/exercises';
import { DEFAULT_MEALS } from '../data/nutrition';

interface DashboardProps {
  profile: UserProfile;
  selectedDate: string;
  dailyLog: DailyLog;
  setTab: (tab: string) => void;
  updateWater: (amount: number) => void;
  toggleMeal: (mealId: string) => void;
}

export default function Dashboard({ 
  profile, 
  selectedDate, 
  dailyLog, 
  setTab, 
  updateWater, 
  toggleMeal 
}: DashboardProps) {

  // Calculations
  const completedExerciseIds = Object.keys(dailyLog.completedExercises);
  const totalSetsCompleted = Object.values(dailyLog.completedExercises).reduce((a, b) => a + b, 0);
  
  // Calculate calories burned
  const caloriesBurned = completedExerciseIds.reduce((total, id) => {
    const exercise = EXERCISES.find(e => e.id === id);
    const sets = dailyLog.completedExercises[id] || 0;
    return total + (exercise ? exercise.caloriesBurnedPerSet * sets : 0);
  }, 0);

  // Total meals eaten (out of 5)
  const mealsEatenCount = dailyLog.mealsEaten.length;

  // Water completion % (target 3000ml)
  const waterTarget = 3000;
  const waterPercent = Math.min(Math.round((dailyLog.waterIntake / waterTarget) * 100), 100);

  // Calculate overall day progress percentage
  const dayProgress = Math.round(
    ((mealsEatenCount / 5) * 40) + 
    (Math.min(totalSetsCompleted / 12, 1) * 40) + 
    ((waterPercent / 100) * 20)
  );

  // Motivational quote based on progress
  let quote = "Bugun o'zgarish kuni! 2 ta gantel bilan butun tanani chiniqtirish va kuchli bo'lish vaqti keldi.";
  if (dayProgress > 10 && dayProgress <= 40) {
    quote = "Ajoyib boshlanish! Har bir qadam va har bir ovqat sizni maqsad sari yaqinlashtiradi.";
  } else if (dayProgress > 40 && dayProgress <= 80) {
    quote = "Yarim yo'l bosib o'tildi! O'zingiz bilan faxrlansangiz arziydi. Davom eting!";
  } else if (dayProgress > 80) {
    quote = "Mukammal natija! Bugun siz haqiqiy professional kabi yashadingiz. Davomli bo'lsin!";
  }

  return (
    <div className="space-y-6" id="dashboard_tab">
      
      {/* Welcome & Motivation Banner */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-zinc-900 p-6 md:p-8 text-white border border-zinc-800 shadow-xl"
      >
        <div className="absolute right-0 top-0 -mr-12 -mt-12 h-40 w-40 rounded-full bg-[#a3e635]/5 blur-3xl" />
        <div className="absolute left-1/3 bottom-0 -mb-16 h-32 w-32 rounded-full bg-zinc-850/10 blur-3xl" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-3">
            <div className="bg-[#a3e635] text-black text-[10px] font-black px-2 py-1 rounded w-fit uppercase tracking-widest">
              Gantel Fitness Murabbiyingiz
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black uppercase italic tracking-tighter leading-tight">
              Assalomu alaykum, <br className="hidden sm:inline" />
              <span className="text-[#a3e635]">{profile.name || "Sportchi"}</span>!
            </h1>
            <p className="text-zinc-400 text-sm md:text-base max-w-xl leading-relaxed">
              {quote}
            </p>
          </div>
          
          {/* Day Completion Ring */}
          <div className="flex items-center gap-4 bg-zinc-950/50 p-5 rounded-2xl border border-zinc-800/50 backdrop-blur-sm self-start md:self-auto">
            <div className="relative h-16 w-16 flex items-center justify-center">
              <svg className="absolute -rotate-90 transform h-16 w-16">
                <circle cx="32" cy="32" r="28" stroke="#18181b" strokeWidth="6" fill="transparent" />
                <circle 
                  cx="32" 
                  cy="32" 
                  r="28" 
                  stroke="#a3e635" 
                  strokeWidth="6" 
                  fill="transparent" 
                  strokeDasharray={176} 
                  strokeDashoffset={176 - (176 * dayProgress) / 100}
                  strokeLinecap="round"
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              <span className="font-mono text-sm font-black text-[#a3e635]">{dayProgress}%</span>
            </div>
            <div>
              <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">KUNLIK REJA</div>
              <div className="text-sm font-black text-white italic uppercase">Bajarildi</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Core Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* Metric Card 1: Workouts & Calories */}
        <motion.div 
          whileHover={{ y: -3 }}
          className="bg-zinc-900 rounded-3xl border border-zinc-800 p-6 flex flex-col justify-between shadow-md"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-zinc-500 tracking-widest uppercase">MASHQLAR & kkal</span>
            <div className="p-2.5 bg-zinc-950/50 rounded-xl border border-zinc-800/50 text-[#a3e635]">
              <Flame className="h-5 w-5" />
            </div>
          </div>
          
          <div className="my-5">
            <div className="text-4xl font-black italic uppercase text-white">
              {caloriesBurned} <span className="text-xs font-bold text-zinc-500 not-italic lowercase">kkal</span>
            </div>
            <p className="text-xs text-zinc-400 mt-1">
              Bugun jami <span className="text-[#a3e635] font-black font-mono">{totalSetsCompleted} ta patxot</span> bajarildi
            </p>
          </div>
          
          <button 
            onClick={() => setTab('workouts')}
            className="w-full flex items-center justify-center gap-1.5 py-2.5 px-4 bg-[#a3e635]/10 hover:bg-[#a3e635]/15 text-[#a3e635] rounded-xl text-xs font-bold border border-[#a3e635]/20 transition-all cursor-pointer"
          >
            <Dumbbell className="h-3.5 w-3.5" />
            <span>Mashq qilishni boshlash</span>
            <ChevronRight className="h-3 w-3" />
          </button>
        </motion.div>

        {/* Metric Card 2: 5 Meals Tracker */}
        <motion.div 
          whileHover={{ y: -3 }}
          className="bg-zinc-900 rounded-3xl border border-zinc-800 p-6 flex flex-col justify-between shadow-md"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-zinc-500 tracking-widest uppercase">5 MAHAL OVQATLANISH</span>
            <div className="p-2.5 bg-zinc-950/50 rounded-xl border border-zinc-800/50 text-[#a3e635]">
              <Utensils className="h-5 w-5" />
            </div>
          </div>
          
          <div className="my-5">
            <div className="text-4xl font-black italic uppercase text-white">
              {mealsEatenCount} <span className="text-xs font-bold text-zinc-500 not-italic lowercase">/ 5 mahal</span>
            </div>
            {/* Simple food dot indicators */}
            <div className="flex gap-2 mt-2">
              {[1, 2, 3, 4, 5].map((idx) => (
                <div 
                  key={idx}
                  className={`h-2 flex-1 rounded-full ${idx <= mealsEatenCount ? 'bg-[#a3e635]' : 'bg-zinc-800'}`}
                />
              ))}
            </div>
          </div>
          
          <button 
            onClick={() => setTab('nutrition')}
            className="w-full flex items-center justify-center gap-1.5 py-2.5 px-4 bg-[#a3e635]/10 hover:bg-[#a3e635]/15 text-[#a3e635] rounded-xl text-xs font-bold border border-[#a3e635]/20 transition-all cursor-pointer"
          >
            <span>Ovqatlanishni rejalash</span>
            <ChevronRight className="h-3 w-3" />
          </button>
        </motion.div>

        {/* Metric Card 3: Water Intake */}
        <motion.div 
          whileHover={{ y: -3 }}
          className="bg-zinc-900 rounded-3xl border border-zinc-800 p-6 flex flex-col justify-between shadow-md"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-zinc-500 tracking-widest uppercase">SUV BALANSI</span>
            <div className="p-2.5 bg-zinc-950/50 rounded-xl border border-zinc-800/50 text-[#a3e635]">
              <Droplet className="h-5 w-5" />
            </div>
          </div>
          
          <div className="my-4">
            <div className="text-4xl font-black italic uppercase text-white">
              {dailyLog.waterIntake} <span className="text-xs font-bold text-zinc-500 not-italic lowercase">ml</span>
            </div>
            {/* Visual progress bar */}
            <div className="w-full bg-zinc-950 h-2 rounded-full mt-2 overflow-hidden border border-zinc-800/50">
              <div className="bg-[#a3e635] h-full rounded-full transition-all duration-500" style={{ width: `${waterPercent}%` }} />
            </div>
            <span className="text-[10px] text-zinc-500 font-mono mt-1 block">Maqsad: {waterTarget}ml ({waterPercent}%)</span>
          </div>
          
          <div className="flex gap-2">
            <button 
              onClick={() => updateWater(250)}
              className="flex-1 py-1.5 bg-[#a3e635]/10 hover:bg-[#a3e635]/25 text-[#a3e635] border border-[#a3e635]/20 text-[11px] font-bold rounded-lg transition-all cursor-pointer"
            >
              +250ml
            </button>
            <button 
              onClick={() => updateWater(500)}
              className="flex-1 py-1.5 bg-[#a3e635]/10 hover:bg-[#a3e635]/25 text-[#a3e635] border border-[#a3e635]/20 text-[11px] font-bold rounded-lg transition-all cursor-pointer"
            >
              +500ml
            </button>
          </div>
        </motion.div>
        
      </div>

      {/* Quick Action Tasks and Food Checklist */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Meal Logging Quick List */}
        <div className="bg-zinc-900 rounded-3xl border border-zinc-800 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-1.5 italic">
              <Utensils className="h-4 w-4 text-[#a3e635]" />
              Bugungi 5 Mahal Ovqatlar
            </h3>
            <span className="text-[10px] text-zinc-500 font-mono tracking-widest uppercase font-bold">Bugun uchun</span>
          </div>

          <div className="space-y-2.5">
            {DEFAULT_MEALS.map((meal, index) => {
              const isChecked = dailyLog.mealsEaten.includes(meal.id);
              const orderNum = String(index + 1).padStart(2, '0');
              return (
                <div 
                  key={meal.id}
                  onClick={() => toggleMeal(meal.id)}
                  className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all cursor-pointer ${
                    isChecked 
                      ? 'bg-[#a3e635]/5 border-[#a3e635]/20 text-white' 
                      : 'bg-zinc-950/50 border-zinc-850 hover:border-zinc-700 text-zinc-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {/* Circle sequence number as in Bento Grid design */}
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs italic ${
                      isChecked ? 'bg-[#a3e635] text-black font-black' : 'bg-zinc-900 text-zinc-400 border border-zinc-800'
                    }`}>
                      {orderNum}
                    </div>
                    <div>
                      <div className="text-[10px] font-black text-[#a3e635] uppercase tracking-wider">{meal.time}</div>
                      <div className={`text-sm font-semibold leading-tight ${isChecked ? 'line-through text-zinc-500' : 'text-white'}`}>
                        {meal.name}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-mono font-bold text-zinc-100">{meal.calories} kkal</div>
                    <div className="text-[10px] text-zinc-500 font-medium">Oqsil: {meal.protein}g</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 2-Dumbbell Home Gym Philosophy */}
        <div className="bg-zinc-900 rounded-3xl border border-zinc-800 p-6 shadow-sm flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-1.5 italic">
              <Award className="h-4 w-4 text-[#a3e635]" />
              Gantel va Ovqatlanish Falsafasi
            </h3>
            
            <div className="space-y-3.5 text-xs text-zinc-300">
              <div className="flex gap-3 bg-zinc-950/50 p-4 rounded-2xl border border-zinc-850">
                <div className="bg-[#a3e635] text-black w-7 h-7 rounded-full flex items-center justify-center font-black text-sm italic flex-shrink-0">1</div>
                <div>
                  <h4 className="font-bold text-white mb-0.5 uppercase tracking-wide text-[11px]">Cheksiz Imkoniyatlar</h4>
                  <p className="text-zinc-400 leading-relaxed text-[11px]">
                    Ushbu web-sayt yordamida zallarga borishga ehtiyoj yo'q. Bizning mashiqlar butun tanadagi barcha mushaklarni (oyoqlar, ko'krak, yelka, orqa, qo'llar va press) to'liq ishga soladi.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-3 bg-zinc-950/50 p-4 rounded-2xl border border-zinc-850">
                <div className="bg-[#a3e635] text-black w-7 h-7 rounded-full flex items-center justify-center font-black text-sm italic flex-shrink-0">2</div>
                <div>
                  <h4 className="font-bold text-white mb-0.5 uppercase tracking-wide text-[11px]">Sintetik O'sish Tizimi</h4>
                  <p className="text-zinc-400 leading-relaxed text-[11px]">
                    Mushaklar yuklamadan keyin 5 mahal sifatli oqsil va uglevod bilan oziqlangandagina o'sadi. Ovqatlar ro'yxati sizning tana muvozanatini saqlashga xizmat qiladi.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-3 bg-zinc-950/50 p-4 rounded-2xl border border-zinc-850">
                <div className="bg-[#a3e635] text-black w-7 h-7 rounded-full flex items-center justify-center font-black text-sm italic flex-shrink-0">3</div>
                <div>
                  <h4 className="font-bold text-white mb-0.5 uppercase tracking-wide text-[11px]">Doimiy Nazorat</h4>
                  <p className="text-zinc-400 leading-relaxed text-[11px]">
                    Har safar mashg'ulotni yakunlab yoki snek yeganingizda saytga belgilab boring. Doimiy odat sizni mukammal tana tuzilishiga yetaklaydi.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-5 pt-4 border-t border-zinc-800 flex items-center justify-between text-xs text-zinc-500 font-mono">
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5 text-zinc-600" />
              Sana: {new Date(selectedDate).toLocaleDateString('uz-UZ', { day: 'numeric', month: 'long', year: 'numeric' })}
            </span>
            <span className="text-[#a3e635] font-black uppercase tracking-wider">Boshlashga tayyor 🔥</span>
          </div>
        </div>

      </div>

    </div>
  );
}
