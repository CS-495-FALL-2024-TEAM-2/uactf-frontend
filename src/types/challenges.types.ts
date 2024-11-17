export type Hint = {
    hint: string,
    point_cost: number
};

export type Challenges = {
    challenge_id: string;
    challenge_name: string,
    challenge_category: string,
    challenge_description: string,
    flag: string,
    is_flag_case_sensitive: boolean,
    points: number,
    division: number[],
    hints: Hint[],
    solution_explanation: string | null,
    challenge_file_attachment: string | null
}

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
    challenge_file_attachment: File | null;
};

export type UpdateChallengeRequest = {
    challenge_id: string;
    request_body: CreateChallengeRequest;
    is_challenge_file_changed: boolean;
};

export type ListChallenges = {
    challenge_id: string;
    challenge_name: string,
    challenge_category: string,
    challenge_description: string,
    points: number,
    division: number[],
}
