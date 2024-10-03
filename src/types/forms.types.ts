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
  division: number;
  is_virtual: boolean;
  team_members: CreateStudentFormData[];
}
