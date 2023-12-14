import React, { ChangeEvent,useRef } from 'react'
import { useCRUDContext } from './crud-context'
import { v4 as uuidv4 } from 'uuid';


const FormComponent = () => {

    const nameInputRef =  useRef<HTMLInputElement>(null);;

    const {dispatch,state} = useCRUDContext()

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
                   
                     const nameRegex = /^[A-Za-z]+$/; // Regex to match only alphabetic characters
                     const { name, city } = state;
                     const isValidName = typeof name === 'string' && nameRegex.test(name.trim());
                     const isValidCity = typeof city === 'string' && nameRegex.test(city.trim());
                   
                     if (isValidName && isValidCity && name.trim().length > 0 && city.trim().length > 0) {
                       dispatch({
                         type: 'UPDATENAME',
                         payload: {
                           id: state.selectedID || '',
                           name,
                           city,
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