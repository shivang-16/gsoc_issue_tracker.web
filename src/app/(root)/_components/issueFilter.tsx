'use client';
import React, { useState, useEffect } from 'react';
import Select, { MultiValue, ActionMeta } from 'react-select';
import { fetchGSoCOrganizationsNames } from '@/actions/gsoc';

// Function to extract organization name from the GitHub URL
export const getOrgName = async (github: string): Promise<string> => {
  const url = new URL(github);
  const orgName = url.pathname.replace(/^\/|\/$/g, '');
  return orgName;
};

const IssueFilter = ({ onFilterChange }: { onFilterChange: (filter: any) => void }) => {
  const [labelSearch, setLabelSearch] = useState<string>('');
  const [filteredSuggestions, setFilteredSuggestions] = useState<{ value: string; label: string }[]>([
    { value: 'good first issue', label: 'Good First Issue' },
    { value: 'bug', label: 'Bug' },
    { value: 'enhancement', label: 'Enhancement' },
    { value: 'help wanted', label: 'Help Wanted' },
  ]);
  const [organizationOptions, setOrganizationOptions] = useState<any[]>([]);
  const [selectedOrganizations, setSelectedOrganizations] = useState<any[]>([]);

  const handleLabelChange = (event: { target: { value: string } }) => {
    const value = event.target.value;
    setLabelSearch(value);

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

  const fetchOrganizations = async () => {
    try {
      const response = await fetchGSoCOrganizationsNames();

      const orgs = await Promise.all(
        response.map(async (org) => ({
          label: org.organisation,
          value: await getOrgName(org.github),
        }))
      );

      setOrganizationOptions(orgs);
    } catch (error) {
      console.error('Error fetching organizations:', error);
    }
  };

  useEffect(() => {
    fetchOrganizations();
  }, []);

  const handleOrganizationSelect = (newValue: MultiValue<any>, actionMeta: ActionMeta<any>) => {
    setSelectedOrganizations([...newValue]);
    onFilterChange((prev: any) => ({
      ...prev,
      organizations: newValue ? newValue.map((option: { value: any }) => option.value) : [],
    }));
  };

  const customStyles = {
    container: (provided: any) => ({
      ...provided,
    }),
    control: (provided: any, state: { isFocused: boolean }) => ({
      ...provided,
      backgroundColor: state.isFocused ? '#333' : '#222',
      borderColor: '#444',
      boxShadow: state.isFocused ? '0 0 0 2px #555' : 'none',
      fontSize: '0.875rem', // Reduce font size
    }),
    menu: (provided: any) => ({
      ...provided,
      backgroundColor: '#333',
      color: '#fff',
    }),
    option: (provided: any, state: { isFocused: boolean }) => ({
      ...provided,
      backgroundColor: state.isFocused ? '#4A5568' : '#333',
      color: '#fff',
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

  return (
    <div className="rounded-md border-neutral-700 mx-auto w-full max-w-md bg-neutral-900 flex flex-col gap-4 p-4 shadow-lg sm:max-w-sm">
      <div className="flex flex-wrap gap-4">
        <div className="flex-1 w-full sm:w-1/2">
          <input
            value={labelSearch}
            placeholder="Eg. Good First Issue, Bug"
            onChange={handleLabelChange}
            className="bg-[#222] border-[rgb(68,68,68)] focus:ring-2 focus:ring-[#555] text-white rounded-md w-full px-3 py-2 text-sm"
            style={{
              borderWidth: '1px',
            }}
          />
          {labelSearch && filteredSuggestions.length > 0 && (
            <div className="absolute bg-[#222] border-[#444] rounded-md w-[200px] mt-2 z-10">
              {filteredSuggestions.map((suggestion) => (
                <div
                  key={suggestion.value}
                  className="px-3 py-2 text-white hover:bg-gray-600 cursor-pointer text-sm"
                  onClick={() => handleLabelChange({ target: { value: suggestion.label } })}
                >
                  {suggestion.label}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="flex-1 w-full sm:w-1/2">
          <Select
            options={organizationOptions}
            placeholder="Select Organization"
            styles={customStyles}
            onChange={handleOrganizationSelect}
            isMulti
            value={selectedOrganizations}
          />
        </div>
      </div>
    </div>
  );
};

export default IssueFilter;
