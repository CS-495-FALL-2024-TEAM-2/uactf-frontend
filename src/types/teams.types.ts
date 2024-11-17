import { AddTeamFormData } from "./forms.types";
import { StudentInfo } from "./userInfo.types";

export type TeamData = {
  id: string;
  teacher_id: string;
  competition_id: string;
  name: string;
  division: number;
  is_virtual: boolean;
}

export type TeamWithStudents = TeamData & {
  students: StudentInfo[];
}

export type CreateTeamRequest = {
  teacher_id?: string;
} & AddTeamFormData;
