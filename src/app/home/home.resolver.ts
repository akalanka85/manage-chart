import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IOrder } from '../modals/order';
import { OrderService } from '../services/order.service';

export const HomeResolver: ResolveFn<IOrder[]> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
  orderService: OrderService = inject(OrderService)
): Observable<IOrder[]> => {
  return orderService.getData().pipe(
    catchError((error) => {
      console.error('Error fetching data', error);
      return of([]);
    })
  );
};
