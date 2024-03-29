import { Card } from 'scryfall-sdk';
import { DataStorageService } from './data-storage.service';
import { UserService } from './user.service';
import { Observable } from 'rxjs';
import { stringify } from '@angular/compiler/src/util';

export class Collection {
    public name: string;
    collectionArray: Card[] = [];
    private totalPrice: number = 0;
    private averageCMC: number = 0;
    private amountOfCreature: number = 0;
    private amountOfPlaneswalker: number = 0;
    private amountOfSorcery: number = 0;
    private amountOfInstant: number = 0;
    private amountOfArtifact: number = 0;
    private amountOfEnchantment: number = 0;
    private amountOfLand: number = 0;
    public UserID: string;
    public massEntryLink: string;
    public constructor(userID: string, name: string, collectionCards?:Card[]) {
        this.name = name;
        this.totalPrice = 0;
        this.collectionArray = [];
        if(collectionCards != null){
            this.collectionArray = collectionCards;
        }
        this.UserID = userID;
    }

     getPrice(): number{
         this.totalPrice = 0;
        for(const card of this.collectionArray) {
            if(card.prices){
                if(card.prices.usd){
                    this.totalPrice += +card.prices.usd;
                }else if(card.prices.usd_foil && !card.prices.usd){
                    this.totalPrice += +card.prices.usd_foil;
                }
            }
        }
        return this.totalPrice;
    }
    
    getMassEntryLink(): string{
        this.massEntryLink = "http://store.tcgplayer.com/massentry?partner=MTGCManager&utm_campaign=affiliate&utm_medium=MTGCManager&utm_source=MTGCManager&c=";
        for(let card of this.collectionArray){
            this.massEntryLink = this.massEntryLink.concat("1 " + card.name + "||").replace(" ", "%20");
        }
        return this.massEntryLink;
    }

    getAverageCMC(): number{
        this.averageCMC = 0;
        for(const card of this.collectionArray){
            this.averageCMC += card.cmc;
        }
        this.averageCMC = this.averageCMC / this.collectionArray.length;
        return this.averageCMC;
    }

    getTypeAmount(type: string): number{
        if (type.includes('Creature')){
            this.amountOfCreature = 0;
            for(let card of this.collectionArray){
                if(card.type_line.includes(type)){
                    this.amountOfCreature += 1;
                }
            }
            return this.amountOfCreature;
        }

        if (type.includes('Artifact')){
            this.amountOfArtifact = 0;
            for(let card of this.collectionArray){
                if(card.type_line.includes(type)){
                    this.amountOfArtifact += 1;
                }
            }
            return this.amountOfArtifact;
        }

        if (type.includes('Sorcery')){
            this.amountOfSorcery = 0;
            for(let card of this.collectionArray){
                if(card.type_line.includes(type)){
                    this.amountOfSorcery += 1;
                }
            }
            return this.amountOfSorcery;
        }

        if (type.includes('Instant')){
            this.amountOfInstant = 0;
            for(let card of this.collectionArray){
                if(card.type_line.includes(type)){
                    this.amountOfInstant += 1;
                }
            }
            return this.amountOfInstant;
        }

        if (type.includes('Planeswalker')){
            this.amountOfPlaneswalker = 0;
            for(let card of this.collectionArray){
                if(card.type_line.includes(type)){
                    this.amountOfPlaneswalker += 1;
                }
            }
            return this.amountOfPlaneswalker;
        } 

        if (type.includes('Enchantment')){
            this.amountOfEnchantment = 0;
            for(let card of this.collectionArray){
                if(card.type_line.includes(type)){
                    this.amountOfEnchantment += 1;
                }
            }
            return this.amountOfEnchantment;
        }     
        if (type.includes('Land')){
            this.amountOfLand = 0;
            for(let card of this.collectionArray){
                if(card.type_line.includes(type)){
                    this.amountOfLand += 1;
                }
            }
            return this.amountOfLand;
        }     
    }

}
