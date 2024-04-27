/**
 * Represents a component for displaying and managing a chart.
 */
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
  /**
   * Highcharts instance.
   */
  Highcharts: typeof Highcharts = Highcharts;
  /**
   * Event emitter for passing Highcharts chart reference to parent components.
   */
  @Output() chartRefOutput = new EventEmitter<Highcharts.Chart>();
  /**
 * Represents a component for displaying and managing a chart.
 */
  chartRef!: Highcharts.Chart; // Reference to the Highcharts chart
  @Select(DateFilterSelectors.dateFilter) dateFilter$!: Observable<DateFilterInterface>; // Observable for date filter changes
  @Input() chartModel: ChartModel = new ChartModel(); // Input property for the chart model
  @Input() isFilterEnabled: boolean = false; // Input property indicating whether the filter is enabled
  constructor() { }
  /**
 * Callback function invoked when the Highcharts chart is initialized.
 * Sets the chart reference and emits it to parent components.
 */
  chartCallback: Highcharts.ChartCallbackFunction = chart => {
    this.chartRef = chart;
    this.chartRefOutput.emit(chart);
  };
  /**
 * Subscribes to the date filter observable and updates the chart when the filter changes.
 */
  ngOnInit() {
    this.dateFilter$.subscribe(newValue => {
      // Update the chart only if the filter is enabled, a new value exists, and the chart reference and series are available
      if (this.isFilterEnabled && newValue && this.chartRef && this.chartRef.series) {
        this.updateChartDateAndValues(newValue)
      }
    })


  }
  /**
   * Updates the chart with new date filter values.
   * @param newValue The new date filter value.
   */
  updateChartDateAndValues(newValue: DateFilterInterface) {
    // Retrieve chart data dates and values
    var chartDataDates = this.chartModel.getChartDataDates();
    var chartDataValues = this.chartModel.getChartDataValues();

    // Find indices for start and end dates based on the filter values
    var findIndexFromDate = chartDataDates.findIndex((date) => date.toLocalNativeDate() >= newValue.from.toLocalNativeDate());
    var findIndexToDate = chartDataDates.findIndex((date) => date.toLocalNativeDate() > newValue.to.toLocalNativeDate());

    // Update chart x-axis categories and series data based on the filtered date range
    this.chartRef.xAxis[0].setCategories(
      chartDataDates.slice(
        findIndexFromDate,
        (findIndexToDate < 0 ? chartDataDates.length + 1 : findIndexToDate)
      ).map(
        (date) => date.year.toString() + '/' + (date.month + 1).toString() + '/' + date.day.toString()
      )
    );
    this.chartRef.series[0].setData(
      chartDataValues.slice(
        findIndexFromDate,
        (findIndexToDate < 0 ? chartDataDates.length + 1 : findIndexToDate)
      )
    );
  }
}
