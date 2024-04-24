import { Component} from '@angular/core';
import { ChartDataAPIService } from '../../services/chart-data-api.service';
import { Subscription } from 'rxjs';
import { ChartDataModel } from '../../models/chart-data.model';
import { UtilsService } from '../../services/utils.service';
import { RouterModule } from '@angular/router';
import { ChartComponent } from '../chart/chart.component';
import { ChartType } from '../../models/chart-type.enum';
import { CommonModule } from '@angular/common';
import { TuiInputModule, TuiInputRangeModule } from '@taiga-ui/kit';
import { ReactiveFormsModule } from '@angular/forms';

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
  
],
  templateUrl: './view-mode.component.html',
  styleUrl: './view-mode.component.scss',
})
export class ViewModeComponent {
  
  chartDataModels: ChartDataModel[] = [];
  chartSubscription!: Subscription;
  constructor(
    private utilsService: UtilsService
  ) { 
    
    this.chartSubscription = this.utilsService.chartDataModelsItems$.subscribe(data => {
      this.chartDataModels = data
    });
  }

  ngOnDestroy(): void {
    if (this.chartSubscription) {
      this.chartSubscription.unsubscribe();
    }
  }
}
