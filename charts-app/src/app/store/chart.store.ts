import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { Chart } from '../modals/chart';

export interface ChartState {
  chartData: Chart[];
}

const iniialChartState: ChartState = {
  chartData: [
    { id: '1', name: 'Chart 1', type: 'bar', colors: [] },
    { id: '2', name: 'Chart 2', type: 'spline', colors: [] },
  ],
};

export const ChartStore = signalStore(
  { providedIn: 'root' },
  withState(iniialChartState),
  withMethods(({ chartData, ...store }) => ({
    addToList(chart: Chart) {
      const updatedChart = [...chartData(), chart];
      patchState(store, { chartData: updatedChart });
    },
    updateChart(chart: Chart) {
      const updatedCharts = chartData()
        .filter((c) => c.id !== chart.id)
        .concat(chart);
      patchState(store, { chartData: updatedCharts });
    },
    removeChart(id: string) {
      const updatedCharts = chartData().filter((c) => c.id !== id);
      patchState(store, { chartData: updatedCharts });
    },
  }))
);
