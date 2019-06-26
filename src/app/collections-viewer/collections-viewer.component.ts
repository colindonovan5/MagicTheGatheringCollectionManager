import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CollectionController } from '../collection.service';
import { Cards, Card, CardIdentifier, Catalog } from 'scryfall-sdk';
import { Collection } from '../collection';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DataStorageService } from '../data-storage.service';
import { RenameDeckDialogComponent } from '../rename-deck-dialog/rename-deck-dialog.component';
import { UserService } from '../user.service';
import { ImportCollectionDialogComponent } from '../import-collection-dialog/import-collection-dialog.component';

@Component({
  selector: 'app-collections-viewer',
  templateUrl: './collections-viewer.component.html',
  styleUrls: ['./collections-viewer.component.css']
})
export class CollectionsViewerComponent implements OnInit {

  confirmed: boolean = true;
  deckname: string = "";
  deckList: string = "";
  cards: string[] = [];
  deckListCards: string[] = [];
  searchParam: string = "";
  constructor(public collections: CollectionController, public changeDetector: ChangeDetectorRef, public dialog: MatDialog, private dataService: DataStorageService, public user: UserService) { 
    this.collections.loadStorage();
    Catalog.cardNames().then(results => {
      for(let card of results){
        this.cards.push(card);
      } 
    });
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

  openImportDialog(collectionToImportTo: Collection): void {
    const dialogRef = this.dialog.open(ImportCollectionDialogComponent, {
      width: '250px',
      data: {deckList: this.deckList}
    });

    dialogRef.afterClosed().subscribe(result => 
        {
        if(result != null && result != ""){
          this.searchParam = "";
          this.deckList = "";
          this.deckList = result;
          console.log('The dialog was closed');
          if(this.deckList.includes("1 ")){
            this.deckListCards = this.deckList.split("1 ");
          }else if(this.deckList.includes("1x ")){
            this.deckListCards = this.deckList.split("1x ");
          }
          for(let card of this.deckListCards){
            if(card != ""){
              if(this.deckListCards.indexOf(card) === this.deckListCards.length - 1){
                this.searchParam = this.searchParam.concat(this.searchParam, '!"' + card.trim() + '"');
              }else{
                this.searchParam = this.searchParam.concat('!"' + card.trim() + '" OR ');
              }
            }         
          }

          Cards.search(this.searchParam).waitForAll().then(cardResult => {
            for(let c of cardResult){
              this.collections.addToCollection(c, collectionToImportTo);

            }
          });

          this.collections.updateStorage();
        }

    });
  }



  ngOnInit(){

  }

}
