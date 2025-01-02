'use client';
import React from 'react';
import Select from 'react-select';

const SearchFilters = () => {
  // Options for the dropdowns
  const technologyOptions = [
    { value: 'react', label: 'React' },
    { value: 'angular', label: 'Angular' },
    { value: 'vue', label: 'Vue' },
    { value: 'svelte', label: 'Svelte' },
    { value: 'nextjs', label: 'Next.js' },
  ];

  const yearOptions = [
    { value: '2016', label: '2016' },
    { value: '2017', label: '2017' },
    { value: '2018', label: '2018' },
    { value: '2019', label: '2019' },
    { value: '2020', label: '2020' },
    { value: '2021', label: '2021' },
    { value: '2022', label: '2022' },
    { value: '2023', label: '2023' },
    { value: '2024', label: '2024' },
  ];

  const topicOptions = [
    { value: 'frontend', label: 'Frontend' },
    { value: 'backend', label: 'Backend' },
    { value: 'fullstack', label: 'Fullstack' },
    { value: 'cloud', label: 'Cloud' },
    { value: 'datascience', label: 'Data Science' },
  ];

  // Custom styles for react-select to ensure dark mode and fixed width
  const customStyles = {
    container: (provided) => ({
      ...provided,
    }),
    control: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? '#333' : '#222',
      borderColor: '#444',
      color: '#fff',
      boxShadow: state.isFocused ? '0 0 0 2px #555' : 'none',
      '&:hover': {
        borderColor: '#555',
      },
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: '#333',
      color: '#fff',
    }),
    singleValue: (provided) => ({
      ...provided,
      color: '#fff',
    }),
    placeholder: (provided) => ({
      ...provided,
      color: '#aaa',
    }),
    input: (provided) => ({
      ...provided,
      color: '#fff',
    }),
  };

  return (
    <div className="rounded-md border-neutral-700 m-auto bg-neutral-900 flex gap-4 p-4 shadow-lg">
      <Select
        options={technologyOptions}
        placeholder="Search Technologies"
        styles={customStyles}
      />
      <Select
        options={yearOptions}
        placeholder="Select Year"
        styles={customStyles}
      />
      <Select
        options={topicOptions}
        placeholder="Select Topic"
        styles={customStyles}
      />
     
    </div>
  );
};

export default SearchFilters;
