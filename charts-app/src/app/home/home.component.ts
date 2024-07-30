import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from '../modals/order';
import { OrdersChartComponent } from './order-chart/orders-chart.component';
import { ChartStore } from '../store/chart.store';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [OrdersChartComponent],
  standalone: true,
})
export class HomeComponent implements OnInit {
  route: ActivatedRoute = inject(ActivatedRoute);
  orders: Order[] = [];
  chartStore = inject(ChartStore);

  constructor(private activatedRoute: ActivatedRoute) {
    this.activatedRoute.data.subscribe((response: any) => {
      this.orders = response.record;
    });
  }

  ngOnInit() {}
}
