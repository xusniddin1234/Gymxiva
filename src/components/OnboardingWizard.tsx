import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, 
  Calendar, 
  Scale, 
  Ruler, 
  Activity, 
  Check, 
  Sparkles, 
  ArrowRight, 
  ArrowLeft,
  Flame,
  Award,
  TrendingUp,
  Heart
} from 'lucide-react';
import { UserProfile } from '../types';
import ApexLogo from './ApexLogo';
import { calculateNutritionTargets } from '../utils';

interface OnboardingWizardProps {
  onComplete: (profile: UserProfile) => void;
}

export default function OnboardingWizard({ onComplete }: OnboardingWizardProps) {
  const [step, setStep] = useState(1);
  
  // Form States
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState<number | ''>('');
  const [birthDate, setBirthDate] = useState('');
  const [gender, setGender] = useState<'Erkak' | 'Ayol'>('Erkak');
  const [height, setHeight] = useState<number | ''>('');
  const [weight, setWeight] = useState<number | ''>('');
  const [targetWeight, setTargetWeight] = useState<number | ''>('');
  const [activityLevel, setActivityLevel] = useState<'Past' | 'O\'rtacha' | 'Faol'>('O\'rtacha');

  // Loading/Analysis states
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [analysisText, setAnalysisText] = useState('');
  const [analysisStage, setAnalysisStage] = useState(0);

  // Calculated Results State
  const [calculatedProfile, setCalculatedProfile] = useState<UserProfile | null>(null);

  // Handle calculation
  const runAnalysisAndSetup = () => {
    if (!firstName || !lastName || !age || !birthDate || !height || !weight || !targetWeight) return;
    
    setIsAnalyzing(true);
    setAnalysisProgress(0);
    setAnalysisStage(0);

    // Simulate real calculations with visual steps
    const stages = [
      "Tana ommasi indeksi (BMI) hisoblanmoqda...",
      "BMR (Asosiy metabolizm tezligi) aniqlanmoqda...",
      "TDEE (Kunlik energiya sarfi) hisoblanmoqda...",
      "Oqsil, uglevod va yog' nisbatlari muvozanatlashtirilmoqda...",
      "Sizga moslashtirilgan mashg'ulotlar intensivligi sozlanmoqda...",
      "Apex Athletics rejalari muvaffaqiyatli yuklandi! 🔥"
    ];

    const timer = setInterval(() => {
      setAnalysisProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          
          // Execute actual scientific calculations
          const w = Number(weight);
          const h = Number(height);
          const a = Number(age);
          
          const targets = calculateNutritionTargets({
            weight: w,
            height: h,
            age: a,
            gender,
            activityLevel,
            targetWeight: Number(targetWeight)
          });

          setCalculatedProfile({
            name: firstName,
            lastName: lastName,
            age: a,
            birthDate: birthDate,
            weight: w,
            targetWeight: Number(targetWeight),
            height: h,
            gender: gender,
            activityLevel: activityLevel,
            goal: targets.goal,
            targetCalories: targets.calories,
            targetProtein: targets.protein,
            targetCarbs: targets.carbs,
            targetFats: targets.fats
          });

          setStep(5); // Go to results step
          setIsAnalyzing(false);
          return 100;
        }
        
        const nextProgress = prev + 1.25; // Takes about 3-4 seconds
        const currentStage = Math.min(Math.floor((nextProgress / 100) * stages.length), stages.length - 1);
        setAnalysisStage(currentStage);
        setAnalysisText(stages[currentStage]);
        return nextProgress;
      });
    }, 50);
  };

  const isNextDisabled = () => {
    if (step === 1) return !firstName.trim() || !lastName.trim();
    if (step === 2) return !age || !birthDate;
    if (step === 3) return !height || !weight || !targetWeight;
    return false;
  };

  return (
    <div 
      className="fixed inset-0 bg-black/95 z-50 overflow-y-auto flex items-center justify-center p-4 md:p-8"
      id="onboarding-modal-container"
    >
      {/* Background ambient glows */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#f97316]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-[#a3e635]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative w-full max-w-xl bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col">
        
        {/* Top Progress Bar */}
        <div className="h-1 bg-zinc-800 w-full relative">
          <div 
            className="absolute h-full left-0 top-0 bg-gradient-to-r from-[#f97316] to-[#a3e635] transition-all duration-300"
            style={{ width: `${(step / 5) * 100}%` }}
          />
        </div>

        {/* Content Box */}
        <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
          
          <AnimatePresence mode="wait">
            {isAnalyzing ? (
              /* Simulated Analysis Loader */
              <motion.div 
                key="analyzing"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="py-12 flex flex-col items-center justify-center text-center space-y-6"
              >
                <div className="relative h-20 w-20 flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full border-4 border-zinc-800" />
                  <div className="absolute inset-0 rounded-full border-4 border-[#a3e635] border-t-transparent animate-spin" />
                  <Sparkles className="h-8 w-8 text-[#f97316]" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-black text-white uppercase tracking-tight italic">
                    Apex Tahlil Dasturi
                  </h3>
                  <p className="text-sm text-zinc-400 max-w-sm h-12 flex items-center justify-center font-bold">
                    {analysisText}
                  </p>
                </div>
                
                {/* Visual Steps list */}
                <div className="w-full max-w-xs bg-zinc-950 p-4 rounded-2xl border border-zinc-800 text-left space-y-2 text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <span className={analysisStage >= 0 ? "text-[#a3e635]" : "text-zinc-600"}>
                      {analysisStage > 0 ? "✓" : "●"}
                    </span>
                    <span className={analysisStage >= 0 ? "text-zinc-200" : "text-zinc-500"}>
                      BMI Tahlili
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={analysisStage >= 2 ? "text-[#a3e635]" : "text-zinc-600"}>
                      {analysisStage > 2 ? "✓" : "●"}
                    </span>
                    <span className={analysisStage >= 2 ? "text-zinc-200" : "text-zinc-500"}>
                      BMR va TDEE Sarfi
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={analysisStage >= 3 ? "text-[#a3e635]" : "text-zinc-600"}>
                      {analysisStage > 3 ? "✓" : "●"}
                    </span>
                    <span className={analysisStage >= 3 ? "text-zinc-200" : "text-zinc-500"}>
                      Makronutrientlar Balansi
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={analysisStage >= 4 ? "text-[#a3e635]" : "text-zinc-600"}>
                      {analysisStage > 4 ? "✓" : "●"}
                    </span>
                    <span className={analysisStage >= 4 ? "text-zinc-200" : "text-zinc-500"}>
                      Mashg'ulot Nastroykalari
                    </span>
                  </div>
                </div>
              </motion.div>
            ) : (
              /* Step-by-Step Forms */
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                {/* Step 1: Welcome / Name */}
                {step === 1 && (
                  <div className="space-y-6">
                    <div className="flex flex-col items-center text-center space-y-4">
                      <div className="h-24 w-24">
                        <ApexLogo className="h-full w-full" />
                      </div>
                      <div className="space-y-1">
                        <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">
                          Apex Athletics
                        </h2>
                        <p className="text-zinc-400 text-xs max-w-sm">
                          Dasturni to'g'ri va samarali sozlashimiz uchun bir nechta savollarga javob bering.
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4 pt-2">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest flex items-center gap-1.5">
                          <User className="h-3 w-3 text-[#f97316]" /> Ismingiz
                        </label>
                        <input 
                          type="text" 
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          placeholder="Masalan, Husniddin"
                          className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl py-3 px-4 text-zinc-200 font-bold focus:outline-none focus:border-[#f97316] transition-all text-sm"
                          required
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest flex items-center gap-1.5">
                          <User className="h-3 w-3 text-[#f97316]" /> Familiyangiz
                        </label>
                        <input 
                          type="text" 
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          placeholder="Masalan, Qadamboyev"
                          className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl py-3 px-4 text-zinc-200 font-bold focus:outline-none focus:border-[#f97316] transition-all text-sm"
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Birthday, Age, Gender */}
                {step === 2 && (
                  <div className="space-y-5">
                    <div className="space-y-1">
                      <h3 className="text-lg font-black text-white uppercase tracking-tight italic">
                        Siz haqingizda ma'lumot
                      </h3>
                      <p className="text-zinc-400 text-xs">
                        Bu parametrlar kunlik energiya sarfini (BMR) hisoblash uchun zarur.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest flex items-center gap-1.5">
                          <Calendar className="h-3 w-3 text-[#f97316]" /> Tug'ilgan kuningiz
                        </label>
                        <input 
                          type="date" 
                          value={birthDate}
                          onChange={(e) => {
                            setBirthDate(e.target.value);
                            // Auto-calculate age from birthdate
                            if (e.target.value) {
                              const birth = new Date(e.target.value);
                              const diff = Date.now() - birth.getTime();
                              const ageDate = new Date(diff);
                              const calculatedAge = Math.abs(ageDate.getUTCFullYear() - 1970);
                              setAge(calculatedAge || 18);
                            }
                          }}
                          className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl py-3 px-4 text-zinc-200 font-bold focus:outline-none focus:border-[#f97316] transition-all text-sm font-mono"
                          required
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest flex items-center gap-1.5">
                          <User className="h-3 w-3 text-[#f97316]" /> Yoshi
                        </label>
                        <input 
                          type="number" 
                          value={age}
                          onChange={(e) => setAge(e.target.value === '' ? '' : Number(e.target.value))}
                          placeholder="Yoshingiz"
                          min="10"
                          max="100"
                          className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl py-3 px-4 text-zinc-200 font-bold focus:outline-none focus:border-[#f97316] transition-all text-sm font-mono"
                          required
                        />
                      </div>
                    </div>

                    {/* Gender Custom Selection Cards */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest block">
                        Jinsingiz
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => setGender('Erkak')}
                          className={`p-4 rounded-2xl border flex flex-col items-center justify-center gap-2 transition-all ${
                            gender === 'Erkak' 
                              ? 'bg-[#f97316]/10 border-[#f97316] text-[#f97316]' 
                              : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
                          }`}
                        >
                          <span className="text-sm font-black uppercase tracking-wider">Erkak</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setGender('Ayol')}
                          className={`p-4 rounded-2xl border flex flex-col items-center justify-center gap-2 transition-all ${
                            gender === 'Ayol' 
                              ? 'bg-[#f97316]/10 border-[#f97316] text-[#f97316]' 
                              : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
                          }`}
                        >
                          <span className="text-sm font-black uppercase tracking-wider">Ayol</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Height, Weight, Target Weight */}
                {step === 3 && (
                  <div className="space-y-5">
                    <div className="space-y-1">
                      <h3 className="text-lg font-black text-white uppercase tracking-tight italic">
                        Jismoniy ko'rsatkichlar
                      </h3>
                      <p className="text-zinc-400 text-xs">
                        Hozirgi parametrlaringiz va orzuingizdagi maqsadli tana vaznini kiriting.
                      </p>
                    </div>

                    <div className="space-y-4">
                      {/* Height */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest flex items-center gap-1.5">
                          <Ruler className="h-3.5 w-3.5 text-[#f97316]" /> Bo'yingiz (sm)
                        </label>
                        <input 
                          type="number" 
                          value={height}
                          onChange={(e) => setHeight(e.target.value === '' ? '' : Number(e.target.value))}
                          placeholder="Bo'yingiz sm hisobida (masalan, 178)"
                          min="100"
                          max="250"
                          className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl py-3 px-4 text-zinc-200 font-bold focus:outline-none focus:border-[#f97316] transition-all text-sm font-mono"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        {/* Current weight */}
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest flex items-center gap-1.5">
                            <Scale className="h-3.5 w-3.5 text-[#f97316]" /> Hozirgi vazn (kg)
                          </label>
                          <input 
                            type="number" 
                            step="0.1"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value === '' ? '' : Number(e.target.value))}
                            placeholder="Hozirgi vazn (kg)"
                            min="30"
                            max="200"
                            className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl py-3 px-4 text-zinc-200 font-bold focus:outline-none focus:border-[#f97316] transition-all text-sm font-mono"
                            required
                          />
                        </div>

                        {/* Target weight */}
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest flex items-center gap-1.5">
                            <Scale className="h-3.5 w-3.5 text-[#a3e635]" /> Maqsadli vazn (kg)
                          </label>
                          <input 
                            type="number" 
                            step="0.1"
                            value={targetWeight}
                            onChange={(e) => setTargetWeight(e.target.value === '' ? '' : Number(e.target.value))}
                            placeholder="Chiqmoqchi bo'lgan kg"
                            min="30"
                            max="200"
                            className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl py-3 px-4 text-zinc-200 font-bold focus:outline-none focus:border-[#a3e635] transition-all text-sm font-mono"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 4: Activity Level */}
                {step === 4 && (
                  <div className="space-y-5">
                    <div className="space-y-1">
                      <h3 className="text-lg font-black text-white uppercase tracking-tight italic">
                        Kundalik faollik darajasi
                      </h3>
                      <p className="text-zinc-400 text-xs">
                        Kun davomidagi faolligingiz hisob-kitoblarning aniqligini ta'minlaydi.
                      </p>
                    </div>

                    <div className="space-y-3">
                      <button
                        type="button"
                        onClick={() => setActivityLevel('Past')}
                        className={`w-full p-4 rounded-2xl border text-left flex items-start gap-4 transition-all ${
                          activityLevel === 'Past' 
                            ? 'bg-[#f97316]/10 border-[#f97316]' 
                            : 'bg-zinc-950 border-zinc-800 hover:border-zinc-700'
                        }`}
                      >
                        <div className={`p-2 rounded-xl ${activityLevel === 'Past' ? 'bg-[#f97316] text-black' : 'bg-zinc-900 text-zinc-400'}`}>
                          <Activity className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="text-xs font-black text-white uppercase tracking-wider">Kam harakat (Past)</h4>
                          <p className="text-[11px] text-zinc-500 mt-0.5 leading-relaxed">
                            Ko'p vaqt o'tirgan holda ishlash, kamroq piyoda yurish va qo'shimcha sport bilan shug'ullanmaslik.
                          </p>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setActivityLevel('O\'rtacha')}
                        className={`w-full p-4 rounded-2xl border text-left flex items-start gap-4 transition-all ${
                          activityLevel === 'O\'rtacha' 
                            ? 'bg-[#f97316]/10 border-[#f97316]' 
                            : 'bg-zinc-950 border-zinc-800 hover:border-zinc-700'
                        }`}
                      >
                        <div className={`p-2 rounded-xl ${activityLevel === 'O\'rtacha' ? 'bg-[#f97316] text-black' : 'bg-zinc-900 text-zinc-400'}`}>
                          <Activity className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="text-xs font-black text-white uppercase tracking-wider">O'rtacha faollik</h4>
                          <p className="text-[11px] text-zinc-500 mt-0.5 leading-relaxed">
                            Haftada 2-3 marta engil mashg'ulotlar, muntazam piyoda yurish yoki o'rtacha jismoniy ish.
                          </p>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setActivityLevel('Faol')}
                        className={`w-full p-4 rounded-2xl border text-left flex items-start gap-4 transition-all ${
                          activityLevel === 'Faol' 
                            ? 'bg-[#f97316]/10 border-[#f97316]' 
                            : 'bg-zinc-950 border-zinc-800 hover:border-zinc-700'
                        }`}
                      >
                        <div className={`p-2 rounded-xl ${activityLevel === 'Faol' ? 'bg-[#f97316] text-black' : 'bg-zinc-900 text-zinc-400'}`}>
                          <Activity className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="text-xs font-black text-white uppercase tracking-wider">Yuqori faollik (Faol)</h4>
                          <p className="text-[11px] text-zinc-500 mt-0.5 leading-relaxed">
                            Har kuni mashq qilish, jismonan og'ir faoliyat turi yoki sportga bag'ishlangan hayot tarzi.
                          </p>
                        </div>
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 5: Results Screen */}
                {step === 5 && calculatedProfile && (
                  <div className="space-y-6">
                    <div className="text-center space-y-1.5">
                      <div className="h-14 w-14 mx-auto text-[#a3e635]">
                        <Check className="h-full w-full stroke-[3]" />
                      </div>
                      <h3 className="text-xl font-black text-white uppercase tracking-tight italic">
                        Apex Nastroykalari Tayyor! 🚀
                      </h3>
                      <p className="text-zinc-400 text-xs">
                        Biz siz uchun mukammal o'quv va oziqlanish parametrlarini sozladdik:
                      </p>
                    </div>

                    {/* Calculated Metrics Cards */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-zinc-950 p-4 rounded-2xl border border-zinc-850 space-y-1">
                        <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest block">
                          Tana Maqsadi
                        </span>
                        <span className="text-sm font-black text-[#a3e635] uppercase italic">
                          {calculatedProfile.goal}
                        </span>
                      </div>
                      <div className="bg-zinc-950 p-4 rounded-2xl border border-zinc-850 space-y-1">
                        <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest block">
                          Kunlik Kaloriya
                        </span>
                        <span className="text-sm font-black text-white font-mono">
                          {calculatedProfile.targetCalories} kcal
                        </span>
                      </div>
                    </div>

                    {/* Macros breakdown */}
                    <div className="bg-zinc-950/80 p-5 rounded-3xl border border-zinc-850 space-y-4">
                      <h4 className="text-[10px] font-black text-zinc-400 uppercase tracking-widest flex items-center gap-1.5">
                        <Flame className="h-3.5 w-3.5 text-[#f97316]" /> Kunlik oqsillar reja porsiyasi
                      </h4>
                      
                      <div className="grid grid-cols-3 gap-2 text-center text-xs">
                        <div className="space-y-1">
                          <span className="block font-black text-white font-mono text-base">{calculatedProfile.targetProtein}g</span>
                          <span className="text-[9px] font-bold text-zinc-500 uppercase">Oqsil</span>
                        </div>
                        <div className="space-y-1">
                          <span className="block font-black text-white font-mono text-base">{calculatedProfile.targetCarbs}g</span>
                          <span className="text-[9px] font-bold text-zinc-500 uppercase">Uglevod</span>
                        </div>
                        <div className="space-y-1">
                          <span className="block font-black text-white font-mono text-base">{calculatedProfile.targetFats}g</span>
                          <span className="text-[9px] font-bold text-zinc-500 uppercase">Yog'</span>
                        </div>
                      </div>
                    </div>

                    {/* Recommendation box */}
                    <div className="p-4 bg-zinc-950 border-l-4 border-[#a3e635] rounded-r-2xl space-y-1 text-xs">
                      <span className="font-bold text-white uppercase tracking-wider flex items-center gap-1">
                        <Award className="h-3.5 w-3.5 text-[#a3e635]" /> Coach Maslahati:
                      </span>
                      <p className="text-zinc-400 leading-relaxed">
                        Sizning hozirgi vazningiz ({calculatedProfile.weight} kg) va maqsadli vazningiz ({calculatedProfile.targetWeight} kg) o'rtasidagi farqni inobatga olib, dastur 5 mahal ovqatlanish rejasining kaloriyasini {calculatedProfile.targetCalories} kcal qilib sozladi. Kuniga kamida 2 ta gantel yordamida mashqlarni bajarib boring!
                      </p>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Bottom Action Controls */}
          {!isAnalyzing && (
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-zinc-850">
              {step > 1 && step < 5 ? (
                <button
                  type="button"
                  onClick={() => setStep(prev => prev - 1)}
                  className="flex items-center gap-1.5 text-xs font-bold text-zinc-400 hover:text-white transition-all cursor-pointer"
                >
                  <ArrowLeft className="h-4 w-4" /> Orqaga
                </button>
              ) : (
                <div />
              )}

              {step < 4 ? (
                <button
                  type="button"
                  onClick={() => setStep(prev => prev + 1)}
                  disabled={isNextDisabled()}
                  className="flex items-center gap-1.5 px-6 py-2.5 bg-[#f97316] hover:bg-[#f97316]/90 disabled:opacity-30 disabled:cursor-not-allowed text-black font-black uppercase text-xs tracking-wider rounded-xl transition-all cursor-pointer"
                >
                  Keyingisi <ArrowRight className="h-4 w-4" />
                </button>
              ) : step === 4 ? (
                <button
                  type="button"
                  onClick={runAnalysisAndSetup}
                  className="flex items-center gap-1.5 px-6 py-2.5 bg-gradient-to-r from-[#f97316] to-[#a3e635] text-black font-black uppercase text-xs tracking-wider rounded-xl transition-all cursor-pointer animate-pulse"
                >
                  Tahlil Qilish <Sparkles className="h-4 w-4" />
                </button>
              ) : (
                /* Complete / Enter app button */
                <button
                  type="button"
                  onClick={() => {
                    if (calculatedProfile) {
                      onComplete(calculatedProfile);
                    }
                  }}
                  className="w-full py-3 bg-[#a3e635] hover:bg-[#a3e635]/90 text-black font-black uppercase text-xs tracking-widest rounded-xl transition-all cursor-pointer text-center"
                >
                  Dasturni faollashtirish va tizimga kirish ⚡
                </button>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
