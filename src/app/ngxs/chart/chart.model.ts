
import Highcharts from "highcharts";
import { TuiDay } from "@taiga-ui/cdk";
import { ChartType } from "../../enums/chart-type.enum";

export class ChartModel {
    private chartTitle: string = "Chart Title";
    private chartYaxisTitle: string = "Chart Y Axis Title";
    private chartType!: ChartType;
    private chartDataDates: TuiDay[] = [];
    private chartDataValues: number[] = [];
    private chartDataLabel: string = "Chart Label";
    private chartOptions: Highcharts.Options = {};
    private chartBackgroundColor: string = ""
    private chartDataColor: string = ""
    private chartTitleColor: string = ""
    private chartYaxisColor: string = ""
    private chartLabelColor: string = ""

    constructor(){
    }

    sortDateValues(){
        var n = this.getChartDataDates().length
        for (let i = 0; i < n - 1; i++) {
            // Inner loop for comparisons and swapping
            for (let j = 0; j < n - i - 1; j++) {
              // Swap if the current element is greater than the next element
              if (this.getChartDataDates()[j] > this.getChartDataDates()[j + 1]) {
                // Swap elements
                var temp = this.getChartDataDates()[j];
                this.getChartDataDates()[j] = this.getChartDataDates()[j + 1];
                this.getChartDataDates()[j + 1] = temp;
                var temp2 = this.getChartDataValues()[j];
                this.getChartDataValues()[j] = this.getChartDataValues()[j + 1];
                this.getChartDataValues()[j + 1] = temp2;
              }
            }

          }
        this.setChartOptions()

    }
    setChartTitle(chartTitle:string){
        this.chartTitle = chartTitle
    }

    getChartTitle(){
        return this.chartTitle
    }

    setChartYaxisTitle(chartYaxisTitle:string){
        this.chartYaxisTitle = chartYaxisTitle
    }

    getChartYaxisTitle(){
        return this.chartYaxisTitle
    }

    setChartType(chartType:ChartType){
        this.chartType = chartType
    }

    getChartType() :'line' |
    'spline'|
    'area'|
    'bar'|
    'areaspline' {
        if(this.chartType == ChartType.Line){
            return "line"
        }
        if(this.chartType == ChartType.AreaSpline){
            return "areaspline"
        }
        if(this.chartType == ChartType.Spline){
            return "spline"
        }
        return "area";
    }

    setChartDataDates(chartDataDates:TuiDay[]){
        this.chartDataDates = chartDataDates
    }

    getChartDataDates(){
        return this.chartDataDates
    }

    addToChartDataDate(date:TuiDay){
        this.chartDataDates.push(date)
    }

    removeFromChartDataDate(index:number){
        this.chartDataDates.splice(index, 1);
    }

    updateChartDataDate(date:TuiDay,index:number){
        this.chartDataDates[index] = date
    }

    setChartDataValues(chartDataValues:number[]){
        this.chartDataValues = chartDataValues
    }

    getChartDataValues(){
        return this.chartDataValues
    }

    addToChartValues(value:number){
        this.chartDataValues.push(value)
    }

    removeFromChartValues(index:number){
        this.chartDataValues.splice(index, 1);
    }

    updateChartDataValues(value:number,index:number){
        this.chartDataValues[index] = value
    }

    setChartDataLabel(chartDataLabel:string){
        this.chartDataLabel = chartDataLabel
    }

    getChartDataLabel(){
        return this.chartDataLabel
    }

    setChartBackgroundColor(chartBackgroundColor:string){
        this.chartBackgroundColor = chartBackgroundColor
    }

    getChartBackgroundColor(){
        return this.chartBackgroundColor
    }

    setChartDataColor(chartDataColor:string){
        this.chartDataColor = chartDataColor
    }

    getChartDataColor(){
        return this.chartDataColor
    }

    setChartTitleColor(chartTitleColor:string){
        this.chartTitleColor = chartTitleColor
    }

    getChartTitleColor(){
        return this.chartTitleColor
    }

    setChartLabelColor(chartLabelColor:string){
        this.chartLabelColor = chartLabelColor
    }

    getChartLabelColor(){
        return this.chartLabelColor
    }

    setChartYaxisColor(chartYaxisColor:string){
        this.chartYaxisColor = chartYaxisColor
    }

    getChartYaxisColor(){
        return this.chartYaxisColor
    }

    setChartOptions(){
        var cats = this.getChartDataDates()
            .map(
                (date)=> 
                    date.year.toString()+'/'+
                (date.month+1).toString()+'/'+
                    date.day.toString()
            )
        this.chartOptions = {
            chart:{
                backgroundColor: this.getChartBackgroundColor()
            },
            accessibility: {
                enabled: false
              },
            title : {
                style:{
                    color: this.getChartTitleColor(),
                },
                text : this.getChartTitle()
              },
            yAxis : {
                title: {
                    style:{
                        color: this.getChartYaxisColor(),
                    },
                    text : this.getChartYaxisTitle()
                  }
            },
            xAxis: {
                categories : cats
            },
            series: [{
                name : '<span style="color: '+this.getChartLabelColor()+';">'+this.getChartDataLabel()+'</span>' ,
                data: this.getChartDataValues(),
                type: this.getChartType(),
                color: this.getChartDataColor(),
              }],
        }
    }

    getChartOptions() {
        return this.chartOptions
    }

}