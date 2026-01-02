import { NavLink } from "react-router-dom";
import { Role } from "../../../shared/enums/Role.enum";
import {
  LayoutDashboard,
  Users,
  ClipboardCheck,
  BarChart3,
  Calendar,
  LogOut,
} from "lucide-react";

export const Sidebar: React.FC<{
  role: Role;
  onLogout: () => void;
}> = ({ role, onLogout }) => {
  const teacherMenu = [
    { to: "/dashboardTeacher", label: "Dashboard", icon: LayoutDashboard },
    { to: "attendance", label: "Saisir présences", icon: ClipboardCheck },
    { to: "/sessionsTeacher", label: "My sessions", icon: Calendar },
  ];

  const adminMenu = [
    { to: "#", label: "Dashboard", icon: LayoutDashboard },
    { to: "statistics", label: "Statistics", icon: BarChart3 },
    { to: "students", label: "Students", icon: Users },
    { to: "consultation", label: "History", icon: Calendar },
  ];

  const parentMenu = [
    { to: "consultation", label: "Children Attendance", icon: Calendar },
  ];

  const menu =
    role === Role.ADMIN ? adminMenu : Role.TEACHER ? teacherMenu : parentMenu;

  return (
    <>
      <aside className="w-64 min-h-screen bg-[#46494c] text-white p-4">
        <div className="p-6 border-b" style={{ borderColor: "#4c5c68" }}>
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-[#1985a1]">EdTech</h2>
          </div>
          <p className="text-sm mt-1" style={{ color: "#c5c3c6" }}>
            {role === "admin"
              ? "Admin"
              : role === "teacher"
              ? "Teacher"
              : "Parent"}
          </p>
        </div>

        <nav className="p-4 flex-1">
          {menu.map((item) => {
            const Icon = item.icon;
            // const isActive = item.to;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                // className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
                //   isActive
                //     ? "text-white"
                //     : "text-gray-300 hover:bg-opacity-10 hover:bg-white"
                // }`}
                // style={isActive ? { backgroundColor: "#1985a1" } : {}}
                className={({ isActive }) =>

                  `w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
                  isActive
                    ? "text-white"
                    : "text-gray-300 hover:bg-opacity-10 hover:bg-white"
                  }`
                }
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className="p-4 border-t" style={{ borderColor: "#4c5c68" }}>
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-opacity-10 hover:bg-white transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};
