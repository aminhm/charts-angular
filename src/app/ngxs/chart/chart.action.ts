import { ChartModel } from "./chart.model";

/**
 * Represents an action to add a new chart.
 */
export class AddChartAction {
  static readonly type = 'Add Chart';
  /**
   * Constructs a new AddChartAction.
   * @param chartModel The chart model to be added.
   */
  constructor(public chartModel: ChartModel) { }
}

/**
 * Represents an action to update an existing chart.
 */
export class UpdateChartAction {
  static readonly type = 'Update Chart';
  /**
   * Constructs a new UpdateChartAction.
   * @param chartModel The updated chart model.
   * @param index The index of the chart to be updated.
   */
  constructor(public chartModel: ChartModel, public index: number) { }
}

/**
 * Represents an action to remove a chart.
 */
export class RemoveChartAction {
  static readonly type = 'Remove Chart';
  /**
   * Constructs a new RemoveChartAction.
   * @param index The index of the chart to be removed.
   */
  constructor(public index: number) { }
}
