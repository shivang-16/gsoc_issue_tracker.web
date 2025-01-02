'use client';
import React, { useEffect, useState } from "react";
import Gsoc_Orgs from "./Gsoc_Orgs";
import apiClient from '@/apiClient/apiClient';

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
  labels: { name: string }[]; // Add labels property
};

const colors = [
  'bg-blue-800',
  'bg-green-800',
  'bg-yellow-800',
  'bg-purple-800',
  'bg-pink-800',
  'bg-indigo-800',
  'bg-teal-800',
  'bg-orange-800',
];

export default function Issues() {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const storedIssues = localStorage.getItem('issues');
    if (storedIssues) {
      setIssues(JSON.parse(storedIssues)); // Set issues from local storage
      setLoading(false); // Set loading to false since we have data
    } else {
      fetchIssues(); // Fetch issues if none are in local storage
    }
  }, []);

  const fetchIssues = async () => {
    try {
      console.log('Fetching GitHub issues...');
      const response = await apiClient.get('/api/gsoc/issues/popular');
      console.log('Fetched GitHub issues:', response.data);
      setIssues(response.data);
      localStorage.setItem('issues', JSON.stringify(response.data)); // Store fetched issues in local storage
    } catch (error) {
      console.error('Error fetching GitHub issues:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 w-full m-auto">
      {/* Top Issues Section */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <span className="text-white">Loading issues...</span>
        </div>
      ) : (
        <div className="grid grid-rows-1 sm:grid-rows-2 gap-4">
          {issues.map((issue, i) => (
            <div
              key={i}
              className="py-1 px-4 bg-[#141414] border-2 border-gray-800 rounded-2xl shadow-md flex items-center justify-between"
            >
              <div>
                <div className="flex-col inline-block">
                  <div className="flex items-center">
                  <h3 className="text-lg font-semibold text-white"><span className="text-gray-400">#{issue.number}</span> {issue.title}
                  </h3>
                  {issue.labels.map((label, index) => {
  const labelParts = label.name.split(':');
  const displayName = labelParts.length > 1 ? labelParts[1].trim() : label.name; // Get the part after the first colon

  // Define color mapping
  let labelColor;
  if (displayName.toLowerCase() === 'bug') {
    labelColor = 'bg-red-500'; // Red for bug
  } else if (displayName.toLowerCase() === 'in progress') {
    labelColor = 'bg-yellow-500'; // Yellow for in progress
  } else if (displayName.toLowerCase() === 'good first issue') {
    labelColor = 'bg-purple-500'; // Purple for good first issue
  } else {
    // Randomly select a color from the colors array
    labelColor = colors[Math.floor(Math.random() * colors.length)];
  }

  return (
    <span key={index} className={`ml-2 px-2 py-1 ${labelColor} text-white rounded-full text-xs`}>
      {displayName} {/* Display the part after the first colon */}
    </span>
  );
})}        </div>
               
                
                <span className="px-2 py-1 bg-green-500 text-white rounded-full mr-2">{issue.state}</span>
                </div>
                
              
                <p className="text-sm mt-2 text-gray-400">{issue.user.login} opened on {new Date(issue.created_at).toLocaleDateString()}</p>
                {/* <p className="text-sm text-gray-400">{issue.body}</p> */}
              </div>
              <div className="flex items-center">
                <span className="text-gray-400">{issue.comments} 💬</span>
                <a
                  href={issue.html_url} // Link to the issue's URL
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
      )}
    </div>
  );
}
