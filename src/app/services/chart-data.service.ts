import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChartDataService {

  constructor(private http: HttpClient) { }

  url = "https://cdn.jsdelivr.net/gh/highcharts/highcharts@c55c2f39d531b227dc239d2d63d6eef882260cb6/samples/data/worldbank-norway.json"

  getChartData(){
    return this.http.get(this.url);
  }
}
