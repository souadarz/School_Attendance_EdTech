import React, { useEffect, useState } from "react";
import { CheckCircle, XCircle, Clock, AlertCircle } from "lucide-react";
import type { Session } from "../../../shared/interfaces/Session";
import type { StudentWithStatus } from "../../../shared/interfaces/StudentWithStatus";
import { AttendanceStatus } from "../../../shared/enums/AttendanceStatus.enum";
import {
  getSessionAttendance,
  updateSessionAttendance,
} from "../services/attendanceService";

interface AttendanceModalProps {
  isOpen: boolean;
  session: Session | null;
  onClose: () => void;
}

const AttendanceModal: React.FC<AttendanceModalProps> = ({
  isOpen,
  session,
  onClose,
}) => {
  const [students, setStudents] = useState<StudentWithStatus[]>([]);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!session?.id || !isOpen) return;

    const fetchAttendance = async () => {
      try {
        setLoading(true);
        const data = await getSessionAttendance(session.id);
        console.log("Students loaded:", data.students);
        setStudents(data.students || []);
      } catch (error) {
        console.error("fail on loading attendances", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendance();
  }, [session, isOpen]);

  const updateStatus = (studentId: number, status: AttendanceStatus) => {
    setStudents((prevStudents) =>
      prevStudents.map((student) =>
        student.id === studentId ? { ...student, status } : student
      )
    );
  };

  const handleSave = async () => {
    if (!session?.id) return;

    try {
      const attendances = students
        .filter((s) => s.status !== null)
        .map((student) => ({
          studentId: student.id,
          status: student.status!,
        }));

      await updateSessionAttendance(session.id, attendances);

      setSaved(true);
      setTimeout(() => {
        setSaved(false);
        onClose();
      }, 2000);
    } catch (error) {
      console.error("Erreur lors de la sauvegarde", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-[#f8f9fa] w-full max-w-6xl max-h-[90vh] overflow-y-auto rounded-xl shadow-xl p-6 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        >
          ✕
        </button>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-[#46494c]">
                Take Attendance
              </h1>
              <p className="text-sm mt-1 text-[#4c5c68]">
                {session?.subject?.name} - {session?.class?.name} |{" "}
                {new Date(session?.start_date).toLocaleString("fr-FR", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}{" "}
                -{" "}
                {new Date(session?.end_date).toLocaleString("fr-FR", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>

            <button
              onClick={handleSave}
              disabled={loading}
              className="px-6 py-2 rounded-lg bg-[#1985a1] text-white font-medium transition-opacity hover:opacity-90 disabled:opacity-50"
            >
              Save
            </button>
          </div>

          {/* Success message */}
          {saved && (
            <div className="bg-green-100 border border-green-300 text-green-700 px-4 py-3 rounded-lg flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              <span className="font-medium">Attendance saved successfully</span>
            </div>
          )}

          {/* Table */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#dcdcdd]">
                  <tr>
                    <th className="text-left px-6 py-4 font-bold text-[#46494c]">
                      Student
                    </th>
                    <th className="text-center px-6 py-4 font-bold text-[#46494c]">
                      Present
                    </th>
                    <th className="text-center px-6 py-4 font-bold text-[#46494c]">
                      Absent
                    </th>
                    <th className="text-center px-6 py-4 font-bold text-[#46494c]">
                      Late
                    </th>
                    <th className="text-center px-6 py-4 font-bold text-[#46494c]">
                      Excused
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {loading ? (
                    <tr>
                      <td
                        colSpan={5}
                        className="text-center py-8 text-[#4c5c68]"
                      >
                        Loading...
                      </td>
                    </tr>
                  ) : students.length === 0 ? (
                    <tr>
                      <td
                        colSpan={5}
                        className="text-center py-8 text-[#4c5c68]"
                      >
                        No students found
                      </td>
                    </tr>
                  ) : (
                    students.map((student, idx) => (
                      <tr
                        key={student.id}
                        className={idx % 2 === 0 ? "bg-white" : "bg-[#dcdcdd]"}
                      >
                        <td className="px-6 py-4">
                          <span className="font-medium text-[#46494c]">
                            {student.fullname}
                          </span>
                        </td>

                        <td className="px-6 py-4 text-center">
                          <button
                            onClick={() =>
                              updateStatus(student.id, AttendanceStatus.PRESENT)
                            }
                            className={`p-2 rounded-lg transition-colors ${
                              student.status === AttendanceStatus.PRESENT
                                ? "bg-green-500 text-white"
                                : "bg-green-100 text-green-600 hover:bg-green-200"
                            }`}
                          >
                            <CheckCircle className="w-5 h-5" />
                          </button>
                        </td>

                        <td className="px-6 py-4 text-center">
                          <button
                            onClick={() =>
                              updateStatus(student.id, AttendanceStatus.ABSENT)
                            }
                            className={`p-2 rounded-lg transition-colors ${
                              student.status === AttendanceStatus.ABSENT
                                ? "bg-red-500 text-white"
                                : "bg-red-100 text-red-600 hover:bg-red-200"
                            }`}
                          >
                            <XCircle className="w-5 h-5" />
                          </button>
                        </td>

                        <td className="px-6 py-4 text-center">
                          <button
                            onClick={() =>
                              updateStatus(student.id, AttendanceStatus.LATE)
                            }
                            className={`p-2 rounded-lg transition-colors ${
                              student.status === AttendanceStatus.LATE
                                ? "bg-orange-500 text-white"
                                : "bg-orange-100 text-orange-600 hover:bg-orange-200"
                            }`}
                          >
                            <Clock className="w-5 h-5" />
                          </button>
                        </td>

                        <td className="px-6 py-4 text-center">
                          <button
                            onClick={() =>
                              updateStatus(student.id, AttendanceStatus.EXCUSED)
                            }
                            className={`p-2 rounded-lg transition-colors ${
                              student.status === AttendanceStatus.EXCUSED
                                ? "bg-blue-500 text-white"
                                : "bg-blue-100 text-blue-600 hover:bg-blue-200"
                            }`}
                          >
                            <AlertCircle className="w-5 h-5" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Summary */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg shadow p-4">
              <p className="text-sm font-medium text-[#4c5c68]">Present</p>
              <p className="text-2xl font-bold mt-1 text-green-600">
                {
                  students.filter((s) => s.status === AttendanceStatus.PRESENT)
                    .length
                }
              </p>
            </div>

            <div className="bg-white rounded-lg shadow p-4">
              <p className="text-sm font-medium text-[#4c5c68]">Absent</p>
              <p className="text-2xl font-bold mt-1 text-red-600">
                {
                  students.filter((s) => s.status === AttendanceStatus.ABSENT)
                    .length
                }
              </p>
            </div>

            <div className="bg-white rounded-lg shadow p-4">
              <p className="text-sm font-medium text-[#4c5c68]">Late</p>
              <p className="text-2xl font-bold mt-1 text-orange-600">
                {
                  students.filter((s) => s.status === AttendanceStatus.LATE)
                    .length
                }
              </p>
            </div>

            <div className="bg-white rounded-lg shadow p-4">
              <p className="text-sm font-medium text-[#4c5c68]">Excused</p>
              <p className="text-2xl font-bold mt-1 text-blue-600">
                {
                  students.filter((s) => s.status === AttendanceStatus.EXCUSED)
                    .length
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceModal;
