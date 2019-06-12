import { Injectable } from '@angular/core';
import {Card } from 'scryfall-sdk';
import { Collection } from './collection';
import { DataStorageService } from './data-storage.service';

@Injectable({
    providedIn: 'root',
})
export class CollectionController{
    CardCollections: Collection[] = [
      
    ];

    currentCollection: Collection = this.CardCollections[0];
    constructor(public dataStorage: DataStorageService) {

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
    }

    newCollection(collectionName: string) {
      this.CardCollections.push(new Collection(collectionName));
      this.dataStorage.storeCollections(this.CardCollections);
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
      })
    }
}
