import { Component } from '@angular/core';
import { UtilsService } from '../../services/utils.service';
import { Subscription } from 'rxjs';
import { AddChartComponent } from '../add-chart/add-chart.component';
import { ColorPickerComponent } from '../color-picker/color-picker.component';
import { ViewModeComponent } from '../view-mode/view-mode.component';
import { ChartDataModel } from '../../models/chart-data.model';
import { CommonModule } from '@angular/common';
import { ChartComponent } from '../chart/chart.component';
import { TuiButtonModule } from '@taiga-ui/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    RouterModule,
    AddChartComponent,
    CommonModule,
    ChartComponent,
    TuiButtonModule,
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {
  subscription: Subscription;
  chartDataModels: ChartDataModel[] = [];

  constructor(public utilsService: UtilsService) {
    this.subscription = this.utilsService.chartDataModelsItems$.subscribe(data => {
      this.chartDataModels = data
    });
  }

  removeChart(index:number){
    this.chartDataModels.splice(index,1)
    this.utilsService.setChartDataModels(this.chartDataModels)
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
