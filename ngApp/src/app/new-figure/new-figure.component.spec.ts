import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewFigureComponent } from './new-figure.component';

describe('NewFigureComponent', () => {
  let component: NewFigureComponent;
  let fixture: ComponentFixture<NewFigureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewFigureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewFigureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
