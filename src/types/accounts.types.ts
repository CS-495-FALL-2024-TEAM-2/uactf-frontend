export type CreateCrimsonDefenseRequest = {
  competition_id: string;
  email: string;
  role: string;
};

export type CreateTeacherRequest = {
  first_name: string;
  last_name: string;
  school_name: string;
  shirt_size: string;
  contact_number: string;
  email: string;
};

export type LoginRequest = {
    email: string,
    password: string
};
