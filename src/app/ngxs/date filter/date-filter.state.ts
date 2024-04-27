/**
 * Represents a state management service for handling date filter state.
 */
import { Injectable } from "@angular/core";
import { State, Action, StateContext } from "@ngxs/store";
import { ChangeDateFilterAction } from "./date-filter.action";
import { DateFilterInterface } from "./date-filter.interface";
import { TuiDay } from "@taiga-ui/cdk";


@State<DateFilterInterface>({
  name: 'dateFilter',
  defaults: {
    from: new TuiDay(1992, 0, 1),
    to: TuiDay.currentLocal()
  },
})

/**
 * Represents a state class for managing date filter state.
 */
@Injectable()
export class DateFilterState {
  /**
   * Action handler for changing the date filter.
   * @param ctx The state context.
   * @param action The action containing the new date filter.
   */
  @Action(ChangeDateFilterAction)
  changeDateFilter(ctx: StateContext<DateFilterInterface>, action: ChangeDateFilterAction) {
    const { dateFilter } = action;

    if (!dateFilter) {
      return;
    }
    const state = ctx.getState();

    ctx.setState({
      ...state,
      from: dateFilter.from,
      to: dateFilter.to
    });
  }

}