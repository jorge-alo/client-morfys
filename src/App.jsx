import { Route, Routes } from "react-router-dom"
import { Home } from "./pages/Home"

import { Navbar } from "./components/Navbar.jsx"
import './App.css'
import { Local1 } from "./pages/Local1"
import { Login } from "./pages/Login.jsx"
import { Register } from "./pages/Register.jsx"
import { Admin } from "./components/auth/Admin.jsx"
import { PrivatePage } from "./components/auth/PrivatePage.jsx"
import { CargarDatos } from "./pages/CargarDatos.jsx"
import { AuthProvider } from "./context/AuthProvider.jsx"
import { DataProvider } from "./context/DataProvider.jsx"
import { FormProvider } from "./context/FormProvider.jsx"
import { PublicPage } from "./components/auth/PublicPage.jsx"
import { Ajustes } from "./pages/Ajustes.jsx"
import { ResetPassword } from "./components/ResetPassword.jsx"
import { Actualizar } from "./pages/Actualizar.jsx"


export const App = () => {

  return (
    <div className="container-app">
      <FormProvider>
        <AuthProvider>
          <DataProvider>
            <Navbar></Navbar>

            <Routes>
              <Route path="/" element={ <PublicPage> <Home /> </PublicPage>}></Route>
              <Route path="/locales/:name" element={  <Local1/>  }></Route>
              <Route path="/form" element={<PrivatePage> <CargarDatos /> </PrivatePage>}></Route>
              <Route path="/ajustes" element={<PrivatePage> <Ajustes /> </PrivatePage>}></Route>
              <Route path="/actualizar" element={<Admin> <Actualizar /> </Admin>}></Route>
              <Route path="/login" element={<Login />}></Route>
              <Route path="/register" element={<Admin> <Register /> </Admin>}></Route>
              <Route path="/reset-password" element={<ResetPassword />} />
            </Routes>
          </DataProvider>
        </AuthProvider>
      </FormProvider>
    </div>
  )
}

