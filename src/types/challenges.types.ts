export type Hint = {
    value: string,
    cost: number
};

export type challenges = {
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

export type listChallenges = {
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