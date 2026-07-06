export type MuscleGroup = 'Ko\'krak' | 'Orqa' | 'Yelka' | 'Oyoqlar' | 'Qo\'llar' | 'Press';

export interface Exercise {
  id: string;
  name: string;
  target: MuscleGroup;
  sets: number;
  reps: string; // e.g. "10-12" or "12-15"
  difficulty: 'Boshlovchi' | 'O\'rta' | 'Professional';
  instructions: string[];
  tips: string[];
  breathing: string;
  imageType: string; // Used to select the custom vector illustration
  caloriesBurnedPerSet: number;
}

export type MealTime = 'Nonushta' | 'Snek 1' | 'Tushlik' | 'Snek 2' | 'Kechki ovqat';

export interface Meal {
  id: string;
  time: MealTime;
  name: string;
  protein: number; // grams
  carbs: number; // grams
  fats: number; // grams
  calories: number; // kcal
  ingredients: string[];
  recipe: string;
  isEaten: boolean;
}

export interface DailyLog {
  date: string; // YYYY-MM-DD
  completedExercises: { [exerciseId: string]: number }; // exerciseId -> completed sets count
  mealsEaten: string[]; // meal IDs that are checked off
  waterIntake: number; // in ml (e.g., 2500)
  weight: number; // user weight on that day
}

export interface UserProfile {
  name: string;
  lastName?: string;
  age?: number;
  birthDate?: string;
  weight: number;
  targetWeight: number;
  height: number;
  gender: 'Erkak' | 'Ayol';
  activityLevel: 'Past' | 'O\'rtacha' | 'Faol';
  goal: 'Mushak massasi' | 'Ozish' | 'Sog\'lom hayot';
  targetCalories?: number;
  targetProtein?: number;
  targetCarbs?: number;
  targetFats?: number;
}
