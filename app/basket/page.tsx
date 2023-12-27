"use client"
import React from 'react'
import { useThemeContext } from '@/components/theme-context'
import { useESHOPContext } from '@/components/eshop-context'
import { products } from '@/components/eshop-context'
import Summary from '@/components/Summary'

const Basket = () => {
  const {theme} = useThemeContext()
  const {state, addToBasketFunction,removeFromBasketFunction} = useESHOPContext()


  const handleBuyClick = (id: number) => {
    const productToAdd = state.products.find((product) => product.id === id);

     if (productToAdd) {
        addToBasketFunction(productToAdd); // Pass the entire product object
    } 
};

  const handleBuyClickRemove = (id: number) => {
    const productToAdd = state.products.find((product) => product.id === id);
 
    if (productToAdd) {
      removeFromBasketFunction(productToAdd); // Pass the entire product object
    } 
  };



  
  return (
    <div className={`${theme === 'dark' ? 'bg-gray-500 min-h-screen pb-10 text-white  ' : null}`}> 
    <div className='pt-24 flex  justify-center items-center'>
      {state.basketList.length <= 0 &&  'NO PRODUCTS IN BASKET'}
      { state.basketList.map(product =>(
         <div key={product.id}className={`${theme === 'dark' ? 
         'flex flex-col justify-center mr-2 items-center w-[150px] h-[150px] border border-solid'
        :
          'flex flex-col justify-center mr-2 items-center w-[150px] h-[150px] border border-solid  bg-gray-200'}`}>
            <h1 className='font-bold'>{product.name}</h1>
            <h1>price: ${product.price}</h1>
            <h1>amount:{product.amount}</h1>
            <div className='flex gap-10'>
              <div className={`${theme === 'dark' ? 'bg-green-200 text-black' : 'bg-white'}   w-[30px]  text-center text-black `} 
                      onClick={() => handleBuyClick(product.id)}
              >+</div>
                <div className={`${theme === 'dark' ? 'bg-green-200 text-black' : 'bg-white'}   w-[30px]  text-center text-black `} 
                     onClick={() => handleBuyClickRemove(product.id)}
              >-</div>
        </div>
        
        </div>

      ))}
      

    </div>

   { state.basketList.length > 0 && 

      <div className='flex justify-center items-center mt-20'>
      
      <Summary/>
      
      </div>   }

    </div>

  )
}

export default Basket