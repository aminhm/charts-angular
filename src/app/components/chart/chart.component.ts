import { Component, Input, ViewChild } from '@angular/core';
import { ChartDataModel } from '../../models/chart-data.model';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TuiInputRangeModule, TuiInputModule } from '@taiga-ui/kit';
import { HighchartsChartModule } from 'highcharts-angular';
import Highcharts from 'highcharts';
import { UtilsService } from '../../services/utils.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [
    HighchartsChartModule,
    TuiInputRangeModule,
    TuiInputModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss'
})
export class ChartComponent {
  Highcharts: typeof Highcharts = Highcharts;
  subscription!: Subscription;
  @Input() chartDataModel: ChartDataModel = new ChartDataModel();
  @ViewChild('chart') componentRef: any;
  constructor(private utilsService:UtilsService){}
  chartCallback: Highcharts.ChartCallbackFunction = chart => {
    this.utilsService.setChartRef(chart);
  };
  ngOnInit(){
    this.subscription = this.utilsService.chartRefItems$.subscribe(data => {
    });
    this.chartDataModel.getDateFilterFormControl().valueChanges.subscribe(newValue => {
      var chartDataDates = this.chartDataModel.getChartDataDates()
      var chartDataValues = this.chartDataModel.getChartDataValues()
      this.chartDataModel.changeChartOptionsData(
        chartDataDates.slice(chartDataDates.indexOf(newValue[0].toString()),chartDataDates.indexOf(newValue[1].toString())+1)
    ,chartDataValues.slice(chartDataDates.indexOf(newValue[0].toString()),chartDataDates.indexOf(newValue[1].toString())+1))
    })
  }
}
