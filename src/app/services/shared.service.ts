import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  public months = ['January','February','March','April','May','June','July','August','September','October','November','December']
  public days = ['Saturday','Sunday','Monday','Tuesday','Wednesday','Thursday','Friday']

  public chartDateTypes = ['Yearly','Monthly','Daily']
  public chartTypes = ['Area','Line','Spline','AreaSpline']

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
