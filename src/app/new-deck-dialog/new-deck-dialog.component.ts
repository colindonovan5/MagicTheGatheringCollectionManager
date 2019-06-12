import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


export interface DialogData {
  deckname: string;
}

@Component({
  selector: 'app-new-deck-dialog',
  templateUrl: './new-deck-dialog.component.html',
  styleUrls: ['./new-deck-dialog.component.css']
})
export class NewDeckDialogComponent{

  constructor(
    public dialogRef: MatDialogRef<NewDeckDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
