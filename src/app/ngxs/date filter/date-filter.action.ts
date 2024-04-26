import { DateFilterInterface } from "./date-filter.interface";

export class ChangeDateFilterAction {
    static readonly type = 'Change Date Filter';
    constructor(public dateFilter: DateFilterInterface) {}
  }
