import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { of as observableOf, Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { map, switchMap } from 'rxjs/operators';
import { auth } from 'firebase';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  /*uid = this.afAuth.authState.pipe(
    map(authState => {
      if(!authState){
        return null;
      }else{
        return authState.uid;
      }
    }),
  );*/

  uid = 'Not logged in';
  displayName = 'Null';
  constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase) {
  }


  async login() {
    await this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
    if (firebase.auth().currentUser.uid !== null) {
      this.uid = firebase.auth().currentUser.uid;
      this.displayName = firebase.auth().currentUser.displayName;
    } else {
      this.uid = 'Not logged in';
      console.log('Oopsy!');
    }

  }
  async logOut() {
    await this.afAuth.auth.signOut();
    this.uid = 'Not logged in';
  }
}
