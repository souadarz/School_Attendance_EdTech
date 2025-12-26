import { Class } from "./Class";
import { Subject} from "./Subject";
import { User } from "./User";
import { Attendance} from "./Attendance";

export interface Session {
  id: number;
  start_date: Date;
  end_date: Date;
  createdAt: Date;
  updatedAt: Date;
  class?: Class;
  subject?: Subject;
  teacher?: User;       
  attendances?: Attendance[]; 
}
