import React, { ChangeEvent,useRef } from 'react'
import { useCRUDContext } from './crud-context'
import { v4 as uuidv4 } from 'uuid';
import { Listbox } from '@headlessui/react';

const countries = [
  'USA',
  'Canada',
  'Czechia',
  'Germany',
  'Italy'
]


const FormComponent = () => {

    const nameInputRef =  useRef<HTMLInputElement>(null);;

    const {dispatch,state,setIsOpenEdit} = useCRUDContext()

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
            dispatch({type:'ENTERNAME', 
                  payload: {name: e.target.name , value: e.target.value}
                 } 
                )}

                const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
                     e.preventDefault();

                   
                   
                     const nameRegex = /^[A-Za-z]+$/; // Regex to match only alphabetic characters
                     const isValidName = typeof state.name === 'string' && nameRegex.test(state.name.trim());
                     const isValidCity = typeof state.city === 'string' && nameRegex.test(state.city.trim());
                   
                     if (
                       isValidName &&
                       isValidCity &&
                       state.name.trim().length > 0 &&
                       state.city.trim().length > 0
                     ) {
                       dispatch({
                         type: 'ADDNAME',
                         payload: {
                           id: uuidv4(),
                           name: state.name,
                           city: state.city,
                           country: state.country
                         },
                       });
                   
                       if (nameInputRef.current) {
                         nameInputRef.current.focus(); // Now `focus()` is typed properly
                       }
                     } else {
                       alert('Fields must not be empty, must be of type string, and contain only alphabetic characters , not speacial characters !!! ');
                     }
                   };
                   
      
                   const editSubmit = (e: React.FormEvent<HTMLFormElement>) => {
                     e.preventDefault();
                     setIsOpenEdit(false)
                    
                     const nameRegex = /^[A-Za-z]+$/; // Regex to match only alphabetic characters
                     const { name, city, country } = state;
                     const isValidName = typeof name === 'string' && nameRegex.test(name.trim());
                     const isValidCity = typeof city === 'string' && nameRegex.test(city.trim());
             
                     if (isValidName && isValidCity && name.trim().length > 0 && city.trim().length > 0) {
                       dispatch({
                         type: 'UPDATENAME',
                         payload: {
                           id: state.selectedID || '',
                           name,
                           city,
                           country : country
                         },
                       });
                   
                       dispatch({
                         type: 'SELECTEDID',
                         payload: {
                           id: null,
                         },
                       });
                     } else {
                       alert('Fields must not be empty, must be of type string, and contain only alphabetic characters , not speacial characters !!!');
                     }
                   };
                   

        const cancelFunction = () => {
              dispatch({
                type: 'CLOSEEDIT'
            })
            setIsOpenEdit(false)
            }


  return (
       
    <form onSubmit={state.editButton ? editSubmit : handleSubmit}>
    <div className='flex flex-col justify-start items-center gap-2 text-black'>
           <input type="text" 
                  placeholder='name' 
                  name='name' 
                  className='bg-gray-200  w-[300px] mt-5 p-2'
                  value={state.name}
                  onChange={handleChange}/>
    
            <input type="text" 
                   placeholder='city' 
                   name='city' 
                   className='bg-gray-200 w-[300px] p-2 '
                   value={state.city}
                   onChange={handleChange}/>

<Listbox value={state.country} onChange={(value) => dispatch({ type: 'ENTERNAME', payload: { name: 'country', value } })}>
  {({ open }) => (
    <>
      <Listbox.Button className='w-[300px] bg-white border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:border-indigo-500'>
        {state.country ? state.country : 'Choose country'}
      </Listbox.Button>
      {open && (
        <Listbox.Options className='absolute z-10 w-[300px] py-1 mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto focus:outline-none'>
          {state.country && (
            <Listbox.Option value={state.country}>
              {({ selected }) => (
                <div className={`py-2 px-4 cursor-pointer ${selected ? 'bg-red-600 text-white text-xs' : 'text-gray-900'}`}>
                  previous selected country {state.country}
                </div>
              )}
            </Listbox.Option>
          )}
          <Listbox.Option value="">
            {({ selected }) => (
              <div className={`py-2 px-4 cursor-pointer ${selected ? 'bg-indigo-600 text-white' : 'text-gray-900'}`}>
               {!state.country && 'Choose country'}
              </div>
            )}
          </Listbox.Option>
          {countries.map((country, index) => (
            <Listbox.Option key={index} value={country}>
              {({ selected }) => (
                <div className={`py-2 px-4 cursor-pointer ${selected ? 'bg-indigo-600 text-white' : 'text-gray-900'}`}>
                  {country}
                </div>
              )}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      )}
    </>
  )}
</Listbox>





       
       {state.editButton ? 
       <div className='flex gap-2 mb-4'>
       <input type="submit" 
       value='update' 
       className='bg-primary w-[130px] rounded-md mt-2 cursor-pointer'
       />
       <input type="button" 
       value='cancel' 
       className='bg-gray-500 w-[130px] rounded-md mt-2 cursor-pointer'
       onClick={cancelFunction}       
      />
      </div> 
       :



           <input type="submit" 
                  value='submit' 
                  className='bg-primary w-[200px] rounded-md mt-2 cursor-pointer'
                  />
       }
    </div>
    </form>  
  )
}

export default FormComponent