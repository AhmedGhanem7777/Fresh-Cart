import { Component, OnInit } from '@angular/core';
import { GoBackService } from '../../../../core/services/global/go-back.service';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { OrdersService } from '../../../../core/services/orders/orders.service';
import { Order } from '../../../../core/models/orders.interface';

@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrl: './all-orders.component.scss'
})
export class AllOrdersComponent implements OnInit {
  allOrders: Order[] = [] // Array to hold all orders data
  userAllOrders: Order[] = [] // Array to hold specific user's orders data
  userId: string | null = ''  // Variable to store the user ID
  decodeduserToken: any // Variable to store the decoded JWT token
  isLoading: boolean = true // Loading state for the component

  constructor(
    private _OrdersService: OrdersService,
    private _AuthService: AuthService,
    private _GoBackService: GoBackService
  ) { }

  ngOnInit(): void {
    // Decode user data if running in a browser environment
    this.decodeUserData()

    // Fetch orders for the user if a valid user ID exists
    if (this.userId) {
      this.getUserOrders(this.userId)
    }
  }

  // Fetch user orders using the provided user ID
  getUserOrders(userId: string) {
    this._OrdersService.getUserOrders(userId).subscribe({
      next: (response: Order[]) => {
        this.userAllOrders = response // Update the user's orders array
        this.isLoading = false // Update loading state
      },
      error: (err) => {
        this.isLoading = false // Update loading state
      }
    })
  }

  // Decode user data from JWT and extract the user ID
  decodeUserData(): void {
    this.decodeduserToken = this._AuthService.decodeUserData() // Decode the token
    if (this.decodeduserToken && this.decodeduserToken.id) {
      // Assign the decoded user ID
      this.userId = this.decodeduserToken.id;
    } else {
      // Set to null if no valid token is found
      this.userId = null;
    }
  }

  // Navigate back to the previous page
  goBack() {
    this._GoBackService.goBack()
  }
}
