// src/data/brandIcons.tsx
import React from "react";

const getLocalBrandIconPath = (brand: string) => {
  const safeBrand = brand.toLowerCase();
  return `/brand-icons/logo_${safeBrand}.svg`;
};

export const BrandIcon = ({ brand }: { brand: string }) => (
  <img
    src={getLocalBrandIconPath(brand)}
    alt={`${brand} logo`}
    className="brand-icon"
    style={{
      width: '40px',
      height: '40px',
      objectFit: 'contain',
      display: 'inline-block',
      verticalAlign: 'middle'
    }}
    onError={(e) => {
      (e.target as HTMLImageElement).style.display = 'none';
    }}
  />
);
