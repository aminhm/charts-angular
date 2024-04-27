/**
 * Represents a state management service for handling chart-related state.
 */
import { Injectable } from "@angular/core";
import { State, Action, StateContext } from "@ngxs/store";
import { AddChartAction, RemoveChartAction, UpdateChartAction } from "./chart.action";
import { ChartStateInterface } from "./chart.state.interface";


@State<ChartStateInterface>({
  name: 'chart',
  defaults: {
    charts: []
  },
})


/**
 * Represents a state class for managing chart-related state.
 */
@Injectable()
export class ChartState {
  /**
   * Action method to add a chart model to the state.
   * @param ctx StateContext instance for managing state
   * @param action AddChartAction instance containing the chart model to be added
   */
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

  /**
   * Action method to update a chart model in the state.
   * @param ctx StateContext instance for managing state
   * @param action AddChartAction instance containing the chart model to be updated and its index in the list
   */
  @Action(UpdateChartAction)
  updateChartModels(ctx: StateContext<ChartStateInterface>, action: UpdateChartAction) {
    const { chartModel, index } = action;

    if (!chartModel || index == null || index == undefined) {
      return;
    }

    const state = ctx.getState();


    ctx.setState({
      ...state,
      charts: state.charts.map((item, i) => i === index ? chartModel : item)
    })

  }

  /**
   * Action method to remove a chart model from the state.
   * @param ctx StateContext instance for managing state
   * @param action AddChartAction instance containing the index of the model which is being removed
   */
  @Action(RemoveChartAction)
  removeChartModels(ctx: StateContext<ChartStateInterface>, action: RemoveChartAction) {
    var { index } = action;


    if (index == null || index == undefined) {
      return;
    }

    var state = ctx.getState();

    ctx.setState({
      ...state,
      charts: [...state.charts.slice(0, index), ...state.charts.slice(index + 1)]
    })

  }
}