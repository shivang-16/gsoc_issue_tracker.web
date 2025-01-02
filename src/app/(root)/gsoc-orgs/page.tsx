import React from 'react'
import Gsoc_Orgs from '../_components/Gsoc_Orgs'
import { div } from 'framer-motion/client'

const page = () => {
  return (
    <div className='h-full overflow-auto m-auto'>
    <Gsoc_Orgs top={false}/>

    </div>
  )
}

export default page