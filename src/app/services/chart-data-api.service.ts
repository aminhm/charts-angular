import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChartDataAPIService {

  constructor(private http: HttpClient) { }

  url = "https://cdn.jsdelivr.net/gh/highcharts/highcharts@c55c2f39d531b227dc239d2d63d6eef882260cb6/samples/data/worldbank-norway.json"

  getChartData(): Observable<any>{
    return this.http.get<any>(this.url);
  }
}
