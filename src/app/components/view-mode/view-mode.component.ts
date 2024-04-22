import { ChangeDetectionStrategy, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { HighchartsChartModule } from 'highcharts-angular';
import Highcharts from 'highcharts/es-modules/masters/highcharts.src';
import { ChartDataService } from '../../services/chart-data.service';
import { Subscription } from 'rxjs';
import { ChartDataModel } from '../../models/chart-data.interface';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {TuiInputModule, TuiInputRangeModule, TuiKeySteps} from '@taiga-ui/kit';
import { CommonModule } from '@angular/common';
import { ChartDataType } from '../../models/chart-data-type.enum';

@Component({
  selector: 'app-view-mode',
  standalone: true,
  imports: [HighchartsChartModule,TuiInputRangeModule,TuiInputModule,ReactiveFormsModule,CommonModule],
  templateUrl: './view-mode.component.html',
  styleUrl: './view-mode.component.scss',
})
export class ViewModeComponent {
  dataSubscription!: Subscription;
  constructor(private chartDataService: ChartDataService) { }

  ngOnInit() {
    this.getChartDataFromApi()
    this.chartData.getDateFieldFormControl().valueChanges.subscribe(newValue => {
      var chartDataDates = this.chartData.getChartDataDates()
      var chartDataValues = this.chartData.getChartDataValues()
      this.chartData.changeChartOptionsData(
        chartDataDates.slice(chartDataDates.indexOf(newValue[0].toString()),chartDataDates.indexOf(newValue[1].toString())+1)
    ,chartDataValues.slice(chartDataDates.indexOf(newValue[0].toString()),chartDataDates.indexOf(newValue[1].toString())+1))
    })
  }
  Highcharts: typeof Highcharts = Highcharts;
  chartData: ChartDataModel = new ChartDataModel();

  getChartDataFromApi(): void {
    this.dataSubscription = this.chartDataService.getChartData().subscribe({
      next: (data) => {
        for (let item of data[1]){
          this.chartData.addChartDataDate(item.date)
          this.chartData.addChartValues(parseFloat(item.value.toFixed(2)))
        }
        this.chartData.setChartDataDates(this.chartData.getChartDataDates().reverse())
        this.chartData.setChartDataValues(this.chartData.getChartDataValues().reverse())
        if(data[1][0]){
          this.chartData.setChartDataCountry(data[1][0].country.value)
          this.chartData.setChartYaxisTitle(data[1][0].indicator.value)
        }
        if(data[0]){
          this.chartData.setChartTitle(data[0].sourcename)
        }
        this.chartData.setChartType('spline')
        this.chartData.setDateFieldMaxValue()
        this.chartData.setDateFieldMinValue()
        this.chartData.setDateFieldFormControl()
        this.chartData.setChartDataType(ChartDataType.Year)
        this.chartData.setDateFieldPluralizeValue()
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        this.chartData.setChartOptions()
      }
    });
  }

  ngOnDestroy(): void {
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }
  }
}
