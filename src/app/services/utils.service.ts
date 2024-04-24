import { Injectable } from '@angular/core';
import { ChartDataModel } from '../models/chart-data.model';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  public months = ['January','February','March','April','May','June','July','August','September','October','November','December']
  public days = ['Saturday','Sunday','Monday','Tuesday','Wednesday','Thursday','Friday']

  public chartDateTypes = ['Yearly','Monthly','Daily']
  public chartTypes = ['Area','Line','Spline','Bar','AreaSpline']


  public chartRef! :Highcharts.Chart;
  public chartRefSource = new BehaviorSubject<Highcharts.Chart>(this.chartRef);
  public chartRefItems$ = this.chartRefSource.asObservable();

  public chartDataModels :ChartDataModel[] = []
  public chartDataModelsSource = new BehaviorSubject<ChartDataModel[]>(this.chartDataModels);
  public chartDataModelsItems$ = this.chartDataModelsSource.asObservable();

  addToChartDataModels(chartDataModel: ChartDataModel){
    this.chartDataModels.push(chartDataModel)
    this.setChartDataModels(this.chartDataModels)
  }

  setChartDataModels(chartDataModels: ChartDataModel[]) {
    this.chartDataModelsSource.next(chartDataModels);
  }

  setChartRef(chartRef: Highcharts.Chart) {
    this.chartRef = chartRef
    this.chartRefSource.next(chartRef);
  }

  getChartDateTypes(){
    return this.chartDateTypes
  }

  getChartType(){
    return this.chartTypes
  }

  getMonths(){
    return this.months
  }
  getDays(){
    return this.days
  }

}
