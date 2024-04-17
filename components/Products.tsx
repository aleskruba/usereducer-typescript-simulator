"use client"
import React from 'react'
import { products } from './eshop-context'
import { useThemeContext } from './theme-context'
import { useESHOPContext } from './eshop-context'
import { SlBasket } from "react-icons/sl";

const Products = () => {


    const {theme} = useThemeContext()
    const {state, dispatch,addToBasketFunction,totalAmount} = useESHOPContext()

    const handleBuyClick = (id: number) => {
      const productToAdd = state.products.find((product) => product.id === id);

     
       if (productToAdd) {
          addToBasketFunction(productToAdd); // Pass the entire product object
      } 
  };


    return (
     <div className={`${theme === 'dark' ? 'bg-gray-500 text-white' : null}`}> 

    <div className='flex flex-col justify-center items-center h-screen pt-24'>
      {totalAmount > 0 &&
    <h1 className='text-red-800 font-bold flex'>Check  <span className='ml-2 mr-2 text-2xl'> <SlBasket /></span>   in NAVBAR</h1>   
    }
    <div className=' flex  justify-center items-center mt-4'>   
        {state.products.map(product =>(
        <div key={product.id}className={`${theme === 'dark' ? 
         'flex flex-col justify-center mr-2 items-center w-[150px] h-[150px] border border-solid'
        :
          'flex flex-col justify-center mr-2 items-center w-[150px] h-[150px] border border-solid  bg-gray-200'}`}>
            <h1 className='font-bold'>{product.name}</h1>
            <h1>price: ${product.price}</h1>
            <h1>amount:{product.amount}</h1>
            <div className={`${
                theme === 'dark' ? 'bg-green-200 text-black' : 'bg-white'
              } w-[100px] text-center text-black ${product.amount <= 0 ? 'bg-gray-300 text-white pointer-events-none' : ''}`}
                onClick={ product.amount > 0  ? () => handleBuyClick(product.id) : () => {alert('No more items on the stock')}}
            >BUY</div>
        </div>
        )
        )}
        </div>
      
      </div>
    </div>
  )
}

export default Products