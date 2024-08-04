import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from '../modals/order';
import { OrdersChartComponent } from './order-chart/orders-chart.component';
import { ChartStore } from '../store/chart.store';
import { FilterComponent } from './filter/filter.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [OrdersChartComponent, FilterComponent],
  standalone: true,
  providers: [DatePipe],
})
export class HomeComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  datePipe: DatePipe = inject(DatePipe);
  router: Router = inject(Router);
  chartStore = inject(ChartStore);

  orders: Order[] = [];
  filteredOrders: Order[] = [];

  constructor() {
    this.subscribeToRouteData();
  }

  subscribeToRouteData(): void {
    this.route.data.subscribe((response: any) => {
      this.orders = response.record.data;
      this.filteredOrders = response.record.data;
    });
  }

  applyFilter(event: any): void {
    const { fromDate, toDate } = event;
    const formattedFromDate = this.datePipe.transform(fromDate, 'yyyy-MM-dd');
    const formattedToDate = this.datePipe.transform(toDate, 'yyyy-MM-dd');
    const deepCopyOrders: Order[] = JSON.parse(JSON.stringify(this.orders));

    this.filteredOrders = deepCopyOrders.map((order) => ({
      ...order,
      data: order.data.filter(([date, _]) => {
        return (
          (!formattedFromDate || date >= formattedFromDate) &&
          (!formattedToDate || date <= formattedToDate)
        );
      }),
    }));

    this.updateQueryParams(formattedFromDate, formattedToDate);
  }

  updateQueryParams(fromDate: string | null, toDate: string | null): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { fromDate, toDate },
      queryParamsHandling: 'merge',
    });
  }
}
