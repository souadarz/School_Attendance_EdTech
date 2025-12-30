import { useState } from "react";
import { Role } from "../../../shared/enums/Role.enum";
import api from "../services/axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [role, setRole] = useState<Role>(Role.TEACHER);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (
    e: React.FormEvent<HTMLButtonElement>
  ): Promise<void> => {
    e.preventDefault();
    setIsLoading(true);

    try {
      console.log("inside handle submit");
      const res = await api.post("/auth/login", { email, password, role });
      console.log("API Response:", res.data);
      login(res.data.user, res.data.token);

      if (res.data.user.role === Role.ADMIN) {
        navigate("/dashboardAdmin");
      } else if (res.data.user.role === Role.TEACHER){
        navigate("/dashboardTeacher");
      }else {
        navigate("/login");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[#c5c3c6]">
      <div className="w-full max-w-md">
        <div className="rounded-lg shadow-xl p-8 bg-[#dcdcdd]">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2 text-[#1985a1]">EdTech</h1>
            <p className="text-base text-[#4c5c68]">
              School Attendance Management
            </p>
          </div>

          <div className="space-y-6">
            {/* Select Role */}
            <div>
              <label
                htmlFor="role"
                className="block mb-2 font-semibold text-[#46494c]"
              >
                Account Type
              </label>
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value as Role)}
                className="w-full px-4 py-3 rounded-lg border-2 border-[#c5c3c6] bg-[#dcdcdd] text-[#46494c] focus:border-[#1985a1] focus:outline-none transition-colors"
              >
                <option value={Role.TEACHER}>Teacher</option>
                <option value={Role.ADMIN}>Administration</option>
                <option value={Role.STUDENT}>Student</option>
                <option value={Role.PARENT}>Parent</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block mb-2 font-semibold text-[#46494c]"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@school.com"
                required
                className="w-full px-4 py-3 rounded-lg border-2 border-[#c5c3c6] bg-[#dcdcdd] text-[#46494c] placeholder-opacity-50 focus:border-[#1985a1] focus:outline-none transition-colors"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block mb-2 font-semibold text-[#46494c]"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full px-4 py-3 rounded-lg border-2 border-[#c5c3c6] bg-[#dcdcdd] text-[#46494c] placeholder-opacity-50 focus:border-[#1985a1] focus:outline-none transition-colors"
              />
            </div>

            <button
              type="submit"
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full py-3 font-semibold rounded-lg text-white bg-[#1985a1] hover:bg-[#156b82] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </div>

          <div className="mt-6 text-center">
            <a href="#" className="text-sm text-[#1985a1] hover:underline">
              Forgot password?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
