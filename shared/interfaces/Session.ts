import type { Class } from "./Class";
import type { Subject} from "./Subject";
import type { User } from "./User";
import type { Attendance} from "./Attendance";

export interface Session {
  id: number;
  start_date: string;
  end_date: string;
  createdAt: string;
  updatedAt: string;
  class?: Class;
  subject?: Subject;
  teacher?: User;       
  attendances?: Attendance[]; 
}
