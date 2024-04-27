import { DateFilterInterface } from "./date-filter.interface";

/**
 * Represents an action to change the date filter.
 */
export class ChangeDateFilterAction {
  static readonly type = 'Change Date Filter';
  constructor(public dateFilter: DateFilterInterface) { }
}
