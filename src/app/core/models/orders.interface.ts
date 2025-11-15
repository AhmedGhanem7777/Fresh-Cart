export interface Order {
    id: string;
    user: string;
    cartItems: CartItem[];
    totalOrderPrice: number;
    taxPrice: number;
    shippingPrice: number;
    paymentMethodType: string;
    isDelivered: boolean;
    isPaid: boolean;
    createdAt: string;
}

export interface CartItem {
    count: number;
    price: number;
    product: Product;
}

export interface Product {
    id: string;
    title: string;
    imageCover: string;
    category: Category;
    brand: Brand;
}

export interface Category {
    id: string;
    name: string;
}

export interface Brand {
    id: string;
    name: string;
}