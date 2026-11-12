import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './index.css'
import { CadastroPage } from './pages/CadastroPage.tsx'
import { InicioPage } from './pages/InicioPage.tsx'
import { LoginPage } from './pages/LoginPage.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/cadastro' element={<CadastroPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/inicio' element={<InicioPage />} />
        <Route path='*' element={<Navigate to='/login' replace />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
