import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './index.css'
import { CadastroPage } from './pages/CadastroPage.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/cadastro' element={<CadastroPage />} />
        <Route path='*' element={<Navigate to='/cadastro' replace />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
