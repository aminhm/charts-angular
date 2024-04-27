/**
 * Represents a component for managing user settings.
 */
import { Component, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { AddChartComponent } from '../../modals/add-chart/add-chart.component';
import { CommonModule } from '@angular/common';
import { ChartComponent } from '../../shared/chart/chart.component';
import { TuiButtonModule } from '@taiga-ui/core';
import { RouterModule } from '@angular/router';
import { EditChartComponent } from '../../modals/edit-chart/edit-chart.component';
import { ChartModel } from '../../../ngxs/chart/chart.model';
import { Select, Store } from '@ngxs/store';
import { ChartSelectors } from '../../../ngxs/chart/chart.selector';
import { RemoveChartAction } from '../../../ngxs/chart/chart.action';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    RouterModule,
    AddChartComponent,
    CommonModule,
    ChartComponent,
    TuiButtonModule,
    EditChartComponent
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {
  /**
   * Observable representing the chart items.
   */
  @Select(ChartSelectors.chartItems) chartItems$!: Observable<ChartModel[]>;
  /**
 * ViewChild decorators for accessing child components.
 */
  @ViewChild(AddChartComponent) addChartComponent!: AddChartComponent;
  @ViewChild(EditChartComponent) editChartComponent!: EditChartComponent;
  /**
   * Index of the chart data model for editing.
   */
  indexChartDataModelForEdit: number = 0;
  /**
   * Chart data model for editing.
   */
  chartDataModelForEdit: ChartModel = new ChartModel();

  constructor(private store: Store) {
  }

  /**
   * Flag to indicate if the add chart modal is open.
   */
  isAddChartModalOpen = false;
  /**
   * Flag to indicate if the edit chart modal is open.
   */
  isEditChartModalOpen = false;

  /**
   * Opens the add chart modal.
   */
  openAddChartModal(): void {
    this.isAddChartModalOpen = false;
    // Delay before setting the modal to open to allow for reseting the component
    setTimeout(() => {
      this.isAddChartModalOpen = true;
    }, 100);
    // Ensure the addChartComponent's modal flag is also set to true
    setTimeout(() => {
      this.addChartComponent.isAddChartModalOpen = true;
    }, 100);
  }

  /**
   * Opens the edit chart modal.
   * @param chartDataModelForEdit The chart data model to be edited.
   * @param index The index of the chart data model.
   */
  openEditChartModal(chartDataModelForEdit: ChartModel, index: number): void {
    this.indexChartDataModelForEdit = index;
    this.chartDataModelForEdit = chartDataModelForEdit;
    this.isEditChartModalOpen = false;
    // Delay before setting the modal to open to allow for reseting the component
    setTimeout(() => {
      this.isEditChartModalOpen = true;
    }, 5);
    // Ensure the editChartComponent's modal flag is also set to true
    setTimeout(() => {
      this.editChartComponent.isAddChartModalOpen = true;
    }, 5);
  }

  /**
   * Removes a chart by dispatching a remove chart action.
   * @param index The index of the chart to be removed.
   */
  removeChart(index: number) {
    this.store.dispatch(new RemoveChartAction(index));
  }
}
