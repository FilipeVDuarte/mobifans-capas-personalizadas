import { JSX } from 'react';

// Componente de ícone de marca
export const BrandIcon = ({ brand }: { brand: string }): JSX.Element => {
  const badgeUrls: Record<string, string> = {
    "Apple": "https://img.shields.io/badge/Apple-%23000000.svg?style=for-the-badge&logo=apple&logoColor=white",
    "Samsung": "https://img.shields.io/badge/Samsung-%231428A0.svg?style=for-the-badge&logo=samsung&logoColor=white",
    "Motorola": "https://img.shields.io/badge/Motorola-%23E1140A.svg?style=for-the-badge&logo=motorola&logoColor=white",
    "Xiaomi": "https://img.shields.io/badge/Xiaomi-%23FF6900.svg?style=for-the-badge&logo=xiaomi&logoColor=white",
    "default": "https://img.shields.io/badge/Phone-%23000000.svg?style=for-the-badge"
  };

  return (
    <img 
      src={badgeUrls[brand] || badgeUrls.default} 
      alt={`${brand} logo`}
      className="brand-icon"
      style={{ 
        width: 'auto', 
        height: '24px',
        display: 'inline-block',
        marginRight: '8px',
        verticalAlign: 'middle'
      }}
    />
  );
};

// Uma função simples para substituir a exportação legada
export const getBrandIcon = (brand: string): JSX.Element => {
  return <BrandIcon brand={brand} />;
};