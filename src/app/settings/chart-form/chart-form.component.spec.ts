import { TestBed } from '@angular/core/testing';
import { ChartFormComponent } from './chart-form.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrderService } from '../../services/order.service';

describe('ChartFormComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartFormComponent],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: OrderService , useValue: {} },
      ],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(ChartFormComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});

