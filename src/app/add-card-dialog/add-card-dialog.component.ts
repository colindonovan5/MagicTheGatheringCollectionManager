import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Collection } from '../collection';
import { CollectionController } from '../collection.service';

export interface AddCardDialogData{
  collection: Collection;
}

@Component({
  selector: 'app-add-card-dialog',
  templateUrl: './add-card-dialog.component.html',
  styleUrls: ['./add-card-dialog.component.css']
})
export class AddCardDialogComponent{
  selectedCollectionName: string;
  
  constructor(
    public dialogRef: MatDialogRef<AddCardDialogComponent>,
    public collections: CollectionController,
    @Inject(MAT_DIALOG_DATA) public data: AddCardDialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
