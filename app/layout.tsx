import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import ThemeContextProvider from '@/components/theme-context'
import CRUDContextProvider from '@/components/crud-context'
import ESHOPContextProvider from '@/components/eshop-context'
import Navbar from '@/components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
       <ThemeContextProvider>
          <CRUDContextProvider>
            <ESHOPContextProvider>
              <Navbar/>
                   {children}
              </ESHOPContextProvider>     
           </CRUDContextProvider>
       </ThemeContextProvider>
      </body>
    </html>
  )
}
