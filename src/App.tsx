import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LoginPage } from './pages/LoginPage'
import { EmpProfilePage } from './pages/EmpProfilePage'
import { AdminPage } from './pages/AdminPage'


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/employee" element={<EmpProfilePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  )
}