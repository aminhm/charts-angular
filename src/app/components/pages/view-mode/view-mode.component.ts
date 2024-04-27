/**
 * Represents a component for displaying the view mode of charts.
 */
import { Component } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ChartSelectors } from '../../../ngxs/chart/chart.selector';
import { Select } from '@ngxs/store';
import { ChartModel } from '../../../ngxs/chart/chart.model';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TuiInputModule, TuiInputRangeModule } from '@taiga-ui/kit';
import { ChartComponent } from '../../shared/chart/chart.component';
import { DateFilterComponent } from '../../utils/date-filter/date-filter.component';

@Component({
  selector: 'app-view-mode',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TuiInputModule,
    RouterModule,
    ChartComponent,
    CommonModule,
    TuiInputRangeModule,
    DateFilterComponent
  ],
  templateUrl: './view-mode.component.html',
  styleUrl: './view-mode.component.scss',
})
export class ViewModeComponent {
  /**
   * Observable of chart items obtained from the state.
   */
  @Select(ChartSelectors.chartItems) chartItems$!: Observable<ChartModel[]>;
}
