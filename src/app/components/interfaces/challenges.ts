export type challenges = {
    id: number;
    name: string,
    category: string,
    description: string,
    flag: string,
    points: number,
    hint: string
}

export const columns = [
    {name: "ID", uid: "id"},
    {name: "NAME", uid: "name", sortable: true},
    {name: "CATEGORY", uid: "category", sortable: true},
    {name: "DESCRIPTION", uid: "description"},
    {name: "FLAG", uid: "flag", sortable: true},
    {name: "POINTS", uid: "points", sortable: true},
    {name: "HINT", uid: "hint"},
]