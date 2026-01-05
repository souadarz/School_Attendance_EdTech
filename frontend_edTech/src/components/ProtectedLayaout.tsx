import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";
import { useAuth } from "../hooks/useAuth";
import { Role } from "../../../shared/enums/Role.enum";

interface ProtectedLayoutProps {
  roles?: Role[];
}

const ProtectedLayout: React.FC<ProtectedLayoutProps> = ({ roles = [] }) => {
  const { user, loading, isAuthenticated, logout } = useAuth();

  if (loading) return <p>Loading...</p>;

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  if (roles.length > 0 && !roles.includes(user.role)) {
    return <Navigate to="/403" replace />;
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
