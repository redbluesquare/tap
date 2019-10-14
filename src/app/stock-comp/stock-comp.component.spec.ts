import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockCompComponent } from './stock-comp.component';

describe('StockCompComponent', () => {
  let component: StockCompComponent;
  let fixture: ComponentFixture<StockCompComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockCompComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
