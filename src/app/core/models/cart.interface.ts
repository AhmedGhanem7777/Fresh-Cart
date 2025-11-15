export interface Cart {
    products: CartProduct[];
    totalCartPrice: number;
  }
  
  export interface CartProduct {
    count: number;
    product: Product;
    price: number;
  }
  
  export interface Product {
    _id: string;
    title: string;
    imageCover: string;
    category: Category;
    brand: Brand;
    ratingsAverage: number;
  }
  
  export interface Category {
    name: string;
  }
  
  export interface Brand {
    name: string;
  }
  
  export interface CartResponse {
    status: string;
    numOfCartItems: number;
    data: Cart;
    message?: string;
  }