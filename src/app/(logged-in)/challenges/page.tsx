import * as React from "react";
import {NextUIProvider} from "@nextui-org/system";
import ChallengesTable from "../../../components/ChallengesTable";

export default function Page() {
  return (
    <NextUIProvider>
      <ChallengesTable />
    </NextUIProvider>
  );
}
