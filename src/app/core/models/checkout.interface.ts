export interface ShippingAddress {
    details: string;
    phone: string;
    city: string;
  }
  
  export interface CheckoutResponse {
    status: string;
    session?: {
      url: string;
    };
    data?: any;
  }
  
  export interface PaymentData {
    shippingAddress: ShippingAddress;
    cartId: string;
  }