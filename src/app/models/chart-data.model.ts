import { FormControl } from "@angular/forms";
import { ChartType } from "./chart-type.enum";
import Highcharts from "highcharts";

export class ChartDataModel {
    private chartTitle: string = "Chart Title";
    private chartYaxisTitle: string = "Chart Y Axis Title";
    private chartType!: ChartType;
    private chartDataDates: string[] = [];
    private chartDataValues: number[] = [];
    private chartDataLabel: string = "Chart Label";
    private chartOptions: Highcharts.Options = {};
    private dateFilterFormControl: FormControl = new FormControl();
    private dateFilterMaxValue: number = 0;
    private dateFilterMinValue: number = 0;
    private chartBackgroundColor: string = ""
    private chartDataColor: string = ""
    private chartTitleColor: string = ""
    private chartYaxisColor: string = ""
    private chartLabelColor: string = ""

    constructor(){}

    setDateFilterMaxValue(){
        this.dateFilterMaxValue = +this.getChartDataDates()[this.chartDataDates.length-1]
    }

    getDateFilterMaxValue(){
        return this.dateFilterMaxValue
    }

    setDateFilterFormControl(){
        this.dateFilterFormControl = new FormControl([this.getChartDataDates()[0],this.getChartDataDates()[this.chartDataDates.length-1]])
    }

    getDateFilterFormControl(){
        return this.dateFilterFormControl
    }

    setDateFilterMinValue(){
        this.dateFilterMinValue = +this.getChartDataDates()[0]
    }

    getDateFilterMinValue(){
        return this.dateFilterMinValue
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
        if(this.chartType == ChartType.Bar){
            return "bar"
        }
        return "area";
    }

    setChartDataDates(chartDataDates:string[]){
        this.chartDataDates = chartDataDates
    }

    getChartDataDates(){
        return this.chartDataDates
    }

    addToChartDataDate(date:string){
        this.chartDataDates.push(date)
    }

    removeFromChartDataDate(index:number){
        this.chartDataDates.splice(index, 1);
    }

    updateChartDataDate(date:string,index:number){
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
                categories : this.getChartDataDates()
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

    changeChartOptionsData(chartDataDates: string[],chartDataValues: number[]){
        
        this.chartOptions = {accessibility: {
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
                categories : chartDataDates
            },
            series: [{
                name : this.getChartDataLabel(),
                data: chartDataValues,
                type: this.getChartType(),
                color: this.getChartDataColor(),
              }],
        }

    }
}