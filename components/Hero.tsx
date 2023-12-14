"use client"

import React from 'react'
import { useThemeContext } from './theme-context'

function Hero() {

    const {theme} = useThemeContext()

  return (
    <div className={`${theme === 'dark' ? 'bg-gray-500 text-white' : null}`}>
      <div className='h-screen flex flex-col  items-center pt-24'>
          <h1 className='text-3xl font-sans'>useReducer SIMULATOR (NO-DATABASE )</h1>
          <div className='flex flex-col  items-left mt-24'>
          <h3 className='text-xl font-sans'>
            <span className={theme === 'dark' ? 'text-blue-200 text-3xl pr-3' : 'text-blue-800 text-3xl pr-3'}>
              CRUD
            </span> 
            simulation with useReducer hook
          </h3>
          <h3 className='text-xl font-sans'>
            <span className={theme === 'dark' ? 'text-red-200 text-3xl pr-3' : 'text-red-800 text-3xl pr-3'}>
              ESHOP
            </span> 
             PRODUCTS/BASKET simulation with useReducer hook
          </h3>

         </div>
      </div>

   
    </div>
  )
}

export default Hero