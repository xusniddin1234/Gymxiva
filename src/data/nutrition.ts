import { Meal } from '../types';

export const DEFAULT_MEALS: Meal[] = [
  {
    id: 'meal_breakfast',
    time: 'Nonushta',
    name: 'Tuxum va Suli Bo\'tqasi (Oatmeal)',
    protein: 30,
    carbs: 55,
    fats: 14,
    calories: 466,
    ingredients: [
      '3 ta tuxum (2 tasi butun, 1 tasining faqat oqi)',
      '60g suli yormasi (ovsyanka)',
      '1 stakan kam yog\'li sut',
      '1 choy qoshiq asal',
      'Yarimta banan'
    ],
    recipe: 'Suli yormasini sutda pishiring, unga asal va to\'g\'ralgan banan qo\'shing. Tuxumlarni qaynatib yoki minimal yog\'da qovurib tayyorlang. Ushbu nonushta mushaklar uchun uzoq muddatli energiya va birinchi oqsillarni beradi.',
    isEaten: false
  },
  {
    id: 'meal_snack1',
    time: 'Snek 1',
    name: 'Tvorogli Mevali Snek',
    protein: 25,
    carbs: 20,
    fats: 8,
    calories: 252,
    ingredients: [
      '150g kam yog\'li tvorog (yog\'liligi 1-5%)',
      '1 hovuch yong\'oq yoki bodom (20g)',
      '1 ta olma yoki kivi'
    ],
    recipe: 'Tvorogni idishga solib, ustiga to\'g\'ralgan mevalarni va maydalangan bodomni qo\'shing. Bu snek ish yoki o\'qish paytida mushaklarni oziqlantiruvchi sekin so\'riluvchi kazein oqsiliga boy.',
    isEaten: false
  },
  {
    id: 'meal_lunch',
    time: 'Tushlik',
    name: 'Tovuq Filesi, Guruch va Sabzavotlar',
    protein: 42,
    carbs: 65,
    fats: 10,
    calories: 518,
    ingredients: [
      '150g tovuq filesi (ko\'krak go\'shti)',
      '80g quruq guruch (pishganda ~200g)',
      '100g yangi pishgan sabzavotlar (brokoli, bodring, pomidor)',
      '1 osh qoshiq zaytun yog\'i'
    ],
    recipe: 'Guruchni suvda qaynatib oling. Tovuq filesini tuz va ziravorlar bilan grilda yoki qaynatib tayyorlang. Tayyor guruch va go\'shtni sabzavotlar bilan birga zaytun yog\'i quyib dasturxonga torting.',
    isEaten: false
  },
  {
    id: 'meal_snack2',
    time: 'Snek 2',
    name: 'Banan va Grek Yogurti / Protein Kokteyli',
    protein: 18,
    carbs: 35,
    fats: 4,
    calories: 248,
    ingredients: [
      '200g tabiiy grek yogurti yoki 1 porsiya protein kukuni',
      '1 ta katta banan',
      '1 ta qaynatilgan tuxum oqi'
    ],
    recipe: 'Tushlik va kechki ovqat orasidagi bu snek mashg\'ulot oldidan energiya (glyukogen) zahiralarini to\'ldirish uchun xizmat qiladi. Banan tarkibidagi kaliy mushaklar qisqarishi (gantel ko\'tarish) uchun juda muhim.',
    isEaten: false
  },
  {
    id: 'meal_dinner',
    time: 'Kechki ovqat',
    name: 'Baliq yoki Mol Go\'shti va Yangi Salat',
    protein: 35,
    carbs: 15,
    fats: 12,
    calories: 308,
    ingredients: [
      '150g dumbasiz mol go\'shti yoki lahm baliq go\'shti',
      'Katta idishda yangi ko\'katlar va sabzavotlar salati',
      'Yarimta avokado'
    ],
    recipe: 'Baliq yoki mol go\'shtini duxovkada yoki tovada dimlab pishiring. Salat uchun karam, pomidor, bodring, ismaloq va avokadoni to\'g\'rab, ozgina limon suvi bilan aralashtiring. Kechki ovqatda uglevod kam va oqsil yuqori bo\'lishi tunda mushak tiklanishini tezlashtiradi.',
    isEaten: false
  }
];

export const NUTRITION_RULES = [
  {
    title: 'Har 3 soatda oziqlanish',
    desc: 'Kuniga 5 mahal ovqatlanish anabolizmni (mushak o\'sishini) yuqori darajada ushlab turadi va ochlik hissini yo\'qotadi.'
  },
  {
    title: 'Oqsil me\'yori',
    desc: 'Mushak o\'sishi uchun har kuni tana vazningizning har bir kilogrammiga 1.6 - 2.0 gramm oqsil (protein) iste\'mol qiling.'
  },
  {
    title: 'Suv muvozanati',
    desc: 'Gantel bilan mashq qilganda tana suv yo\'qotadi. Kuniga kamida 2.5 - 3 litr toza suv ichishni odat qiling.'
  },
  {
    title: 'Uglevodlar va energiya',
    desc: 'Murakkab uglevodlar (guruch, suli, grechka) mashg\'ulotda og\'ir gantellarni ko\'tarish uchun kerak bo\'lgan asosiy kuch-quvvat manbaidir.'
  }
];
