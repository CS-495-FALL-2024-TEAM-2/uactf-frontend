export const teamsData = [
  {
    id: '65763a2f8c24b89d12345678',
    teacher_id: '65763a2f8c24b89d87654321',
    competition_id: 'COMP2024_01',
    name: 'Bishop High School Team A',
    division: 1,
    is_virtual: false,
    is_verified: true,
  },
  {
    id: '65763a2f8c24b89d98765432',
    teacher_id: '65763a2f8c24b89d11223344',
    competition_id: 'COMP2024_02',
    name: 'Lincoln Middle School Team B',
    division: 2,
    is_virtual: true,
    is_verified: false,
  },
];

export const membersData = [
  {
    id: '65763a2f8c24b89d12345678',
    student_account_id: '65763a2f8c24b89d87654321',
    team_id: 1001,
    first_name: 'John',
    last_name: 'Smith',
    created_at: new Date('2024-01-15T08:30:00Z'),
    shirt_size: 'L',
    liability_form: {
      s3_key: 'forms/2024/john_smith_liability.pdf',
      filename: 'john_smith_liability.pdf',
      upload_date: new Date('2024-01-15T09:00:00Z'),
    },
    is_verified: true,
  },
  {
    id: '65763a2f8c24b89d98765432',
    student_account_id: '65763a2f8c24b89d11223344',
    team_id: 1001,
    first_name: 'Emma',
    last_name: 'Johnson',
    created_at: new Date('2024-01-16T10:30:00Z'),
    shirt_size: 'M',
    liability_form: {
      s3_key: 'forms/2024/emma_johnson_liability.pdf',
      filename: 'emma_johnson_liability.pdf',
      upload_date: new Date('2024-01-16T11:00:00Z'),
    },
    is_verified: false,
  },
];
