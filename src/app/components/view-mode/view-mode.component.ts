import { Component } from '@angular/core';
import { HighchartsChartModule } from 'highcharts-angular';
import Highcharts from 'highcharts/es-modules/masters/highcharts.src';

@Component({
  selector: 'app-view-mode',
  standalone: true,
  imports: [HighchartsChartModule],
  templateUrl: './view-mode.component.html',
  styleUrl: './view-mode.component.scss'
})
export class ViewModeComponent {
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {
    series: [{
      data: [1, 2, 3],
      type: 'line'
    }]
  };

}
