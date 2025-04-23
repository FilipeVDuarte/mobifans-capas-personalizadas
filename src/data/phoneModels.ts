
// Lista de marcas disponíveis
export const phoneBrands = ["Apple", "Samsung", "Motorola", "Xiaomi"] as const;

// Interface para os modelos de telefone
export interface PhoneModel {
  id: string;
  model: string;
  brand: string;
}

// Lista de modelos por marca
export const phoneModelsByBrand: Record<string, PhoneModel[]> = {
  "Apple": [
    { id: "iphone15", model: "iPhone 15", brand: "Apple" },
    { id: "iphone14", model: "iPhone 14", brand: "Apple" },
    { id: "iphone13", model: "iPhone 13", brand: "Apple" },
    { id: "iphone12", model: "iPhone 12", brand: "Apple" }
  ],
  "Samsung": [
    { id: "s24", model: "Galaxy S24", brand: "Samsung" },
    { id: "s23", model: "Galaxy S23", brand: "Samsung" },
    { id: "s22", model: "Galaxy S22", brand: "Samsung" },
    { id: "a54", model: "Galaxy A54", brand: "Samsung" }
  ],
  "Motorola": [
    { id: "edge40", model: "Edge 40", brand: "Motorola" },
    { id: "g84", model: "Moto G84", brand: "Motorola" },
    { id: "g54", model: "Moto G54", brand: "Motorola" },
    { id: "razr40", model: "Razr 40", brand: "Motorola" }
  ],
  "Xiaomi": [
    { id: "13t", model: "13T", brand: "Xiaomi" },
    { id: "redmi13c", model: "Redmi 13C", brand: "Xiaomi" },
    { id: "note12", model: "Redmi Note 12", brand: "Xiaomi" },
    { id: "poco", model: "POCO X5", brand: "Xiaomi" }
  ]
};
