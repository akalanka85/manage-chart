import { Component, Input, OnInit } from '@angular/core';
import Highcharts, { SeriesOptionsType } from 'highcharts';
import { HighchartsChartModule } from 'highcharts-angular';
import { Order } from '../../modals/order';

@Component({
  selector: 'app-order-chart',
  templateUrl: './orders-chart.component.html',
  styleUrls: ['./orders-chart.component.scss'],
  imports: [HighchartsChartModule],
  standalone: true,
})
export class OrdersChartComponent implements OnInit {
  @Input() orders: Order[] = [];
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {};

  constructor() {}

  ngOnInit() {
    this.chartOptions = {
      chart: {
        type: 'column',
      },
      title: {
        text: 'Expected Sales data',
      },
      xAxis: {
        type: 'datetime',
        title: {
            text: 'Date'
        }
    },
      yAxis: {
        title: {
          text: 'Expected Sale',
        },
        min: 0,
      },
      plotOptions: {
        series: {
          marker: {
            symbol: 'circle',
            fillColor: '#FFFFFF',
            enabled: true,
            radius: 2.5,
            lineWidth: 1,
          },
        },
      },
      colors: ['#6CF', '#39F', '#06C', '#036', '#000'],
      series: this.getSeriesData(),
    };
  }

  getSeriesData() {
    const seriesData: SeriesOptionsType[] = [];
    this.orders.map((order) => {
      const series:any = {
        name: order.name,
        data: this.getConvertedData(order.data)
      };
      seriesData.push(series);
    });
    return seriesData;
  }

  getConvertedData(data: any) {
    data.map((item:any[]) => {
      item[0] = Date.parse(item[0]);
    })
    return data;
  }
}
