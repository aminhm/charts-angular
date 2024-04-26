import { NgDompurifySanitizer } from "@tinkoff/ng-dompurify";
import { TUI_SANITIZER, TuiAlertModule, TuiDialogModule, TuiRootModule } from "@taiga-ui/core";
import { Component, HostListener } from '@angular/core';
import { ChartDataAPIService } from "./services/chart-data-api.service";
import { Subscription } from "rxjs";
import { TuiDay } from "@taiga-ui/cdk";
import { Store } from "@ngxs/store";
import { AddChartAction } from "./ngxs/chart/chart.action";
import { ChartModel } from "./ngxs/chart/chart.model";
import { RouterOutlet } from "@angular/router";
import { HeaderComponent } from "./components/shared/header/header.component";
import { ViewModeComponent } from "./components/pages/view-mode/view-mode.component";
import { SideNavComponent } from "./components/shared/side-nav/side-nav.component";
import { CommonModule } from "@angular/common";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [
      RouterOutlet, 
      ViewModeComponent, 
      TuiRootModule, 
      TuiDialogModule, 
      TuiAlertModule,
      HeaderComponent,
      SideNavComponent,
      CommonModule
    ],
    providers: [{provide: TUI_SANITIZER, useClass: NgDompurifySanitizer}]
})
export class AppComponent {
  title = 'charts-angular';
  windowWidth!: number;
  showSidebar!:boolean;
  dataSubscription!: Subscription;
  chartDataModelFromAPI: ChartModel = new ChartModel();


  constructor(private chartDataService: ChartDataAPIService,
    private store: Store){
      
    }

  ngOnInit(){
    this.windowWidth = window.innerWidth;
    this.chooseHeader()
    this.getChartDataFromApi()
  }
  getChartDataFromApi(): void {
    this.dataSubscription = this.chartDataService.getChartData().subscribe({
      next: (data) => {
        for (let item of data[1]){
          this.chartDataModelFromAPI.addToChartDataDate(new TuiDay(+item.date,1,1))
          this.chartDataModelFromAPI.addToChartValues(parseFloat(item.value.toFixed(2)))
        }
        this.chartDataModelFromAPI.setChartDataDates(this.chartDataModelFromAPI.getChartDataDates().reverse())
        this.chartDataModelFromAPI.setChartDataValues(this.chartDataModelFromAPI.getChartDataValues().reverse())
        if(data[1][0]){
          this.chartDataModelFromAPI.setChartDataLabel(data[1][0].country.value)
          this.chartDataModelFromAPI.setChartYaxisTitle(data[1][0].indicator.value)
        }
        if(data[0]){
          this.chartDataModelFromAPI.setChartTitle(data[0].sourcename)
        }
        this.chartDataModelFromAPI.setChartDataColor('#2cb0ff')
        this.chartDataModelFromAPI.setChartBackgroundColor('#ffffff')
        this.chartDataModelFromAPI.setChartTitleColor('#000000')
        this.chartDataModelFromAPI.setChartYaxisColor('#000000')
        this.chartDataModelFromAPI.setChartLabelColor('#000000')
        this.chartDataModelFromAPI.sortDateValues()
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        this.chartDataModelFromAPI.setChartOptions()
        this.addChart(this.chartDataModelFromAPI)
      }
    });
  }
  addChart(chartModel:ChartModel){
    this.store.dispatch(new AddChartAction(chartModel));
  }
  ngOnDestroy(): void {
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event:any) {
    this.windowWidth = window.innerWidth;
    this.chooseHeader()
  }

  chooseHeader(){
    if(this.windowWidth<700){
      this.showSidebar = true;
    }
    else{
      this.showSidebar = false;
    }
  }
}
