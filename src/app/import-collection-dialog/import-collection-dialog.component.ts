import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface ImportData {
  deckList: string;
}

@Component({
  selector: 'app-import-collection-dialog',
  templateUrl: './import-collection-dialog.component.html',
  styleUrls: ['./import-collection-dialog.component.css']
})
export class ImportCollectionDialogComponent{

  constructor(
    public dialogRef: MatDialogRef<ImportCollectionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ImportData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }


}
