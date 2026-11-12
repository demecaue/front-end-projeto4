import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './index.css'
import { AreaLogada } from './componentes/AreaLogada.tsx'
import { UsuarioProvider } from './contexto/UsuarioContexto.tsx'
import { CadastroPage } from './pages/CadastroPage.tsx'
import { InicioPage } from './pages/InicioPage.tsx'
import { LoginPage } from './pages/LoginPage.tsx'
import { PerfilPage } from './pages/PerfilPage.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UsuarioProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/cadastro' element={<CadastroPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route element={<AreaLogada />}>
            <Route path='/inicio' element={<InicioPage />} />
            <Route path='/perfil' element={<PerfilPage />} />
          </Route>
          <Route path='*' element={<Navigate to='/login' replace />} />
        </Routes>
      </BrowserRouter>
    </UsuarioProvider>
  </StrictMode>,
)
