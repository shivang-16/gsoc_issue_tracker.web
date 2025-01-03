'use client'
import React, { useState } from 'react'
import Issues from '../_components/Issues'
import IssueFilter from '../_components/issueFilter';

const page = () => {
    const [issueFilters, setIssueFilters] = useState({
        state: '',
        label: '',
        organizations: [],
        });

  return (
    <div className='h-full overflow-auto m-auto pt-20'>
        <div className='mb-10'>
        <IssueFilter onFilterChange={setIssueFilters}/>

        </div>
        <Issues filters={issueFilters}/>
    </div>
  )
}

export default page