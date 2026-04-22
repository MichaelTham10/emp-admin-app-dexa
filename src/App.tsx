import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LoginPage } from './pages/LoginPage'
import { EmpProfilePage } from './pages/EmpProfilePage'


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/employee" element={<EmpProfilePage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  )
}