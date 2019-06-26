import { CollectionController } from './collection.service';
import {HttpClientModule} from '@angular/common/http'
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, OnInit } from '@angular/core';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { CardSearchComponent } from './card-search/card-search.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import {FormsModule} from '@angular/forms';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { CardDetailsComponent } from './card-details/card-details.component';
import { CollectionManagerComponent } from './collection-manager/collection-manager.component';
import { CollectionsViewerComponent } from './collections-viewer/collections-viewer.component';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import { NewDeckDialogComponent } from './new-deck-dialog/new-deck-dialog.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AddCardDialogComponent } from './add-card-dialog/add-card-dialog.component';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule, MatCard} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import {AngularFireModule} from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase} from 'angularfire2/database';
import { DataStorageService } from './data-storage.service';
import { RenameDeckDialogComponent } from './rename-deck-dialog/rename-deck-dialog.component';
import { RankingsComponent } from './rankings/rankings.component';
import { SetsComponent } from './sets/sets.component';
import { UserService } from './user.service';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { ImportCollectionDialogComponent } from './import-collection-dialog/import-collection-dialog.component';

const appRoutes: Routes = [
  {path: '', component:CollectionsViewerComponent},
  {path: 'collection', component: CollectionsViewerComponent},
  {path: 'search', component: SearchBarComponent},
  {path: 'rankings', component: RankingsComponent},
  {path: 'sets/:set', component: SetsComponent}

];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CardSearchComponent,
    SearchBarComponent,
    CardDetailsComponent,
    CollectionManagerComponent,
    CollectionsViewerComponent,
    NewDeckDialogComponent,
    AddCardDialogComponent,
    ConfirmDialogComponent,
    RenameDeckDialogComponent,
    RankingsComponent,
    SetsComponent,
    ImportCollectionDialogComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule,
    MatSelectModule,
    MatDividerModule,
    AngularFireAuthModule,
    BrowserAnimationsModule,
    MatInputModule,
    AngularFireModule.initializeApp(
      {
        apiKey: "AIzaSyCX0PuvOnqvetdQaopO9XXTQo9jq28Q0gY",
        authDomain: "magic-collection-database.firebaseapp.com",
        databaseURL: "https://magic-collection-database.firebaseio.com",
        projectId: "magic-collection-database",
        storageBucket: "magic-collection-database.appspot.com",
        messagingSenderId: "1022744217993",
        appId: "1:1022744217993:web:837880265a25d8b2"
      }
    ),
    AngularFireDatabaseModule,
    MatButtonModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    FormsModule,
    MatCardModule,
    TypeaheadModule.forRoot(),
    MatDialogModule,
    HttpClientModule
  ],
  providers: [CollectionController, DataStorageService, UserService],
  bootstrap: [AppComponent],
  entryComponents: [
    NewDeckDialogComponent,
    AddCardDialogComponent,
    ConfirmDialogComponent,
    RenameDeckDialogComponent,
    ImportCollectionDialogComponent
  ]
})
export class AppModule{ 

}
