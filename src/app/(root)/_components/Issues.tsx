'use client';
import React, { useEffect, useState } from "react";
import Gsoc_Orgs from "./Gsoc_Orgs";
import apiClient from '@/apiClient/apiClient';

type Issue = {
  title: string;
  url: string;
  description: string;
};

export default function Issues() {
  const [issues, setIssues] = useState<Issue[]>([
    {
      "title": "Fix bug in API",
      "url": "https://github.com/example/repo/issues/1",
      "description": "A bug in the API causing crashes."
    },
    {
      "title": "Add unit tests",
      "url": "https://github.com/example/repo/issues/2",
      "description": "Missing unit tests for core functionality."
    }
  ]);

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        console.log('Fetching GitHub issues...');
        const response = await apiClient.get('/api/github/issues');
        console.log('Fetched GitHub issues:', response.data);
        setIssues(response.data);
      } catch (error) {
        console.error('Error fetching GitHub issues:', error);
      }
    };
    fetchIssues();
  }, []);

  return (
    <div className="container mx-auto px-4 w-2/3 m-auto">
      {/* Top Issues Section */}
        <div className="grid grid-rows-1 sm:grid-rows-2 gap-6">
          {issues.map((issue, i) => (
            <div
              key={i}
              className="p-4 bg-gray-800 rounded-lg shadow-md flex items-center justify-between"
            >
              <div>
                <h3 className="text-lg font-semibold text-white">{issue.title}</h3>
                <p className="text-sm text-gray-400">{issue.description}</p>
              </div>
              <a
                href={issue.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500"
              >
                Get started
              </a>
            </div>
          ))}
        </div>
    </div>
  );
}

