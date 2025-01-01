import Gsoc_Orgs from "./Gsoc_Orgs";
import Issues from "./Issues";

export const Dashboard = () => {
    return (
      <div className="flex flex-1 w-2/3">
        <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full">
          <div className="flex gap-2">
          <h2 className="text-2xl font-bold mb-6 text-white">Top Issues</h2>

            <Issues/>
          </div>
          <div className="flex gap-2 flex-1 overflow-auto">
          <h2 className="text-2xl font-bold mb-6 text-white">Top Issues</h2>

           <Gsoc_Orgs/>
          </div>
        </div>
      </div>
    );
  };