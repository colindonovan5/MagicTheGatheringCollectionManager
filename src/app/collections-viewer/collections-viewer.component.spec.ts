import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionsViewerComponent } from './collections-viewer.component';

describe('CollectionsViewerComponent', () => {
  let component: CollectionsViewerComponent;
  let fixture: ComponentFixture<CollectionsViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
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
});
