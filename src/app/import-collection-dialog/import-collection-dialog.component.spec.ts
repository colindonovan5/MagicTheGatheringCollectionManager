import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportCollectionDialogComponent } from './import-collection-dialog.component';

describe('ImportCollectionDialogComponent', () => {
  let component: ImportCollectionDialogComponent;
  let fixture: ComponentFixture<ImportCollectionDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportCollectionDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportCollectionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
