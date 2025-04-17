
import { PhoneModel } from "../context/CaseCustomizerContext";

// List of available phone models for customization
export const phoneModels: PhoneModel[] = [
  {
    id: "iphone-13",
    brand: "Apple",
    model: "iPhone 13",
    image: "/phones/iphone-13.png", // Placeholder image path
    dimensions: {
      width: 146,
      height: 290,
    },
  },
  {
    id: "iphone-14-pro",
    brand: "Apple",
    model: "iPhone 14 Pro",
    image: "/phones/iphone-14-pro.png", // Placeholder image path
    dimensions: {
      width: 150,
      height: 295,
    },
  },
  {
    id: "samsung-s22",
    brand: "Samsung",
    model: "Galaxy S22",
    image: "/phones/samsung-s22.png", // Placeholder image path
    dimensions: {
      width: 142,
      height: 284,
    },
  },
  {
    id: "pixel-7",
    brand: "Google",
    model: "Pixel 7",
    image: "/phones/pixel-7.png", // Placeholder image path
    dimensions: {
      width: 145,
      height: 292,
    },
  },
  {
    id: "oneplus-10-pro",
    brand: "OnePlus",
    model: "10 Pro",
    image: "/phones/oneplus-10-pro.png", // Placeholder image path
    dimensions: {
      width: 148,
      height: 295,
    },
  },
];

// Group phone models by brand
export const phoneModelsByBrand = phoneModels.reduce((acc, phone) => {
  if (!acc[phone.brand]) {
    acc[phone.brand] = [];
  }
  acc[phone.brand].push(phone);
  return acc;
}, {} as Record<string, PhoneModel[]>);

// List of unique brands
export const phoneBrands = Array.from(
  new Set(phoneModels.map((phone) => phone.brand))
);
