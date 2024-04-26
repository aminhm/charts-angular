import { Selector } from '@ngxs/store';
import { ChartModel } from './chart.model';
import { ChartState, ChartStateInterface } from './chart.state';


export class ChartSelectors {
  @Selector([ChartState])
  static chartItems(state: ChartStateInterface): ChartModel[] {
    return state.charts;
  }
}