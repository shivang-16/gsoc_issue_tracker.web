'use client';
import Link from "next/link";
import Gsoc_Orgs from "./Gsoc_Orgs";
import Issues from "./Issues";
import SearchFilters from "./filters";
import { useState } from "react";
import IssueFilter from "./issueFilter";

export const Dashboard = () => {
  // State to manage filter values
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

    // console.log(issueFilters, "isue filter");

  return (
    <div className="flex flex-1 mx-auto">
      <div className="flex flex-col lg:flex-row w-full">
        {/* Top Issues Section */}
        <div className="flex-1 lg:h-full h-[400px]">
          <div className="p-4 md:p-10 rounded-md border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-4 h-full shadow-lg">
            <div className="flex justify-between items-center gap-2 w-full mt-10 mx-auto">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Top Issues</h2>
              <Link href="/gsoc-issues" className="text-blue-500 hover:text-blue-700 font-semibold border-b-2">
                Full Screen
              </Link>
            </div>
            <IssueFilter onFilterChange={setIssueFilters} />
            <div className="overflow-scroll rounded-lg shadow-md h-full">
              <Issues filters={issueFilters} />
            </div>
          </div>
        </div>

        {/* GSoC Orgs Section */}
        <div className="flex-1 lg:h-full h-[400px]">
          <div className="p-4 md:p-10 rounded-md border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-4 h-full shadow-lg">
            <div className="flex justify-between items-center gap-2 w-full mt-10 mx-auto">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Top GSoC Organizations</h2>
              <Link href="/gsoc-orgs" className="text-blue-500 hover:text-blue-700 font-semibold border-b-2">
                Full Screen
              </Link>
            </div>

            {/* Pass setFilters to update the filter state */}
            <SearchFilters onFilterChange={setFilters} />

            {/* Pass filters as props to Gsoc_Orgs */}
            <div className="overflow-y-auto rounded-md shadow-md h-full">
              <Gsoc_Orgs top={true} filters={filters} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
