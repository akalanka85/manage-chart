import {
  Component,
  HostListener,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import Highcharts, { SeriesOptionsType } from 'highcharts';
import { HighchartsChartModule } from 'highcharts-angular';
import { MatCardModule } from '@angular/material/card';
import { IOrder } from '../../modals/order';
import { IChart } from '../../modals/chart';

@Component({
  selector: 'app-order-chart',
  templateUrl: './orders-chart.component.html',
  styleUrls: ['./orders-chart.component.scss'],
  imports: [HighchartsChartModule, MatCardModule],
  standalone: true,
})
export class OrdersChartComponent implements OnChanges {
  @Input() orders: IOrder[] = [];
  @Input() chart!: IChart;
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {};

  constructor() {}

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.updateChartSize();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.orders?.currentValue) {
      this.setChartOptions();
    }
  }

  setChartOptions(): void {
    this.chartOptions = {
      chart: {
        type: this.chart.type,
        renderTo: this.chart.id,
        width: this.getChartWidth(),
      },
      credits: {
        enabled: false,
      },
      title: {
        text: this.chart.name,
      },
      xAxis: {
        type: 'category',
        title: {
          text: 'Date',
        },
      },
      yAxis: {
        title: {
          text: 'Expected Sale',
        },
        min: 0,
      },
      plotOptions: {
        series: {},
      },
      series: this.getSeriesData(),
      responsive: {
        rules: [
          {
            condition: {
              maxWidth: 500,
            },
            chartOptions: {},
          },
        ],
      },
    };
  }

  getChartWidth(): number {
    return window.innerWidth < 1240 ? window.innerWidth - 50 : 600;
  }

  getSeriesData(): SeriesOptionsType[] {
    return this.orders.map((order) => ({
      name: order.name,
      data: this.orderByDate(order.data),
      color: this.getColor(order.name),
      type: this.chart.type,
    }));
  }

  orderByDate(data: [string, number][]): [string, number][] {
    return data.sort(
      (a, b) => new Date(a[0]).getTime() - new Date(b[0]).getTime()
    );
  }

  getColor(name: string): string {
    const currentColor = this.chart.colors.find((c) => c.name === name);
    return currentColor ? currentColor.color : '#000';
  }

  updateChartSize(): void {
    const innerWidth = window.innerWidth - 50;
    const chart = Highcharts.charts[0];
    if (chart && chart.options.chart) {
      chart.setSize(innerWidth > 600 ? 600 : innerWidth);
    }
  }
}
