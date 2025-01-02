'use client'
import React, { useState } from 'react'
import Issues from '../_components/Issues'

const page = () => {
    const [issueFilters, setIssueFilters] = useState({
        state: [],
        label: [],
        organizations: [],
        });

  return (
    <div className='h-full overflow-auto m-auto pt-20'>
        <Issues filters={issueFilters}/>
    </div>
  )
}

export default page