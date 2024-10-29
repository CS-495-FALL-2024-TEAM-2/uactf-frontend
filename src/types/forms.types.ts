import { Hint } from "./challenges.types";

export type CreateChallengeFormData = {
    challenge_name: string;
    points: number;
    challenge_description: string;
    flag: string;
    is_flag_case_sensitive: boolean;
    division: string;
    challenge_category: string;
    solution_explanation: string;
    hints: Hint[];
    // file_attachment: File | null;
};

export type TeacherRegisterFormData = {
  school_name: string;
  first_name: string;
  last_name: string;
  email: string;
  contact_number: string;
  shirt_size: string;
}

export type CreateStudentFormData = {
  first_name: string;
  last_name: string;
  email: string;
  shirt_size: string;
}

export type AddTeamFormData = {
  division: number[];
  is_virtual: boolean;
  team_members: CreateStudentFormData[];
}

export type CDMemberRegisterFormData = {
  email: string;
}
