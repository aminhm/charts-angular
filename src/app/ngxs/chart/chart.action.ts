
import { ChartModel } from "./chart.model";


export class AddChartAction {
    static readonly type = 'Add Chart';
    constructor(public chartModel: ChartModel) {}
  }

export class UpdateChartAction {
    static readonly type = 'Update Chart';
    constructor(public chartModel: ChartModel,public index:number) {}
  }

  export class RemoveChartAction {
    static readonly type = 'Remove Chart';
    constructor(public index:number) {}
  }

  
