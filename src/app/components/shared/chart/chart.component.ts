import { Component, EventEmitter, Input, Output } from '@angular/core';
import Highcharts from 'highcharts';
import { Observable } from 'rxjs';
import { Select } from '@ngxs/store';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TuiInputRangeModule, TuiInputModule } from '@taiga-ui/kit';
import { HighchartsChartModule } from 'highcharts-angular';
import { ChartModel } from '../../../ngxs/chart/chart.model';
import { DateFilterInterface } from '../../../ngxs/date filter/date-filter.interface';
import { DateFilterSelectors } from '../../../ngxs/date filter/date-filter.selector';

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
  @Output() chartRefOutput = new EventEmitter<Highcharts.Chart>();
  chartRef!: Highcharts.Chart;
  @Select(DateFilterSelectors.dateFilter) dateFilter$!: Observable<DateFilterInterface>;
  @Input() chartModel: ChartModel = new ChartModel();
  @Input() isFilterEnabled: boolean = false;
  constructor(){}
  chartCallback: Highcharts.ChartCallbackFunction = chart => {
    this.chartRef = chart;
    this.chartRefOutput.emit(chart);
  };
  ngOnInit(){
    this.dateFilter$.subscribe(newValue => {
      if(this.isFilterEnabled && newValue && this.chartRef && this.chartRef.series){
        this.updateChartDateAndValues(newValue)
  }
    })
    
    
  }

  updateChartDateAndValues(newValue:DateFilterInterface){
    var chartDataDates = this.chartModel.getChartDataDates()
      var chartDataValues = this.chartModel.getChartDataValues()
      var findIndexFromDate = chartDataDates.findIndex((date)=>date.toLocalNativeDate()>= newValue.from.toLocalNativeDate())
      var findIndexToDate = chartDataDates.findIndex(
        (date)=>date.toLocalNativeDate()> newValue.to.toLocalNativeDate())

        this.chartRef.xAxis[0].setCategories(chartDataDates.slice(
          findIndexFromDate,
          (findIndexToDate < 0 ? chartDataDates.length+1 : findIndexToDate)).map(
        (date)=> 
            date.year.toString()+'/'+
            (date.month+1).toString()+'/'+
            date.day.toString()
    ))


        this.chartRef.series[0].setData(chartDataValues.slice(
          findIndexFromDate,
          (findIndexToDate < 0 ? chartDataDates.length+1 : findIndexToDate)))
          
  }
}
