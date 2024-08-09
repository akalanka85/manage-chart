import { TestBed } from '@angular/core/testing';
import { ChartFormComponent } from './chart-form.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrderService } from '../../services/order.service';
import { of } from 'rxjs';

describe('ChartFormComponent', () => {
  let mockOrderService: jasmine.SpyObj<OrderService>;

  beforeEach(async () => {
    mockOrderService = jasmine.createSpyObj('OrderService', ['getData']);
    mockOrderService.getData.and.returnValue(
      of([
        {
          name: 'Apple',
          data: [
            ['2025-12-13', 99],
            ['2025-05-16', 50],
            ['2024-08-21', 41],
          ],
        },
        {
          name: 'Orange',
          data: [
            ['2024-06-13', 50],
            ['2025-06-12', 40],
            ['2025-09-25', 30],
          ],
        },
      ])
    );

    await TestBed.configureTestingModule({
      imports: [ChartFormComponent],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: OrderService, useValue: mockOrderService },
      ],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(ChartFormComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
