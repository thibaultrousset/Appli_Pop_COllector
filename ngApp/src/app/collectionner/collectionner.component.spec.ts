import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionnerComponent } from './collectionner.component';

describe('CollectionnerComponent', () => {
  let component: CollectionnerComponent;
  let fixture: ComponentFixture<CollectionnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollectionnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
