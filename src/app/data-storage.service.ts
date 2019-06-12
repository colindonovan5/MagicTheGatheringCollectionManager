import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CollectionController } from './collection.service';
import { Collection } from './collection';
import { map } from 'rxjs/operators';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: HttpClient) { 
    
  }


  storeCollections(collections: Collection[]){
    for(let collection of collections){
      collection.getTypeAmount("Creature");
      collection.getTypeAmount("Artifact");
      collection.getTypeAmount("Enchantment");
      collection.getTypeAmount("Planeswalker");
      collection.getTypeAmount("Sorcery");
      collection.getTypeAmount("Instant");
      collection.getAverageCMC();
      collection.getPrice();
    }
    this.http.put("https://magic-collection-database.firebaseio.com/collections.json", collections).subscribe(result => {
      console.log(result);
    });
  }

  fetchCollections(){
    return this.http.get<Collection[]>('https://magic-collection-database.firebaseio.com/collections.json').pipe(
      map(rawCollectionArray => {
        return rawCollectionArray.map(rawCollection => {
          return new Collection(rawCollection.name, rawCollection.collectionArray);
        });
      })
    );
  }

}
