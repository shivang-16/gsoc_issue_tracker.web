'use client';

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Organisation } from "@/lib/type";
import { fetchGSoCOrgDetails } from "@/actions/gsoc";
import Issues from "../../_components/Issues";
import { getOrgName } from "../../_components/issueFilter";
import { ClipLoader } from 'react-spinners'; // Import spinner loader


const OrganizationDetails = () => {
  const params = useParams();
  const { orgId } = params;
  const [orgDetails, setOrgDetails] = useState<Organisation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeYear, setActiveYear] = useState<string | null>(null);
  const [orgname, setorgname] = useState<any>(null);

  useEffect(() => {
    if (!orgId) return;

    const fetchOrgDetails = async () => {
      try {
        const response = await fetchGSoCOrgDetails(orgId);
        setOrgDetails(response);

    const name = await getOrgName(response?.github || '');
    setorgname(name);
        const firstYear = Object.keys(response.gsoc_years)[0];
        setActiveYear(firstYear);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrgDetails();


  }, [orgId]);

  if (loading)
    return  <div className="flex justify-center items-center w-full h-full text-center my-4">
  <ClipLoader color="#fff" loading={loading} size={50} />
</div>;

  if (error)
    return <div className="flex justify-center items-center h-screen text-xl text-red-500">Error: {error}</div>;

  return (
    <div className="p-8 bg-transparent text-gray-300 min-h-screen m-auto h-full overflow-auto">
      {orgDetails ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Main Content */}
          <div className="col-span-2 bg-transparent border-2 rounded-lg shadow-lg overflow-hidden">
            <div className="p-6">
              {/* Header Section */}
              <div className="flex items-center gap-6 mb-6">
                <img
                  src={orgDetails.image_url}
                  alt={orgDetails.organisation}
                  className="h-16 rounded-xl p-3"
                  style={{ backgroundColor: orgDetails.image_background_color }}
                />
                <div>
                  <h1 className="text-3xl font-bold text-gray-100">{orgDetails.organisation}</h1>
                  <p className="text-gray-400 mt-2">{orgDetails.description}</p>
                </div>
              </div>

              {/* Social Media Links */}
              <div className="flex flex-col gap-4 mt-6">
                <h2 className="text-xl font-semibold text-gray-200">Connect with Us:</h2>
                <div className="flex space-x-4 items-center">
                  {orgDetails.twitter_url && (
                    <a
                      href={orgDetails.twitter_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-neutral-600 dark:text-neutral-300 hover:text-blue-500 text-2xl"
                    >
                      <i className="fab fa-twitter"></i>
                    </a>
                  )}
                  {orgDetails.github && (
                    <a
                      href={orgDetails.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-neutral-600 dark:text-neutral-300 hover:text-black text-2xl"
                    >
                      <i className="fab fa-github"></i>
                    </a>
                  )}
                  {orgDetails.blog_url && (
                    <a
                      href={orgDetails.blog_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-neutral-600 dark:text-neutral-300 hover:text-green-500 text-2xl"
                    >
                      <i className="fas fa-blog"></i>
                    </a>
                  )}
                  {orgDetails.url && (
                    <a
                      href={orgDetails.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-neutral-600 dark:text-neutral-300 hover:text-purple-500 text-2xl"
                    >
                      <i className="fas fa-globe"></i>
                    </a>
                  )}
                  {orgDetails.contact_email && (
                    <a
                      href={`mailto:${orgDetails.contact_email}`}
                      className="text-neutral-600 dark:text-neutral-300 hover:text-red-500 text-2xl"
                    >
                      <i className="fas fa-envelope"></i>
                    </a>
                  )}
                </div>
              </div>

              {/* Technologies and Topics */}
              <div className="flex flex-wrap justify-between gap-6 mt-6">
                <div className="w-full">
                  <h2 className="text-lg font-semibold text-gray-200">Technologies:</h2>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {orgDetails.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="bg-transparent hover:bg-gradient-to-r from-[#1a2c22] via-[#193828] to-[#1c422c] border-2 text-gray-300 px-3 py-1 rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <h2 className="text-lg font-semibold text-gray-200 mt-4">Topics:</h2>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {orgDetails.topics.map((topic, index) => (
                      <span
                        key={index}
                        className="bg-transparent border-2 hover:bg-gradient-to-r from-[#1a2c22] via-[#193828] to-[#1c422c] text-gray-300 px-3 py-1 rounded-full text-sm"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* GSoC Years Tabs */}
              <h2 className="text-xl font-semibold text-gray-200 mt-10">GSoC Years:</h2>
              <div className="flex gap-4 mt-4">
                {Object.keys(orgDetails.gsoc_years).map((year) => (
                  <button
                    key={year}
                    className={`px-4 py-2 rounded-lg text-gray-200 font-semibold ${
                      activeYear === year
                        ? "bg-gradient-to-r from-[#233c2e] via-[#224733] to-[#1c422c]"
                        : "bg-transparent border-2 hover:bg-gray-700"
                    }`}
                    onClick={() => setActiveYear(year)}
                  >
                    {year}
                  </button> 
                ))}
              </div>

              {/* GSoC Year Projects */}
              {activeYear && orgDetails.gsoc_years[activeYear] && (
                <div className="bg-transparent p-4 rounded-lg shadow-md mt-2">
                  {/* <h3 className="text-lg font-semibold text-gray-300">{activeYear}</h3> */}
                  <p>Total Projects: {orgDetails.gsoc_years[activeYear].projects.length}</p>
                  <ul className="grid grid-cols-1 gap-4 mt-4">
                    {orgDetails.gsoc_years[activeYear].projects.map((project, index) => (
                      <li key={index} className="border-2 px-4 py-2 rounded-lg border-gray-600">
                        <h5 className="font-bold text-gray-300">{project.title}</h5>
                        <p className="text-gray-400">{project.short_description}</p>
                        <p>
                          <strong className="text-gray-400">Contributor:</strong>{" "}
                          {project.student_name}
                        </p>
                        <p>
                          <strong className="text-gray-400">Code:</strong>{" "}
                          {project.code_url ? (
                            <a
                              href={project.code_url}
                              target="_blank"
                              className="text-blue-400 underline"
                            >
                              <i className="fas fa-code"></i>
                            </a>
                          ) : (
                            "Not available"
                          )}
                        </p>
                        <p>
                          <strong className="text-gray-400">Project:</strong>{" "}
                          <a
                            href={project.project_url}
                            target="_blank"
                            className="text-blue-400 underline"
                          >
                            <i className="fas fa-external-link-alt"></i>
                          </a>
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Issues Section */}
          <div className="bg-transparent border-2 rounded-lg shadow-lg p-6 h-full overflow-auto">
        <Issues filters={{ organizations: [orgname] }}/>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-400">No organization details found.</p>
      )}
    </div>
  );
};

export default OrganizationDetails;
