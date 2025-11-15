export interface Product {
    _id: string;
    title: string;
    price: number;
    imageCover: string;
    category: Category;
    brand: Brand;
    ratingsAverage: number;
  }
  
  export interface Category {
    _id: string;
    name: string;
    image: string;
  }
  
  export interface Brand {
    _id: string;
    name: string;
    image: string;
  }
  
  export interface ApiResponse<T> {
    data: T;
    message?: string;
    statusCode?: number;
  }