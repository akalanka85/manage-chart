import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { OrderService } from './order.service';
import { IOrder } from '../modals/order';
import { environment } from '../../environments/environments';

describe('OrderService', () => {
  let service: OrderService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [OrderService],
    });
    service = TestBed.inject(OrderService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch data (getData) via GET request', () => {
    const mockOrders: IOrder[] = [
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
    ];

    service.getData().subscribe((orders) => {
      expect(orders).toEqual(mockOrders);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockOrders);
  });
});
