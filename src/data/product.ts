import { Product } from "../types";

export const sampleProduct: Product = {
  id: 1,
  name: "Мишкa 'Плюшик'",
  price: 35,
  currency: "$",
  imageUrl: "/my-toy.png",
  description: "Невероятно мягкий и уютный плюшевый мишка, который станет лучшим другом для вашего ребенка. Сделан из гипоаллергенных материалов.",
  colors: [
    { name: "Brown", class: "bg-yellow-800" },
    { name: "Beige", class: "bg-amber-300" },
    { name: "Pink", class: "bg-pink-300" },
    { name: "White", class: "bg-gray-200" },
  ],
  rating: 4.8,
  reviewCount: 124,
};