import React, { useEffect, useState } from 'react';
import { Calendar, ClipboardCheck, BarChart3, CheckCircle } from 'lucide-react';
import type { Session } from '../../../shared/interfaces/Session';
import { getTeacherSessions } from '../services/sessionService';

const TeacherDashboard: React.FC<TeacherDashboardProps> = ({ onNavigate }) => {

  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading , setLoading] = useState(true);

  useEffect(()=>{
    const fetchSessions = async () =>{
        try {
            const sessions = await getTeacherSessions();
            setSessions(sessions);
        } catch (error) {
            console.error("error loading sessions", error);
        }finally{
            setLoading(false);
        }
    };
    fetchSessions();
  }, []);

  const today = new Date();
  console.log("ssssssssssss", sessions);
  const sessionsToday = sessions.filter((s) => {
    const startDate = new Date(s.start_date);
    return (
        startDate.getFullYear() === today.getFullYear() &&
        startDate.getMonth() === today.getMonth() &&
        startDate.getDate() === today.getDate()
    );
});
    const todaySessions = sessionsToday.length;
    const toComplete = sessionsToday.filter(
  (s) => !s.attendances || s.attendances.length === 0
).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div> 
          <h1 className="text-2xl font-bold text-[#46494c]">Dashboard</h1>
          <p className="text-sm mt-1 text-[#4c5c68]">
            {today.toLocaleString("fr-FR", {year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit"})}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[#4c5c68]">
                Today's Sessions
              </p>
              <p className="text-3xl font-bold mt-2 text-[#46494c]">{todaySessions}</p>
            </div>
            <Calendar className="w-10 h-10 text-[#1985a1]" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[#4c5c68]">
                To Complete
              </p>
              <p className="text-3xl font-bold mt-2 text-[#46494c]">{toComplete}</p>
            </div>
            <ClipboardCheck className="w-10 h-10 text-[#1985a1]" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[#4c5c68]">
                Avg. Attendance Rate
              </p>
              <p className="text-3xl font-bold mt-2 text-[#46494c]">92%</p>
            </div>
            <BarChart3 className="w-10 h-10 text-[#1985a1]" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-[#dcdcdd]">
          <h2 className="text-lg font-bold text-[#46494c]">
            Today's Sessions
          </h2>
        </div>

        <div className="p-6">
          <div className="space-y-4">
            {sessionsToday.map((session) => (
              <div
                key={session.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg border border-[#dcdcdd] bg-[#dcdcdd] gap-4"
              >
                <div className="flex-1">
                  <h3 className="font-bold text-[#46494c]">
                    {session.subject?.name}
                  </h3>
                  <p className="text-sm mt-1 text-[#4c5c68]">
                    {session.class?.name} • {new Date(session.start_date).toLocaleString("fr-FR", {year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit"})} - {new Date(session.end_date).toLocaleString("fr-FR", { hour: "2-digit", minute: "2-digit"})}
                  </p>
                </div>

                <div>
                  {/* {session.completed ? (
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-green-100 text-green-700 text-sm font-medium">
                      <CheckCircle className="w-4 h-4" />
                      Completed
                    </span>
                  ) : ( */}
                    <button
                      onClick={() => onNavigate('attendance')}
                      className="px-4 py-2 rounded-lg bg-[#1985a1] text-white font-medium text-sm transition-opacity hover:opacity-90"
                    >
                      Take Attendance
                    </button>
                  {/* )} */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
