import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./pages/login"
import DashboardAdmin from "./pages/DashboardAdmin";


function App() {
return (
   <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/dashboardAdmin" element={<DashboardAdmin />} />
    </Routes>
   </BrowserRouter>
  // <p className="text-3xl bg-red-500 text-green-600 border-4 m-10">tailwind</p>
)
}

export default App
