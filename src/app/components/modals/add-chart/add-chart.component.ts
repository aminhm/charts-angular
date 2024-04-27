/**
 * Represents a component for adding a new chart.
 */
import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, FormBuilder, FormArray } from '@angular/forms';
import { TUI_ARROW, TuiInputDateModule, TuiInputModule, TuiInputNumberModule } from '@taiga-ui/kit';
import { ChartType } from '../../../enums/chart-type.enum';
import { SharedService } from '../../../services/shared.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TuiDialogModule, TuiButtonModule, TuiDataListModule, TuiHostedDropdownModule, TuiTextfieldControllerModule } from '@taiga-ui/core';
import { ColorPickerComponent } from '../../utils/color-picker/color-picker.component';
import { ChartComponent } from '../../shared/chart/chart.component';
import { TuiDay } from '@taiga-ui/cdk';
import { ChartModel } from '../../../ngxs/chart/chart.model';
import { AddChartAction } from '../../../ngxs/chart/chart.action';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-add-chart',
  standalone: true,
  imports: [ReactiveFormsModule,
    TuiInputModule,
    TuiDialogModule,
    TuiButtonModule,
    TuiDataListModule,
    TuiHostedDropdownModule,
    RouterModule,
    CommonModule,
    ColorPickerComponent,
    ChartComponent,
    TuiInputNumberModule,
    TuiInputDateModule,
    TuiTextfieldControllerModule,
  ],
  templateUrl: './add-chart.component.html',
  styleUrl: './add-chart.component.scss'
})
export class AddChartComponent {
  /**
   * Reference to the Highcharts chart.
   */
  chartRef!: Highcharts.Chart;
  /**
 * TUI arrow constant for HTML templates.
 */
  readonly arrow = TUI_ARROW;
  /**
   * Model for the chart being added.
   */
  chartModel: ChartModel = new ChartModel();
  /**
   * Default chart type.
   */
  chartType: string = 'Area';
  /**
   * Flag to determine if the add chart modal is open.
   */
  isAddChartModalOpen!: boolean;
  /**
   * Form array for date fields.
   */
  dateFields!: FormArray;
  /**
   * Form array for value fields.
   */
  valueFields!: FormArray;
  /**
   * Background color for the chart.
   */
  backgroundColor: string = '';
  /**
   * Data color for the chart.
   */
  dataColor: string = '';
  /**
   * Y-axis color for the chart.
   */
  yAxisColor: string = '';
  /**
   * Title color for the chart.
   */
  titleColor: string = '';
  /**
   * Label color for the chart.
   */
  labelColor: string = '';
  /**
   * Form group for chart inputs.
   */

  forms = new FormGroup({
    chartTitleForm: new FormControl(''),
    chartYaxisForm: new FormControl(''),
    chartLabelForm: new FormControl(''),
  });
  /**
   * Object containing form groups for chart data.
   */
  data: any = {
    valueForms: this.formBuilder.group({
      valueFormsFields: this.formBuilder.array([])
    }),
    dateForms: this.formBuilder.group({
      dateFormsFields: this.formBuilder.array([])
    })
  }


  constructor(private formBuilder: FormBuilder,
    public sharedService: SharedService, private store: Store) {
  }


  ngOnInit() {
    // Initialize form arrays for date and value fields
    this.dateFields = this.data.dateForms.get('dateFormsFields') as FormArray;
    this.valueFields = this.data.valueForms.get('valueFormsFields') as FormArray;
    // Add default values for date and value fields
    this.valueFields.push(new FormControl(0))
    this.dateFields.push(new FormControl(
      TuiDay.currentLocal()
    ))

    // Set initial chart data
    this.chartModel.setChartDataDates([
      this.dateFields.controls[0].value
    ])
    this.chartModel.setChartDataValues([
      this.valueFields.controls[0].value
    ])
    this.chartModel.setChartOptions()
    // Set initial form values
    this.forms.controls.chartTitleForm.setValue(this.chartModel.getChartTitle());
    this.forms.controls.chartYaxisForm.setValue(this.chartModel.getChartYaxisTitle());
    this.forms.controls.chartLabelForm.setValue(this.chartModel.getChartDataLabel());
    // Subscribe to form value changes and update chart accordingly
    this.forms.controls.chartTitleForm.valueChanges.subscribe(newValue => {
      this.chartModel.setChartTitle(newValue ?? '')
      this.chartModel.setChartOptions()
    })
    this.forms.controls.chartYaxisForm.valueChanges.subscribe(newValue => {
      this.chartModel.setChartYaxisTitle(newValue ?? '')
      this.chartModel.setChartOptions()
    })
    this.forms.controls.chartLabelForm.valueChanges.subscribe(newValue => {
      this.chartModel.setChartDataLabel(newValue ?? '')
      this.chartModel.setChartOptions()
    })
  }

  /**
   * Event handler for receiving background color changes from child component.
   * @param $event The new background color value.
   */
  receiveBackgroundColorFromChild($event: string) {
    if (this.backgroundColor != $event) {
      this.backgroundColor = $event
      this.chartModel.setChartBackgroundColor($event)
      this.chartModel.setChartOptions()
    }
  }

  /**
   * Event handler for receiving data color changes from child component.
   * @param $event The new data color value.
   */
  receiveDataColorFromChild($event: string) {
    if (this.dataColor != $event) {
      this.dataColor = $event
      this.chartModel.setChartDataColor($event)
      this.chartModel.setChartOptions()
    }
  }

  /**
   * Event handler for receiving y-axis color changes from child component.
   * @param $event The new y-axis color value.
   */
  receiveYaxisColorFromChild($event: string) {
    if (this.yAxisColor != $event) {
      this.yAxisColor = $event
      this.chartModel.setChartYaxisColor($event)
      this.chartModel.setChartOptions()
    }
  }

  /**
   * Event handler for receiving title color changes from child component.
   * @param $event The new title color value.
   */
  receiveTitleColorFromChild($event: string) {
    if (this.titleColor != $event) {
      this.titleColor = $event
      this.chartModel.setChartTitleColor($event)
      this.chartModel.setChartOptions()
    }
  }

  /**
   * Event handler for receiving label color changes from child component.
   * @param $event The new label color value.
   */
  receiveLabelColorFromChild($event: string) {
    if (this.labelColor != $event) {
      this.labelColor = $event
      this.chartModel.setChartLabelColor($event)
      this.chartModel.setChartOptions()
    }
  }

  /**
   * Method to add a new data field to the chart.
   */
  addDataField() {
    this.dateFields.push(new FormControl(TuiDay.currentLocal()))
    this.valueFields.push(new FormControl(0))
    this.chartModel.addToChartDataDate(
      this.dateFields.controls[this.dateFields.controls.length - 1].value
    )
    this.chartModel.addToChartValues(
      this.valueFields.controls[this.valueFields.controls.length - 1].value
    )
    this.chartModel.setChartOptions()
    this.chartRef.series[0].setData(this.chartModel.getChartDataValues())
  }

  /**
   * Method to update a value form.
   * @param event The new event value.
   * @param index The index of the value form.
   */
  updateValueForm(event: any, index: number) {
    this.chartModel.updateChartDataValues(event ?? '', index)
    this.chartModel.setChartOptions()
    this.chartRef.series[0].setData(this.chartModel.getChartDataValues())
  }

  /**
   * Method to update a date form.
   * @param event The new event value.
   * @param index The index of the date form.
   */
  updateDateForm(event: any, index: number) {
    this.chartModel.updateChartDataDate(event ?? 0, index)
    this.chartModel.setChartOptions()
  }

  /**
   * Method to set the chart reference.
   * @param event The Highcharts chart instance.
   */
  setChartRef(event: Highcharts.Chart) {
    this.chartRef = event
  }

  /**
   * Method to change the chart type.
   * @param chartType The new chart type.
   */
  changeChartType(chartType: string) {
    this.chartType = chartType
    this.chartModel.setChartType(
      chartType == 'Line' ? ChartType.Line :
        chartType == 'Spline' ? ChartType.Spline :
          chartType == 'AreaSpline' ? ChartType.AreaSpline :
            ChartType.Area
    )

    this.chartModel.setChartOptions()
  }

  /**
   * Method to remove data from the chart.
   * @param index The index of the data to be removed.
   */
  removeData(index: number) {
    this.removeControl(index);
    this.chartModel.removeFromChartDataDate(index)
    this.chartModel.removeFromChartValues(index)
    this.chartModel.setChartOptions()
    this.chartRef.series[0].setData(this.chartModel.getChartDataValues())
  }

  /**
   * Method to remove a control.
   * @param index The index of the control to be removed.
   */
  removeControl(index: number) {
    this.dateFields.removeAt(index)
    this.valueFields.removeAt(index)
  }

  /**
   * Method to add a new chart.
   */
  addChart() {
    this.chartModel.sortDateValues()
    this.store.dispatch(new AddChartAction(this.chartModel));
  }


}

