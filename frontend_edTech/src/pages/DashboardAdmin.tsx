import React from "react";
import { XCircle, Clock } from "lucide-react";

const DashboardAdmin: React.FC = () => {
  console.log("dashboard page");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#46494c]">
          Admin Dashboard
        </h1>
        <p className="text-sm mt-1 text-[#4c5c68]">
          Attendance Overview
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm font-medium text-[#4c5c68]">
            Global Attendance Rate
          </p>
          <p className="text-3xl font-bold mt-2 text-[#46494c]">
            91.5%
          </p>
          <p className="text-xs mt-2 text-green-600">
            +2.3% vs last month
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm font-medium text-[#4c5c68]">
            Absences Today
          </p>
          <p className="text-3xl font-bold mt-2 text-[#46494c]">
            24
          </p>
          <p className="text-xs mt-2 text-red-600">
            8 unjustified
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm font-medium text-[#4c5c68]">
            Late This Month
          </p>
          <p className="text-3xl font-bold mt-2 text-[#46494c]">
            156
          </p>
          <p className="text-xs mt-2 text-orange-600">
            -12% vs last month
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm font-medium text-[#4c5c68]">
            Active Classes
          </p>
          <p className="text-3xl font-bold mt-2 text-[#46494c]">
            18
          </p>
          <p className="text-xs mt-2 text-[#4c5c68]">
            Out of 24 classes
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Lowest Rate */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-[#dcdcdd]">
            <h2 className="text-lg font-bold text-[#46494c]">
              Classes with Lowest Rate
            </h2>
          </div>

          <div className="p-6 space-y-4">
            {[
              { class: "3rd B", rate: 78 },
              { class: "4th A", rate: 82 },
              { class: "5th C", rate: 85 },
            ].map((item) => (
              <div
                key={item.class}
                className="flex items-center justify-between"
              >
                <span className="font-medium text-[#46494c]">
                  {item.class}
                </span>

                <div className="flex items-center gap-3">
                  <div className="w-32 h-2 rounded-full bg-[#dcdcdd]">
                    <div
                      className={`h-2 rounded-full ${
                        item.rate < 80
                          ? "bg-red-500"
                          : item.rate < 85
                          ? "bg-orange-500"
                          : "bg-[#1985a1]"
                      }`}
                      style={{ width: `${item.rate}%` }}
                    />
                  </div>

                  <span className="text-sm font-bold w-12 text-right text-[#46494c]">
                    {item.rate}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Alerts */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-[#dcdcdd]">
            <h2 className="text-lg font-bold text-[#46494c]">
              Recent Alerts
            </h2>
          </div>

          <div className="p-6 space-y-4">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-[#dcdcdd]">
              <XCircle className="w-5 h-5 text-red-600 mt-0.5" />
              <div>
                <p className="font-medium text-[#46494c]">
                  5 consecutive absences
                </p>
                <p className="text-sm text-[#4c5c68]">
                  Lucas Martin - 5th A
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-lg bg-[#dcdcdd]">
              <Clock className="w-5 h-5 text-orange-600 mt-0.5" />
              <div>
                <p className="font-medium text-[#46494c]">
                  10 late arrivals this month
                </p>
                <p className="text-sm text-[#4c5c68]">
                  Marie Dupont - 4th B
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardAdmin;
