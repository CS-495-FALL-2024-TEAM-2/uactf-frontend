export type Hint = {
    hint: string,
    point_cost: number
};

export type Challenges = {
    challenge_id: string;
    challenge_name: string,
    category: string,
    challenge_description: string,
    flag: string,
    is_flag_case_sensitive: boolean,
    points: number,
    division: number[],
    hints: Hint[],
    solution_explanation: string | null,
    file_attachment: File | null,
}

// to be used in the create challenge form only
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

export type CreateChallengeRequest = {
    challenge_name: string;
    points: number;
    creator_name: string;
    division: number[];
    challenge_description: string;
    flag: string;
    is_flag_case_sensitive: boolean;
    challenge_category: string;
    verified: boolean;
    solution_explanation: string | null;
    hints: Hint[];
    // file_attachment: File | null;
};

export type ListChallenges = {
    challenge_id: string;
    challenge_name: string,
    category: string,
    challenge_description: string,
    points: number,
    division: number[],
}

export const columns = [
    {name: "ID", uid: "id"},
    {name: "NAME", uid: "name", sortable: true},
    {name: "CATEGORY", uid: "category", sortable: true},
    {name: "DESCRIPTION", uid: "description"},
    {name: "POINTS", uid: "points", sortable: true},
]