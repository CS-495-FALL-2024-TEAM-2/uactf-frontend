export type CreateCrimsonDefenseRequest = {
  competition_id: string;
  email: string;
  role: string;
};

export type CreateTeacherRequest = {
  first_name: string;
  last_name: string;
  school_name: string;
  school_address: string;
  school_website: string;
  shirt_size: string;
  contact_number: string;
  email: string;
};

export type LoginRequest = {
    email: string,
    password: string
};
