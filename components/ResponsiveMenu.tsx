import React from 'react'
import { useThemeContext } from './theme-context';

import { FaUserCircle } from "react-icons/fa";
import { MdCancel } from "react-icons/md";

type NAVBARType = {
  toggleMenu:() => void;
}

function ResponsiveMenu({toggleMenu}:NAVBARType) {

  const {showMenu} = useThemeContext()
  
  return (
    <div className={`${showMenu ? "left-0" : "-left-[100%]" }
        h-screen w-[75%] bg-slate-950 fixed top-0 z-50 
        transition-all duration-500 pt-24 pb-6 px-8 
        flex flex-col justify-between text-white relative`}>
    
      <div className='absolute right-1 top-1 w-[50px] h-[50px] text-5xl flex justify-center items-center text-gray-500'>
        <MdCancel className=' hover:text-gray-100' onClick={toggleMenu}/>
       </div>
      <div>
          <div className='flex items-center justify-start gap-3'>

          <FaUserCircle size={50}/>
              <div>
          
                <h1>Ales Kruba</h1>
                <h1 className='text-sm text-slate-500'>Premium User</h1>
              </div>
          </div>
          <nav className='mt-12'>
            <ul className='space-y-4 text-xl'>
              <li><a href="/crud">CRUD
                  </a>
              </li>
              <li><a href="/eshop">E-SHOP
                  </a>
              </li>
              <li><a href="/eshoptransactions">E-SHOP TRANSACTIONS
                  </a>
              </li>
            </ul>
          </nav>
      </div>
      <div className='footer'>
          <h1>©2023 All Rights Reserved </h1>
      </div>
     </div>
  )
}

export default ResponsiveMenu