'use client';
import apiClient from '@/apiClient/apiClient';
import React, { useEffect, useState } from 'react';
import Select, { MultiValue } from 'react-select';

const SearchFilters = ({ onFilterChange }: { onFilterChange: (filter: any) => void }) => {
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

  const customStyles = {
    container: (provided: any) => ({
      ...provided,
      width: '100%',
    }),
    control: (provided: any, state: { isFocused: any }) => ({
      ...provided,
      backgroundColor: 'black',
      borderColor: '#777',
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
    option: (provided: any, state: { isFocused: any }) => ({
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

  const handleOrganizationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setOrganizationSearch(value);
    onFilterChange((prev: any) => ({ ...prev, organization: value }));
  };

  const handleTechnologyChange = (newValue: MultiValue<{ value: string; label: string }>) => {
    const selectedValues = newValue?.map((option) => option.value) || [];
    onFilterChange((prev: any) => ({ ...prev, technologies: selectedValues }));
  };

  const handleYearChange = (newValue: MultiValue<{ value: string; label: string }>) => {
    const selectedValues = newValue?.map((option) => option.value) || [];
    onFilterChange((prev: any) => ({ ...prev, gsoc_years: selectedValues }));
  };

  const handleTopicChange = (newValue: MultiValue<{ value: string; label: string }>) => {
    const selectedValues = newValue?.map((option) => option.value) || [];
    onFilterChange((prev: any) => ({ ...prev, topics: selectedValues }));
  };

  return (
    <div className="search-filters-container">
      <div className="search-item">
        <input
          value={organizationSearch}
          placeholder="Search Organizations"
          onChange={handleOrganizationChange}
          className="search-input"
        />
      </div>
      <div className="search-item">
        <Select
          options={technologyOptions}
          placeholder="Technologies"
          styles={customStyles}
          isMulti
          onChange={handleTechnologyChange}
        />
      </div>
      <div className="search-item">
        <Select
          options={yearOptions}
          placeholder="Year(s)"
          styles={customStyles}
          isMulti
          onChange={handleYearChange}
        />
      </div>
      <div className="search-item">
        <Select
          options={topicOptions}
          placeholder="Topic(s)"
          styles={customStyles}
          isMulti
          onChange={handleTopicChange}
        />
      </div>
    </div>
  );
};

export default SearchFilters;
