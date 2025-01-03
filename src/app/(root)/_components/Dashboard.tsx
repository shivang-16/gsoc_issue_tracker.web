'use client';
import Link from "next/link";
import Gsoc_Orgs from "./Gsoc_Orgs";
import Issues from "./Issues";
import SearchFilters from "./filters";
import { useState } from "react";
import IssueFilter from "./issueFilter";
import {
  IconExternalLink,
} from "@tabler/icons-react";

export const Dashboard = () => {
  const [filters, setFilters] = useState({
    technologies: [],
    gsoc_years: [],
    topics: [],
  });

  const [issueFilters, setIssueFilters] = useState({
    state: [],
    label: [],
    organizations: [],
  });

  return (
    <div
      className="flex flex-1 mx-auto min-h-screen bg-transparent"
    >
      <div className="flex flex-col lg:flex-row border w-full">
        {/* Top Issues Section */}
        <div className="flex-1 h-full overflow-auto">
          <div className="p-4 md:p-6 rounded-md border-neutral-200 dark:border-neutral-700 bg-white dark:bg-transparent flex flex-col gap-4 shadow-lg">
            <div className="flex justify-between items-center gap-2 w-5/6 m-auto pt-5 sm:pt-14">
              <h2 className="text-lg sm:text-xl lg:text-xl font-bold text-gray-800 dark:text-white">
                Top Issues
              </h2>
              <Link
                href="/gsoc-issues"
                className="text-sm sm:text-base text-blue-500 hover:text-blue-700 font-semibold"
              >
        <IconExternalLink className="text-neutral-700 dark:text-blue-500 h-5 w-5 flex-shrink-0" />
        </Link>
            </div>
            <div className="sticky top-0">

            <IssueFilter onFilterChange={setIssueFilters} />
            </div>
            <div className="overflow-y-auto rounded-lg shadow-md h-[300px] sm:h-[400px] lg:h-full">
              <Issues filters={issueFilters} />
            </div>
          </div>
        </div>

        {/* GSoC Orgs Section */}
        <div className="flex-1 h-full overflow-auto">
          <div className="p-4 md:p-6 rounded-md border-neutral-200 dark:border-neutral-700 bg-white dark:bg-transparent flex flex-col gap-4 shadow-lg">
            <div className="flex justify-between items-center gap-2 w-5/6 m-auto pt-2 sm:pt-14">
              <h2 className="text-lg sm:text-xl lg:text-xl font-bold text-gray-800 dark:text-white">
                Top GSoC Organizations
              </h2>
              <Link
                href="/gsoc-orgs"
                className="text-sm sm:text-base text-blue-500 hover:text-blue-700 font-semibold "
              >
        <IconExternalLink className="text-neutral-700 dark:text-blue-500 h-5 w-5 flex-shrink-0" />
        </Link>
            </div>
            <div className="sticky top-4 bg-black rounded-3xl my-4">

            <SearchFilters onFilterChange={setFilters} />
            </div>
            <div className="overflow-y-auto rounded-md shadow-md h-[300px] sm:h-[400px] lg:h-full">
              <Gsoc_Orgs top={true} filters={filters} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
