import { TestBed } from '@angular/core/testing';
import { OrdersChartComponent } from './orders-chart.component';
import { DatePipe } from '@angular/common';

describe('HomeComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrdersChartComponent],
      providers: [
        DatePipe,
      ],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(OrdersChartComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
