import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category, Product, ApiResponse, Brand } from '../../models/product.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {


  // Base URL for the API
  private readonly API_URL = 'https://ecommerce.routemisr.com/api/v1';

  constructor(private _HttpClient: HttpClient) { }

  // Fetches the list of categories
  getCategories(): Observable<ApiResponse<Category[]>> {
    return this._HttpClient.get<ApiResponse<Category[]>>(`${this.API_URL}/categories`);
  }

  // Fetches the list of brands
  getBrands(): Observable<ApiResponse<Category[]>> {
    return this._HttpClient.get<ApiResponse<Brand[]>>(`${this.API_URL}/brands`);
  }

  // Fetches a limited number of products (24 items)
  getLimitProducts(): Observable<ApiResponse<Product[]>> {
    return this._HttpClient.get<ApiResponse<Product[]>>(`${this.API_URL}/products?limit=24`);
  }

  // Fetches all products (50 items)
  getAllProducts(): Observable<ApiResponse<Product[]>> {
    return this._HttpClient.get<ApiResponse<Product[]>>(`${this.API_URL}/products?limit=50`);
  }

  // Fetches details of a specific product by ID
  getProductDetails(id: string): Observable<ApiResponse<Product[]>> {
    return this._HttpClient.get<ApiResponse<Product[]>>(`${this.API_URL}/products/${id}`);
  }

  // Fetches products by a specific brand ID
  getBrandById(id: string): Observable<ApiResponse<Product[]>> {
    return this._HttpClient.get<ApiResponse<Product[]>>(`${this.API_URL}/products?brand[in]=${id}`);
  }

  // Fetches products by a specific category ID
  getCategoryById(id: string): Observable<ApiResponse<Product[]>> {
    return this._HttpClient.get<ApiResponse<Product[]>>(`${this.API_URL}/products?category[in]=${id}`);
  }
}
