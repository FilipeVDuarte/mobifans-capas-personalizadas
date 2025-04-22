# 🎨 Mobifans - Sistema de Capas Personalizadas

[![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)]()
[![Licença](https://img.shields.io/github/license/FilipeVDuarte/mobifans-capas-personalizadas)]()
[![Node.js](https://img.shields.io/badge/Node.js-14%2B-brightgreen)]()
[![React](https://img.shields.io/badge/React-17%2B-blue)]()
[![Netlify Status](https://api.netlify.com/api/v1/badges/2575eba2-1b06-4db8-af73-a7d0db2eabaa/deploy-status)](https://app.netlify.com/sites/mobifans/deploys)

Sistema completo para criação e personalização de capas para dispositivos móveis com visualização em tempo real.

![Preview da Aplicação](https://mobifans.netlify.app/preview.jpg) <!-- Adicione um screenshot real -->

### 🌐 Acesso Online
A aplicação está disponível em:  
🔗 [https://mobifans.netlify.app](https://mobifans.netlify.app)  

## ✨ Funcionalidades Principais

- 🖌️ Editor intuitivo com ferramentas de desenho e camadas
- 🎨 Paleta de cores personalizável e texturas pré-definidas
- 📤 Upload de imagens com redimensionamento automático


## 🚀 Tecnologias Utilizadas

### Frontend
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Styled Components](https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge)
![React Three Fiber](https://img.shields.io/badge/React_Three_Fiber-000000?style=for-the-badge)

### Backend
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens)
![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge)

### DevOps
![Netlify](https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white)

## 🛠️ Configuração do Ambiente

### Pré-requisitos
- Node.js v14+
- MongoDB Atlas ou local
- Conta no [Cloudinary](https://cloudinary.com/) para upload de imagens
- Conta no [Netlify](https://www.netlify.com/) para deploy

```bash
# Clone o repositório
git clone https://github.com/FilipeVDuarte/mobifans-capas-personalizadas.git
cd mobifans-capas-personalizadas

# Instale as dependências
cd client && yarn install
cd ../server && yarn install