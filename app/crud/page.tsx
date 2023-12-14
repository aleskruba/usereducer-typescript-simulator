"use client"
import React from 'react'
import FormComponent from '@/components/FormComponent'
import ArrayComponent from '@/components/ArrayComponent'
import { useThemeContext } from '@/components/theme-context'

function Crud() {

  const {theme} = useThemeContext()

  return (
      
    <div className={`grid grid-cols-1 md:grid-cols-2 pt-24  h-screen ${theme === 'dark' ? 'bg-gray-500 text-white' : null}`}>
    
    
       <div className=''> 
          <FormComponent />
        </div>
        <div className='mt-[-200px] md:mt-0'>
          <ArrayComponent />
        </div> 
    
     </div>
  )
}

export default Crud