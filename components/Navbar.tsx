"use client"
import React,{useEffect,useState} from 'react'
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import ResponsiveMenu from './ResponsiveMenu';

import { useThemeContext } from './theme-context';
import { useESHOPContext } from './eshop-context';

import { MdOutlineNightlight } from "react-icons/md";
import { MdOutlineNightlightRound } from "react-icons/md";
import { IoIosMenu } from "react-icons/io";
import { SlBasket } from "react-icons/sl";

function Navbar() {


    const pathname = usePathname()

    const {theme,setTheme} = useThemeContext()
    const {showMenu, setShowMenu} = useThemeContext()
    const {totalAmount} = useESHOPContext()
  

    
    
    const toggleMenu = () => {
        setShowMenu(!showMenu);
      };



      const [lastScroll, setLastScroll] = useState(0);
      const [hideHeader, setHideHeader] = useState(false);
    
      useEffect(() => {
        const handleScroll = () => {
          const currentScroll = window.scrollY;
    
          if (lastScroll < currentScroll) {
            setHideHeader(true);
          } else {
            setHideHeader(false);
          }
    
          setLastScroll(currentScroll);
        };
    
        window.addEventListener('scroll', handleScroll);
    
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, [lastScroll]);


   

  return (
    <>
    <header id='header' style={{ display: hideHeader ? 'none' : 'block' }} className='fixed top-0 left-0 w-full  transition-transform duration-300 bg-navbar text-white border-b-[4px] border-primary/50' >
           <nav  className=' flex items-center justify-between h-[70px] w-screen py-2 '>
            <div className='flex gap-5 text-2xl md:text-3xl text-white pl-5'>
              <div className='flex flex-col'>
                <Link href='/'>useReducer</Link>
                <span className='inline-block font-bold text-sm text-secondary'>Simulator  
                <span className='inline-block font-bold text-blue-500 ml-2'>TypeScript</span></span>
                </div>
                {showMenu ? 
                            ( <IoIosMenu className='cursor-pointer transition-all md:hidden' 
                                         size={30}
                                         onClick={toggleMenu}
                                         />
                                         )
                            
                            :(<IoIosMenu className='cursor-pointer transition-all md:hidden' 
                                          onClick={toggleMenu}
                                          size={30}/>)
                            
                            }
            </div>

            <div className='md:flex sm:hidden hidden justify-around w-[100%] mr-24 '>
  <Link href="/crud">
    <div className={pathname === '/crud' ? 'text-secondary' : 'hover:text-secondary'}>
      <h1>CRUD</h1>
    </div>
  </Link>

  <Link href="/eshop">
    <div className={pathname === '/eshop' ? 'text-secondary' : 'hover:text-secondary'}>
      <h1>E SHOP</h1>
    </div>
  </Link>

  <Link href="/eshoptransactions">
    <div className={pathname === '/eshoptransactions' ? 'text-secondary' : 'hover:text-secondary'}>
      <h1>E SHOP - TRANSACTIONS</h1>
    </div>
  </Link>
</div>


            <div className='flex items-center absolute right-5 '>
        
            <Link href="/basket">
              <div className='flex mr-1 relative w-[50px]  '>
                          <div className='mt-2 text-2xl' >
                            <SlBasket />
                          </div>
                      <div className='absolute bg-white w-[20px] h-[20px] rounded-full left-4 flex items-center justify-center'>
                          <h1 className='text-red-900 font-bold'>{totalAmount}</h1>
                      </div>
              </div>
            </Link>

                {theme === "dark" ? 
                            (<MdOutlineNightlight 
                                    className='text-2xl'  
                                    onClick={()=>setTheme('light')} />) 
                            :
                            (<MdOutlineNightlightRound 
                                    className='text-2xl' 
                                    onClick={()=>setTheme('dark')}/>)
                            }
                      
                
                </div>
            
            </nav>
    </header>
    {showMenu ? <ResponsiveMenu toggleMenu={toggleMenu}/>  : null}
     </>
  )
}

export default Navbar