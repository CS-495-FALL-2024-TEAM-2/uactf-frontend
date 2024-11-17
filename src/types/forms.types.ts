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
  first_name: string;
  last_name: string;
  email: string;
  school_name: string;
  school_address: string;
  school_website: string;
  contact_number: string;
  shirt_size: string;
}

export type CreateStudentFormData = {
  first_name: string;
  last_name: string;
  email?: string;
  shirt_size: string;
}

export type AddTeamFormData = {
  division: number[];
  is_virtual: boolean;
  name : string;
  team_members: CreateStudentFormData[];
}

export type CDMemberRegisterFormData = {
  email: string;
}
