import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionsViewerComponent } from './collections-viewer.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { BehaviorSubject } from 'rxjs';

describe('CollectionsViewerComponent', () => {
  let component: CollectionsViewerComponent;
  let fixture: ComponentFixture<CollectionsViewerComponent>;
  

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatDividerModule,
        MatCardModule,
        HttpClientModule,
        AngularFireDatabaseModule
      ],
      declarations: [ CollectionsViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionsViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load collections on instantiation', () => {
    expect(component.collections).toBeTruthy();
  });
});
