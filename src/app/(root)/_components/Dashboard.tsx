import Link from "next/link";
import Gsoc_Orgs from "./Gsoc_Orgs";
import Issues from "./Issues";
import SearchFilters from "./filters";
export const Dashboard = () => {
  return (
    <div className="flex flex-1 w-2/3 mx-auto">
      <div className="flex flex-col lg:flex-row w-full "> {/* Flex container for responsive layout */}
        
        {/* Top Issues Section */}
        <div className="flex-1 lg:h-full h-[400px] "> {/* Fixed height for responsiveness */}
          <div className="p-4 md:p-10 rounded-md border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-4 h-full shadow-lg">
            <div className="flex justify-between items-center gap-2 w-full mt-10 mx-auto">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Top Issues</h2>
              <Link href="/issues" className="text-blue-500 hover:text-blue-700 font-semibold border-b-2">
                View More
              </Link>
            </div>
            <div className="overflow-scroll rounded-lg shadow-md h-full"> {/* Set a fixed height */}
              <Issues />
            </div>
          </div>
        </div>

        {/* GSoC Orgs Section */}
        <div className="flex-1 lg:h-full h-[400px] "> {/* Fixed height for responsiveness */}
          <div className="p-4 md:p-10 rounded-md border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-4 h-full shadow-lg">
            <div className="flex justify-between items-center gap-2 w-full mt-10 mx-auto">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Top GSoC Organizations</h2>
              <Link href="/gsoc-orgs" className="text-blue-500 hover:text-blue-700 font-semibold border-b-2">
                View More
              </Link>
            </div>
            <SearchFilters /> {/* Render the search filters below the organizations */}

            <div className="overflow-y-auto rounded-md shadow-md h-full"> {/* Set a fixed height */}
              <Gsoc_Orgs top={true} />
            </div>
          </div>
        </div>

      </div>

      {/* Search Filters Section */}

    </div>
  );
};