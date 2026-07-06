import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Dumbbell, 
  Utensils, 
  TrendingUp, 
  User, 
  Sparkles, 
  Droplet, 
  Flame, 
  Award, 
  ChevronRight,
  Scale,
  Calendar,
  Heart,
  Target,
  Menu,
  X
} from 'lucide-react';

import { DailyLog, UserProfile, Meal, MealTime } from './types';
import { EXERCISES } from './data/exercises';
import { DEFAULT_MEALS } from './data/nutrition';

// Components
import Dashboard from './components/Dashboard';
import WorkoutSection from './components/WorkoutSection';
import NutritionSection from './components/NutritionSection';
import ProgressSection from './components/ProgressSection';
import AiCoachSection from './components/AiCoachSection';
import ApexLogo from './components/ApexLogo';
import OnboardingWizard from './components/OnboardingWizard';

const LOCAL_STORAGE_LOGS_KEY = 'gantel_fitness_logs';
const LOCAL_STORAGE_PROFILE_KEY = 'gantel_fitness_profile';
const LOCAL_STORAGE_CUSTOM_MEALS_KEY = 'gantel_fitness_custom_meals';

// Initial default profile
const DEFAULT_PROFILE: UserProfile = {
  name: "Husniddin",
  weight: 75,
  targetWeight: 80,
  height: 178,
  gender: 'Erkak',
  activityLevel: 'Faol',
  goal: 'Mushak massasi'
};

// Initial default history so the app feels robust and populated on first load
const getTodayDateStr = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

const getYesterdayDateStr = () => {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

const INITIAL_LOGS = {
  [getYesterdayDateStr()]: {
    date: getYesterdayDateStr(),
    completedExercises: { 'chest_floor_press': 4, 'arms_bicep_curl': 3 },
    mealsEaten: ['meal_breakfast', 'meal_snack1', 'meal_lunch', 'meal_snack2'],
    waterIntake: 2500,
    weight: 75.2
  },
  [getTodayDateStr()]: {
    date: getTodayDateStr(),
    completedExercises: {},
    mealsEaten: [],
    waterIntake: 0,
    weight: 75.0
  }
};

export default function App() {
  const [tab, setTab] = useState<string>('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>(getTodayDateStr());
  
  // State variables with localStorage persistence
  const [profile, setProfile] = useState<UserProfile>(DEFAULT_PROFILE);
  const [dailyLogs, setDailyLogs] = useState<{ [dateStr: string]: DailyLog }>(INITIAL_LOGS);
  const [customMeals, setCustomMeals] = useState<Meal[]>([]);
  const [showOnboarding, setShowOnboarding] = useState<boolean>(false);

  // Load from LocalStorage
  useEffect(() => {
    const savedProfile = localStorage.getItem(LOCAL_STORAGE_PROFILE_KEY);
    const savedLogs = localStorage.getItem(LOCAL_STORAGE_LOGS_KEY);
    const savedCustomMeals = localStorage.getItem(LOCAL_STORAGE_CUSTOM_MEALS_KEY);

    if (savedProfile) {
      try { setProfile(JSON.parse(savedProfile)); } catch (e) { console.error(e); }
    } else {
      setShowOnboarding(true);
    }
    if (savedLogs) {
      try { 
        const parsed = JSON.parse(savedLogs);
        // Make sure today's date exists in logs
        const today = getTodayDateStr();
        if (!parsed[today]) {
          parsed[today] = {
            date: today,
            completedExercises: {},
            mealsEaten: [],
            waterIntake: 0,
            weight: savedProfile ? JSON.parse(savedProfile).weight : DEFAULT_PROFILE.weight
          };
        }
        setDailyLogs(parsed); 
      } catch (e) { console.error(e); }
    }
    if (savedCustomMeals) {
      try { setCustomMeals(JSON.parse(savedCustomMeals)); } catch (e) { console.error(e); }
    }
  }, []);

  const handleOnboardingComplete = (completedProfile: UserProfile) => {
    setProfile(completedProfile);
    localStorage.setItem(LOCAL_STORAGE_PROFILE_KEY, JSON.stringify(completedProfile));
    
    // Also, update today's log weight to match their current weight
    const today = getTodayDateStr();
    const updatedLogs = { ...dailyLogs };
    if (updatedLogs[today]) {
      updatedLogs[today] = {
        ...updatedLogs[today],
        weight: completedProfile.weight
      };
    } else {
      updatedLogs[today] = {
        date: today,
        completedExercises: {},
        mealsEaten: [],
        waterIntake: 0,
        weight: completedProfile.weight
      };
    }
    setDailyLogs(updatedLogs);
    localStorage.setItem(LOCAL_STORAGE_LOGS_KEY, JSON.stringify(updatedLogs));

    setShowOnboarding(false);
  };

  // Save changes helper
  const saveLogs = (updatedLogs: { [dateStr: string]: DailyLog }) => {
    setDailyLogs(updatedLogs);
    localStorage.setItem(LOCAL_STORAGE_LOGS_KEY, JSON.stringify(updatedLogs));
  };

  const saveProfile = (updatedProfile: UserProfile) => {
    setProfile(updatedProfile);
    localStorage.setItem(LOCAL_STORAGE_PROFILE_KEY, JSON.stringify(updatedProfile));
    
    // Also update today's log weight automatically
    const today = getTodayDateStr();
    const updatedLogs = { ...dailyLogs };
    if (!updatedLogs[today]) {
      updatedLogs[today] = {
        date: today,
        completedExercises: {},
        mealsEaten: [],
        waterIntake: 0,
        weight: updatedProfile.weight
      };
    } else {
      updatedLogs[today].weight = updatedProfile.weight;
    }
    saveLogs(updatedLogs);
  };

  // Log active workout sets
  const logExerciseSet = (exerciseId: string, setsCount: number) => {
    const updatedLogs = { ...dailyLogs };
    if (!updatedLogs[selectedDate]) {
      updatedLogs[selectedDate] = {
        date: selectedDate,
        completedExercises: {},
        mealsEaten: [],
        waterIntake: 0,
        weight: profile.weight
      };
    }
    
    updatedLogs[selectedDate].completedExercises[exerciseId] = setsCount;
    saveLogs(updatedLogs);
  };

  // Toggle meal as eaten
  const toggleMeal = (mealId: string) => {
    const updatedLogs = { ...dailyLogs };
    if (!updatedLogs[selectedDate]) {
      updatedLogs[selectedDate] = {
        date: selectedDate,
        completedExercises: {},
        mealsEaten: [],
        waterIntake: 0,
        weight: profile.weight
      };
    }

    const index = updatedLogs[selectedDate].mealsEaten.indexOf(mealId);
    if (index === -1) {
      updatedLogs[selectedDate].mealsEaten.push(mealId);
    } else {
      updatedLogs[selectedDate].mealsEaten.splice(index, 1);
    }
    saveLogs(updatedLogs);
  };

  // Log Water intake
  const updateWater = (amount: number) => {
    const updatedLogs = { ...dailyLogs };
    if (!updatedLogs[selectedDate]) {
      updatedLogs[selectedDate] = {
        date: selectedDate,
        completedExercises: {},
        mealsEaten: [],
        waterIntake: 0,
        weight: profile.weight
      };
    }

    updatedLogs[selectedDate].waterIntake += amount;
    saveLogs(updatedLogs);
  };

  // Custom meal additions
  const addCustomMeal = (meal: Omit<Meal, 'id' | 'isEaten'>) => {
    const newMeal: Meal = {
      ...meal,
      id: `custom_${Date.now()}`,
      isEaten: false
    };
    const updated = [...customMeals, newMeal];
    setCustomMeals(updated);
    localStorage.setItem(LOCAL_STORAGE_CUSTOM_MEALS_KEY, JSON.stringify(updated));
  };

  const removeCustomMeal = (mealId: string) => {
    const updated = customMeals.filter(m => m.id !== mealId);
    setCustomMeals(updated);
    localStorage.setItem(LOCAL_STORAGE_CUSTOM_MEALS_KEY, JSON.stringify(updated));
  };

  // Current day's log config
  const currentDayLog: DailyLog = dailyLogs[selectedDate] || {
    date: selectedDate,
    completedExercises: {},
    mealsEaten: [],
    waterIntake: 0,
    weight: profile.weight
  };

  // Calculate day completions for navbar indicator
  const totalSetsDoneToday = Object.values(currentDayLog.completedExercises).reduce((a, b) => a + b, 0);

  const navItems = [
    { id: 'dashboard', name: 'Bosh sahifa', icon: Award },
    { id: 'workouts', name: 'Gantel Mashqlari', icon: Dumbbell, badge: totalSetsDoneToday > 0 ? `${totalSetsDoneToday} set` : undefined },
    { id: 'nutrition', name: '5 Mahal Ovqat', icon: Utensils, badge: currentDayLog.mealsEaten.length > 0 ? `${currentDayLog.mealsEaten.length}/5` : undefined },
    { id: 'progress', name: 'Kundalik & Maqsadlar', icon: TrendingUp },
    { id: 'ai-coach', name: 'Aqlli Yordamchi', icon: Sparkles }
  ];

  const handleTabChange = (tabId: string) => {
    setTab(tabId);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-white flex flex-col font-sans selection:bg-[#a3e635] selection:text-black">
      
      {/* Top Professional Header */}
      <header className="sticky top-0 z-40 bg-zinc-950/85 backdrop-blur-md border-b border-zinc-900 px-4 md:px-8 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          
          {/* Brand Logo and Slogan */}
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 flex-shrink-0">
              <ApexLogo className="h-full w-full" />
            </div>
            <div>
              <span className="font-mono text-[10px] font-black text-[#f97316] tracking-widest uppercase block leading-none">APEX ATHLETICS</span>
              <h1 className="text-base font-black tracking-tight text-white leading-tight uppercase italic">GET <span className="text-[#f97316]">STRONGER</span></h1>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = tab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabChange(item.id)}
                  id={`nav_${item.id}`}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 relative cursor-pointer ${
                    isActive 
                      ? 'bg-zinc-900 text-[#a3e635] border border-zinc-800' 
                      : 'text-zinc-450 hover:text-white hover:bg-zinc-900/40'
                  }`}
                >
                  <Icon className={`h-4 w-4 ${isActive ? 'text-[#a3e635]' : 'text-zinc-500'}`} />
                  <span>{item.name}</span>
                  
                  {item.badge && (
                    <span className="absolute -top-1 -right-1 bg-[#a3e635] text-black font-mono font-black text-[9px] px-1.5 py-0.5 rounded-full shadow-md">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* User quick status metrics */}
          <div className="hidden lg:flex items-center gap-4 text-xs">
            <div className="h-4 w-px bg-zinc-800" />
            <div className="flex items-center gap-2 text-zinc-455">
              <Scale className="h-4 w-4 text-[#a3e635]" />
              <span>Vazn: <strong className="text-zinc-200 font-mono">{profile.weight} kg</strong></span>
            </div>
            <div className="flex items-center gap-2 text-zinc-455">
              <Target className="h-4 w-4 text-[#a3e635]" />
              <span>Maqsad: <strong className="text-zinc-200 font-mono">{profile.targetWeight} kg</strong></span>
            </div>
          </div>

          {/* Mobile menu toggle */}
          <div className="flex md:hidden items-center gap-2">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 bg-zinc-900 border border-zinc-800 text-zinc-300 rounded-lg focus:outline-none"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-zinc-900 border-b border-zinc-800 px-4 py-4 space-y-2 z-30 sticky top-16"
          >
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = tab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabChange(item.id)}
                  className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-between ${
                    isActive 
                      ? 'bg-[#09090b] text-[#a3e635] border border-zinc-850' 
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </div>
                  {item.badge && (
                    <span className="bg-[#a3e635] text-black font-mono font-black text-[9px] px-2 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
            
            <div className="pt-3 mt-3 border-t border-zinc-800 grid grid-cols-2 gap-2 text-center text-[10px] text-zinc-400">
              <div className="p-2 bg-[#09090b] rounded-lg border border-zinc-850">
                <span className="block font-mono font-bold text-zinc-200 text-xs">{profile.weight} kg</span>
                Hozirgi vazn
              </div>
              <div className="p-2 bg-[#09090b] rounded-lg border border-zinc-850">
                <span className="block font-mono font-bold text-zinc-200 text-xs">{profile.targetWeight} kg</span>
                Maqsadli vazn
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Stage */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 py-6 md:py-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="w-full"
          >
            {tab === 'dashboard' && (
              <Dashboard 
                profile={profile}
                selectedDate={selectedDate}
                dailyLog={currentDayLog}
                setTab={handleTabChange}
                updateWater={updateWater}
                toggleMeal={toggleMeal}
              />
            )}

            {tab === 'workouts' && (
              <WorkoutSection 
                completedExercises={currentDayLog.completedExercises}
                logExerciseSet={logExerciseSet}
              />
            )}

            {tab === 'nutrition' && (
              <NutritionSection 
                profile={profile}
                mealsEaten={currentDayLog.mealsEaten}
                toggleMeal={toggleMeal}
                customMeals={customMeals}
                addCustomMeal={addCustomMeal}
                removeCustomMeal={removeCustomMeal}
              />
            )}

            {tab === 'progress' && (
              <ProgressSection 
                profile={profile}
                dailyLogs={dailyLogs}
                updateProfile={saveProfile}
                selectedDate={selectedDate}
              />
            )}

            {tab === 'ai-coach' && (
              <AiCoachSection 
                profile={profile}
                dailyLog={currentDayLog}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Humble Footer (Hidden internal credit details) */}
      <footer className="mt-auto border-t border-zinc-900 bg-zinc-950 py-6 text-center text-xs text-zinc-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5 text-zinc-400">
            <ApexLogo className="h-6 w-6" />
            <span className="font-bold text-white tracking-wide">Apex Athletics — Get Stronger Tizimi</span>
          </div>
          <div className="text-[11px] text-zinc-600 font-mono">
            © {new Date().getFullYear()} Apex Athletics. Sog'lom hayot sari olg'a! ⚡
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {showOnboarding && (
          <OnboardingWizard onComplete={handleOnboardingComplete} />
        )}
      </AnimatePresence>

    </div>
  );
}
