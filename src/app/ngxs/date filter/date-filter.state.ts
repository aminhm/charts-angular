import { Injectable } from "@angular/core";
import { State, Action, StateContext } from "@ngxs/store";
import { ChangeDateFilterAction } from "./date-filter.action";
import { DateFilterInterface } from "./date-filter.interface";
import { TuiDay } from "@taiga-ui/cdk";


@State<DateFilterInterface>({
  name: 'dateFilter',
  defaults: {
      from: new TuiDay(1992,0,1),
      to: TuiDay.currentLocal()
  },
})
@Injectable()
export class DateFilterState {
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
        to:  dateFilter.to
    });
  }

}