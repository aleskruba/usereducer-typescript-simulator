"use client"

import React, {createContext,useContext,useReducer,Dispatch, useState,} from 'react';

  type isOpenEditType = boolean

  type Name = {
    id: string;
    name: string;
    city: string;
    country: string;
  };
  
  type State = {
    name: string;
    city: string;
    country: string;
    nameList: Name[];
    editButton: boolean;
    selectedID: string | null;
  };
  
  type Action =
  | { type: 'ENTERNAME'; payload: { name: string; value: string } }
  | { type: 'ADDNAME'; payload: Name }
  | { type: 'REMOVENAME'; payload: { id: string } }
  | { type: 'OPENEDIT', payload: { id: string; name: string; city: string,country:string }  }
  | { type: 'CLOSEEDIT' }
  | { type: 'SELECTEDID'; payload: { id: string | null } }
  | { type: 'UPDATENAME'; payload: { id: string; name: string; city: string ,country:string} };
  
  const initialState: State = {
    name: '',
    city: '',
    country: '',
    nameList: [],
    editButton: false,
    selectedID: null,
  };
  


type CRUDContextProviderProps = {
    children: React.ReactNode;
}

type CRUDContextType = {
    state: State;
    dispatch: Dispatch<Action>;
    isOpenEdit: boolean;
    setIsOpenEdit: (value: boolean) => void;
}

export const CRUDContext = createContext<CRUDContextType | null>(null)

const reducer = (state: State, action: Action): State => {
    switch (action.type) {
      case 'ENTERNAME':
        return { ...state, [action.payload.name]: action.payload.value };
      case 'ADDNAME':
        return {
          ...state,
          nameList: [
            ...state.nameList,
            { id: action.payload.id, name: action.payload.name, city: action.payload.city, country: action.payload.country},
          ],
          name: '',
          city: '',
          country:''
        };
        case 'REMOVENAME':
            return {
              ...state,
              nameList: state.nameList.filter((n) => n.id !== action.payload.id),
            };
          case 'OPENEDIT':
            return { ...state, editButton:true };
    
          case 'CLOSEEDIT':
            
            return { ...state, editButton:false , name: '', city: '', selectedID: null };
        
          case 'SELECTEDID':
      
              return {...state, selectedID: action.payload.id };
          
            
            case 'UPDATENAME':
              const { id, name, city,country } = action.payload;
     
              // Map through the nameList to find the item to update
              const updatedNameList = state.nameList.map(item => {
                if (item.id === id) {
                  // If the item matches the id, update its name and city
                  return { ...item, name, city,country };
                }
                return item;
              });
        
              return {
                ...state,
                nameList: updatedNameList,
                editButton: false, // Close edit mode after updating
                name: '', // Clear the name and city fields after update
                city: '',
                country: ''
                };



      default:
        return state;
    }
  };

export default function CRUDContextProvider({children}:CRUDContextProviderProps) {

    const [isOpenEdit,setIsOpenEdit] = useState<isOpenEditType>(false)

    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <CRUDContext.Provider value={{ state, dispatch,isOpenEdit,setIsOpenEdit}}>
                
                {children}

        </CRUDContext.Provider>
  )

}


export function useCRUDContext() {
    const context = useContext(CRUDContext);
    if (!context) {
        throw new Error("useCRUDContext must be used within a CRUDsContextProvider");
    }
    return context;
}

