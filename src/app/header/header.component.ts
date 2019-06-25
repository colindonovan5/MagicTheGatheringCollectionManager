import { Component, OnInit } from '@angular/core';
import { CollectionController } from '../collection.service';
import {MatDialog} from '@angular/material/dialog';
import { NewDeckDialogComponent } from '../new-deck-dialog/new-deck-dialog.component';
import { Sets, Set } from 'scryfall-sdk';
import { UserService } from '../user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  deckname: string;
  sets: Set[] = [];
  constructor(public collections: CollectionController, public dialog: MatDialog, public user: UserService) {

  }

  ngOnInit() {
    Sets.all().then(result => {
      for(let set of result){
        if(set.set_type === "core" || set.set_type === "commander" || set.set_type === "draft_innovation" || set.set_type === "masters" || set.set_type === "expansion"){
          this.sets.push(set);
        }
      }
    })
  }

  addNewCollection(name: string){
    this.collections.newCollection(name);
    
  }

  
  async loginUser(){
    await this.user.login();
    this.collections.loadStorage();
  }

  async logoutUser(){
    await this.user.logOut();
    this.collections.loadStorage();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(NewDeckDialogComponent, {
      width: '250px',
      data: {deckname: this.deckname}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result != null)
      {
        console.log('The dialog was closed');
        this.deckname = result;
        this.addNewCollection(this.deckname);

      }

    });
  }
  
}
