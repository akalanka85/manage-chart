import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Order } from '../modals/order';
import { OrdersChartComponent } from './order-chart/orders-chart.component';
import { ChartStore } from '../store/chart.store';
import { FilterComponent } from './filter/filter.component';
import { DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [OrdersChartComponent, FilterComponent, MatButtonModule, RouterLink],
  standalone: true,
  providers: [DatePipe],
})
export class HomeComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  datePipe: DatePipe = inject(DatePipe);
  chartStore = inject(ChartStore);

  orders: Order[] = [];
  filteredOrders: Order[] = [];

  constructor() {
    this.subscribeToRouteData();
  }

  subscribeToRouteData(): void {
    this.route.data.subscribe((response: any) => {
      this.orders = response.record;
      this.filteredOrders = response.record;
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
  }

}
