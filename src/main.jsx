import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc"; // this on might be "import react from "@vitejs/plugin-react";" in your solution

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
    const config = {
        plugins: [react()],
        base: "/"
    };

    if (command !== "serve") {
        config.base = "/react-vite-rest-post-app-with-auth/";
    }

    return config;
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </StrictMode>,
)
