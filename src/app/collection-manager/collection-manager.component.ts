import { Component, OnInit, HostBinding, Input, ChangeDetectorRef } from '@angular/core';
import { CollectionController } from '../collection.service';
import * as Scry from "scryfall-sdk";
import { Card, CardIdentifier } from 'scryfall-sdk';
import { CollectionsViewerComponent } from '../collections-viewer/collections-viewer.component';
import { ThrowStmt } from '@angular/compiler';
import { Collection } from '../collection';
import { MatDialog } from '@angular/material/dialog';
import { AddCardDialogComponent } from '../add-card-dialog/add-card-dialog.component';
import { DataStorageService } from '../data-storage.service';

@Component({
  selector: 'app-collection-manager',
  templateUrl: './collection-manager.component.html',
  styleUrls: ['./collection-manager.component.css']
})
export class CollectionManagerComponent implements OnInit {

  collectionToAddTo: Collection;

  @HostBinding('class.card') @Input()
  card: Card = null;
  constructor(public collections: CollectionController, private cd: ChangeDetectorRef, public dialog: MatDialog, public dataStorage: DataStorageService) {
   }

  ngOnInit() {

    
  }

  addCardToCollection(card: Scry.Card){
    this.collections.addToCollection(card, this.collections.currentCollection)
    this.cd.detectChanges();
  }

  openDialog(card: Scry.Card): void {
    const dialogRef = this.dialog.open(AddCardDialogComponent, {
      width: '250px',
      data: {collectionToAddTo: this.collectionToAddTo}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result != null)
      {
        console.log('The dialog was closed');
        for(let collection of this.collections.CardCollections){
          if(collection.name === result){
            this.collectionToAddTo = collection;
            this.collections.currentCollection = this.collectionToAddTo;
            this.collections.addToCollection(card, this.collectionToAddTo)

          }
        }
      }
      
    });
  }

}
