# MERN Stack Setup Commands

This guide contains the CLI commands for setting up a full-stack application with **React (Vite)**, **Node.js/Express**, **MongoDB**, and **Tailwind CSS**.

---

## 1. Project Root
```bash
mkdir my-app
cd my-app
```

## 2. Backend Setup (Node.js & Express)
```bash
mkdir server
cd server
npm init -y
npm install express mongoose dotenv cors
npm install --save-dev nodemon
```

## 3. Frontend Setup (React + Tailwind CSS)
```bash
cd ..
npm create vite@latest 
cd client
npm install
```

### Install & Initialize Tailwind CSS
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

Update `tailwind.config.js`:
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

Add to `src/index.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## 4. Running the Application

### Start Backend (from `/server`)
```bash
npm run dev
```

### Start Frontend (from `/client`)
```bash
npm run dev
```



