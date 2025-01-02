'use client';
import apiClient from '@/apiClient/apiClient';
import React, { useEffect, useState } from 'react';
import Select, { MultiValue, ActionMeta } from 'react-select';

const SearchFilters = ({ onFilterChange }: { onFilterChange: (filter: any) => void }) => {
  // State to hold options and search input
  const [technologyOptions, setTechnologyOptions] = useState([]);
  const [yearOptions, setYearOptions] = useState([
    { value: '2016', label: '2016' },
    { value: '2017', label: '2017' },
    { value: '2018', label: '2018' },
    { value: '2019', label: '2019' },
    { value: '2020', label: '2020' },
    { value: '2021', label: '2021' },
    { value: '2022', label: '2022' },
    { value: '2023', label: '2023' },
    { value: '2024', label: '2024' },
  ]);
  const [topicOptions, setTopicOptions] = useState([]);
  const [organizationSearch, setOrganizationSearch] = useState('');

  // Fetch options from API
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const techResponse = await apiClient.get('/api/data/fetch?type=technologies');
        const techData = techResponse.data;
        setTechnologyOptions(techData.data.map((item: string) => ({ value: item, label: item })));

        const topicResponse = await apiClient.get('/api/data/fetch?type=topics');
        const topicData = topicResponse.data;
        setTopicOptions(topicData.data.map((item: string) => ({ value: item, label: item })));
      } catch (error) {
        console.error('Error fetching options:', error);
      }
    };

    fetchOptions();
  }, []);

  // Custom styles for react-select and input
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
      backgroundColor: state.isFocused ? '#4A5568' : '#333', // gray-800 on hover
      color: '#fff',
      '&:hover': {
        backgroundColor: '#4A5568', // gray-800
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

  // Handlers for filter changes
  const handleOrganizationChange = (event: { target: { value: any; }; }) => {
    const value = event.target.value;
    setOrganizationSearch(value);
    onFilterChange((prev: any) => ({ ...prev, organization: value }));
  };

  const handleTechnologyChange = (newValue: MultiValue<{ value: string; label: string }>, actionMeta: ActionMeta<{ value: string; label: string }>) => {
    const selectedValues = newValue?.map((option: { value: any; }) => option.value) || [];
    onFilterChange((prev: any) => ({ ...prev, technologies: selectedValues }));
  };

  const handleYearChange = (newValue: MultiValue<{ value: string; label: string }>, actionMeta: ActionMeta<{ value: string; label: string }>) => {
    const selectedValues = newValue?.map((option: { value: any; }) => option.value) || [];
    onFilterChange((prev: any) => ({ ...prev, gsoc_years: selectedValues }));
  };

  const handleTopicChange = (selectedOptions:any) => {
    const selectedValues = selectedOptions?.map((option: { value: any; }) => option.value) || [];
    onFilterChange((prev: any) => ({ ...prev, topics: selectedValues }));
  };

  return (
    <div className="rounded-md border-neutral-700 m-auto items-center justify-center bg-neutral-900 flex flex-wrap gap-4 p-4 shadow-lg">
      <div style={{ width: '250px' }}>
        <input
          value={organizationSearch}
          placeholder="Search Organizations"
          onChange={handleOrganizationChange}
          className="bg-[#222] border-[#444] focus:ring-2 focus:ring-[#555] text-white rounded-md w-full px-3 py-2"
          style={{
            borderWidth: '1px',
          }}
        />
      </div>
      <Select
        options={technologyOptions}
        placeholder="Search Technologies"
        styles={customStyles}
        isMulti
        onChange={handleTechnologyChange}
      />
      <Select
        options={yearOptions}
        placeholder="Select Year(s)"
        styles={customStyles}
        isMulti
        onChange={handleYearChange}
      />
      <Select
        options={topicOptions}
        placeholder="Select Topic(s)"
        styles={customStyles}
        isMulti
        onChange={handleTopicChange}
      />
    </div>
  );
};

export default SearchFilters;
