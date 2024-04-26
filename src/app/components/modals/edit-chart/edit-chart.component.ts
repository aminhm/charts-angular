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
  @Input() chartDataModelForEdit: ChartModel = new ChartModel();
  @Input() indexChartDataModelForEdit: number = 0;
  chartType: string = '';
  chartModel : ChartModel = new ChartModel();
  isAddChartModalOpen!: boolean;
  dateFields!: FormArray;
  valueFields!: FormArray;
  backgroundColor: string = '';
  dataColor: string = '';
  yAxisColor: string = '';
  titleColor: string = '';
  labelColor: string = '';

  forms = new FormGroup({
    chartTitleForm: new FormControl(''),
    chartYaxisForm: new FormControl(''),
    chartLabelForm: new FormControl(''),
});


data: any = {
  valueForms : this.formBuilder.group({
    valueFormsFields: this.formBuilder.array([])
  }),
  dateForms : this.formBuilder.group({
    dateFormsFields: this.formBuilder.array([])
  })
}


  constructor(private formBuilder: FormBuilder,
    public sharedService: SharedService,private  store:Store) {
  }
  
ngOnInit(){
  this.chartModel = _.cloneDeep(this.chartDataModelForEdit);
  this.forms.controls.chartLabelForm.setValue(this.chartDataModelForEdit.getChartDataLabel())
  this.forms.controls.chartTitleForm.setValue(this.chartDataModelForEdit.getChartTitle())
  this.forms.controls.chartYaxisForm.setValue(this.chartDataModelForEdit.getChartYaxisTitle())
  this.dateFields = this.data.dateForms.get('dateFormsFields') as FormArray;
  this.valueFields = this.data.valueForms.get('valueFormsFields') as FormArray;
  for (let i=0;i<this.chartDataModelForEdit.getChartDataDates().length;i++){
    this.valueFields.push(new FormControl(this.chartDataModelForEdit.getChartDataValues()[i]))
  this.dateFields.push(new FormControl(
    this.chartDataModelForEdit.getChartDataDates()[i]
  ))
  }
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
  this.backgroundColor = this.chartDataModelForEdit.getChartBackgroundColor()
  this.dataColor = this.chartDataModelForEdit.getChartDataColor()
  this.yAxisColor = this.chartDataModelForEdit.getChartYaxisColor()
  this.titleColor = this.chartDataModelForEdit.getChartTitleColor()
  this.labelColor = this.chartDataModelForEdit.getChartLabelColor()
  this.chartType = this.chartDataModelForEdit.getChartType()
}

  receiveBackgroundColorFromChild($event: string) {
    if(this.backgroundColor!=$event){
      this.backgroundColor = $event
    this.chartModel.setChartBackgroundColor($event)
    this.chartModel.setChartOptions()
    }
  }

  receiveDataColorFromChild($event: string) {
    if(this.dataColor!=$event){
      this.dataColor = $event
    this.chartModel.setChartDataColor($event)
    this.chartModel.setChartOptions()
    }
  }

  receiveYaxisColorFromChild($event: string) {
    if(this.yAxisColor!=$event){
      this.yAxisColor = $event
    this.chartModel.setChartYaxisColor($event)
    this.chartModel.setChartOptions()
    }
  }

  receiveTitleColorFromChild($event: string) {
    if(this.titleColor!=$event){
      this.titleColor = $event
    this.chartModel.setChartTitleColor($event)
    this.chartModel.setChartOptions()
    }
  }

  receiveLabelColorFromChild($event: string) {
    if(this.labelColor!=$event){
      this.labelColor = $event
    this.chartModel.setChartLabelColor($event)
    this.chartModel.setChartOptions()
    }
  }

  addDataField(){
    this.dateFields.push(new FormControl(
      new TuiDay(
        TuiDay.currentLocal().year,
        TuiDay.currentLocal().month+1,
        TuiDay.currentLocal().day
      )
    ))
      this.valueFields.push(new FormControl(0))
      this.chartModel.addToChartDataDate(
        this.dateFields.controls[this.dateFields.controls.length-1].value
      )
      this.chartModel.addToChartValues(
        this.valueFields.controls[this.valueFields.controls.length-1].value
      )
      this.chartModel.setChartOptions()
      this.chartModel.setChartOptions()
      this.chartRef.series[0].setData(this.chartModel.getChartDataValues())
  }

  chartRef!: Highcharts.Chart;
  setChartRef(event:Highcharts.Chart){
    this.chartRef = event
  }

updateValueForm(event:any,index: number){
  this.chartModel.updateChartDataValues(event ?? '',index)
  this.chartModel.setChartOptions()
  this.chartRef.series[0].setData(this.chartModel.getChartDataValues())
}
updateDateForm(event:any,index: number){
  this.chartModel.updateChartDataDate(event ?? 0,index)
  this.chartModel.setChartOptions()
}


changeChartType(chartType:string){
  this.chartType = chartType
  this.chartModel.setChartType(
    chartType == 'Line' ? ChartType.Line:
    chartType == 'Spline' ? ChartType.Spline :
    chartType == 'AreaSpline' ? ChartType.AreaSpline:
    ChartType.Area
  )
  
  this.chartModel.setChartOptions()
}

removeData(index:number){
  this.removeControl(index);
  this.chartModel.removeFromChartDataDate(index)
  this.chartModel.removeFromChartValues(index)
  this.chartModel.setChartOptions()
  this.chartRef.series[0].setData(this.chartModel.getChartDataValues())
}

removeControl(index:number){
  this.dateFields.removeAt(index)
  this.valueFields.removeAt(index)
}

updateChart(){
  this.chartModel.sortDateValues()
  this.chartDataModelForEdit = this.chartModel;
  this.store.dispatch(new UpdateChartAction( this.chartModel,this.indexChartDataModelForEdit));
}

readonly arrow = TUI_ARROW;
 
}
