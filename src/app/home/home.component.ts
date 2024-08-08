import { Component, inject, OnDestroy } from '@angular/core';
import { ActivatedRoute, Data, RouterLink } from '@angular/router';
import { IOrder } from '../modals/order';
import { OrdersChartComponent } from './order-chart/orders-chart.component';
import { ChartStore } from '../store/chart.store';
import { FilterComponent } from './filter/filter.component';
import { DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [OrdersChartComponent, FilterComponent, MatButtonModule, RouterLink],
  standalone: true,
  providers: [DatePipe],
})
export class HomeComponent implements OnDestroy {
  route: ActivatedRoute = inject(ActivatedRoute);
  datePipe: DatePipe = inject(DatePipe);
  chartStore = inject(ChartStore);
  routeDataSubscription: Subscription;

  orders: IOrder[] = [];
  filteredOrders: IOrder[] = [];

  constructor() {
    this.routeDataSubscription = this.route.data.subscribe((data: Data) => {
      this.orders = data.record;
      this.filteredOrders = data.record;
    });
  }

  applyFilter(event: { fromDate: string; toDate: string }): void {
    const { fromDate, toDate } = event;
    const formattedFromDate = this.datePipe.transform(fromDate, 'yyyy-MM-dd');
    const formattedToDate = this.datePipe.transform(toDate, 'yyyy-MM-dd');
    this.filteredOrders = this.filterOrdersByDate(
      formattedFromDate,
      formattedToDate
    );
  }

  filterOrdersByDate(fromDate: string | null, toDate: string | null): IOrder[] {
    return this.orders.map((order) => ({
      ...order,
      data: order.data.filter(([date, _]) => {
        return (!fromDate || date >= fromDate) && (!toDate || date <= toDate);
      }),
    }));
  }

  ngOnDestroy(): void {
    if (this.routeDataSubscription) {
      this.routeDataSubscription.unsubscribe();
    }
  }
}
