// Student type definitions
export type LiabilityForm = {
  s3_key: string;
  filename: string;
  upload_date: Date;
};

// Main student type
export type StudentInfo = {
  id: string;
  student_account_id: string;
  team_id: number;
  first_name: string;
  last_name: string;
  created_at: Date;
  shirt_size: string;
  liability_form: LiabilityForm;
  is_verified: boolean;
};

// Teacher type definitions
export type TeacherInfo = {
  id: string;
  account_id: string;
  first_name: string;
  last_name: string;
  school_name: string;
  school_address: string;
  school_website: string;
  shirt_size: string;
  contact_number: string;
};
