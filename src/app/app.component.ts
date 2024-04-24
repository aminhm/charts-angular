import { NgDompurifySanitizer } from "@tinkoff/ng-dompurify";
import { TuiRootModule, TuiDialogModule, TuiAlertModule, TUI_SANITIZER } from "@taiga-ui/core";
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ViewModeComponent } from "./components/view-mode/view-mode.component";
import { ChartDataModel } from "./models/chart-data.model";
import { ChartDataAPIService } from "./services/chart-data-api.service";
import { UtilsService } from "./services/utils.service";
import { Subscription } from "rxjs";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, ViewModeComponent, TuiRootModule, TuiDialogModule, TuiAlertModule],
    providers: [{provide: TUI_SANITIZER, useClass: NgDompurifySanitizer}]
})
export class AppComponent {
  title = 'charts-angular';
  constructor(private chartDataService: ChartDataAPIService,
    private utilsService: UtilsService){}

    dataSubscription!: Subscription;
  chartDataModelFromAPI: ChartDataModel = new ChartDataModel();
  ngOnInit(){
    this.getChartDataFromApi()
    this.utilsService.setChartDataModels([this.chartDataModelFromAPI])
  }
  getChartDataFromApi(): void {
    this.dataSubscription = this.chartDataService.getChartData().subscribe({
      next: (data) => {
        for (let item of data[1]){
          this.chartDataModelFromAPI.addToChartDataDate(item.date)
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
        this.chartDataModelFromAPI.setDateFilterMaxValue()
        this.chartDataModelFromAPI.setDateFilterMinValue()
        this.chartDataModelFromAPI.setDateFilterFormControl()
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        this.chartDataModelFromAPI.setChartOptions()
      }
    });
  }
  ngOnDestroy(): void {
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }
  }
}
