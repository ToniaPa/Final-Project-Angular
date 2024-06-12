import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-yesno-dialog',
  standalone: true,
  imports: [],
  templateUrl: './confirm-yesno-dialog.component.html',
  styleUrl: './confirm-yesno-dialog.component.css'
})
export class ConfirmYesnoDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmYesnoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string }
  ) {}

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onYesClick(): void {
    this.dialogRef.close(true);
  }

}
