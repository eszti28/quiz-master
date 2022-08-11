import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackBarService {
  private duration: number = 3000;
  private actionText: string = 'close';

  constructor(private snackBar: MatSnackBar) {}

  showErrorMessage(errorMessage: string, closable: boolean): void {
    if (closable) {
      this.snackBar.open(errorMessage, this.actionText, {
        duration: this.duration,
        panelClass: ['red-snackbar'],
      });
    } else {
      this.snackBar.open(errorMessage, '', {
        duration: this.duration,
        panelClass: ['red-snackbar'],
      });
    }
  }

  showSuccessMessage(errorMessage: string): void {
    this.snackBar.open(errorMessage, this.actionText, {
      duration: this.duration,
      panelClass: ['green-snackbar'],
    });
  }
}
