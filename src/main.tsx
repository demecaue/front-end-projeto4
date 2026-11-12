import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './index.css'
import { AreaLogada } from './componentes/AreaLogada.tsx'
import { UsuarioProvider } from './contexto/UsuarioContexto.tsx'
import { CadastroPage } from './pages/CadastroPage.tsx'
import { CategoriaFormPage } from './pages/CategoriaFormPage.tsx'
import { CategoriasPage } from './pages/CategoriasPage.tsx'
import { ClienteFormPage } from './pages/ClienteFormPage.tsx'
import { ClientesPage } from './pages/ClientesPage.tsx'
import { InicioPage } from './pages/InicioPage.tsx'
import { LoginPage } from './pages/LoginPage.tsx'
import { MateriaisPage } from './pages/MateriaisPage.tsx'
import { MaterialFormPage } from './pages/MaterialFormPage.tsx'
import { ObraFormPage } from './pages/ObraFormPage.tsx'
import { ObrasPage } from './pages/ObrasPage.tsx'
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
            {/* Rubrica: 4 CRUDs completos, cada um com listagem e formulário em telas separadas */}
            <Route path='/categorias' element={<CategoriasPage />} />
            <Route path='/categorias/novo' element={<CategoriaFormPage />} />
            <Route path='/categorias/:id' element={<CategoriaFormPage />} />
            <Route path='/materiais' element={<MateriaisPage />} />
            <Route path='/materiais/novo' element={<MaterialFormPage />} />
            <Route path='/materiais/:id' element={<MaterialFormPage />} />
            <Route path='/clientes' element={<ClientesPage />} />
            <Route path='/clientes/novo' element={<ClienteFormPage />} />
            <Route path='/clientes/:id' element={<ClienteFormPage />} />
            <Route path='/obras' element={<ObrasPage />} />
            <Route path='/obras/novo' element={<ObraFormPage />} />
            <Route path='/obras/:id' element={<ObraFormPage />} />
          </Route>
          <Route path='*' element={<Navigate to='/login' replace />} />
        </Routes>
      </BrowserRouter>
    </UsuarioProvider>
  </StrictMode>,
)
