// بيانات تجريبية لحالات Figma؛ تُستبدل باستجابة خدمة التقييم عند توفرها.
// درجات الدورات السابقة تقريبية، محوّلة من نسب الأعمدة في التصميم إلى مقياس 100.
export const evaluationDimensions = [
  { key: "quality", label: "الجودة التقنية", color: "#245173" },
  { key: "innovation", label: "الابتكار", color: "#7C3AED" },
  { key: "market", label: "الجدوى السوقية", color: "#2F8F6F" },
  { key: "team", label: "اكتمال الفريق", color: "#B8862E" },
  { key: "documentation", label: "التوثيق", color: "#C4453A" },
];

export const evaluationHistory = [
  {
    id: "2025-07-15",
    date: "15 يوليو 2025",
    label: "15 يوليو",
    score: 60,
    difference: 5,
    scores: [16, 23, 10, 32, 3],
  },
  {
    id: "2025-08-01",
    date: "1 أغسطس 2025",
    label: "1 أغسطس",
    score: 65,
    difference: 3,
    scores: [26, 36, 28, 39, 25],
  },
  {
    id: "2025-08-15",
    date: "15 أغسطس 2025",
    label: "15 أغسطس",
    score: 68,
    difference: 5,
    scores: [36, 50, 47, 46, 48],
  },
  {
    id: "2025-09-01",
    date: "1 سبتمبر 2025",
    label: "1 سبتمبر",
    score: 73,
    difference: 5,
    scores: [46, 63, 66, 53, 70],
  },
  {
    id: "2025-09-15",
    date: "15 سبتمبر 2025",
    label: "15 سبتمبر",
    score: 78,
    difference: null,
    scores: [85, 72, 64, 90, 80],
  },
];

export const firstEvaluation = { ...evaluationHistory[4], difference: null };
export const evaluationCooldown = (6 * 60 + 20) * 60;
