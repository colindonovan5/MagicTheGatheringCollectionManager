import { Injectable } from '@angular/core';
import {Card } from 'scryfall-sdk';
import { Collection } from './collection';
import { DataStorageService } from './data-storage.service';
import { UserService } from './user.service';

@Injectable({
    providedIn: 'root',
})
export class CollectionController{
    CardCollections: Collection[] = [
      
    ];

    CurrentUserCollections: Collection[] = [

    ]



    currentCollection: Collection = this.CardCollections[0];
    constructor(public dataStorage: DataStorageService, public userService: UserService) {

    }

    addToCollection(card: Card, collection: Collection) {
        if (this.CardCollections.includes(collection)) {
            collection.collectionArray.push(card);
             this.dataStorage.storeCollections(this.CardCollections);
            return true;
        } else {
            return false;
        }
    }
    deleteCollection(collection: Collection){
      if(this.CardCollections.includes(collection)){
        this.CardCollections.splice(this.CardCollections.indexOf(collection), 1);
      }
      this.dataStorage.storeCollections(this.CardCollections);
      this.getUserCollections();
    }

    newCollection(collectionName: string) {
      this.CardCollections.push(new Collection(this.userService.uid, collectionName));
      this.dataStorage.storeCollections(this.CardCollections);
      this.getUserCollections();
    }

    //Remove a card from a specific collection
    removeCard(card: Card, collection: Collection){
      collection.collectionArray.splice(collection.collectionArray.indexOf(card), 1);
      console.log(card.name + " removed");
      this.dataStorage.storeCollections(this.CardCollections);
    }

    updateStorage(){
      this.dataStorage.storeCollections(this.CardCollections);
    }
    
    loadStorage(){
      this.dataStorage.fetchCollections().subscribe(result =>{
        this.CardCollections = result;
        this.CurrentUserCollections = [];
        for(let collection of result){
          if(collection.UserID == this.userService.uid){
            this.CurrentUserCollections.push(collection);
          }
        }
      })
    }

    makeAffiliateLink(link: string): string{
      link = link.replace("Scryfall", "MTGCManager");
      link = link.replace("scryfall", "MTGCManager");
      link = link.replace("scryfall", "MTGCManager");
      return link;
    }
    
    getUserCollections(){
      this.CurrentUserCollections = [];
      for(let collection of this.CardCollections){
        if(collection.UserID == this.userService.uid){
          this.CurrentUserCollections.push(collection);
        }
      }
    }

    
}
