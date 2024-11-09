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
