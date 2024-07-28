import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Order } from '../modals/order';
import { OrderService } from '../services/order.service';

export const HomeResolver: ResolveFn<Order[]> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
  orderService: OrderService = inject(OrderService)
): Observable<Order[]> => {
  return orderService.getData().pipe(
    catchError((error) => {
      console.error('Error fetching data', error);
      return of([]);
    })
  );
};
