import React, { useEffect, useState } from "react";
import { Edit, Trash2, Users } from "lucide-react";
import { getAllClasses } from "../../services/classeService";
import type { Class } from "../../../../shared/interfaces/Class";

const ClassesPage: React.FC = () => {
  const [classes, setClasses] = useState<Class[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllClasses = async () => {
      try {
        const allClasses = await getAllClasses();
        setClasses(allClasses);
      } catch (error) {
        console.error("error to loading all classes", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAllClasses();
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#46494c]">Classes</h1>
        <p className="text-sm mt-1 text-[#4c5c68]">Manage school classes</p>
      </div>
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm font-medium text-[#4c5c68]">Total Classes</p>
          <p className="text-3xl font-bold mt-2 text-[#46494c]">
            {classes.length}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm font-medium text-[#4c5c68]">Total Students</p>
          <p className="text-3xl font-bold mt-2 text-[#46494c]">
            {classes.reduce((sum, cls) => sum + (cls.students?.length ?? 0), 0)}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm font-medium text-[#4c5c68]">Avg. Class Size</p>
          <p className="text-3xl font-bold mt-2 text-[#46494c]">
            {Math.round(
              classes.reduce(
                (sum, cls) => sum + (cls.students?.length ?? 0),
                0
              ) / classes.length
            )}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm font-medium text-[#4c5c68]">Active Teachers</p>
          <p className="text-3xl font-bold mt-2 text-[#46494c]">
            {new Set(classes.map((cls) => cls.teacher.id)).size}
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#dcdcdd]">
              <tr>
                <th className="text-left px-6 py-4 font-bold text-[#46494c]">
                  Class
                </th>
                <th className="text-center px-6 py-4 font-bold text-[#46494c]">
                  Students
                </th>
                <th className="text-left px-6 py-4 font-bold text-[#46494c]">
                  Teacher
                </th>
                <th className="text-center px-6 py-4 font-bold text-[#46494c]">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {classes.map((cls, idx) => (
                <tr
                  key={cls.id}
                  className={idx % 2 === 0 ? "bg-white" : "bg-[#dcdcdd]"}
                >
                  <td className="px-6 py-4">
                    <span className="font-bold text-[#46494c]">{cls.name}</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1985a1] text-white">
                      <Users className="w-4 h-4" />
                      <span className="font-medium">
                        {cls.students?.length}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[#4c5c68]">
                      {cls.teacher.fullname}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button className="p-2 rounded-lg text-[#1985a1] transition-colors hover:bg-blue-100">
                        <Edit className="w-5 h-5" />
                      </button>
                      <button className="p-2 rounded-lg text-red-600 transition-colors hover:bg-red-100">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {classes.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg font-medium text-[#4c5c68]">
              No classes found
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClassesPage;
