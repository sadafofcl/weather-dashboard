import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ThemeContextProvider } from './context/ThemeContext.tsx'
import { FavouritesContextProvider } from './context/FavouritesContext.tsx'

createRoot(document.getElementById('root')!).render(

  <StrictMode>
    <ThemeContextProvider>
      <FavouritesContextProvider>
      <App />
      </FavouritesContextProvider>
    </ThemeContextProvider>
  </StrictMode>
)
