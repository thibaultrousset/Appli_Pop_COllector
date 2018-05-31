import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateFigureComponent } from './update-figure.component';

describe('UpdateFigureComponent', () => {
  let component: UpdateFigureComponent;
  let fixture: ComponentFixture<UpdateFigureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateFigureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateFigureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
