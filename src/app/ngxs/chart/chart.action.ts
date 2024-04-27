import { ChartModel } from "./chart.model";

/**
 * Represents an action to add a new chart.
 */
export class AddChartAction {
  static readonly type = 'Add Chart';
  constructor(public chartModel: ChartModel) { }
}

/**
 * Represents an action to update an existing chart.
 */
export class UpdateChartAction {
  static readonly type = 'Update Chart';
  constructor(public chartModel: ChartModel, public index: number) { }
}

/**
 * Represents an action to remove a chart.
 */
export class RemoveChartAction {
  static readonly type = 'Remove Chart';
  constructor(public index: number) { }
}
