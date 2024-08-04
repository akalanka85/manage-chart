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

export const HomeResolver: ResolveFn<any> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
  orderService: OrderService = inject(OrderService)
): Observable<any> => {
  return orderService.getData().pipe(
    catchError((error) => {
      console.error('Error fetching data', error);
      return of([]);
    })
  );
};
