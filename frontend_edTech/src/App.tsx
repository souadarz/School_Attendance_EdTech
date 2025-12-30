import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./pages/login";
import DashboardAdmin from "./pages/DashboardAdmin";
import { AuthProvider } from "./context/authContext";
import ProtectedLayout from "./components/ProtectedLayaout";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedLayout />}>
            <Route path="/dashboardAdmin" element={<DashboardAdmin />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
