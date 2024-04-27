/**
 * Represents a component for editing a chart.
 */
import { Component, Input } from '@angular/core';
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
import _ from 'lodash';
import { ChartModel } from '../../../ngxs/chart/chart.model';
import { Store } from '@ngxs/store';
import { UpdateChartAction } from '../../../ngxs/chart/chart.action';

@Component({
  selector: 'app-edit-chart',
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
  templateUrl: './edit-chart.component.html',
  styleUrl: './edit-chart.component.scss'
})
export class EditChartComponent {
  /**
   * TUI arrow constant.
   */
  readonly arrow = TUI_ARROW;
  /**
   * The chart model data for editing.
   */
  @Input() chartDataModelForEdit: ChartModel = new ChartModel();
  /**
   * The index of the chart model data for editing.
   */
  @Input() indexChartDataModelForEdit: number = 0;
  /**
   * The type of chart.
   */
  chartType: string = '';
  /**
   * Chart model for managing chart data.
   */
  chartModel: ChartModel = new ChartModel();
  /**
   * Flag to indicate whether the add chart modal is open.
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
   * Background color of the chart.
   */
  backgroundColor: string = '';
  /**
   * Color of chart data.
   */
  dataColor: string = '';
  /**
   * Color of the Y-axis of the chart.
   */
  yAxisColor: string = '';
  /**
   * Color of the chart title.
   */
  titleColor: string = '';
  /**
   * Color of the chart label.
   */
  labelColor: string = '';

  /**
    * Reference to the Highcharts chart.
    */
  chartRef!: Highcharts.Chart;

  /**
   * Form group for managing chart form controls.
   */
  forms = new FormGroup({
    chartTitleForm: new FormControl(''),
    chartYaxisForm: new FormControl(''),
    chartLabelForm: new FormControl(''),
  });

  /**
   * Data object for managing dynamic form fields.
   */
  data: any = {
    valueForms: this.formBuilder.group({
      valueFormsFields: this.formBuilder.array([])
    }),
    dateForms: this.formBuilder.group({
      dateFormsFields: this.formBuilder.array([])
    })
  }


  constructor(
    private formBuilder: FormBuilder,
    public sharedService: SharedService,
    private store: Store
  ) { }


  ngOnInit() {
    // Creating a deep copy of the chart model
    this.chartModel = _.cloneDeep(this.chartDataModelForEdit);
    // Initialize form controls with chart data
    this.forms.controls.chartLabelForm.setValue(this.chartDataModelForEdit.getChartDataLabel());
    this.forms.controls.chartTitleForm.setValue(this.chartDataModelForEdit.getChartTitle());
    this.forms.controls.chartYaxisForm.setValue(this.chartDataModelForEdit.getChartYaxisTitle());
    this.dateFields = this.data.dateForms.get('dateFormsFields') as FormArray;
    this.valueFields = this.data.valueForms.get('valueFormsFields') as FormArray;
    for (let i = 0; i < this.chartDataModelForEdit.getChartDataDates().length; i++) {
      this.valueFields.push(new FormControl(this.chartDataModelForEdit.getChartDataValues()[i]));
      this.dateFields.push(new FormControl(this.chartDataModelForEdit.getChartDataDates()[i]));
    }
    // Subscribe to form control changes and update chart model accordingly
    this.forms.controls.chartTitleForm.valueChanges.subscribe(newValue => {
      this.chartModel.setChartTitle(newValue ?? '');
      this.chartModel.setChartOptions();
    });
    this.forms.controls.chartYaxisForm.valueChanges.subscribe(newValue => {
      this.chartModel.setChartYaxisTitle(newValue ?? '');
      this.chartModel.setChartOptions();
    });
    this.forms.controls.chartLabelForm.valueChanges.subscribe(newValue => {
      this.chartModel.setChartDataLabel(newValue ?? '');
      this.chartModel.setChartOptions();
    });
    // Initialize chart properties
    this.backgroundColor = this.chartDataModelForEdit.getChartBackgroundColor();
    this.dataColor = this.chartDataModelForEdit.getChartDataColor();
    this.yAxisColor = this.chartDataModelForEdit.getChartYaxisColor();
    this.titleColor = this.chartDataModelForEdit.getChartTitleColor();
    this.labelColor = this.chartDataModelForEdit.getChartLabelColor();
    this.chartType = this.chartDataModelForEdit.getChartType();
  }

  /**
     * Method for receiving background color changes from child components.
     */
  receiveBackgroundColorFromChild($event: string) {
    if (this.backgroundColor != $event) {
      this.backgroundColor = $event
      this.chartModel.setChartBackgroundColor($event)
      this.chartModel.setChartOptions()
    }
  }

  /**
   * Method for receiving data color changes from child components.
   */
  receiveDataColorFromChild($event: string) {
    if (this.dataColor != $event) {
      this.dataColor = $event
      this.chartModel.setChartDataColor($event)
      this.chartModel.setChartOptions()
    }
  }

  /**
   * Method for receiving y-axis color changes from child components.
   */
  receiveYaxisColorFromChild($event: string) {
    if (this.yAxisColor != $event) {
      this.yAxisColor = $event
      this.chartModel.setChartYaxisColor($event)
      this.chartModel.setChartOptions()
    }
  }

  /**
   * Method for receiving title color changes from child components.
   */
  receiveTitleColorFromChild($event: string) {
    if (this.titleColor != $event) {
      this.titleColor = $event
      this.chartModel.setChartTitleColor($event)
      this.chartModel.setChartOptions()
    }
  }

  /**
   * Method for receiving label color changes from child components.
   */
  receiveLabelColorFromChild($event: string) {
    if (this.labelColor != $event) {
      this.labelColor = $event
      this.chartModel.setChartLabelColor($event)
      this.chartModel.setChartOptions()
    }
  }

  /**
   * Method for adding a new data field to the chart.
   */
  addDataField() {
    this.dateFields.push(new FormControl(
      new TuiDay(
        TuiDay.currentLocal().year,
        TuiDay.currentLocal().month + 1,
        TuiDay.currentLocal().day
      )
    ))
    this.valueFields.push(new FormControl(0))
    this.chartModel.addToChartDataDate(
      this.dateFields.controls[this.dateFields.controls.length - 1].value
    )
    this.chartModel.addToChartValues(
      this.valueFields.controls[this.valueFields.controls.length - 1].value
    )
    this.chartModel.setChartOptions()
    this.chartModel.setChartOptions()
    this.chartRef.series[0].setData(this.chartModel.getChartDataValues())
  }

  /**
   * Method for setting the Highcharts chart reference.
   */
  setChartRef(event: Highcharts.Chart) {
    this.chartRef = event
  }

  /**
   * Method for updating the value form fields.
   */
  updateValueForm(event: any, index: number) {
    this.chartModel.updateChartDataValues(event ?? '', index)
    this.chartModel.setChartOptions()
    this.chartRef.series[0].setData(this.chartModel.getChartDataValues())
  }

  /**
     * Method for updating the date form fields.
     */
  updateDateForm(event: any, index: number) {
    this.chartModel.updateChartDataDate(event ?? 0, index)
    this.chartModel.setChartOptions()
  }

  /**
     * Method for changing the chart type.
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
     * Method for removing a data field from the chart.
     */
  removeData(index: number) {
    this.removeControl(index);
    this.chartModel.removeFromChartDataDate(index)
    this.chartModel.removeFromChartValues(index)
    this.chartModel.setChartOptions()
    this.chartRef.series[0].setData(this.chartModel.getChartDataValues())
  }

  /**
     * Method for removing a control from the form.
     */
  removeControl(index: number) {
    this.dateFields.removeAt(index)
    this.valueFields.removeAt(index)
  }

  /**
     * Method for updating the chart with sorted date values.
     */
  updateChart() {
    this.chartModel.sortDateValues()
    this.chartDataModelForEdit = this.chartModel;
    this.store.dispatch(new UpdateChartAction(this.chartModel, this.indexChartDataModelForEdit));
  }


}
