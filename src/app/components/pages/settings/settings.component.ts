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
  @Select(ChartSelectors.chartItems) chartItems$!: Observable<ChartModel[]>;
  @ViewChild(AddChartComponent) addChartComponent!: AddChartComponent;
  @ViewChild(EditChartComponent) editChartComponent!: EditChartComponent;
  indexChartDataModelForEdit: number = 0;
  chartDataModelForEdit : ChartModel = new ChartModel();

  constructor(private store: Store) {
  }

  isAddChartModalOpen = false;
  isEditChartModalOpen = false;
openAddChartModal(): void {
  this.isAddChartModalOpen = false;
  setTimeout(() => {
    this.isAddChartModalOpen = true;
  }, 500);
  setTimeout(() => {
    this.addChartComponent.isAddChartModalOpen=true;
  }, 500);
  
}

openEditChartModal(chartDataModelForEdit:ChartModel,index : number): void {
  this.indexChartDataModelForEdit = index;
  this.chartDataModelForEdit = chartDataModelForEdit;
  this.isEditChartModalOpen = false;
  setTimeout(() => {
    this.isEditChartModalOpen = true;
    
  }, 500);
  setTimeout(() => {
    this.editChartComponent.isAddChartModalOpen=true;
  }, 500);
}


  removeChart(index:number){
    this.store.dispatch(new RemoveChartAction(index));
  }

}
