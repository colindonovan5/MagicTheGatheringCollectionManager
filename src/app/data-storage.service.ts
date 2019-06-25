import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CollectionController } from './collection.service';
import { Collection } from './collection';
import { map } from 'rxjs/operators';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  //userId:string;

  constructor(private http: HttpClient, private db: AngularFireDatabase, private afAuth: AngularFireAuth, private userService: UserService) { 
    //this.afAuth.authState.subscribe(user => {
    //   if(user){
    //     this.userId = user.uid;
      // }
     //});
   }
 
  // getCollectionsList(): AngularFireList<Collection[]>{
   //  if(!this.userId) return;
   //  this.dbCollections = this.db.list('collections/${this.userId}');
   //  return this.dbCollections;
  // }
 
   //createCollection(collections: Collection[]){
    // this.dbCollections.push(collections);
   //}

  storeCollections(collections: Collection[]){
    for(let collection of collections){
      collection.getTypeAmount("Creature");
      collection.getTypeAmount("Artifact");
      collection.getTypeAmount("Enchantment");
      collection.getTypeAmount("Planeswalker");
      collection.getTypeAmount("Sorcery");
      collection.getTypeAmount("Instant");
      collection.getAverageCMC();
      collection.getMassEntryLink();
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
          return new Collection(rawCollection.UserID, rawCollection.name, rawCollection.collectionArray);
        });
      })
    );
  }
}
