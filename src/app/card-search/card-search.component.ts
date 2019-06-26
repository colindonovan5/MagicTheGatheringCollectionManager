import { Component, OnInit } from '@angular/core';
import * as Scry from "scryfall-sdk";
import { UserService } from '../user.service';

@Component({
  selector: 'app-card-search',
  templateUrl: './card-search.component.html',
  styleUrls: ['./card-search.component.css']
})
export class CardSearchComponent implements OnInit {
  cards: Scry.Card[] = [];

  constructor() { }

  ngOnInit() {
  }

  //IGNORE THIS COMPONENT, SHOULD BE DELETED BUT IT KEPT BREAKING EVERYTHING


}
