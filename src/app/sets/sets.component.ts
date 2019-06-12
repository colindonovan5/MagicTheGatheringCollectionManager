import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as Scry from 'scryfall-sdk';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-sets',
  templateUrl: './sets.component.html',
  styleUrls: ['./sets.component.css']
})
export class SetsComponent implements OnInit {
  setID: string;
  set: Scry.Set;
  setCards: Scry.Card[] = [];
  cardsLoaded: boolean = false;
  constructor(private route: ActivatedRoute) { 
    this.route.params.subscribe(params => {
      this.setID = params['set'];
    });
    
  }

  ngOnInit() {
    this.getSetCards();

  }

  getSetCards(){
    Scry.Sets.byId(this.setID).then(result => {
      this.set = result;

      Scry.Cards.search("e:" + result.code).on("data", card =>{
        this.setCards.push(card);
        console.log("Pushed");
      });
    });


  }

}
