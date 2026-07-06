import { UserProfile } from './types';

/**
 * Calculates user's daily calorie and macronutrient targets based on physical parameters.
 * Uses the scientific Harris-Benedict BMR equation & physical activity multipliers.
 */
export function calculateNutritionTargets(params: {
  weight: number;
  height: number;
  age: number;
  gender: 'Erkak' | 'Ayol';
  activityLevel: 'Past' | 'O\'rtacha' | 'Faol';
  targetWeight: number;
}) {
  const { weight, height, age, gender, activityLevel, targetWeight } = params;

  // 1. Calculate Basal Metabolic Rate (BMR)
  let bmr = 0;
  if (gender === 'Erkak') {
    bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
  } else {
    bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
  }

  // 2. Apply Physical Activity Level Multiplier
  let activityMultiplier = 1.375;
  if (activityLevel === 'Past') activityMultiplier = 1.2;
  if (activityLevel === 'O\'rtacha') activityMultiplier = 1.45;
  if (activityLevel === 'Faol') activityMultiplier = 1.725;

  const tdee = bmr * activityMultiplier;

  // 3. Determine Goal, Calorie Deficit/Surplus
  let calories = Math.round(tdee);
  let goal: 'Mushak massasi' | 'Ozish' | 'Sog\'lom hayot' = 'Sog\'lom hayot';

  if (targetWeight > weight) {
    goal = 'Mushak massasi';
    calories = Math.round(tdee + 350); // Surplus to build muscle
  } else if (targetWeight < weight) {
    goal = 'Ozish';
    calories = Math.round(tdee - 450); // Deficit to lose fat
  }

  // 4. Calculate Macronutrients
  // Protein: ~2g per kg bodyweight for gain/loss, 1.8g for maintenance
  const proteinMultiplier = goal === 'Sog\'lom hayot' ? 1.8 : 2.1;
  const protein = Math.round(weight * proteinMultiplier);
  
  // Fats: ~25% of total calorie intake (9 kcal per gram of fat)
  const fats = Math.round((calories * 0.25) / 9);
  
  // Carbs: Remainder of calorie intake (4 kcal per gram of carb)
  const carbs = Math.round((calories - (protein * 4) - (fats * 9)) / 4);

  return {
    goal,
    calories,
    protein,
    carbs,
    fats
  };
}
