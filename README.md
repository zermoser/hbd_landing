# 🎉 Happy Birthday Landing Page

A fun and colorful React web app that celebrates birthdays with floating balloons and confetti!  
Built with **React 18**, **TypeScript**, **Vite**, and beautiful animations using **Framer Motion** and **Canvas Confetti**.

---

## 🌐 Live Demo

👉 [Try it here](https://zermoser.github.io/hbd_landing)

---

## ✨ Features

- 🎈 Animated floating balloons
- 🎊 Confetti effects on page load
- 🌀 Smooth transitions with Framer Motion
- ⚡ Fast performance with Vite
- 🧩 Modular, reusable components

---

## 🚀 Tech Stack

- [React 18](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Framer Motion](https://www.framer.com/motion/)
- [canvas-confetti](https://www.npmjs.com/package/canvas-confetti)

---

## 📦 Installation

```bash
# Clone this repository
git clone https://github.com/zermoser/hbd_landing.git
cd hbd_landing

# Install dependencies
yarn install

# Run the development server
yarn dev
```

Open your browser at: `http://localhost:5173`

---

## 🛠 Troubleshooting

If you encounter this TypeScript error:
```
Could not find a declaration file for module 'react-dom/client'
```
Run this fix:
```bash
yarn add -D @types/react-dom
```

Also, ensure `tsconfig.json` contains:

```json
{
  "compilerOptions": {
    "moduleResolution": "node",
    "esModuleInterop": true
  }
}
```

---

## 📁 Project Structure

```
src/
├── components/
│   └── Balloon.tsx         # Balloon animation component
├── App.tsx                 # Main birthday animation logic
├── main.tsx                # Entry point for React DOM
public/
├── preview.png             # (Optional) Preview image for documentation
```

---

## 🧪 Build for Production

```bash
yarn build
```

To preview the production build locally:

```bash
yarn preview
```

---

## 📄 License

MIT © [zermoser](https://github.com/zermoser)