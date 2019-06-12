import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CollectionController } from '../collection.service';
import { Cards, Card, CardIdentifier } from 'scryfall-sdk';
import { Collection } from '../collection';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DataStorageService } from '../data-storage.service';
import { RenameDeckDialogComponent } from '../rename-deck-dialog/rename-deck-dialog.component';

@Component({
  selector: 'app-collections-viewer',
  templateUrl: './collections-viewer.component.html',
  styleUrls: ['./collections-viewer.component.css']
})
export class CollectionsViewerComponent implements OnInit {

  confirmed: boolean = true;
  deckname: string = "";
  constructor(private collections: CollectionController, public changeDetector: ChangeDetectorRef, public dialog: MatDialog, private dataService: DataStorageService) { 
    collections.loadStorage();
  }


  openDialog(collectionToDelete: Collection): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: {confirmed: this.confirmed}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result === true)
      {
        console.log('The dialog was closed');
        this.collections.deleteCollection(collectionToDelete);
      }
      
    });
  }

  openRenameDialog(collectionToDelete: Collection): void {
    const dialogRef = this.dialog.open(RenameDeckDialogComponent, {
      width: '250px',
      data: {deckname: this.deckname}
    });

    dialogRef.afterClosed().subscribe(result => {
        if(result != null && result != ""){
          this.deckname = result;
          console.log('The dialog was closed');
          collectionToDelete.name = this.deckname;
          this.collections.updateStorage();
        }
      
      
      
    });
  }


  ngOnInit(){

  }

}
