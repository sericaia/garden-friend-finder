
export interface Vegetable {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
  companions: string[]; // vegetable ids that grow well together
  antagonists: string[]; // vegetable ids that should not be planted together
}

export const vegetables: Vegetable[] = [
  {
    id: "tomato",
    name: "Tomato",
    icon: "🍅",
    color: "garden-tomato",
    description: "Versatile fruit often grown as a vegetable. Needs full sun and regular watering.",
    companions: ["basil", "onion", "carrot", "marigold", "lettuce"],
    antagonists: ["potato", "fennel", "cabbage"]
  },
  {
    id: "carrot",
    name: "Carrot",
    icon: "🥕",
    color: "garden-carrot",
    description: "Root vegetable that prefers loose soil and cool weather.",
    companions: ["tomato", "onion", "lettuce", "pea", "radish"],
    antagonists: ["dill", "parsnip"]
  },
  {
    id: "lettuce",
    name: "Lettuce",
    icon: "🥬",
    color: "garden-lettuce",
    description: "Leafy green that grows quickly. Prefers partial shade in hot weather.",
    companions: ["carrot", "radish", "cucumber", "strawberry"],
    antagonists: ["broccoli"]
  },
  {
    id: "cucumber",
    name: "Cucumber",
    icon: "🥒",
    color: "garden-cucumber",
    description: "Vining plant that needs space to spread or a trellis to climb.",
    companions: ["bean", "corn", "pea", "radish", "lettuce"],
    antagonists: ["potato", "herbs"]
  },
  {
    id: "pepper",
    name: "Pepper",
    icon: "🌶️",
    color: "garden-pepper",
    description: "Warm-season crop that enjoys full sun and well-drained soil.",
    companions: ["tomato", "basil", "onion", "carrot"],
    antagonists: ["fennel", "kohlrabi"]
  },
  {
    id: "onion",
    name: "Onion",
    icon: "🧅",
    color: "garden-onion",
    description: "Bulbous vegetable that keeps many pests away from the garden.",
    companions: ["tomato", "carrot", "pepper", "strawberry"],
    antagonists: ["bean", "pea"]
  },
  {
    id: "bean",
    name: "Bean",
    icon: "🫛",
    color: "garden-bean",
    description: "Nitrogen-fixing plant that improves soil quality.",
    companions: ["cucumber", "corn", "radish", "potato"],
    antagonists: ["onion", "garlic", "fennel"]
  },
  {
    id: "corn",
    name: "Corn",
    icon: "🌽",
    color: "garden-bean",
    description: "Tall grass that provides shade and support for other plants.",
    companions: ["bean", "cucumber", "pumpkin", "squash"],
    antagonists: ["tomato"]
  },
  {
    id: "basil",
    name: "Basil",
    icon: "🌿",
    color: "garden-foliage",
    description: "Aromatic herb that improves the flavor of tomatoes.",
    companions: ["tomato", "pepper", "oregano"],
    antagonists: ["rue"]
  },
  {
    id: "marigold",
    name: "Marigold",
    icon: "🌼",
    color: "accent",
    description: "Flowering plant that deters many garden pests.",
    companions: ["tomato", "pepper", "squash", "cucumber"],
    antagonists: []
  }
];

export function getVegetableById(id: string): Vegetable | undefined {
  return vegetables.find(veg => veg.id === id);
}

export function checkCompanionship(veg1Id: string, veg2Id: string): "good" | "bad" | "neutral" {
  const veg1 = getVegetableById(veg1Id);
  const veg2 = getVegetableById(veg2Id);
  
  if (!veg1 || !veg2) return "neutral";
  
  if (veg1.companions.includes(veg2.id)) return "good";
  if (veg1.antagonists.includes(veg2.id)) return "bad";
  
  return "neutral";
}
