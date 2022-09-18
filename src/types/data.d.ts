// 商品のカテゴリ
export type Category = 'shoes' | 'clothes' | 'book';
// 商品の状態
export type Condition = 'new' | 'used';

// ユーザー
export type User = {
  id: number;
  username: string;
  displayName: string;
  email: string;
  profileImageUrl: string;
  description: string;
};

// 商品
export type Product = {
  id: number;
  category: Category;
  title: string;
  description: string;
  imageUrl: string;
  blurDataUrl: string;
  price: number;
  condition: Condtition;
  owner: User;
};

// APIContext
export type ApiContext = {
  apiRootUrl: string;
};
