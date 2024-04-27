/**
 * Represents a shared service providing utility functions and data.
 */
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  // Array containing types of charts
  public chartTypes = ['Area', 'Line', 'Spline', 'AreaSpline']

  /**
   * Gets the array of chart types.
   * @returns An array containing types of charts.
   */
  getChartType() {
    return this.chartTypes
  }

}
