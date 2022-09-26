import { Product } from 'types';

const ShoppingCartAction = {
  ADD_PRODUCT: 'ADD_PRODUCT',
  REMOVE_PRODUCT: 'REMOVE_PRODUCT',
} as const;

type ShopReducerActionType =
  | {
      type: typeof ShoppingCartAction.ADD_PRODUCT;
      payload: Product;
    }
  | {
      type: typeof ShoppingCartAction.REMOVE_PRODUCT;
      payload: number;
    };

// action creator
export const addProduct = (payload: Product): ShopReducerActionType => {
  return {
    type: ShoppingCartAction.ADD_PRODUCT,
    payload,
  };
};

// action creator
export const removeProduct = (payload: number): ShopReducerActionType => {
  return {
    type: ShoppingCartAction.REMOVE_PRODUCT,
    payload,
  };
};

/**
 * 商品追加アクション
 * @param product 商品
 * @param state 現在の状態
 * @returns 次の状態
 */
const addProductToCart = (product: Product, state: Product[]) => {
  return [...state, product];
};

/**
 * 商品削除アクション
 * @param productId 商品Id
 * @param state 現在の状態
 * @returns 次の状態
 */
const removeProductFromCart = (productId: number, state: Product[]) => {
  const removedItemIndex = state.findIndex((item) => item.id === productId);
  state.splice(removedItemIndex, 1);

  return [...state];
};

/**
 * ショッピングカートのReducer
 * @param state 現在の状態
 * @param action アクション
 * @returns 次の状態
 */
export const shopReducer: React.Reducer<Product[], ShopReducerActionType> = (
  state: Product[],
  action: ShopReducerActionType,
) => {
  switch (action.type) {
    case ShoppingCartAction.ADD_PRODUCT:
      return addProductToCart(action.payload, state);
    case ShoppingCartAction.REMOVE_PRODUCT:
      return removeProductFromCart(action.payload, state);
    default:
      return state;
  }
};
