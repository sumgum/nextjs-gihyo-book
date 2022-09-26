import { ComponentMeta } from '@storybook/react';
import React, { useEffect } from 'react';
import Header from '.';
import { AuthContextProvider } from 'contexts/AuthContext';
import {
  ShoppingCartContextProvider,
  useShoppingCartContext,
} from 'contexts/ShoppingCartContext';
import { User } from 'types';

export default { title: 'organisms/Header' } as ComponentMeta<typeof Header>;

export const NoLogin = () => <Header />;

export const Login = () => {
  const authUser: User = {
    id: 1,
    username: 'dummy name',
    displayName: 'Gun Sum',
    email: 'sample@email.co.jp',
    profileImageUrl: '/images/sample/1.jpg',
    description: '',
  };

  const ChildComponent = () => {
    const { addProductToCart } = useShoppingCartContext();

    useEffect(() => {
      addProductToCart({
        id: 1,
        category: 'book',
        title: 'Product',
        description: '',
        imageUrl: '/images/sample/1.jpg',
        blurDataUrl: '',
        price: 1000,
        condition: 'used',
        owner: authUser,
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <Header />;
  };

  return (
    <ShoppingCartContextProvider>
      <AuthContextProvider
        context={{ apiRootUrl: 'https://dummy' }}
        authUser={authUser}
      >
        <ChildComponent />
      </AuthContextProvider>
    </ShoppingCartContextProvider>
  );
};
