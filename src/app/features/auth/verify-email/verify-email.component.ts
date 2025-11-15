import { Component, OnDestroy } from '@angular/core';
import { AuthService } from '../../../core/services/auth/auth.service';
import { VerificationState } from '../../../core/models/verify-email.interface';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrl: './verify-email.component.scss'
})
export class VerifyEmailComponent implements OnDestroy {

  // Object to hold verification state including reset code, shaking flag, and time left for resending code
  state: VerificationState = {
    resetCode: '',
    isShaking: false,
    timeLeft: 0
  };

  private resendTimer: ReturnType<typeof setInterval> | null = null; // Interval timer for resending code
  isLoading = false; // Flag to indicate if a request is in progress
  errorMessage = ''; // Holds error message to display if verification fails

  constructor(
    private _AuthService: AuthService,
    private _Router: Router,
    private _ToastrService: ToastrService
  ) { }

  // Submit handler for verifying the reset code
  onSubmit(): void {
    if (!this.isValidCode()) {
      this.handleInvalidCode(); // If the code is not valid, handle the error
      return;
    }
    // Proceed to verify the code if it's valid
    this.verifyCode();
  }

  // Resend the reset code if allowed (timeLeft is 0)
  resendCode(): void {
    // If timeLeft is still greater than 0, do not allow resending
    if (this.state.timeLeft > 0) return;
    this.state.timeLeft = 30; // Set timeLeft to 30 seconds
    this.startResendTimer(); // Start the countdown for resending the code
    this._ToastrService.info('Sending reset code...', '', { timeOut: 0 }); // Show waiting toast while resending
  }

  // Cleanup the resend timer when the component is destroyed
  ngOnDestroy(): void {
    this.clearResendTimer();
  }

  // Check if the entered reset code is valid (not empty)
  private isValidCode(): boolean {
    return this.state.resetCode?.trim().length > 0;
  }

  // Handle invalid code input by shaking the input field and showing an error message
  private handleInvalidCode(): void {
    this.state.isShaking = true;
    this.errorMessage = 'Please enter a valid code';
    this._ToastrService.error(this.errorMessage);
    setTimeout(() => {
      this.state.isShaking = false;
      this.errorMessage = '';
    }, 2000);
  }

  // Verify the reset code by calling the API
  private verifyCode(): void {
    this.isLoading = true; // Set loading state to true while verifying
    this.errorMessage = ''; // Clear any previous error messages
    this._ToastrService.info('Verifying code...', '', { timeOut: 0 });

    // Call the AuthService to verify the reset code
    this._AuthService.verifyResetCode(this.state.resetCode)
      .pipe(finalize(() => this.isLoading = false)) // Set loading state to false once the request is complete
      .subscribe({
        next: (response) => {
          this._ToastrService.clear();
          if (response.status === 'Success') {
            this._ToastrService.success('Code verified successfully!');
            this._Router.navigate(['auth/new-pass']);
          }
        },
        error: (error) => {
          this._ToastrService.clear();
          this.errorMessage = error.error?.message || 'Verification failed. Please try again.'; // Set error message
          this.handleInvalidCode();
        }
      });
  }

  // Start the timer for resending the code (30 seconds countdown)
  private startResendTimer(): void {
    this.clearResendTimer();
    this.resendTimer = setInterval(() => {
      if (this.state.timeLeft > 0) {
        this.state.timeLeft--;
      } else {
        this.clearResendTimer();
      }
    }, 1000);
  }

  // Clear the resend timer if it's active
  private clearResendTimer(): void {
    if (this.resendTimer) {
      clearInterval(this.resendTimer);
      this.resendTimer = null;
    }
  }

}
