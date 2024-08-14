import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private _HttpClient: HttpClient) { }

  // Fetches all products with a limit of 50 items
  getAllProducts(): Observable<any> {
    return this._HttpClient.get('https://ecommerce.routemisr.com/api/v1/products?limit=50')
  }

  // Fetches the details of a specific product by its ID
  getProductDetails(id: string): Observable<any> {
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
  }

  // Fetches a limited number of products (12 items)
  getLimitProducts(): Observable<any> {
    return this._HttpClient.get('https://ecommerce.routemisr.com/api/v1/products?limit=12')
  }

  // Fetches all available product categories
  getCategories(): Observable<any> {
    return this._HttpClient.get('https://ecommerce.routemisr.com/api/v1/categories');
  }

  // Fetches products filtered by a specific category ID
  getCategoryById(id: any): Observable<any> {
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/products?category[in]=${id}`)
  }

  // Fetches all available product brands with a limit of 50 items
  getBrands(): Observable<any> {
    return this._HttpClient.get('https://ecommerce.routemisr.com/api/v1/brands?limit=50')
  }

  // Fetches products filtered by a specific brand ID
  getBrandById(id: any): Observable<any> {
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/products?brand[in]=${id}`)
  }

  // Fetches subcategories for a specific category by its ID
  getSubCategory(id: any): Observable<any> {
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}`);
  }


}
