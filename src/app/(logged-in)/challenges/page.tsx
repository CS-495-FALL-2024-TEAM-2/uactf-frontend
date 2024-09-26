"use client"
import * as React from "react";
import {NextUIProvider} from "@nextui-org/system";
import ChallengesTable from "../../../components/ChallengesTable";
import { Challenges } from "@/types/challenges.types";
import { BASE_API_URI } from "@/utils/constants";
import { fetchData } from "@/utils/fetchData";

export default function Page() {
  const [data, setData] = React.useState<Challenges[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const curr_year = new Date().getFullYear();
    const endpoint = `${BASE_API_URI}/challenges/get?year=${curr_year}`;
    
    const fetchAndSetData = async () => {
      setLoading(true);
      try {
        const fetchedData = await fetchData(endpoint);
        setData(fetchedData.challenges);
      } catch (err: any) {
        setError(err.message); // Handle error
      } finally {
        setLoading(false);
      }
    };

    fetchAndSetData();
  }, [])


  if (loading) return <div className="flex justify-center items-center h-100 text-bold">Loading...</div>;
  if (error) return <div className="flex justify-center items-center h-100 text-bold">Error: {error}</div>;
  return (
    <NextUIProvider>
      <ChallengesTable challengesData={data} />
    </NextUIProvider>
  );
}
