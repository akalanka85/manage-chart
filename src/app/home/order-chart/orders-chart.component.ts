import {
  Component,
  HostListener,
  inject,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import Highcharts, { SeriesOptionsType } from 'highcharts';
import { HighchartsChartModule } from 'highcharts-angular';
import { Order } from '../../modals/order';
import { Chart } from '../../modals/chart';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-order-chart',
  templateUrl: './orders-chart.component.html',
  styleUrls: ['./orders-chart.component.scss'],
  imports: [HighchartsChartModule],
  standalone: true,
})
export class OrdersChartComponent implements OnChanges {
  @Input() orders: Order[] = [];
  @Input() chart!: Chart;
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {};
  datePipe: DatePipe = inject(DatePipe);
  innerWidth: number | undefined;
  constructor() {}

  //This is only use for manual responsive.
  @HostListener('window:resize', ['$event'])
  onResize(event?: any): void {
    this.innerWidth = window.innerWidth - 50;
    const chart = Highcharts.charts[0];
    if (chart && chart.options.chart) {
      chart.setSize(this.innerWidth > 600 ? 600 : this.innerWidth);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['orders']) {
      this.setChartOptions();
    }
  }

  setChartOptions() {
    this.chartOptions = {
      chart: {
        type: this.chart?.type,
        renderTo: this.chart.id,
        width:  this.getChartWith(),
      },
      credits: {
        enabled: false,
      },
      title: {
        text: this.chart?.name,
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
            chartOptions: {
            },
          },
        ],
      },
    };
  }

 getChartWith () {
  if(window.innerWidth < 1240) {
    return window.innerWidth - 50;
  } else {
    return 600;
  }

 }

  getSeriesData() {
    const seriesData: SeriesOptionsType[] = [];
    this.orders.map((order) => {
      const series: any = {
        name: order.name,
        data: order.data,
        color: this.getColor(order.name),
      };
      seriesData.push(series);
    });
    return seriesData;
  }

  getColor(name: string) {
    const currentColor = this.chart.colors.find((c) => c.name === name);
    return currentColor ? currentColor.color : '#000';
  }
}
