/**
 * Represents a class for defining selectors related to date filter state.
 */
import { Selector } from '@ngxs/store';
import { DateFilterInterface } from './date-filter.interface';
import { DateFilterState } from './date-filter.state';

export class DateFilterSelectors {
  /**
   * Selector function to retrieve the date filter from the date filter state.
   * @param state The current state of the date filter.
   * @returns An object containing the 'from' and 'to' properties of the date filter.
   */
  @Selector([DateFilterState])
  static dateFilter(state: DateFilterInterface): DateFilterInterface {
    return {
      from: state.from,
      to: state.to
    };
  }
}
