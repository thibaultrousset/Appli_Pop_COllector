import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyFiguresComponent } from './my-figures.component';

describe('MyFiguresComponent', () => {
  let component: MyFiguresComponent;
  let fixture: ComponentFixture<MyFiguresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyFiguresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyFiguresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
