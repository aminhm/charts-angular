import { FormControl } from "@angular/forms";
import { ChartDataType } from "./chart-data-type.enum";

export class ChartDataModel {
    chartTitle: string = '';
    chartYaxisTitle: string = '';
    chartType: string = '';
    chartDataDates: string[] = [];
    chartDataValues: number[] = [];
    chartDataCountry: string = '';
    chartOptions: Highcharts.Options = {};
    dateFieldFormControl: FormControl = new FormControl();
    dateFieldMaxValue: number = 0;
    dateFieldMinValue: number = 0;
    chartDataType: ChartDataType = ChartDataType.Year;
    dateFieldPluralizeValue = {}

    constructor(){}

    getChartDataType(){
        return this.chartDataType
    }

    setChartDataType(chartDataType:ChartDataType){
        this.chartDataType = chartDataType
    }

    getDateFieldPluralizeValue(){
        return this.dateFieldPluralizeValue
    }

    setDateFieldPluralizeValue(){
        if(this.getChartDataType() == ChartDataType.Year){
            this.dateFieldPluralizeValue = {other:''}
        }
        else if(this.getChartDataType() == ChartDataType.Month){
            this.dateFieldPluralizeValue = {
                '=0' : 'January',
                '=1' : 'February',
                '=2' : 'March',
                '=3' : 'April',
                '=4' : 'May',
                '=5' : 'June',
                '=6' : 'July',
                '=7' : 'August',
                '=8' : 'September',
                '=9' : 'October',
                '=10' : 'November',
                '=11' : 'December',
                other:''
            }
        }
        else if(this.getChartDataType() == ChartDataType.Day){
            this.dateFieldPluralizeValue = {
                '=0' : 'Monday',
                '=1' : 'Tuesday',
                '=2' : 'Wednesday',
                '=3' : 'Thursday',
                '=4' : 'Frida',
                '=5' : 'Saturday',
                '=6' : 'Sunday',
                other:''
            }
        }
    }

    setDateFieldMaxValue(){
        this.dateFieldMaxValue = +this.getChartDataDates()[this.chartDataDates.length-1]
    }

    getDateFieldMaxValue(){
        return this.dateFieldMaxValue
    }

    setDateFieldFormControl(){
        this.dateFieldFormControl = new FormControl([this.getChartDataDates()[0],this.getChartDataDates()[this.chartDataDates.length-1]])
    }

    getDateFieldFormControl(){
        return this.dateFieldFormControl
    }

    setDateFieldMinValue(){
        this.dateFieldMinValue = +this.getChartDataDates()[0]
    }

    getDateFieldMinValue(){
        return this.dateFieldMinValue
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

    setChartType(chartType:string){
        this.chartType = chartType
    }

    getChartType(){
        return this.chartType
    }

    setChartDataDates(chartDataDates:string[]){
        this.chartDataDates = chartDataDates
    }

    getChartDataDates(){
        return this.chartDataDates
    }

    addChartDataDate(date:string){
        this.chartDataDates.push(date)
    }

    setChartDataValues(chartDataValues:number[]){
        this.chartDataValues = chartDataValues
    }

    getChartDataValues(){
        return this.chartDataValues
    }

    addChartValues(value:number){
        this.chartDataValues.push(value)
    }

    setChartDataCountry(chartDataCountry:string){
        this.chartDataCountry = chartDataCountry
    }

    getChartDataCountry(){
        return this.chartDataCountry
    }

    setChartOptions(){
        this.chartOptions = {
            accessibility: {
                enabled: false
              },
            title : {
                text : this.getChartTitle()
              },
            yAxis : {
                title: {
                    text : this.getChartYaxisTitle()
                  }
            },
            xAxis: {
                categories : this.getChartDataDates()
            },
            series: [{
                name : this.getChartDataCountry(),
                data: this.getChartDataValues(),
                type: this.getChartType() == 'spline' ? 'spline' : 'line'
              }],
        }
    }

    getChartOptions() {
        return this.chartOptions
    }

    changeChartOptionsData(chartDataDates: string[],chartDataValues: number[]){
        this.chartOptions = {
            accessibility: {
                enabled: false
              },
            title : {
                text : this.getChartTitle()
              },
            yAxis : {
                title: {
                    text : this.getChartYaxisTitle()
                  }
            },
            xAxis: {
                categories : chartDataDates
            },
            series: [{
                name : this.getChartDataCountry(),
                data: chartDataValues,
                type: this.getChartType() == 'spline' ? 'spline' : 'line'
              }],
        }
    }
}