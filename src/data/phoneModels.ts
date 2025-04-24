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
    { id: "iphone16", model: "iPhone 16", brand: "Apple", image: "public/cases/iphone_16.png", dimensions: { width: 290, height: 590 } },
    { id: "iphone16plus", model: "iPhone 16 Plus", brand: "Apple", image: "public/cases/iphone_16_plus.png", dimensions: { width: 290, height: 600 } },
    { id: "iphone16pro", model: "iPhone 16 Pro", brand: "Apple", image: "public/cases/iphone_16_pro.png", dimensions: { width: 285, height: 590 } },
    { id: "iphone16promax", model: "iPhone 16 Pro Max", brand: "Apple", image: "public/cases/iphone_16_pro_max.png", dimensions: { width: 280, height: 580 } }
  ],
  "Samsung": [],
  "Motorola": [],
  "Xiaomi": []
};

// Função para obter o caminho do ícone da marca
export const getBrandIconPath = (brand: string) => {
  return `/brand icons/Logo ${brand}.svg`;
};

// Função para obter o caminho do ícone do modelo
export const getModelIconPath = (modelId: string) => {
  const modelIconMap: Record<string, string> = {
    iphone16: "Icon_iphone_16",
    iphone16plus: "Icon_iphone_16_Plus",
    iphone16pro: "Icon_iphone_16_Pro",
    iphone16promax: "Icon_iphone_16_Pro_Max"
  };

  const fileName = modelIconMap[modelId] || `Icon_${modelId}`;
  return `/icons models/${fileName}.svg`;
};
