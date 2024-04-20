import { Component } from '@angular/core';
import { HighchartsChartModule } from 'highcharts-angular';
import Highcharts from 'highcharts/es-modules/masters/highcharts.src';
import { ChartDataService } from '../../services/chart-data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-view-mode',
  standalone: true,
  imports: [HighchartsChartModule],
  templateUrl: './view-mode.component.html',
  styleUrl: './view-mode.component.scss'
})
export class ViewModeComponent {
  dataSubscription!: Subscription;
  constructor(private chartDataService: ChartDataService) { }

  ngOnInit() {
    this.getChartData()
  }
  Highcharts: typeof Highcharts = Highcharts;
  chartDataDates: string[] = [];
  chartDataValues: number[] = [];
  chartOptions: Highcharts.Options = {
    series: [{
      data: this.chartDataValues,
      type: 'spline'
    }]
  };


  getChartData(): void {
    this.dataSubscription = this.chartDataService.getChartData().subscribe({
      next: (data) => {
        for (let item of data[1]){
          this.chartDataDates.push(item.date)
          this.chartDataValues.push(item.value)
        }
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        if (this.chartOptions.series && this.chartOptions.series[0]) {
          this.chartOptions.series = [{
            data: this.chartDataValues,
            type: 'spline'
          }];
        }
      }
    });
  }


  ngOnDestroy(): void {
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }
  }
}
