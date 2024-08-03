import { Component, inject, OnInit } from '@angular/core';
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
export class HomeComponent implements OnInit {
  route: ActivatedRoute = inject(ActivatedRoute);
  orders: Order[] = [];
  fillteredOrders: Order[] = [];
  chartStore = inject(ChartStore);

  constructor(
    private activatedRoute: ActivatedRoute,
    private datePipe: DatePipe,
    private router: Router
  ) {
    this.activatedRoute.data.subscribe((response: any) => {
      this.orders = response.record;
      this.fillteredOrders = response.record;
    });
  }

  ngOnInit() {}

  applyFilter(event: any) {
    const { fromDate, toDate } = event;
    const formattedFromDate = this.datePipe.transform(fromDate, 'yyyy-MM-dd');
    const formattedToDate = this.datePipe.transform(toDate, 'yyyy-MM-dd');
    const deepCopyOrders: Order[] = JSON.parse(JSON.stringify(this.orders));

    deepCopyOrders.forEach((order) => {
      order.data = order.data.filter(([date, _]) => {
        return (
          (!formattedFromDate || date >= formattedFromDate) &&
          (!formattedToDate || date <= formattedToDate)
        );
      });
    });

    this.fillteredOrders = deepCopyOrders;

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { fromDate: formattedFromDate, toDate: formattedToDate },
      queryParamsHandling: 'merge',
    });
  }
}
