"use client"
import { useESHOPContext } from '@/components/eshop-context';
import { useThemeContext } from '@/components/theme-context';

import React,{ useState } from 'react';
import moment from 'moment';

const Page = () => {
  const { theme } = useThemeContext();
  const { state } = useESHOPContext();

  const [expandedOrderId, setExpandedOrderId] = useState<number | null>(null); // Define the type for expandedOrderId

  const toggleOrderDetails = (orderId: number) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

//  const totalAmount = state.myOrders.reduce((accumulator, product) => accumulator + product.amount, 0);



  return (
    <div className={`${theme === 'dark' ? 'bg-gray-500 min-h-screen  text-white' : ''}`}>
      <div className='flex justify-center items-center flex-col md:flex-row'>
        <div className='flex items-center flex-col h-[100%] md:h-screen w-screen pt-24'>
          <h1 className={`${theme === 'dark' ? 'text-red-200 text-2xl' : 'text-red-800 text-2xl'}`}>MY Orders</h1>
          {state.myOrders.map((order) => (
            <div key={order.id} className={`flex flex-col mt-2 ${theme === 'dark' ? 'text-black' : ''} border border-solid border-gray-800 w-[300px] ${expandedOrderId === order.id ? 'bg-red-200' :'bg-gray-200'}`}>
             <div className='flex justify-between'>
              <h1>
                Order from : {moment(order.date).format('YYYY MM DD - HH:mm')}{' '}
              
              </h1>
              <div onClick={() => toggleOrderDetails(order.id)}
                    className=' text-center mt-1 mr-1 w-[30px] h-[30px] border border-solid border-gray-800 bg-white'
              >{expandedOrderId === order.id ? '-' : '+'}
              </div>
              </div>
              {expandedOrderId === order.id &&
                order.orders.map((orderItem) => (
                  <div key={orderItem.id} className='flex justify-around'>
                    <div>{orderItem.name}</div>
                    <div>${orderItem.price}</div>
                    <div>items:{orderItem.amount}</div>
                                    
               
                  </div>
                ))}
                <div className='flex items-center  flex-col'>
                 <h2>
                    total Items: {order.orders.reduce((accumulator, product) => accumulator + product.amount, 0)}
                    </h2>
                    <h2 className='font-bold'>
                    total Price: ${order.orders.reduce((total, product) => {
                      return total + (product.price * product.amount);
                  }, 0)}
                    </h2>
                </div>
            </div>
          ))}
        </div>
        <div className=' md:h-screen flex items-center flex-col w-screen md:pt-24 pt-12'>
          <h1 className={`${theme === 'dark' ? 'text-blue-200 text-2xl' : 'text-blue-800 text-2xl'}`}>PRODUCTS</h1>
          {state.products.map((product) => (
            <div key={product.id}>
              <div className='flex w-[400px] justify-between border border-solid border-black p-2'>

                  <div className='w-[200px]'>{product.name} </div>
                  <div className='w-[100px]'>${product.price} </div>
                  <div className='w-[100px]'>on stock: {product.amount}</div>
         
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
