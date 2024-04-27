/**
 * Service for fetching chart data from an API.
 */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChartDataAPIService {
  constructor(private http: HttpClient) { }

  // API URL for fetching chart data
  url = "https://cdn.jsdelivr.net/gh/highcharts/highcharts@c55c2f39d531b227dc239d2d63d6eef882260cb6/samples/data/worldbank-norway.json"

  /**
   * Fetches chart data from the API.
   * @returns An observable emitting the fetched chart data.
   */
  getChartData(): Observable<any> {
    return this.http.get<any>(this.url);
  }
}
