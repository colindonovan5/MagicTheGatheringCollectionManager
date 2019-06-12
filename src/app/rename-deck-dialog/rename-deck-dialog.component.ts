import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData{
  deckname: string;
}
@Component({
  selector: 'app-rename-deck-dialog',
  templateUrl: './rename-deck-dialog.component.html',
  styleUrls: ['./rename-deck-dialog.component.css']
})
export class RenameDeckDialogComponent{

  constructor(
    public dialogRef: MatDialogRef<RenameDeckDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.data.deckname = null;
    this.dialogRef.close();
  }
}
