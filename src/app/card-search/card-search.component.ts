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

  searchForCards(){
    this.cards = [];
    Scry.Cards.search("id:c t:land").on("data", results => {
      this.cards.push(results);
    });
  }

}
