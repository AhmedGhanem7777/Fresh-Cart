import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../../models/orders.interface';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {


  constructor(private _HttpClient: HttpClient) { }

  // Fetches a list of orders for a specific user
  getUserOrders(userId: string): Observable<Order[]> {
    return this._HttpClient.get<Order[]>(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`)
  }
}
