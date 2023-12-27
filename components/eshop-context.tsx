"use client"

import React, {createContext,useContext,useReducer,Dispatch} from 'react';
import { useRouter } from 'next/navigation'


export const products = [

    {id:1, name: 'Samsung', price: 500, amount:10},
    
    {id:2, name: 'Iphone', price: 800, amount:15},
    
    {id:3, name: 'Huawei', price: 400, amount:12},
]

  type Product = {
    id: number;
    name: string;
    price: number;
    amount: number;
  };

  
  type Basket = {
    id: number;
    name: string;
    price: number;
    amount: number;
  };


  type Orders = {
    id: number;
    date: string;
    orders:Basket[]
  
  };
  type State = {
    name: string;
    price: number
    amount: number;
    basketList: Basket[];
    myOrders: Orders[];
    products: Product[];

  };
  
  type Action =
     { type: 'ADDTOBASKET'; payload: { id: number; product: Product }}
  |  { type: 'REMOVEFROMBASKET'; payload: { id: number; product: Product }}
  |  { type: 'CONFIRMORDER'; }
  

  
  const initialState: State = {
    name: '',
    price: 0,
    amount: 0,
    basketList: [],
    myOrders: [],
    products: products
  };
  


type ESHOPContextProviderProps = {
    children: React.ReactNode;
}

type ESHOPContextType = {
    state: State;
    dispatch: Dispatch<Action>;
    addToBasketFunction: (product: Product) => void; // Update the function signature
    removeFromBasketFunction:(product: Product) => void;
    submitFunction:() => void;
    totalAmount:number;
    totalPriceAmount:number
}

export const ESHOPContext = createContext<ESHOPContextType | null>(null)



const reducer = (state: State, action: Action): State => {
    
    switch (action.type) {
           case 'ADDTOBASKET':
                const { product } = action.payload;
                const existingItem = state.basketList.find((item) => item.id === product.id);
       
                if (existingItem) {
                    if (product.amount > existingItem.amount) {
                        const updatedBasket = state.basketList.map((item) =>
                            item.id === product.id ? { ...item, amount: item.amount + 1 } : item
                        );
    
                  
                    return { ...state, basketList: updatedBasket, /* products: updatedProducts */ };
                    } else {
                
                        alert('No more items on stock');
                        return state;
                    }
                } else {
                    if (product.amount > 0) {
                
                      /*   const updatedProducts = state.products.map((prod) =>
                            prod.id === product.id ? { ...prod, amount: prod.amount - 1 } : prod
                        ); */
    
                                       return {
                            ...state,
                            basketList: [...state.basketList, { ...product, amount: 1 }],
                           // products: updatedProducts,
                        };
                    } else {
                        // No more items on stock
                        alert('No more items on stock');
                        return state;
                    }
                }

      case 'REMOVEFROMBASKET':
        const { product: productToRemove } = action.payload; // Change variable name here

        const updatedBasket = state.basketList.map((item) =>
            item.id === productToRemove.id ? { ...item, amount: item.amount - 1 } : item
        );

        const updatedBasketList = updatedBasket.filter(
            (item) => item.amount > 0
        );

 /*        const updatedProducts = state.products.map((prod) =>
        prod.id === productToRemove.id ? { ...prod, amount: prod.amount + 1 } : prod
    ); */
        return { ...state, 
                    basketList: updatedBasketList ,
                    /* products: updatedProducts */};



                    case 'CONFIRMORDER':
                        // Create a new order from the current basket list
                        const newOrder: Orders = {
                            id: state.myOrders.length + 1, // Generate a new ID (you might want a more robust way of generating IDs)
                            date: new Date().toISOString(),
                            orders:state.basketList
                        };
                    
                        // Add the new order to the 'myOrders' array
                        const updatedOrders = [...state.myOrders, newOrder];
                    
        
                        // Update the 'products' array based on 'basketList'
                        const updatedProducts = state.products.map((prod) => {
                            const foundInBasket = state.basketList.find((item) => item.id === prod.id);
                            if (foundInBasket) {
                                const updatedAmount = prod.amount - foundInBasket.amount;
                                return { ...prod, amount: updatedAmount < 0 ? 0 : updatedAmount };
                            }
                            return prod;
                        });
                        return {
                            ...state,
                            myOrders: updatedOrders,
                            products: updatedProducts,
                            basketList: [], // Clear the basketList after confirming the order
                            //totalPriceAmount: 0, // Reset total price
                            //totalAmount: 0, // Reset total amount
                        };
                    
      default:
        return state;
    }
  };

export default function ESHOPContextProvider({children}:ESHOPContextProviderProps) {

    const router = useRouter()

    const [state, dispatch] = useReducer(reducer, initialState);

    const totalAmount = state.basketList.reduce((accumulator, product) => accumulator + product.amount, 0);

    const totalPriceAmount = state.basketList.reduce((total, product) => {
        return total + (product.price * product.amount);
    }, 0);


        const addToBasketFunction = (product: Product) => {
            dispatch({ type: 'ADDTOBASKET', payload: { id: product.id,product } });
        };

        const removeFromBasketFunction = (product: Product) => {
            dispatch({ type: 'REMOVEFROMBASKET', payload: { id: product.id,product } });
        };

    

        const submitFunction = () => {

            dispatch({ type: 'CONFIRMORDER' });
        
            router.push('/eshoptransactions', { scroll: false })
        } 
        
    return (
        <ESHOPContext.Provider value={{ state, 
                                        dispatch,
                                        addToBasketFunction ,
                                        removeFromBasketFunction,
                                        submitFunction,
                                        totalAmount,
                                        totalPriceAmount
                                        }}>
                
                {children}

        </ESHOPContext.Provider>
  )

}


export function useESHOPContext() {
    const context = useContext(ESHOPContext);
    if (!context) {
        throw new Error("useCRUDContext must be used within a CRUDsContextProvider");
    }
    return context;
}

