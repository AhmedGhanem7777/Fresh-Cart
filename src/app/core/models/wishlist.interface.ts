import { Category, Brand } from '../../core/models/product.interface'

export interface WishlistResponse {
    status: string;
    message: string;
    count: number;
    data: WishlistData[];
}

export interface WishlistData {
    _id: string;
    imageCover: string;
    title: string;
    category: Category;
    brand: Brand;
    ratingsAverage: number;
    price: number;
}
