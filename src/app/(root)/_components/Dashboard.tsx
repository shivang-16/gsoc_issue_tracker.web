'use client';
import Link from "next/link";
import Gsoc_Orgs from "./Gsoc_Orgs";
import Issues from "./Issues";
import SearchFilters from "./filters";
import { useState } from "react";
import IssueFilter from "./issueFilter";

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
    <div className="flex flex-1 mx-auto">
      <div className="flex flex-col lg:flex-row border w-full">
        {/* Top Issues Section */}
        <div className="flex-1 border-b-4 h-full overflow-auto">
          <div className="p-4 md:p-6 rounded-md border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-4 shadow-lg">
            <div className="flex justify-between items-center gap-2 w-full pt-20">
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 dark:text-white">
                Top Issues
              </h2>
              <Link
                href="/gsoc-issues"
                className="text-sm sm:text-base text-blue-500 hover:text-blue-700 font-semibold border-b-2">
                Full Screen
              </Link>
            </div>
            <IssueFilter onFilterChange={setIssueFilters} />
            <div className="overflow-y-auto rounded-lg shadow-md h-[300px] sm:h-[400px] lg:h-full">
              <Issues filters={issueFilters} />
            </div>
          </div>
        </div>

        {/* GSoC Orgs Section */}
        <div className="flex-1 h-full overflow-auto">
          <div className="p-4 md:p-6 rounded-md border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-4 shadow-lg">
            <div className="flex justify-between items-center gap-2 w-full pt-5 sm:pt-20">
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 dark:text-white">
                Top GSoC Organizations
              </h2>
              <Link
                href="/gsoc-orgs"
                className="text-sm sm:text-base text-blue-500 hover:text-blue-700 font-semibold border-b-2">
                Full Screen
              </Link>
            </div>
            <SearchFilters onFilterChange={setFilters} />
            <div className="overflow-y-auto rounded-md shadow-md h-[300px] sm:h-[400px] lg:h-full overflow-auto">
              <Gsoc_Orgs top={true} filters={filters} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
