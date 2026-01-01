import { Navigate, Outlet } from "react-router-dom";
import {Sidebar} from "./Sidebar"
import { useAuth } from "../hooks/useAuth";

const ProtectedLayout = () => {
  const { user, loading, isAuthenticated, logout } = useAuth();

  if (loading) return <p>Loading...</p>;

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex">
      <Sidebar role={user.role} onLogout={logout} />
      <main className="flex-1 p-6 bg-[#dcdcdd]">
        <Outlet />
      </main>
    </div>
  );
};

export default ProtectedLayout;
