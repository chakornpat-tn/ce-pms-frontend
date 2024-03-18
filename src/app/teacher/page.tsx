import React from "react";
import { DashboardCard, ColumnCard } from "../components/Cards";

type Props = {};

function page({}: Props) {
  return (
    <div className="min-h-screen bg-bg_primary">
      <div className="flex items-center justify-center bg-primary2-300">
        <div className="grid h-full grid-cols-2 items-center justify-between gap-48 py-16 ">
          <DashboardCard />
          <DashboardCard />
        </div>
      </div>
      <ColumnCard />
    </div>
  );
}

export default page;
