/**
 * This component serves as the root component of the application, managing its main structure and functionality.
 * It incorporates various modules, components, services, and providers to handle chart data and application features.
 */
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
  providers: [{ provide: TUI_SANITIZER, useClass: NgDompurifySanitizer }]
})
export class AppComponent {
  /**
   * Title of the application.
   */
  title = 'charts-angular';
  /**
   * Width of the window.
   */
  windowWidth!: number;
  /**
   * Flag to indicate whether to show the sidebar.
   */
  showSidebar!: boolean;
  /**
   * Subscription for fetching chart data from the API.
   */
  dataSubscription!: Subscription;
  /**
   * Chart data model fetched from the API.
   */
  chartDataModelFromAPI: ChartModel = new ChartModel();

  constructor(private chartDataService: ChartDataAPIService,
    private store: Store) { }


  ngOnInit() {
    this.windowWidth = window.innerWidth;
    this.chooseHeader();
    this.getChartDataFromApi();
  }

  /**
   * Fetches chart data from the API.
   */
  getChartDataFromApi(): void {
    this.dataSubscription = this.chartDataService.getChartData().subscribe({
      next: (data) => {
        // Process data and populate chart data model

        for (let item of data[1]) {
          this.chartDataModelFromAPI.addToChartDataDate(new TuiDay(+item.date, 1, 1))
          this.chartDataModelFromAPI.addToChartValues(parseFloat(item.value.toFixed(2)))
        }
        this.chartDataModelFromAPI.setChartDataDates(this.chartDataModelFromAPI.getChartDataDates().reverse())
        this.chartDataModelFromAPI.setChartDataValues(this.chartDataModelFromAPI.getChartDataValues().reverse())
        if (data[1][0]) {
          this.chartDataModelFromAPI.setChartDataLabel(data[1][0].country.value)
          this.chartDataModelFromAPI.setChartYaxisTitle(data[1][0].indicator.value)
        }
        if (data[0]) {
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
        // After fetching data, set chart options and add chart
        this.chartDataModelFromAPI.setChartOptions()
        this.addChart(this.chartDataModelFromAPI)
      }
    });
  }

  /**
   * Adds chart to the application state.
   * @param chartModel The chart model to be added.
   */
  addChart(chartModel: ChartModel) {
    this.store.dispatch(new AddChartAction(chartModel));
  }

  /**
   * Handles cleanup when component is destroyed.
   */
  ngOnDestroy(): void {
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }
  }

  /**
   * Event listener for window resize.
   * @param event The resize event.
   */
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.windowWidth = window.innerWidth;
    this.chooseHeader();
  }

  /**
   * Determines whether to show the sidebar based on window width.
   */
  chooseHeader() {
    if (this.windowWidth < 700) {
      this.showSidebar = true;
    }
    else {
      this.showSidebar = false;
    }
  }
}
