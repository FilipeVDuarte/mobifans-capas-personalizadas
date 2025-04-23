
// Lista de marcas disponíveis
export const phoneBrands = ["Apple", "Samsung", "Motorola", "Xiaomi"] as const;

// Interface para os modelos de telefone
export interface PhoneModel {
  id: string;
  model: string;
  brand: string;
  image: string;
  dimensions: {
    width: number;
    height: number;
  };
}

// Lista de modelos por marca
export const phoneModelsByBrand: Record<string, PhoneModel[]> = {
  "Apple": [
    { id: "iphone15", model: "iPhone 15", brand: "Apple", image: "", dimensions: { width: 290, height: 590 } },
    { id: "iphone14", model: "iPhone 14", brand: "Apple", image: "", dimensions: { width: 280, height: 580 } },
    { id: "iphone13", model: "iPhone 13", brand: "Apple", image: "", dimensions: { width: 275, height: 570 } },
    { id: "iphone12", model: "iPhone 12", brand: "Apple", image: "", dimensions: { width: 270, height: 560 } }
  ],
  "Samsung": [
    { id: "s24", model: "Galaxy S24", brand: "Samsung", image: "", dimensions: { width: 290, height: 600 } },
    { id: "s23", model: "Galaxy S23", brand: "Samsung", image: "", dimensions: { width: 285, height: 590 } },
    { id: "s22", model: "Galaxy S22", brand: "Samsung", image: "", dimensions: { width: 280, height: 580 } },
    { id: "a54", model: "Galaxy A54", brand: "Samsung", image: "", dimensions: { width: 275, height: 570 } }
  ],
  "Motorola": [
    { id: "edge40", model: "Edge 40", brand: "Motorola", image: "", dimensions: { width: 280, height: 590 } },
    { id: "g84", model: "Moto G84", brand: "Motorola", image: "", dimensions: { width: 275, height: 580 } },
    { id: "g54", model: "Moto G54", brand: "Motorola", image: "", dimensions: { width: 270, height: 570 } },
    { id: "razr40", model: "Razr 40", brand: "Motorola", image: "", dimensions: { width: 265, height: 560 } }
  ],
  "Xiaomi": [
    { id: "13t", model: "13T", brand: "Xiaomi", image: "", dimensions: { width: 285, height: 590 } },
    { id: "redmi13c", model: "Redmi 13C", brand: "Xiaomi", image: "", dimensions: { width: 280, height: 580 } },
    { id: "note12", model: "Redmi Note 12", brand: "Xiaomi", image: "", dimensions: { width: 275, height: 570 } },
    { id: "poco", model: "POCO X5", brand: "Xiaomi", image: "", dimensions: { width: 270, height: 560 } }
  ]
};
