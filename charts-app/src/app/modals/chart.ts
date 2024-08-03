export interface Chart {
    id: string;
    name: string;
    type: string;
    colors: SeriesColor[];
}

export interface SeriesColor {
  name: string;
  color: string;
}
