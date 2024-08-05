import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IOrder } from '../modals/order';
import { OrdersChartComponent } from './order-chart/orders-chart.component';
import { ChartStore } from '../store/chart.store';
import { FilterComponent } from './filter/filter.component';
import { DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [
    OrdersChartComponent,
    FilterComponent,
    MatButtonModule,
    RouterLink,
  ],
  standalone: true,
  providers: [DatePipe],
})

export class HomeComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  datePipe: DatePipe = inject(DatePipe);
  chartStore = inject(ChartStore);

  orders: IOrder[] = [];
  filteredOrders: IOrder[] = [];

  constructor() {
    this.subscribeToRouteData();
  }

  private subscribeToRouteData(): void {
    this.route.data.subscribe(() => {
      this.orders = this.route.snapshot.data.record;
      this.filteredOrders = this.route.snapshot.data.record;
    });
  }

  applyFilter(event: { fromDate: string; toDate: string }): void {
    const { fromDate, toDate } = event;
    const formattedFromDate = this.datePipe.transform(fromDate, 'yyyy-MM-dd');
    const formattedToDate = this.datePipe.transform(toDate, 'yyyy-MM-dd');
    this.filteredOrders = this.filterOrdersByDate(formattedFromDate, formattedToDate);
  }

  private filterOrdersByDate(fromDate: string | null, toDate: string | null): IOrder[] {
    return this.orders.map((order) => ({
      ...order,
      data: order.data.filter(([date, _]) => {
        return (
          (!fromDate || date >= fromDate) &&
          (!toDate || date <= toDate)
        );
      }),
    }));
  }
}
