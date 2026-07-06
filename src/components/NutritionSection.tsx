import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Utensils, 
  Plus, 
  Flame, 
  Apple, 
  Sparkles, 
  ChevronDown, 
  ChevronUp, 
  Heart, 
  CheckCircle2, 
  Info,
  Trash2,
  Salad
} from 'lucide-react';
import { Meal, MealTime, UserProfile } from '../types';
import { DEFAULT_MEALS, NUTRITION_RULES } from '../data/nutrition';

interface NutritionSectionProps {
  profile: UserProfile;
  mealsEaten: string[];
  toggleMeal: (mealId: string) => void;
  customMeals: Meal[];
  addCustomMeal: (meal: Omit<Meal, 'id' | 'isEaten'>) => void;
  removeCustomMeal: (mealId: string) => void;
}

export default function NutritionSection({ 
  profile,
  mealsEaten, 
  toggleMeal, 
  customMeals, 
  addCustomMeal,
  removeCustomMeal
}: NutritionSectionProps) {
  
  const [expandedMealId, setExpandedMealId] = useState<string | null>(null);
  const [isAddingMeal, setIsAddingMeal] = useState(false);
  
  // Custom Meal Form State
  const [newMealName, setNewMealName] = useState('');
  const [newMealTime, setNewMealTime] = useState<MealTime>('Snek 1');
  const [newMealCalories, setNewMealCalories] = useState(250);
  const [newMealProtein, setNewMealProtein] = useState(20);
  const [newMealCarbs, setNewMealCarbs] = useState(25);
  const [newMealFats, setNewMealFats] = useState(8);
  const [newMealIngredients, setNewMealIngredients] = useState('');
  const [newMealRecipe, setNewMealRecipe] = useState('');

  // Merge default meals with any custom ones
  const allMeals = [...DEFAULT_MEALS];
  
  // Apply overrides or additions from customMeals
  customMeals.forEach(custom => {
    const defaultIdx = allMeals.findIndex(m => m.id === custom.id || (m.time === custom.time && !customMeals.find(x => x.id === m.id)));
    if (defaultIdx !== -1) {
      allMeals[defaultIdx] = custom; // substitute
    } else {
      allMeals.push(custom);
    }
  });

  // Calculate eaten vs target totals
  const targets = { 
    calories: profile.targetCalories || 2000, 
    protein: profile.targetProtein || 140, 
    carbs: profile.targetCarbs || 220, 
    fats: profile.targetFats || 60 
  };
  
  const eatenTotals = allMeals.reduce((totals, meal) => {
    if (mealsEaten.includes(meal.id)) {
      totals.calories += meal.calories;
      totals.protein += meal.protein;
      totals.carbs += meal.carbs;
      totals.fats += meal.fats;
    }
    return totals;
  }, { calories: 0, protein: 0, carbs: 0, fats: 0 });

  const handleAddMealSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMealName.trim()) return;

    addCustomMeal({
      time: newMealTime,
      name: newMealName,
      protein: Number(newMealProtein),
      carbs: Number(newMealCarbs),
      fats: Number(newMealFats),
      calories: Number(newMealCalories),
      ingredients: newMealIngredients ? newMealIngredients.split(',').map(i => i.trim()) : ['Sog\'lom masalliqlar'],
      recipe: newMealRecipe || 'Ushbu taomni belgilangan vaqtda oson tayyorlab iste\'mol qiling.'
    });

    // Reset Form
    setNewMealName('');
    setNewMealIngredients('');
    setNewMealRecipe('');
    setIsAddingMeal(false);
  };

  return (
    <div className="space-y-6" id="nutrition_section_tab">
      
      {/* Title block */}
      <div>
        <h2 className="text-xl font-black text-white flex items-center gap-2 uppercase tracking-tight italic">
          <Utensils className="h-5 w-5 text-[#a3e635]" />
          Kunlik 5 Mahal Sog'lom Ovqatlanish Rejasi
        </h2>
        <p className="text-zinc-400 text-xs mt-0.5">
          Dumbbell mashqlari bilan birga tana mushaklarini anabolik holatda saqlash uchun 5 martalik oqsilli parhez.
        </p>
      </div>

      {/* Nutritional Targets progress dashboard */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 shadow-sm space-y-4">
        <h3 className="text-xs font-black text-zinc-500 tracking-widest uppercase flex items-center gap-1.5">
          <Flame className="h-4 w-4 text-[#a3e635]" />
          Bugungi ozuqa moddalari (Makronutrientlar) balansi
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          
          {/* Calories progress */}
          <div className="bg-zinc-950 p-4 rounded-2xl border border-zinc-800/80">
            <div className="text-[10px] font-black tracking-wider text-zinc-500 uppercase">KUKUN (Kaloriyalar)</div>
            <div className="text-xl font-mono font-black text-white mt-1">
              {eatenTotals.calories} <span className="text-xs font-bold text-zinc-500">/ {targets.calories} kkal</span>
            </div>
            <div className="w-full bg-zinc-900 h-1.5 rounded-full mt-2.5 overflow-hidden">
              <div 
                className="bg-[#a3e635] h-full rounded-full transition-all duration-500" 
                style={{ width: `${Math.min((eatenTotals.calories / targets.calories) * 100, 100)}%` }} 
              />
            </div>
          </div>

          {/* Protein progress */}
          <div className="bg-zinc-950 p-4 rounded-2xl border border-zinc-800/80">
            <div className="text-[10px] font-black tracking-wider text-zinc-500 uppercase flex items-center gap-1">
              <Heart className="h-3 w-3 text-[#a3e635]" /> PROTEIN (Oqsil)
            </div>
            <div className="text-xl font-mono font-black text-white mt-1">
              {eatenTotals.protein}g <span className="text-xs font-bold text-zinc-500">/ {targets.protein}g</span>
            </div>
            <div className="w-full bg-zinc-900 h-1.5 rounded-full mt-2.5 overflow-hidden">
              <div 
                className="bg-[#a3e635] h-full rounded-full transition-all duration-500" 
                style={{ width: `${Math.min((eatenTotals.protein / targets.protein) * 100, 100)}%` }} 
              />
            </div>
          </div>

          {/* Carbs progress */}
          <div className="bg-zinc-950 p-4 rounded-2xl border border-zinc-800/80">
            <div className="text-[10px] font-black tracking-wider text-zinc-500 uppercase">CARBS (Uglevod)</div>
            <div className="text-xl font-mono font-black text-white mt-1">
              {eatenTotals.carbs}g <span className="text-xs font-bold text-zinc-500">/ {targets.carbs}g</span>
            </div>
            <div className="w-full bg-zinc-900 h-1.5 rounded-full mt-2.5 overflow-hidden">
              <div 
                className="bg-[#a3e635] h-full rounded-full transition-all duration-500" 
                style={{ width: `${Math.min((eatenTotals.carbs / targets.carbs) * 100, 100)}%` }} 
              />
            </div>
          </div>

          {/* Fats progress */}
          <div className="bg-zinc-950 p-4 rounded-2xl border border-zinc-800/80">
            <div className="text-[10px] font-black tracking-wider text-zinc-500 uppercase">FATS (Yog'lar)</div>
            <div className="text-xl font-mono font-black text-white mt-1">
              {eatenTotals.fats}g <span className="text-xs font-bold text-zinc-500">/ {targets.fats}g</span>
            </div>
            <div className="w-full bg-zinc-900 h-1.5 rounded-full mt-2.5 overflow-hidden">
              <div 
                className="bg-[#a3e635] h-full rounded-full transition-all duration-500" 
                style={{ width: `${Math.min((eatenTotals.fats / targets.fats) * 100, 100)}%` }} 
              />
            </div>
          </div>

        </div>
      </div>

      {/* Main Meal Planner List */}
      <div className="space-y-3.5">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-black text-zinc-500 tracking-widest uppercase">
            5 ta munosib ovqat va sneklar
          </h3>
          <button
            onClick={() => setIsAddingMeal(!isAddingMeal)}
            className="text-[10px] font-black text-black bg-[#a3e635] border border-[#a3e635]/20 px-4 py-2 rounded-xl flex items-center gap-1 hover:bg-[#a3e635]/90 transition-all cursor-pointer uppercase tracking-wider"
          >
            <Plus className="h-3.5 w-3.5 stroke-[3px]" />
            <span>Taom almashtirish / qo'shish</span>
          </button>
        </div>

        {/* Custom meal adding form */}
        {isAddingMeal && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 space-y-4 shadow-lg"
          >
            <h4 className="text-sm font-black text-white flex items-center gap-1.5 uppercase tracking-tight italic">
              <Salad className="h-4 w-4 text-[#a3e635]" />
              Sizga mos yangi taomni kiriting
            </h4>
            <form onSubmit={handleAddMealSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Meal Name */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-zinc-500 uppercase tracking-wide">Taom nomi</label>
                  <input 
                    type="text" 
                    placeholder="Masalan: Tovuqli salat yoki Oqsilli kokteyl"
                    value={newMealName}
                    onChange={(e) => setNewMealName(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-2 px-3 text-xs text-zinc-200 focus:outline-none focus:border-[#a3e635]"
                    required
                  />
                </div>
                
                {/* Meal Time select */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-zinc-500 uppercase tracking-wide">Qaysi mahal iste'mol qilinadi</label>
                  <select
                    value={newMealTime}
                    onChange={(e) => setNewMealTime(e.target.value as MealTime)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-2 px-3 text-xs text-zinc-200 focus:outline-none focus:border-[#a3e635]"
                  >
                    <option value="Nonushta">Nonushta</option>
                    <option value="Snek 1">Snek 1 (1-Tushlik)</option>
                    <option value="Tushlik">Tushlik</option>
                    <option value="Snek 2">Snek 2 (2-Tushlik)</option>
                    <option value="Kechki ovqat">Kechki ovqat</option>
                  </select>
                </div>
              </div>

              {/* Macros grid */}
              <div className="grid grid-cols-4 gap-2.5">
                <div className="space-y-1">
                  <label className="text-[9px] font-black text-zinc-500 uppercase tracking-wide">Kkal</label>
                  <input 
                    type="number" 
                    value={newMealCalories}
                    onChange={(e) => setNewMealCalories(Number(e.target.value))}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-2 px-2.5 text-xs text-zinc-200 font-mono focus:outline-none focus:border-[#a3e635]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-black text-zinc-500 uppercase tracking-wide">Oqsil (g)</label>
                  <input 
                    type="number" 
                    value={newMealProtein}
                    onChange={(e) => setNewMealProtein(Number(e.target.value))}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-2 px-2.5 text-xs text-zinc-200 font-mono focus:outline-none focus:border-[#a3e635]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-black text-zinc-500 uppercase tracking-wide">Uglevod (g)</label>
                  <input 
                    type="number" 
                    value={newMealCarbs}
                    onChange={(e) => setNewMealCarbs(Number(e.target.value))}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-2 px-2.5 text-xs text-zinc-200 font-mono focus:outline-none focus:border-[#a3e635]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-black text-zinc-500 uppercase tracking-wide">Yog' (g)</label>
                  <input 
                    type="number" 
                    value={newMealFats}
                    onChange={(e) => setNewMealFats(Number(e.target.value))}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-2 px-2.5 text-xs text-zinc-200 font-mono focus:outline-none focus:border-[#a3e635]"
                  />
                </div>
              </div>

              {/* Ingredients & Preparation info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-zinc-500 uppercase tracking-wide">Masalliqlar (vergul bilan ajrating)</label>
                  <textarea 
                    placeholder="Masalan: 100g tovuq go'shti, 1 ta bodring, ko'katlar"
                    value={newMealIngredients}
                    onChange={(e) => setNewMealIngredients(e.target.value)}
                    className="w-full h-16 bg-zinc-950 border border-zinc-800 rounded-xl p-2.5 text-xs text-zinc-200 focus:outline-none focus:border-[#a3e635] resize-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-zinc-500 uppercase tracking-wide">Tayyorlash yoki ovqatlanish usuli</label>
                  <textarea 
                    placeholder="Masalan: Barcha sabzavotlarni to'g'rab, tovuq bilan aralashtiring."
                    value={newMealRecipe}
                    onChange={(e) => setNewMealRecipe(e.target.value)}
                    className="w-full h-16 bg-zinc-950 border border-zinc-800 rounded-xl p-2.5 text-xs text-zinc-200 focus:outline-none focus:border-[#a3e635] resize-none"
                  />
                </div>
              </div>

              <div className="flex gap-2.5 justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddingMeal(false)}
                  className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-xs text-zinc-400 font-bold rounded-xl transition-all cursor-pointer"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#a3e635] hover:bg-[#a3e635]/90 text-black text-xs font-black rounded-xl transition-all cursor-pointer uppercase tracking-wider text-[10px]"
                >
                  Taomni Saqlash
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {/* Dynamic Meal List Rendering */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {allMeals.map((meal) => {
            const isChecked = mealsEaten.includes(meal.id);
            const isExpanded = expandedMealId === meal.id;
            const isCustom = meal.id.startsWith('custom_');

            return (
              <div 
                key={meal.id}
                className={`rounded-3xl border transition-all duration-300 overflow-hidden flex flex-col justify-between ${
                  isChecked 
                    ? 'bg-[#a3e635]/5 border-lime-500/20' 
                    : isExpanded 
                      ? 'bg-zinc-900 border-zinc-750 shadow-md' 
                      : 'bg-zinc-900 border-zinc-800 hover:border-zinc-750'
                }`}
              >
                {/* Header Information */}
                <div className="p-5 flex gap-4 items-start">
                  
                  {/* Circle Checkbox Button */}
                  <button 
                    onClick={() => toggleMeal(meal.id)}
                    className={`h-11 w-11 flex-shrink-0 rounded-full flex items-center justify-center transition-all ${
                      isChecked 
                        ? 'bg-[#a3e635]/20 border border-[#a3e635] text-[#a3e635]' 
                        : 'bg-zinc-950/80 border border-zinc-800 hover:border-zinc-700 text-zinc-550'
                    }`}
                  >
                    <CheckCircle2 className="h-6 w-6" fill={isChecked ? "#a3e635" : "none"} />
                  </button>

                  <div className="flex-1 min-w-0 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-black text-[#a3e635] bg-[#a3e635]/10 border border-[#a3e635]/20 px-2.5 py-0.5 rounded uppercase tracking-wider">
                        {meal.time}
                      </span>
                      {isCustom && (
                        <button 
                          onClick={() => removeCustomMeal(meal.id)}
                          className="text-zinc-500 hover:text-red-400 transition-colors"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      )}
                    </div>

                    <h3 className={`text-sm font-bold truncate ${isChecked ? 'line-through text-zinc-500' : 'text-white font-black'}`}>
                      {meal.name}
                    </h3>

                    {/* Quick macros stats */}
                    <div className="flex items-center gap-2.5 text-xs font-mono text-zinc-400 mt-1">
                      <span className="text-zinc-200 font-bold">{meal.calories} kkal</span>
                      <span>•</span>
                      <span>Prot: <span className="text-[#a3e635] font-black">{meal.protein}g</span></span>
                      <span>•</span>
                      <span>Uglevod: {meal.carbs}g</span>
                    </div>
                  </div>
                </div>

                {/* Expanded Details Accordion */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="border-t border-zinc-800 bg-zinc-950/40"
                    >
                      <div className="p-5 space-y-4 text-xs">
                        
                        {/* Ingredients */}
                        <div className="space-y-1.5">
                          <h4 className="font-bold text-white uppercase tracking-wider text-[10px]">🥗 Kerakli masalliqlar:</h4>
                          <ul className="list-disc pl-4 space-y-1 text-zinc-400">
                            {meal.ingredients.map((ing, idx) => (
                              <li key={idx}>{ing}</li>
                            ))}
                          </ul>
                        </div>

                        {/* Recipe steps */}
                        <div className="space-y-1.5">
                          <h4 className="font-bold text-[#a3e635] uppercase tracking-wider text-[10px]">🍳 Tayyorlash usuli va maslahatlar:</h4>
                          <p className="text-zinc-400 leading-relaxed font-sans">{meal.recipe}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Footer Expand Action Row */}
                <div className="border-t border-zinc-800 px-4 py-2 bg-zinc-950/20 flex items-center justify-between text-xs">
                  <button
                    onClick={() => setExpandedMealId(isExpanded ? null : meal.id)}
                    className="text-zinc-455 hover:text-white font-bold py-1.5 flex items-center gap-1 cursor-pointer"
                  >
                    {isExpanded ? (
                      <>
                        <span>Retseptni yopish</span>
                        <ChevronUp className="h-3.5 w-3.5 text-[#a3e635]" />
                      </>
                    ) : (
                      <>
                        <span>Retsept va tayyorlanishini o'qish</span>
                        <ChevronDown className="h-3.5 w-3.5 text-[#a3e635]" />
                      </>
                    )}
                  </button>
                  
                  <span className="text-[10px] text-zinc-600 font-mono uppercase tracking-wider">5-ovqat rejasidan biri</span>
                </div>

              </div>
            );
          })}
        </div>
      </div>

      {/* Strategic nutrition guide for bodybuilders */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 shadow-sm space-y-4">
        <h3 className="text-sm font-black text-white flex items-center gap-1.5 uppercase tracking-wider italic">
          <Apple className="h-4 w-4 text-[#a3e635]" />
          Gantel sportchilari uchun ovqatlanish qoidalari
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {NUTRITION_RULES.map((rule, idx) => (
            <div key={idx} className="bg-zinc-950/50 p-4 rounded-2xl border border-zinc-850 flex gap-3 items-start">
              <div className="h-6 w-6 rounded-full bg-[#a3e635]/10 border border-[#a3e635]/20 flex items-center justify-center text-[#a3e635] font-black text-xs flex-shrink-0 italic">
                {idx + 1}
              </div>
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-white uppercase tracking-wide">{rule.title}</h4>
                <p className="text-zinc-400 leading-relaxed text-[11px]">{rule.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
