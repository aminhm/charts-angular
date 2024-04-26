import { Injectable } from "@angular/core";
import { State, Action, StateContext } from "@ngxs/store";
import { AddChartAction, RemoveChartAction, UpdateChartAction } from "./chart.action";
import { ChartModel } from "./chart.model";


export interface ChartStateInterface {
  charts: ChartModel[];
}

@State<ChartStateInterface>({
  name: 'chart',
  defaults: {
    charts: []
  },
})
@Injectable()
export class ChartState {
  @Action(AddChartAction)
  addToChartModels(ctx: StateContext<ChartStateInterface>, action: AddChartAction) {
    const { chartModel } = action;

    if (!chartModel) {
      return;
    }
    const state = ctx.getState();

    ctx.setState({
      ...state,
      charts: [...state.charts, chartModel],
    });
  }

  @Action(UpdateChartAction)
  updateChartModels(ctx: StateContext<ChartStateInterface>, action: UpdateChartAction){
    const { chartModel,index  } = action;

    if (!chartModel || index==null || index==undefined) {
      return;
    }

    const state = ctx.getState();


    ctx.setState({
        ...state,
        charts : state.charts.map((item, i) => i === index ? chartModel : item)
    })

  }



  @Action(RemoveChartAction)
  removeChartModels(ctx: StateContext<ChartStateInterface>, action: RemoveChartAction){
    var { index  } = action;
    

    if (index==null || index==undefined) {
      return;
    }
    
    var state = ctx.getState();

    ctx.setState({
        ...state,
        charts : [...state.charts.slice(0, index), ...state.charts.slice(index + 1)]
    })

  }
}