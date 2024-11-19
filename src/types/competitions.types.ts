export type CreateCompetitionRequest = {
    competition_name: string;
    registration_deadline: string;
    is_active: boolean;
    liability_release_form_file: File | null;
}
export type Competition = {
    competition_id: string
    competition_name: string
    registration_deadline: string
    is_active: boolean,
    liability_release_form: string
};


export type UpdateCompetitionRequest = {
    competition_id: string;
    request_body: CreateCompetitionRequest;
    is_liability_release_form_changed: boolean;
};