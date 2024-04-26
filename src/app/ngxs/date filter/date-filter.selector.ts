import { Selector } from '@ngxs/store';
import { DateFilterInterface } from './date-filter.interface';
import { DateFilterState } from './date-filter.state';

export class DateFilterSelectors {
  @Selector([DateFilterState])
  static dateFilter(state: DateFilterInterface): DateFilterInterface {
    return {
      from : state.from,
      to : state.to
    };
  }
}