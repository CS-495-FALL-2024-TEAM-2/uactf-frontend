import { Competition } from "@/types/competitions.types"
import { BASE_API_URI } from "@/utils/constants";
import { useQuery } from "@tanstack/react-query";

export const useGetCompetitions = (isCurrent?: boolean) : {
    isPending: boolean,
    error: Error | null,
    data: {
        competitions: Competition[]
    }
} => {
    const endpoint = isCurrent === true ? `${BASE_API_URI}/competitions/get/current` : `${BASE_API_URI}/competitions/get`;

    // query
    const { isPending, error, data} = useQuery({
        queryKey: isCurrent === true ? ['competitions', 'current'] : ['competitions'],
        queryFn: async () => {
            const response = await fetch(endpoint);
            if (!response.ok) {
                throw new Error('Network response was not ok')
            }
            return response.json();
        }
    });

    return {isPending, error, data};
}