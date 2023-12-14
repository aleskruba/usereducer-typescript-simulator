"use client"

import React,{createContext,useState,useContext,useEffect} from 'react'


type ThemeContextProviderProps = {
    children: React.ReactNode;
}

type Theme = 'dark' | 'light' ;
type Menu = boolean

type LocalStorage = string | null

type ThemeContext = {
    theme: Theme ;
    setTheme: React.Dispatch<React.SetStateAction<Theme>>;
    showMenu: Menu ;
    setShowMenu: React.Dispatch<React.SetStateAction<Menu>>;
}

export const ThemeContext = createContext<ThemeContext | null>(null)

export default function ThemeContextProvider({children}:ThemeContextProviderProps) {
    const [theme,setTheme] = useState<Theme>("light")
    const [showMenu, setShowMenu] = useState<Menu>(false);
  
    useEffect(() => {
      if (typeof window !== 'undefined') {
        const getLocalStorage: LocalStorage = localStorage.getItem('theme');
        if (getLocalStorage === 'dark' || getLocalStorage === 'light') {
          setTheme(getLocalStorage); // set directly without parsing
        }
      }
    }, []);
    
  

  
    const element = typeof document !== 'undefined' ? document.documentElement : null;
  
    useEffect(() => {
      if (element) {
        if (theme === 'dark') {
          element.classList.add('dark');
          localStorage.setItem('theme', 'dark');
        } else {
          element.classList.remove('dark');
          localStorage.removeItem('theme');
        }
      }
    }, [theme, element]);
  


  return (
        <ThemeContext.Provider 
            value={{theme,setTheme,showMenu, setShowMenu}}>
                
                {children}

        </ThemeContext.Provider>
  )
}


export function useThemeContext() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useThemeContext must be used within a ThemeContextProvider");
    }
    return context;
}