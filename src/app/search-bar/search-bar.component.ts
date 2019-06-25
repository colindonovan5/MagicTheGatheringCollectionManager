import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import * as Scry from "scryfall-sdk";
import { CollectionController } from '../collection.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  selected: string;
  cards: string[] = []
  cardResults: Scry.Card[] = [];

  constructor(private collections: CollectionController, private cd: ChangeDetectorRef) {
    Scry.Catalog.cardNames().then(results => {
      for(let card of results){
        this.cards.push(card);
      } 
    });
    this.collections.loadStorage();

  }

  ngOnInit() {

  }
  


  searchForCards(query: string){
    this.cardResults = [];

    Scry.Cards.search(query).on("data", results => {
      this.cardResults.push(results);
      this.cd.detectChanges();
    });
  }
}
