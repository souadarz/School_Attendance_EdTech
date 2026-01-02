import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./pages/Login";
import DashboardAdmin from "./pages/DashboardAdmin";
import DashboardTeacher from "./pages/DashboardTeacher";
import { AuthProvider } from "./context/authContext";
import ProtectedLayout from "./components/ProtectedLayaout";
import SessionsTeacher from "./pages/SessionsTeacher";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedLayout />}>
            <Route path="/dashboardAdmin" element={<DashboardAdmin />} />
            <Route path="/dashboardTeacher" element={<DashboardTeacher />} />
            <Route path="/sessionsTeacher" element={<SessionsTeacher />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
