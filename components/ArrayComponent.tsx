import React, { Fragment } from 'react'
import { useCRUDContext } from './crud-context'

const ArrayComponent = () => {
    const {state,dispatch} = useCRUDContext()

    const deleteItem = (id:string) => {
        dispatch({type:'REMOVENAME', 
              payload: {id:id }
             } 
            )}

    const updateObject = (id:string) => {
        const selectedItem = state.nameList.find(item => item.id === id);
      
        if (selectedItem) {
          dispatch({
            type: 'OPENEDIT',
            payload: {
              id,
              name: selectedItem.name,
              city: selectedItem.city,
            }
          });
          dispatch({
            type: 'SELECTEDID',
            payload: {
              id,
            }
          });
          dispatch({
            type: 'ENTERNAME',
            payload: {
              name: 'name',
              value: selectedItem.name,
            },
          });
          dispatch({
            type: 'ENTERNAME',
            payload: {
              name: 'city',
              value: selectedItem.city,
            },
          });
        }
      };
 
    return (

    <div className='grid grid-cols-5 px-5 pb-2 gap-1 border-b border-solid border-gray-400 '>
  {state.nameList.map((item, index) => (
    <Fragment key={item.id}>
      <div >{index+1}</div>
      <div >{item.name}</div>
      <div >{item.city}</div>
      <div className='flex justify-center bg-red-700 text-white border border-solid border-black mr-1'
            onClick={()=>deleteItem(item.id)}>
        Delete
        </div>
      <div className='flex justify-center bg-blue-700 text-white border border-solid border-black '
       onClick={() => updateObject(item.id)}>
        Update
        </div>
    </Fragment>
  ))}
</div>

  )
}

export default ArrayComponent