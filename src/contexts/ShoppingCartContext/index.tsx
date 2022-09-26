import React, { useReducer, useContext, createContext } from 'react';
import { shopReducer, addProduct, removeProduct } from './reducers';
import type { Product } from 'types';

type ShoppingCartContextType = {
  cart: Product[];
  addProductToCart: (product: Product) => void;
  removeProductFromCart: (productId: number) => void;
};

const ShoppingCartContext = createContext<ShoppingCartContextType>({
  cart: [],
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  addProductToCart: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  removeProductFromCart: () => {},
});

export const useShoppingCartContext = (): ShoppingCartContextType =>
  useContext<ShoppingCartContextType>(ShoppingCartContext);

interface ShoppingCartContextProviderProps {
  children?: React.ReactNode;
}

/**
 * ショッピングカートコンテキストプロバイダー
 */
export const ShoppingCartContextProvider = ({
  children,
}: ShoppingCartContextProviderProps) => {
  const products: Product[] = [];
  const [cartState, dispatch] = useReducer(shopReducer, products);

  // 商品をカートに追加
  const addProductToCart = (product: Product) => {
    dispatch(addProduct(product));
  };

  // 商品をカートから削除
  const removeProductFromCart = (productId: number) => {
    dispatch(removeProduct(productId));
  };

  return (
    <ShoppingCartContext.Provider
      value={{
        cart: cartState,
        addProductToCart,
        removeProductFromCart,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};
