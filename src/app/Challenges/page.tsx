import * as React from "react";
import {NextUIProvider} from "@nextui-org/system";
import ChallengesTable from "../components/challengesTable";
import Nav from "../components/navbar";

export default function Page() {
  return (
    <NextUIProvider>
      <Nav />
      <ChallengesTable />
    </NextUIProvider>
  );
}