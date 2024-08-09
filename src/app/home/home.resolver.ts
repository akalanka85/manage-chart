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
import { NotificationService } from '../services/notification.service';

export const HomeResolver: ResolveFn<IOrder[]> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
  orderService: OrderService = inject(OrderService),
  notificationService: NotificationService = inject(NotificationService)
): Observable<IOrder[]> => {
  return orderService.getData().pipe(
    catchError((error) => {
      notificationService.showNotification('Unexpected error occurred.');
      return of([]);
    })
  );
};
