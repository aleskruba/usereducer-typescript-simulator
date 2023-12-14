import React from 'react'
import { useESHOPContext } from './eshop-context'

const Summary = () => {

    const {state,totalAmount,totalPriceAmount,submitFunction} = useESHOPContext()



  return (
    <div className='w-[400px] h-auto bg-black text-white border border-solid '>
          
            <div className=' flex justify-center items-center flex-col mt-5'>
            {state.basketList.map(product =>( 
                <div key={product.id} className='flex flex-col w-full pl-5 pr-5'>
                    <div className='flex justify-between'>
                        <div>{product.name} /<span className='text-xs font-italic'>Items: {product.amount}/</span></div>
                        <div>Price per Item ${product.price}</div>
                    </div>

                </div>
            ))}
            </div>
            <div className=' flex justify-center items-center flex-col mt-5'>
                <h1>total items: {totalAmount}</h1>
                <h1>total price: {totalPriceAmount}</h1>
            </div>
            <div className=' flex justify-center items-center mt-5 '>
                <div className='w-[180px] bg-blue-900 text-center pt-2 pb-2 rounded-sm mb-10 cursor-pointer hover:bg-blue-200 hover:text-black'
                    onClick={submitFunction}>
                ORDER NOW !
                </div>
            </div>
    </div>
  )
}

export default Summary