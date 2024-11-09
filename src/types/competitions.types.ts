export type CreateCompetitionRequest = {
    competition_name: string,
    registration_deadline: string,
    is_active: boolean
}
export type Competition = {
    competition_id: string
    competition_name: string
    registration_deadline: string
    is_active: boolean
};