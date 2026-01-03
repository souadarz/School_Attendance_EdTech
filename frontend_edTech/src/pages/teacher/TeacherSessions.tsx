import React, { useEffect, useState } from "react";
import { Calendar, Clock, CheckCircle, XCircle } from "lucide-react";
import type { Session } from "../../../../shared/interfaces/Session";
import { getTeacherSessions } from "../../services/sessionService";
import AttendanceModal from "../../components/AttendanceModal";

const TeacherSessions: React.FC = () => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const data = await getTeacherSessions();
        setSessions(data);
      } catch (error) {
        console.error("error loading teacher sessions", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSessions();
  }, []);

  const handleOpenModal = (session: Session | null) => {
    setSelectedSession(session);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedSession(null);
  };

  const isCompleted = (session: Session): boolean =>
    !!session.attendances && session.attendances.length > 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#46494c]">My Sessions</h1>
          <p className="text-sm mt-1 text-[#4c5c68]">
            Manage your teaching schedule
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        {loading && (
          <p className="text-center text-[#4c5c68]">Loading sessions...</p>
        )}

        {/* Sessions */}
        <div className="space-y-3">
          {sessions.map((session) => (
            <div
              key={session.id}
              className="flex flex-col lg:flex-row lg:items-center justify-between p-4 rounded-lg border gap-4"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-bold text-[#46494c]">
                    {session.subject?.name}
                  </h3>

                  {isCompleted(session) ? (
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                      <CheckCircle className="w-3 h-3" />
                      Completed
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-700">
                      <Clock className="w-3 h-3" />
                      Pending
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm text-[#4c5c68]">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Class:</span>
                    <span>{session.class?.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {new Date(session.start_date).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>
                      {new Date(session.start_date).toLocaleString("fr-FR", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}{" "}
                      -{" "}
                      {new Date(session.end_date).toLocaleString("fr-FR", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                {isCompleted(session) ? (
                  <button className="px-4 py-2 rounded-lg border border-[#c5c3c6] text-[#4c5c68] font-medium text-sm transition-colors hover:bg-gray-50">
                    View Details
                  </button>
                ) : (
                  <button
                    onClick={() => handleOpenModal(session)}
                    className="px-4 py-2 rounded-lg bg-[#1985a1] text-white font-medium text-sm transition-opacity hover:opacity-90"
                  >
                    Take Attendance
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Empty state */}
        {sessions.length === 0 && (
          <div className="text-center py-12">
            <XCircle className="w-16 h-16 mx-auto mb-4 text-[#c5c3c6]" />
            <p className="text-lg font-medium text-[#4c5c68]">
              No sessions found
            </p>
          </div>
        )}
      </div>
      <AttendanceModal
        isOpen={isModalOpen}
        session={selectedSession}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default TeacherSessions;
