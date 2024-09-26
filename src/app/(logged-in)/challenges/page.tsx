"use client"
import * as React from "react";
import {NextUIProvider} from "@nextui-org/system";
import ChallengesTable from "../../../components/ChallengesTable";
import { Challenges } from "@/types/challenges.types";
import { BASE_API_URI } from "@/utils/constants";

export default function Page() {
  const [data, setData] = React.useState<Challenges[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
      const fetchData = async () => {
          const curr_year = new Date().getFullYear();
          const endpoint = `/challenges/get?year=${curr_year}`
          try {
              const response = await fetch(`${BASE_API_URI}${endpoint}`);
              if (!response.ok) {
              throw new Error('Network response was not ok');
              }
              const result = await response.json();
              setData(result.challenges);
          } catch (err: any) {
              setError(err.message);
          } finally {
              setLoading(false);
          }
      };

      fetchData();
  }, []);

  if (loading) return <div className="flex justify-center items-center h-100 text-bold">Loading...</div>;
  if (error) return <div className="flex justify-center items-center h-100 text-bold">Error: {error}</div>;
  return (
    <NextUIProvider>
      <ChallengesTable challengesData={data} />
    </NextUIProvider>
  );
}
