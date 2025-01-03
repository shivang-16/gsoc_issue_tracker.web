'use client';
import React, { useEffect, useState } from "react";
import { ClipLoader } from 'react-spinners';  // Import spinner loader

type Issue = {
  title: string;
  html_url: string;
  description: string;
  number: number;
  user: {
    login: string;
  };
  created_at: string;
  body: string;
  state: string;
  comments: number;
  labels: { name: string }[];
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
  const [page, setPage] = useState<number>(1); // Pagination state
  const [hasMore, setHasMore] = useState<boolean>(true); // To check if there are more issues to load

  const fetchIssues = async (page: number) => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/gsoc/issues/popular?label=${filters.label}&organizations=${filters.organizations}&page=${page}`, {
        method: 'GET',
        credentials: 'include',
      });
      
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
  
      const res = await response.json();
      const data = res.issues;

      if (Array.isArray(data) && data.length > 0) {
        setIssues((prevIssues) => [...prevIssues, ...data]); // Append new issues
        if (data.length < 10) setHasMore(false); // Check if fewer issues are returned
      } else {
        setHasMore(false); // No more issues to load
      }
    } catch (error) {
      console.error('Error fetching GitHub issues:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Reset page and issues on filter change
    setPage(1);
    setIssues([]); // Clear previous issues when filters change
    setHasMore(true); // Reset "hasMore" when filters change

    fetchIssues(1);
  }, [filters]);

  const loadMoreIssues = () => {
    if (hasMore) setPage((prevPage) => prevPage + 1); // Increment page number
  };

  return (
    <div className="container mx-auto px-4 w-full m-auto">
      {loading && page === 1 ? (
        <div className="flex justify-center items-center h-64">
          <ClipLoader color="#fff" loading={loading} size={50} />
        </div>
      ) : (
        <div>
          <div className="grid grid-rows-1 sm:grid-rows-2 gap-4">
            {issues && issues.length > 0 && issues.map((issue, i) => (
              <div
                key={i}
                className="py-1 px-4 bg-[#141414] border-2 border-gray-800 rounded-2xl shadow-md flex items-center justify-between"
              >
                <div>
                  <div className="flex-col inline-block">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-semibold text-white">
                          <span className="text-gray-400">#{issue.number}</span> {issue.title}
                        </h3>
                        <span className="px-2 bg-green-800 border-2 border-gray-600 text-white rounded-full mr-2">{issue.state}</span>
                      </div>

                      {issue.labels.slice(0, 4).map((label, index) => {
                        const labelParts = label.name.split(':');
                        const displayName = labelParts.length > 1 ? labelParts[1].trim() : label.name;

                        let labelColor = colors[Math.floor(Math.random() * colors.length)];
                        if (displayName.toLowerCase() === 'bug') labelColor = 'bg-red-500';
                        if (displayName.toLowerCase() === 'in progress') labelColor = 'bg-yellow-500';
                        if (displayName.toLowerCase() === 'good first issue') labelColor = 'bg-purple-500';

                        return (
                          <span key={index} className={`ml-2 px-2 py-1 ${labelColor} text-white rounded-full text-xs`}>
                            {displayName}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                  <p className="text-sm mt-2 text-gray-400">{issue.user.login} opened on {new Date(issue.created_at).toLocaleDateString()}</p>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-400">{issue.comments} 💬</span>
                  <a
                    href={issue.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-1 bg-blue-500 text-white ml-3 rounded-2xl hover:bg-blue-600"
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
                className="px-6 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600"
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
