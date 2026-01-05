import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./pages/Login";
import AdminDashboard from "./pages/admin/AdminDashboard";
import TeacherDashboard from "./pages/teacher/TeacherDashboard";
import { AuthProvider } from "./context/authContext";
import ProtectedLayout from "./components/ProtectedLayaout";
import TeacherSessions from "./pages/teacher/TeacherSessions";
import TeacherClasses from "./pages/teacher/TeacherClasses";
import ClassesPage from "./pages/admin/ClassesPage";
import { Role } from "../../shared/enums/Role.enum";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedLayout roles={[Role.ADMIN]}/>}>
            <Route path="/adminDashboard" element={<AdminDashboard />} />
            <Route path="/classes" element={<ClassesPage />} />
          </Route>
          <Route element={<ProtectedLayout roles={[Role.TEACHER]}/>}>
            <Route path="/teacherDashboard" element={<TeacherDashboard />} />
            <Route path="/teacherSessions" element={<TeacherSessions />} />
            <Route path="/teacherClasses" element={<TeacherClasses />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
