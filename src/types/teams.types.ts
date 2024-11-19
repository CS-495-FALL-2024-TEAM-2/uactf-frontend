import { AddTeamFormData } from "./forms.types";
import { StudentInfo } from "./userInfo.types";

export type TeamData = {
  id: string;
  teacher_id: string;
  competition_id: string;
  name: string;
  division: number[];
  is_virtual: boolean;
}

export type TeamWithStudents = TeamData & {
  students: StudentInfo[];
}

export type CreateTeamRequest = {
  teacher_id?: string;
} & AddTeamFormData;

export type UpdateTeamRequest = {
  division: number[];
  is_virtual: boolean;
  name : string;
  team_members: {
    id: string;
    first_name: string;
    last_name: string;
    email?: string;
    shirt_size: string;
  } [];
}

export type UploadSignedLiabilityReleaseFormRequest = {
  student_id: string;
  signed_liability_release_form: File;
};
