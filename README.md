# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


- install tailwind
    npm install -D tailwindcss postcss autoprefixer
    npx tailwindcss init -p

- npm i -D daisyui@latest
    //tailwind config
        /** @type {import('tailwindcss').Config} */
        export default {
        content: [
            "./index.html",
            "./src/**/*.{js,ts,jsx,tsx}",
        ],
        theme: {
            extend: {},
        },
        plugins: [
            require('daisyui')
        ],
        daisyui: {
            themes: ["light", "cupcake"],
        },
        }
 index.css
    @tailwind base;
    @tailwind components;
    @tailwind utilities;

- npm i zustand
- npm i axios
- npm i react-router-dom
- npm i react-toastify
    import { ToastContainer, toast } from 'react-toastify';
    import 'react-toastify/dist/ReactToastify.css';

