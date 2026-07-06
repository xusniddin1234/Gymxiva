import { Exercise } from '../types';

export const EXERCISES: Exercise[] = [
  // --- KO'KRAK (CHEST) ---
  {
    id: 'chest_floor_press',
    name: 'Pol ustida gantel press (Floor Press)',
    target: 'Ko\'krak',
    sets: 4,
    reps: '10-12',
    difficulty: 'Boshlovchi',
    instructions: [
      'Gantellarni qo\'lga olib, polga chalqancha yoting.',
      'Tizzalaringizni buking va oyoqlaringizni polga mahkam bosing.',
      'Tirsaklaringizni 45 daraja burchak ostida ushlang (tanaga parallel emas, perpendikulyar ham emas).',
      'Gantellarni ko\'krak darajasidan tepaga, qo\'llaringiz to\'liq to\'g\'rilangunicha ko\'taring.',
      'Tepada ko\'krak mushaklarini 1 soniya davomida siqing, so\'ngra sekin tirsaklar polga tekkunicha tushiring.'
    ],
    tips: [
      'Tirsaklarni keskin yerga urib yubormang, harakatni nazorat qiling.',
      'Yelkangizni polga mahkam bosib turing.'
    ],
    breathing: 'Ko\'tarishda nafas chiqaring (uf deb), tushirishda chuqur nafas oling.',
    imageType: 'chest_press',
    caloriesBurnedPerSet: 12
  },
  {
    id: 'chest_floor_fly',
    name: 'Pol ustida gantellar razvodkasi (Floor Flyes)',
    target: 'Ko\'krak',
    sets: 4,
    reps: '12-15',
    difficulty: 'O\'rta',
    instructions: [
      'Chalqancha yotgan holda, gantellarni to\'g\'ri ko\'kragingiz ustida ushlang, kaftlaringiz bir-biriga qarasin.',
      'Tirsaklaringizni ozgina bukilgan holatda qotiring (hech qachon to\'liq qotib qolmasin).',
      'Qo\'llaringizni yonga yarim doira shaklida sekin oching.',
      'Tirsaklaringiz yerga tegar-tegmas holatga kelganda to\'xtang va ko\'krak mushaklari cho\'zilishini his qiling.',
      'Ko\'krak kuchi bilan qo\'llarni dastlabki holatga qaytaring va tepada gantellarni birlashtiring.'
    ],
    tips: [
      'Harakat xuddi katta daraxtni quchoqlashga o\'xshash bo\'lishi kerak.',
      'Tirsak burchagini harakat davomida o\'zgartirmang.'
    ],
    breathing: 'Qo\'llarni yopishda nafas chiqaring, ochishda nafas oling.',
    imageType: 'chest_fly',
    caloriesBurnedPerSet: 10
  },
  {
    id: 'chest_pullover',
    name: 'Gantelli Pullover (Ko\'krak va orqa kengaytirish)',
    target: 'Ko\'krak',
    sets: 3,
    reps: '12',
    difficulty: 'O\'rta',
    instructions: [
      'Polga chalqancha yoting, bitta gantelni ikki qo\'llab tepadagi disk qismidan ushlang.',
      'Gantelni to\'g\'ri ko\'kragingiz ustiga ko\'taring.',
      'Tirsaklarni ozgina bukib, gantelni sekin bosh orqasiga polga tekkunicha tushiring.',
      'Ko\'krak va qovurg\'alar atrofidagi mushaklar cho\'zilishini sezasiz.',
      'Ko\'kragingiz kuchi bilan gantelni yana dastlabki holatiga qaytaring.'
    ],
    tips: [
      'Qorin mushaklarini tarang tuting, belingiz poldan juda uzilib ketmasin.',
      'Harakat tezligini juda past darajada ushlang.'
    ],
    breathing: 'Gantelni orqaga tushirishda nafas oling, yuqoriga ko\'tarishda chiqaring.',
    imageType: 'pullover',
    caloriesBurnedPerSet: 9
  },

  // --- ORQA (BACK) ---
  {
    id: 'back_bent_row',
    name: 'Gantellarni engashib tortish (Bent-Over Row)',
    target: 'Orqa',
    sets: 4,
    reps: '10-12',
    difficulty: 'O\'rta',
    instructions: [
      'Oyoqlarni yelka kengligida ochib turing, qo\'lda gantellar.',
      'Tizlarni ozgina bukib, tana qismini 45 daraja atrofida oldinga engashtiring.',
      'Belingizni qat\'iy ravishda tekis tuting, dumingizni orqaga chiqaring.',
      'Gantellarni pastga osiltiring, so\'ngra tirsaklarni orqaga qaratib, gantellarni qorin tomonga torting.',
      'Tortganda kuraklar bir-biriga tegishi kerak. Sekin pastga tushiring.'
    ],
    tips: [
      'Belingizni bukraytirib olmang, bu jarohatga olib kelishi mumkin.',
      'Kuchi qo\'ldan emas, balki orqa mushaklaridan oling.'
    ],
    breathing: 'Gantelni tortganda nafas chiqaring, tushirganda nafas oling.',
    imageType: 'back_row',
    caloriesBurnedPerSet: 14
  },
  {
    id: 'back_one_arm_row',
    name: 'Bir qo\'l bilan gantel tortish (Single-Arm Row)',
    target: 'Orqa',
    sets: 4,
    reps: '12 (har bir qo\'lga)',
    difficulty: 'Boshlovchi',
    instructions: [
      'Chap oyoqni oldinga qo\'yib, tizzani buking va chap qo\'l bilan tizzaga yoki stulga tayaning.',
      'O\'ng qo\'lda gantelni pastga osiltirib ushlang, orqa tekis bo\'lsin.',
      'Gantelni belingiz tomonga sekin torting, tirsakni tanaga yaqin tuting.',
      'Eng yuqori nuqtada orqa mushagini qisib ushlang va asta pastga tushiring.',
      'Kerakli marta bajargach, ikkinchi qo\'lga o\'ting.'
    ],
    tips: [
      'Gantelni yelkaga emas, balki cho\'ntak tomonga torting.',
      'Tana o\'ngga va chapga buralib ketmasin, parallel tursin.'
    ],
    breathing: 'Gantelni tortganda nafas chiqaring, tushirganda nafas oling.',
    imageType: 'one_arm_row',
    caloriesBurnedPerSet: 11
  },
  {
    id: 'back_deadlift',
    name: 'Gantelli Deadlift (Orqa va dumba kuchi)',
    target: 'Orqa',
    sets: 4,
    reps: '10',
    difficulty: 'O\'rta',
    instructions: [
      'Tik turing, gantellarni soningiz oldida ushlab turing.',
      'Orqangizni tekis tutgan holda, sonlarni orqaga surib engashing.',
      'Gantellarni oyoqlaringizga yaqin tutgan holda boldir o\'rtasigacha tushiring.',
      'Dumba va orqa bel mushaklarini ishga solib, qayta tik turing va tepada dumbani siqing.'
    ],
    tips: [
      'Dumbbellarni tanadan uzoqlashtirmang, ular oyoq bo\'ylab sirpanishi kerak.',
      'Bo\'yiningizni tepaga bukib yubormang, umurtqa bilan bir chiziqda bo\'lsin.'
    ],
    breathing: 'Pastga tushishda nafas oling, tik turishda nafas chiqaring.',
    imageType: 'deadlift',
    caloriesBurnedPerSet: 15
  },

  // --- YELKA (SHOULDERS) ---
  {
    id: 'shoulder_press',
    name: 'Gantellarni tepaga presslash (Shoulder Press)',
    target: 'Yelka',
    sets: 4,
    reps: '10-12',
    difficulty: 'Boshlovchi',
    instructions: [
      'Tik turing yoki stulga o\'tiring, orqa butunlay tekis.',
      'Gantellarni quloqlar darajasida ko\'taring, tirsaklar 90 daraja bukilsin.',
      'Gantellarni boshingiz ustiga to\'g\'ri yo\'nalishda press qiling, lekin tepadagi bo\'g\'imlarni to\'liq qulflamang.',
      'Sekin tirsaklarni dastlabki holatga tushiring.'
    ],
    tips: [
      'Gantellarni tepada bir-biriga urib ovoz chiqarmang.',
      'Belingizni orqaga haddan tashqari bukib yubormang (matiz qilmang).'
    ],
    breathing: 'Tepaga ko\'targanda nafas chiqaring, tushirganda nafas oling.',
    imageType: 'shoulder_press',
    caloriesBurnedPerSet: 11
  },
  {
    id: 'shoulder_lateral_raise',
    name: 'Gantellarni yonga ko\'tarish (Lateral Raises)',
    target: 'Yelka',
    sets: 4,
    reps: '12-15',
    difficulty: 'O\'rta',
    instructions: [
      'Tik turing, gantellarni yoningizda erkin osiltirib ushlang.',
      'Tirsaklarni ozgina bukib qotiring va qo\'llaringizni sekin ikki yonga ko\'taring.',
      'Qo\'llar polga parallel (yelka darajasi) bo\'lganda to\'xtang.',
      'Eng tepada yarim soniya ushlab, juda sekin pastga tushiring.'
    ],
    tips: [
      'Katta vazn ishlatib tanani siltamang, faqat yelka hisobiga ko\'taring.',
      'Kichik barmoq tepadagidek gantelni ozgina burchak ostida tuting.'
    ],
    breathing: 'Yonga ko\'tarishda nafas chiqaring, tushirishda oling.',
    imageType: 'shoulder_lateral',
    caloriesBurnedPerSet: 8
  },
  {
    id: 'shoulder_rear_fly',
    name: 'Engashib gantellarni yonga ko\'tarish (Rear Delt Flyes)',
    target: 'Yelka',
    sets: 3,
    reps: '12-15',
    difficulty: 'O\'rta',
    instructions: [
      'Oldinga deyarli parallel holatgacha engashing, orqa tekis bo\'lsin.',
      'Gantellarni pastga osiltiring, kaftlar bir-biriga qarasin.',
      'Tirsaklarni buralgan holda saqlab, gantellarni orqa va yonga qarab sekin ko\'taring.',
      'Yelkaning orqa qismi siqilishini his qiling va sekin tushiring.'
    ],
    tips: [
      'Bo\'yinni erkin qo\'ying, zo\'riqish orqa yelkada bo\'lsin.',
      'Vaznni to\'g\'ri tanlang, juda og\'ir bo\'lsa kuraklar ishga tushib ketadi.'
    ],
    breathing: 'Ko\'tarishda nafas chiqaring, tushirishda oling.',
    imageType: 'shoulder_rear',
    caloriesBurnedPerSet: 8
  },

  // --- OYOQLAR (LEGS) ---
  {
    id: 'legs_squat',
    name: 'Gantelli Squat (O\'tirib-turish)',
    target: 'Oyoqlar',
    sets: 4,
    reps: '12-15',
    difficulty: 'Boshlovchi',
    instructions: [
      'Tik turing, oyoqlar yelkadan kengroq, gantellarni yelkangiz ustida yoki yoningizda osiltirib ushlang.',
      'Dumbani orqaga surib, xuddi stulga o\'tirayotgandek pastga tushing.',
      'Tizzalaringiz oyoq uchi yo\'nalishida ochilsin, ichkariga qulab ketmasin.',
      'Soningiz polga parallel bo\'lguncha (yoki sal pastroq) o\'tiring.',
      'Oyoq tovonlariga og\'irlikni berib, qaytib tik turing.'
    ],
    tips: [
      'O\'tirganda tovoningiz poldan uzilmasin.',
      'Orqangizni doimo tik va ko\'kragingizni ochiq tuting.'
    ],
    breathing: 'Pastga tushishda chuqur nafas oling, ko\'tarilishda kuch bilan chiqaring.',
    imageType: 'legs_squat',
    caloriesBurnedPerSet: 16
  },
  {
    id: 'legs_goblet',
    name: 'Goblet Squat (Ko\'krakda bitta gantel bilan)',
    target: 'Oyoqlar',
    sets: 4,
    reps: '12',
    difficulty: 'Boshlovchi',
    instructions: [
      'Bitta gantelni vertikal holatda ko\'kragingiz oldida ikki qo\'llab mahkam ushlang.',
      'Tirsaklaringizni pastga qaratib turing.',
      'Oyoq uchlarini 15-30 daraja tashqariga ochgan holda chuqur squat qiling.',
      'Tirsaklaringiz tizzalaringizning ichki qismiga tekkunicha pastga o\'tiring.',
      'Tovon bilan polni depsinib tik turish holatiga qayting.'
    ],
    tips: [
      'Bu mashq belga yuklamani kamaytirib, sonni yaxshiroq rivojlantiradi.',
      'Pastda umurtqangiz yumaloq bo\'lib ketmasligiga e\'tibor bering.'
    ],
    breathing: 'Tushishda nafas oling, turishda nafas chiqaring.',
    imageType: 'legs_goblet',
    caloriesBurnedPerSet: 14
  },
  {
    id: 'legs_lunge',
    name: 'Gantellar bilan oldinga qadam tashlash (Lunges)',
    target: 'Oyoqlar',
    sets: 4,
    reps: '10 (har bir oyoqqa)',
    difficulty: 'O\'rta',
    instructions: [
      'Tik turing, ikki qo\'lda gantellar yoningizda osilib tursin.',
      'O\'ng oyoq bilan oldinga katta qadam tashlang va pastga tushing.',
      'O\'ng tizzangiz 90 daraja bukilsin va chap tizzangiz polga tegay deb tursin.',
      'Oldindagi oyoq tovoni bilan yerga depsinib dastlabki holatga qayting.',
      'Keyin chap oyoq bilan xuddi shunday qadam tashlang.'
    ],
    tips: [
      'Oldindagi tizza oyoq uchidan oldinga o\'tib ketmasin.',
      'Muvozanatni saqlash uchun gavdani tik tuting.'
    ],
    breathing: 'Qadam tashlab pastga tushganda nafas oling, orqaga qaytganda chiqaring.',
    imageType: 'legs_lunge',
    caloriesBurnedPerSet: 15
  },
  {
    id: 'legs_romanian',
    name: 'Rumyncha Deadlift (Son orqasi va dumba)',
    target: 'Oyoqlar',
    sets: 4,
    reps: '12',
    difficulty: 'O\'rta',
    instructions: [
      'Tik turing, gantellarni soningiz oldida ushlab turing, tizzalar juda ozgina bukilgan.',
      'Tizzalaringizni qo\'shimcha bukmay, sonlarni orqaga surgan holda oldinga egiling.',
      'Gantellarni oyoq bo\'ylab tushiring, tana polga parallel holatga kelganda to\'xtang (son orqasida kuchli cho\'zilish bo\'lishi kerak).',
      'Dumba mushaklarini qisish hisobiga qayta tik turing.'
    ],
    tips: [
      'Tizlarni bukib yuborsangiz, bu oddiy squatga aylanib qoladi.',
      'Belingizni sira bukmang, butun harakat son bo\'g\'imida bo\'lishi shart.'
    ],
    breathing: 'Egilishda nafas oling, tik turishda nafas chiqaring.',
    imageType: 'legs_romanian',
    caloriesBurnedPerSet: 13
  },

  // --- QO'LLAR (ARMS - BICEPS & TRICEPS) ---
  {
    id: 'arms_bicep_curl',
    name: 'Gantellarni bicepga ko\'tarish (Bicep Curls)',
    target: 'Qo\'llar',
    sets: 4,
    reps: '12',
    difficulty: 'Boshlovchi',
    instructions: [
      'Tik turing, gantellarni qo\'lingizda ushlang, kaftlar oldinga qarasin.',
      'Tirsaklaringizni tanangizga mahkam yopishtiring va qotiring.',
      'Tirsaklarni qimirlatmay, faqat bilakni bukib gantellarni yelka tomonga ko\'taring.',
      'Tepada bicepni qattiq siqing va sekin dastlabki holatga tushiring.'
    ],
    tips: [
      'Harakat davomida tirsaklar oldinga yoki orqaga qimirlamasligi shart.',
      'Gantelni tushirganda qo\'lni oxirigacha silliq cho\'zing.'
    ],
    breathing: 'Gantelni ko\'targanda nafas chiqaring, tushirganda oling.',
    imageType: 'arms_bicep',
    caloriesBurnedPerSet: 9
  },
  {
    id: 'arms_hammer_curl',
    name: 'Molot (Hammer) mashqi (Bicep va bilak qalinligi)',
    target: 'Qo\'llar',
    sets: 3,
    reps: '12-15',
    difficulty: 'Boshlovchi',
    instructions: [
      'Tik turing, gantellarni yoningizda ushlang, kaftlaringiz bir-biriga qarab tursin (neytral ushlam).',
      'Tirsaklarni qimirlatmasdan, gantellarni tepaga ko\'taring.',
      'Kaft burchagi o\'zgarmaydi, xuddi bolg\'a bilan urayotgandek holatda bo\'ladi.',
      'Tepada to\'xtab, sekin pastga tushiring.'
    ],
    tips: [
      'Bilak tashqi mushaklarini qalinlashtirish uchun eng zo\'r mashq.',
      'Tanangizni tebratib, inersiya bilan yordam bermang.'
    ],
    breathing: 'Ko\'tarishda nafas chiqaring, tushirishda nafas oling.',
    imageType: 'arms_hammer',
    caloriesBurnedPerSet: 9
  },
  {
    id: 'arms_overhead_ext',
    name: 'Bosh ortidan gantel press (Triceps)',
    target: 'Qo\'llar',
    sets: 4,
    reps: '12',
    difficulty: 'Boshlovchi',
    instructions: [
      'Tik turing yoki o\'tiring. Bitta og\'irroq gantelni ikki qo\'llab diskidan ushlang.',
      'Gantelni boshingiz ustiga to\'g\'ri ko\'taring.',
      'Tirsaklaringizni quloqlaringizga yaqin tutib, sekin gantelni bosh orqasiga buking.',
      'Tirsaklar 90 darajadan o\'tganda to\'xtating va triceps kuchi bilan qayta tepaga presslang.'
    ],
    tips: [
      'Tirsaklaringiz ikki yonga ochilib ketmasligiga harakat qiling.',
      'Boshni oldinga juda egib yubormang.'
    ],
    breathing: 'Tushirishda nafas oling, tepaga ko\'targanda chiqaring.',
    imageType: 'arms_tricep_overhead',
    caloriesBurnedPerSet: 9
  },
  {
    id: 'arms_kickback',
    name: 'Gantellarni orqaga tepish (Tricep Kickback)',
    target: 'Qo\'llar',
    sets: 3,
    reps: '12-15',
    difficulty: 'O\'rta',
    instructions: [
      'Tana qismini oldinga engashtiring, tirsaklaringizni tanaga yopishtirib tepaga ko\'taring (tirsak polga parallel bo\'lsin).',
      'Tirsak holatini qotirib, faqat tirsakdan bukib gantellarni orqaga to\'g\'rilang.',
      'Qo\'lingiz to\'liq tekis bo\'lganda triceps qattiq siqiladi.',
      'Sekin bilakni yana 90 darajaga qaytaring, tirsak tepada qolsin.'
    ],
    tips: [
      'Mashqni bajarishda yelkani silkitmang.',
      'Orqaga qaytarish soniyasini cho\'zing.'
    ],
    breathing: 'Orqaga to\'g\'rilaganda nafas chiqaring, bukkanda nafas oling.',
    imageType: 'arms_kickback',
    caloriesBurnedPerSet: 8
  },

  // --- PRESS (ABS) ---
  {
    id: 'abs_crunch',
    name: 'Gantel bilan Crunch (Qorin press)',
    target: 'Press',
    sets: 4,
    reps: '15-20',
    difficulty: 'Boshlovchi',
    instructions: [
      'Chalqancha yoting, tizzalarni buking. Bitta gantelni ko\'kragingiz ustida ikki qo\'llab mahkam ushlang.',
      'Yelkangiz va kuraklaringizni sekin poldan yuqoriga ko\'taring, qorinni qising.',
      'Belingiz poldan uzilmasligi kerak, faqat qovurg\'alar tos suyagi tomonga yaqinlashadi.',
      'Yuqorida 1 soniya qisib turing va sekin orqaga qayting.'
    ],
    tips: [
      'Bo\'yiningizni qo\'l bilan tortmang, zo\'riqish qorinda bo\'lsin.',
      'Gantelni sekin va nazorat ostida ushlang.'
    ],
    breathing: 'Tepaga ko\'tarilishda nafas chiqaring (qisganda), tushishda nafas oling.',
    imageType: 'abs_crunch',
    caloriesBurnedPerSet: 8
  },
  {
    id: 'abs_russian_twist',
    name: 'Gantelli Ruscha burilish (Yon presslar)',
    target: 'Press',
    sets: 3,
    reps: '20 (jami)',
    difficulty: 'O\'rta',
    instructions: [
      'Polga o\'tiring, tizlarni buking. Gavdani 45 daraja orqaga eging.',
      'Yaxshiroq natija uchun oyoqlaringizni poldan 5-10 sm ko\'tarib havoda tuting (yoki polga qo\'ying).',
      'Bitta gantelni ikki qo\'lda ushlab, gavdangizni o\'ngga va chapga sekin buring.',
      'Gantelni yonbosh polga yaqinlashtiring, qorin yon mushaklari burilishini his qiling.'
    ],
    tips: [
      'Tez-tez burilmasdan, har bir burilishni sifatli va chuqur qiling.',
      'Orqangizni juda bukmang.'
    ],
    breathing: 'Yonga burilganda nafas chiqaring, o\'rtaga kelganda oling.',
    imageType: 'abs_russian',
    caloriesBurnedPerSet: 9
  }
];
