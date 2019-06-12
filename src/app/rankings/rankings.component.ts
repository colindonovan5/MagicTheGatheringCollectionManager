import { Component, OnInit } from '@angular/core';
import * as Scry from 'scryfall-sdk';

@Component({
  selector: 'app-rankings',
  templateUrl: './rankings.component.html',
  styleUrls: ['./rankings.component.css']
})
export class RankingsComponent implements OnInit {
  cards: string[];
  topOneHundred: Scry.Card[] = [];
  constructor() {
    Scry.Catalog.cardNames().then(results => {
      for(let card of results){
        this.cards.push(card);
      } 
    });
   }

  ngOnInit() {
  }

  setTopHundred(){
    for(let card of this.cards){
      
    }
  }

}
