'use client';
import React, { useState, useEffect } from 'react';
import Select, { MultiValue, ActionMeta } from 'react-select';
import { fetchGSoCOrganizations } from '@/actions/gsoc';

// Function to extract organization name from the GitHub URL
export const getOrgName = async (github: string): Promise<string> => {
  const url = new URL(github);
  const orgName = url.pathname.replace(/^\/|\/$/g, '');
  return orgName;
};

const IssueFilter = ({ onFilterChange }: { onFilterChange: (filter: any) => void }) => {
  const [labelSearch, setLabelSearch] = useState<string>('');
  const [filteredSuggestions, setFilteredSuggestions] = useState<{value: string; label: string}[]>([
    { value: 'good first issue', label: 'Good First Issue' },
    { value: 'bug', label: 'Bug' },
    { value: 'enhancement', label: 'Enhancement' },
    { value: 'help wanted', label: 'Help Wanted' },
  ]);
  const [selectedIssueState, setSelectedIssueState] = useState<any>([]);
  const [organizationOptions, setOrganizationOptions] = useState<any[]>([]);
  const [selectedOrganizations, setSelectedOrganizations] = useState<any[]>([]);

  // Handle organization search input change
  const handleLabelChange = (event: { target: { value: any; }; }) => {
    const value = event.target.value;
    setLabelSearch(value);

    // Filter suggestions based on the input value
    if (value) {
      setFilteredSuggestions(
        [
          { value: 'good first issue', label: 'Good First Issue' },
          { value: 'bug', label: 'Bug' },
          { value: 'enhancement', label: 'Enhancement' },
          { value: 'help wanted', label: 'Help Wanted' },
        ].filter((item) => item.label.toLowerCase().includes(value.toLowerCase()))
      );
    } else {
      setFilteredSuggestions([]);
    }

    onFilterChange((prev: any) => ({ ...prev, label: value }));
  };

  // Handle selecting an organization suggestion
  const handleSuggestionSelect = (suggestion: string) => {
    setLabelSearch(suggestion);
    setFilteredSuggestions([]);
    onFilterChange((prev: any) => ({ ...prev, label: suggestion }));
  };

  // Handle GitHub issue state selection
  const handleIssueStateChange = (newValue: MultiValue<any>, actionMeta: ActionMeta<any>) => {
    setSelectedIssueState([...newValue]);
    onFilterChange((prev: any) => ({
      ...prev,
      state: newValue ? newValue.map((option: { value: any; }) => option.value) : [],
    }));
  };

  const fetchOrganizations = async () => {
    try {
      const response = await fetchGSoCOrganizations();
  
      // Map and resolve all promises
      const orgs = await Promise.all(
        response.map(async (org) => ({
          label: org.organisation, // Organization name as the label
          value: await getOrgName(org.github), // GitHub URL as the value
        }))
      );
  
      // Update state with the resolved array
      setOrganizationOptions(orgs);
    } catch (error) {
      console.error('Error fetching organizations:', error);
    }
  };

  useEffect(() => {
    fetchOrganizations();
  }, []);

  // Handle selecting an organization
  const handleOrganizationSelect = (newValue: MultiValue<any>, actionMeta: ActionMeta<any>) => {
    setSelectedOrganizations([...newValue]);
    onFilterChange((prev: any) => ({
      ...prev,
      organizations: newValue ? newValue.map((option: { value: any; }) => option.value) : [],
    }));
  };

  // Custom styles for react-select
  const customStyles = {
    container: (provided: any) => ({
      ...provided,
      width: '250px',
    }),
    control: (provided: any, state: { isFocused: any; }) => ({
      ...provided,
      backgroundColor: state.isFocused ? '#333' : '#222',
      borderColor: '#444',
      boxShadow: state.isFocused ? '0 0 0 2px #555' : 'none',
      '&:hover': {
        borderColor: '#555',
      },
    }),
    menu: (provided: any) => ({
      ...provided,
      backgroundColor: '#333',
      color: '#fff',
    }),
    option: (provided: any, state: { isFocused: any; }) => ({
      ...provided,
      backgroundColor: state.isFocused ? '#4A5568' : '#333',
      color: '#fff',
      '&:hover': {
        backgroundColor: '#4A5568',
      },
    }),
    multiValue: (provided: any) => ({
      ...provided,
      backgroundColor: '#444',
    }),
    multiValueLabel: (provided: any) => ({
      ...provided,
      color: '#fff',
    }),
    multiValueRemove: (provided: any) => ({
      ...provided,
      color: '#fff',
      '&:hover': {
        backgroundColor: '#555',
        color: '#fff',
      },
    }),
    singleValue: (provided: any) => ({
      ...provided,
      color: '#fff',
    }),
    placeholder: (provided: any) => ({
      ...provided,
      color: '#aaa',
    }),
    input: (provided: any) => ({
      ...provided,
      color: '#fff',
    }),
  };

  // Options for GitHub issue states
  const issueStates = [
    { value: 'open', label: 'Open' },
    { value: 'closed', label: 'Closed' },
    { value: 'all', label: 'All' },
  ];

  return (
    <div className="rounded-md border-neutral-700 m-auto items-center justify-center bg-neutral-900 flex flex-wrap gap-4 p-4 shadow-lg">
      <div style={{ width: '250px' }}>
        <input
          value={labelSearch}
          placeholder="Search type"
          onChange={handleLabelChange}
          className="bg-[#222] border-[#444] focus:ring-2 focus:ring-[#555] text-white rounded-md w-full px-3 py-2"
          style={{
            borderWidth: '1px',
          }}
        />
        {/* Display filtered suggestions */}
        {labelSearch && filteredSuggestions.length > 0 && (
          <div className="absolute bg-[#222] border-[#444] rounded-md w-1/4 mt-2 z-10">
            {filteredSuggestions.map((suggestion) => (
              <div
                key={suggestion.value}
                className="px-3 py-2 text-white hover:bg-gray-600 cursor-pointer"
                onClick={() => handleSuggestionSelect(suggestion.label)}
              >
                {suggestion.label}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* <Select
        options={issueStates}
        placeholder="Select Issue State"
        styles={customStyles}
        onChange={handleIssueStateChange}
        isMulti
        value={selectedIssueState}
      /> */}
        <Select
          options={organizationOptions}
          placeholder="Select Organization"
          styles={customStyles}
          onChange={handleOrganizationSelect}
          isMulti
          value={selectedOrganizations}
        />
      </div>
  );
};

export default IssueFilter;
