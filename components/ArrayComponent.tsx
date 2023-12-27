import React, { Fragment, useState } from 'react'
import { useCRUDContext } from './crud-context'

const ArrayComponent = () => {
    const {state,dispatch,isOpenEdit,setIsOpenEdit} = useCRUDContext()



    const deleteItem = (id:string) => {
        dispatch({type:'REMOVENAME', 
              payload: {id:id }
             } 
            )}

    const updateObject = (id:string) => {
        const selectedItem = state.nameList.find(item => item.id === id);
        setIsOpenEdit(true)
        if (selectedItem) {
          dispatch({
            type: 'OPENEDIT',
            payload: {
              id,
              name: selectedItem.name,
              city: selectedItem.city,
              country: selectedItem.country 
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
          dispatch({
            type: 'ENTERNAME',
            payload: {
              name: 'country',
              value: selectedItem.country,
            },
          });
        }
      };
 
    return (

    <div className='grid grid-cols-6 px-5 pb-2 gap-1 mt-20 '>
  {state.nameList.map((item, index) => (
    <Fragment key={item.id}>
      <div >{index+1}</div>
      <div >{item.name}</div>
      <div >{item.city}</div>
      <div >{item.country}</div>
     <div className={`flex justify-center ${
              isOpenEdit
                ? 'pointer-events-none bg-gray-300 text-white'
                : 'bg-red-700 text-white border border-solid border-black mr-1'
            }`}
            onClick={()=>deleteItem(item.id)}>
        Delete
        </div>
      <div className={`flex justify-center ${
              isOpenEdit
                ? 'pointer-events-none bg-gray-300 text-white'
                : 'bg-blue-700 text-white border border-solid border-black'
            }`}
       onClick={() => updateObject(item.id)}>
        Update
        </div>
    </Fragment>
  ))}
</div>

  )
}

export default ArrayComponent