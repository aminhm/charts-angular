/**
 * Represents a component for managing date filtering.
 */
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TuiDayRange, TuiDay } from '@taiga-ui/cdk';
import { Store } from '@ngxs/store';
import { ChangeDateFilterAction } from '../../../ngxs/date filter/date-filter.action';
import { TuiInputDateRangeModule } from '@taiga-ui/kit';
import { TuiTextfieldControllerModule } from '@taiga-ui/core';

@Component({
  selector: 'app-date-filter',
  standalone: true, // Indicates that this component is self-sufficient and doesn't rely on external data binding
  imports: [
    ReactiveFormsModule,
    TuiInputDateRangeModule,
    TuiTextfieldControllerModule,
  ],
  templateUrl: './date-filter.component.html', // The HTML template file for this component
  styleUrl: './date-filter.component.scss' // The SCSS style file for this component
})
export class DateFilterComponent {
  // Form group to manage date selection
  dateForm = new FormGroup({
    dateValue: new FormControl({}),
  });

  constructor(private store: Store) { }

  /**
   * Dispatches a change date filter action when the date selection changes.
   * @param event The event containing the updated date range.
   */
  dateChanges(event: any) {
    this.store.dispatch(new ChangeDateFilterAction(event));
  }

  /**
   * Initializes the date form with default values.
   */
  ngOnInit() {
    this.dateForm.controls.dateValue = new FormControl(
      // Default date range from 1992/01/01 to current local date
      new TuiDayRange(
        new TuiDay(1992, 0, 1),
        TuiDay.currentLocal()
      ),
    );
  }
}
