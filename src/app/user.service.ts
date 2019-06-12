import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { of as observableOf } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  uid = observableOf('123');
  isAdmon = observableOf(true);
  constructor(){
    
  }
}
