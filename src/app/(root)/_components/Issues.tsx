'use client';
import React, { useEffect, useState } from "react";
import { ClipLoader } from 'react-spinners';

type Issue = {
  title: string;
  html_url: string;
  description: string;
  number: number;
  user: {
    login: string;
    avatar_url: string; // Added avatar_url
    html_url: string;   // Added html_url
  };
  created_at: string;
  body: string;
  state: string;
  comments: number;
  labels: { name: string }[];
  github: string; // Assuming github field exists in the issue object
};

const colors = [
  'bg-blue-800',
  'bg-brown-800',
  'bg-yellow-800',
  'bg-purple-800',
  'bg-pink-800',
  'bg-indigo-800',
  'bg-teal-800',
  'bg-orange-800',
];

export default function Issues({ filters }: { filters: any }) {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const fetchIssues = async (page: number) => {
    setLoading(true);
    try {
      const organizationsParam = Array.isArray(filters.organizations)
        ? filters.organizations.join(',')
        : filters.organizations;

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/gsoc/issues/popular?label=${filters.label}&organizations=${organizationsParam}&page=${page}`, {
        method: 'GET',
        // cache: 'force-cache',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const res = await response.json();
      const data = res.issues;

      if (Array.isArray(data) && data.length > 0) {
        setIssues((prevIssues) => [...prevIssues, ...data]);
        if (data.length < 10) setHasMore(false);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error fetching GitHub issues:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPage(1);
    setIssues([]);
    setHasMore(true);
  }, [filters]);

  useEffect(() => {
    if (page === 1 || hasMore) {
      fetchIssues(page);
    }
  }, [page, filters, hasMore]);

  const loadMoreIssues = () => {
    if (hasMore) setPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="container mx-auto px-4 w-full m-auto">
      {loading && page === 1 ? (
        <div className="flex justify-center items-center h-64">
          <ClipLoader color="#fff" loading={loading} size={50} />
        </div>
      ) : (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-1 gap-2">
            {issues && issues.length > 0 && issues.map((issue, i) => (
              <div
                key={i}
                className="py-2 px-3 sm:py-3 sm:px-4 border-2 border-gray-600 rounded-2xl shadow-md flex items-center justify-between flex-col sm:flex-row"
              >
                <div>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                    <h3 className="text-sm sm:text-lg font-semibold text-white">
                      <span className="text-gray-400">#{issue.number}</span> {issue.title} 
                      <span className="px-2 bg-green-800 border-2 border-gray-600 text-white rounded-full text-xs sm:text-sm">
                        {issue.state}
                      </span>
                    </h3>
                    
                  </div>

                  <div className="mt-2">
                    {issue.labels.slice(0, 4).map((label, index) => {
                      const labelParts = label.name.split(':');
                      const displayName = labelParts.length > 1 ? labelParts[1].trim() : label.name;

                      let labelColor = colors[Math.floor(Math.random() * colors.length)];
                      if (displayName.toLowerCase() === 'bug') labelColor = 'bg-red-500';
                      if (displayName.toLowerCase() === 'in progress') labelColor = 'bg-yellow-500';
                      if (displayName.toLowerCase() === 'good first issue') labelColor = 'bg-purple-500';

                      return (
                        <span key={index} className={`ml-1 px-2 py-1 text-xs sm:text-sm ${labelColor} text-white rounded-full`}>
                          {displayName}
                        </span>
                      );
                    })}
                  </div>
                  <p className="text-xs sm:text-sm mt-2 text-gray-400">
                    <a href={issue.user.html_url} target="_blank" rel="noopener noreferrer">
                      <img 
                        src={issue.user.avatar_url} 
                        alt={issue.user.login} 
                        className="w-4 h-4 rounded-full inline-block mr-2"
                      />
                      {issue.user.login}
                    </a> opened on {new Date(issue.created_at).toLocaleDateString()}
                  </p>
                  {/* Add Organization Name */}
                  <p className="text-xs sm:text-sm mt-1 text-gray-400 font-semibold ">
                    Organization: <span className="bg-[#1f2112] p-1 text-white px-2 rounded-full">{issue.html_url.split('/')[3]}</span>
                  </p>
                </div>
                <div className="flex items-center mt-2 sm:mt-0">
                  <span className="text-xs sm:text-sm text-gray-400">{issue.comments} 💬</span>
                  <a
                    href={issue.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-1 text-xs sm:text-sm border-2 border-green-800 bg-gradient-to-r from-green-900 via-green-700 to-green-900 text-white ml-3 rounded-xl hover:bg-blue-600"
                  >
                    View
                  </a>
                </div>
              </div>
            ))}
          </div>

          {hasMore && (
            <div className="flex justify-center mt-4">
              <button
                onClick={loadMoreIssues}
                className="px-6 py-2 bg-green-700 text-white rounded-full hover:bg-green-800"
                disabled={loading}
              >
                {loading ? 'Loading...' : 'Load More'}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
