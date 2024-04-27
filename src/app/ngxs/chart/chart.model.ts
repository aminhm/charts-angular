import Highcharts from "highcharts";
import { TuiDay } from "@taiga-ui/cdk";
import { ChartType } from "../../enums/chart-type.enum";

/**
 * This class represents a model for configuring and managing chart data and options.
 */
export class ChartModel {
    // Private properties to store chart configuration
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

    constructor() {
    }

    /**
     * Sorts the chart data dates in ascending order.
     */
    sortDateValues() {
        var n = this.getChartDataDates().length
        for (let i = 0; i < n - 1; i++) {
            for (let j = 0; j < n - i - 1; j++) {
                if (this.getChartDataDates()[j] > this.getChartDataDates()[j + 1]) {
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

    /**
     * Sets the chart title.
     * @param chartTitle The title of the chart.
     */
    setChartTitle(chartTitle: string) {
        this.chartTitle = chartTitle
    }

    /**
     * Gets the chart title.
     * @returns The title of the chart.
     */
    getChartTitle() {
        return this.chartTitle
    }

    /**
     * Sets the chart Y-axis title.
     * @param chartYaxisTitle The title of the Y-axis.
     */
    setChartYaxisTitle(chartYaxisTitle: string) {
        this.chartYaxisTitle = chartYaxisTitle
    }

    /**
     * Gets the chart Y-axis title.
     * @returns The title of the Y-axis.
     */
    getChartYaxisTitle() {
        return this.chartYaxisTitle
    }

    /**
     * Gets the chart Y-axis title.
     * @returns The title of the Y-axis.
     */
    setChartType(chartType: ChartType) {
        this.chartType = chartType
    }

    /**
     * Gets the chart type.
     * @returns The type of the chart.
     */
    getChartType(): 'line' |
        'spline' |
        'area' |
        'areaspline' {
        if (this.chartType == ChartType.Line) {
            return "line"
        }
        if (this.chartType == ChartType.AreaSpline) {
            return "areaspline"
        }
        if (this.chartType == ChartType.Spline) {
            return "spline"
        }
        return "area";
    }

    /**
     * Sets the chart data dates.
     * @param chartDataDates An array of dates for the chart data.
     */
    setChartDataDates(chartDataDates: TuiDay[]) {
        this.chartDataDates = chartDataDates
    }

    /**
     * Gets the chart data dates.
     * @returns An array of dates for the chart data.
     */
    getChartDataDates() {
        return this.chartDataDates
    }

    /**
     * Adds a date to the chart data dates array.
     * @param date The date to add to the chart data.
     */
    addToChartDataDate(date: TuiDay) {
        this.chartDataDates.push(date)
    }

    /**
     * Removes a date from the chart data dates array.
     * @param index The index of the date to remove.
     */
    removeFromChartDataDate(index: number) {
        this.chartDataDates.splice(index, 1);
    }

    /**
     * Updates a date in the chart data dates array.
     * @param date The updated date.
     * @param index The index of the date to update.
     */
    updateChartDataDate(date: TuiDay, index: number) {
        this.chartDataDates[index] = date
    }

    /**
     * Sets the chart data values.
     * @param chartDataValues An array of values for the chart data.
     */
    setChartDataValues(chartDataValues: number[]) {
        this.chartDataValues = chartDataValues
    }

    /**
     * Gets the chart data values.
     * @returns An array of values for the chart data.
     */
    getChartDataValues() {
        return this.chartDataValues
    }

    /**
     * Adds a value to the chart data values array.
     * @param value The value to add to the chart data.
     */
    addToChartValues(value: number) {
        this.chartDataValues.push(value)
    }

    /**
     * Removes a value from the chart data values array.
     * @param index The index of the value to remove.
     */
    removeFromChartValues(index: number) {
        this.chartDataValues.splice(index, 1);
    }

    /**
     * Updates a value in the chart data values array.
     * @param value The updated value.
     * @param index The index of the value to update.
     */
    updateChartDataValues(value: number, index: number) {
        this.chartDataValues[index] = value
    }

    /**
     * Sets the chart data label.
     * @param chartDataLabel The label for the chart data.
     */
    setChartDataLabel(chartDataLabel: string) {
        this.chartDataLabel = chartDataLabel
    }

    /**
     * Gets the chart data label.
     * @returns The label for the chart data.
     */
    getChartDataLabel() {
        return this.chartDataLabel
    }

    /**
     * Sets the background color of the chart.
     * @param chartBackgroundColor The background color of the chart.
     */
    setChartBackgroundColor(chartBackgroundColor: string) {
        this.chartBackgroundColor = chartBackgroundColor
    }

    /**
     * Gets the background color of the chart.
     * @returns The background color of the chart.
     */
    getChartBackgroundColor() {
        return this.chartBackgroundColor
    }

    /**
     * Sets the color of the chart data.
     * @param chartDataColor The color of the chart data.
     */
    setChartDataColor(chartDataColor: string) {
        this.chartDataColor = chartDataColor
    }

    /**
     * Gets the color of the chart data.
     * @returns The color of the chart data.
     */
    getChartDataColor() {
        return this.chartDataColor
    }

    /**
     * Sets the color of the chart title.
     * @param chartTitleColor The color of the chart title.
     */
    setChartTitleColor(chartTitleColor: string) {
        this.chartTitleColor = chartTitleColor
    }

    /**
     * Gets the color of the chart title.
     * @returns The color of the chart title.
     */
    getChartTitleColor() {
        return this.chartTitleColor
    }

    /**
     * Gets the color of the chart title.
     * @returns The color of the chart title.
     */
    setChartLabelColor(chartLabelColor: string) {
        this.chartLabelColor = chartLabelColor
    }

    /**
     * Gets the color of the chart label.
     * @returns The color of the chart label.
     */
    getChartLabelColor() {
        return this.chartLabelColor
    }

    /**
     * Sets the color of the Y-axis of the chart.
     * @param chartYaxisColor The color of the Y-axis of the chart.
     */
    setChartYaxisColor(chartYaxisColor: string) {
        this.chartYaxisColor = chartYaxisColor
    }

    /**
     * Gets the color of the Y-axis of the chart.
     * @returns The color of the Y-axis of the chart.
     */
    getChartYaxisColor() {
        return this.chartYaxisColor
    }

    /**
     * Sets the chart options based on configured properties.
     */
    setChartOptions() {
        var areDatesValid = true;
        var dates = this.getChartDataDates()
        for (let date of dates) {
            if (date.year == undefined ||
                date.month == undefined ||
                date.day == undefined) {
                areDatesValid = false
                break
            }
        }
        if (areDatesValid) {
            var cats = this.getChartDataDates()
                .map(
                    (date) =>
                        date.year.toString() + '/' +
                        (date.month + 1).toString() + '/' +
                        date.day.toString()
                )
            this.chartOptions = {
                chart: {
                    backgroundColor: this.getChartBackgroundColor()
                },
                accessibility: {
                    enabled: false
                },
                title: {
                    style: {
                        color: this.getChartTitleColor(),
                    },
                    text: this.getChartTitle()
                },
                yAxis: {
                    title: {
                        style: {
                            color: this.getChartYaxisColor(),
                        },
                        text: this.getChartYaxisTitle()
                    }
                },
                xAxis: {
                    categories: cats
                },
                series: [{
                    name: '<span style="color: ' + this.getChartLabelColor() + ';">' + this.getChartDataLabel() + '</span>',
                    data: this.getChartDataValues(),
                    type: this.getChartType(),
                    color: this.getChartDataColor(),
                }],
            }
        }
    }

    /**
     * Gets the chart options.
     * @returns The options configured for the chart.
     */
    getChartOptions() {
        return this.chartOptions
    }

}