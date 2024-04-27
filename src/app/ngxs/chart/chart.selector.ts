import { Selector } from '@ngxs/store';
import { ChartModel } from './chart.model';
import { ChartState } from './chart.state';
import { ChartStateInterface } from './chart.state.interface';

/**
 * Represents a class for defining selectors related to chart state.
 */
export class ChartSelectors {
  /**
   * Selector function to retrieve chart items from the chart state.
   * @param state The current state of chart items.
   * @returns An array of chart models representing the chart items.
   */
  @Selector([ChartState])
  static chartItems(state: ChartStateInterface): ChartModel[] {
    return state.charts;
  }
}