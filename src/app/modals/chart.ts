export interface IChart {
    id: string;
    name: string;
    type: ChartType;
    colors: ISeriesColor[];
}

export interface ISeriesColor {
  name: string;
  color: string;
}

export type ChartType = 'column' | 'spline' | 'pie' | 'bar';
