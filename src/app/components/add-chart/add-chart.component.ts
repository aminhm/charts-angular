import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, FormBuilder, FormArray } from '@angular/forms';
import { TUI_ARROW, TuiFieldErrorContentPipe, TuiFieldErrorPipeModule, TuiInputDateModule, TuiInputModule, TuiInputNumberModule } from '@taiga-ui/kit';
import { ChartDataModel } from '../../models/chart-data.model';
import { ChartType } from '../../models/chart-type.enum';
import { UtilsService } from '../../services/utils.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TuiDialogModule, TuiButtonModule, TuiDataListModule, TuiHostedDropdownModule, TuiSvgModule, TuiErrorModule, TuiTextfieldCleanerDirective, TuiTextfieldControllerModule } from '@taiga-ui/core';
import { ColorPickerComponent } from '../color-picker/color-picker.component';
import { ChartComponent } from '../chart/chart.component';
import { DataInterface } from '../../models/data.interface';
import { TuiDay, TuiValidatorModule } from '@taiga-ui/cdk';

@Component({
  selector: 'app-add-chart',
  standalone: true,
  imports: [ReactiveFormsModule,
    TuiInputModule,
    TuiDialogModule,
    TuiButtonModule,
    TuiDataListModule,
    TuiHostedDropdownModule,
    TuiSvgModule,
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
  chartDataModel: ChartDataModel = new ChartDataModel();
  chartDateType: string = 'Yearly';
  chartType: string = 'Area';

  constructor(private formBuilder: FormBuilder,
    public utilsService: UtilsService) {
    this.chartDataModel.setChartOptions()
  }
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

dateFields!: FormArray;
valueFields!: FormArray;

backgroundColor: string = '';
dataColor: string = '';
yAxisColor: string = '';
titleColor: string = '';
labelColor: string = '';
ngOnInit(){
  this.dateFields = this.data.dateForms.get('dateFormsFields') as FormArray;
  this.valueFields = this.data.valueForms.get('valueFormsFields') as FormArray;
  this.valueFields.push(new FormControl(0))
  this.dateFields.push(new FormControl(
    new TuiDay(
      TuiDay.currentLocal().year,
        TuiDay.currentLocal().month,
        TuiDay.currentLocal().day)
  ))
  
  this.chartDataModel.setChartDataDates([
    this.dateFields.controls[0].value
  ])
  this.chartDataModel.setChartDataValues([
    this.valueFields.controls[0].value
  ])
  this.chartDataModel.setChartOptions()
  this.forms.controls.chartTitleForm.setValue(this.chartDataModel.getChartTitle());
  this.forms.controls.chartYaxisForm.setValue(this.chartDataModel.getChartYaxisTitle());
  this.forms.controls.chartLabelForm.setValue(this.chartDataModel.getChartDataLabel());
  this.forms.controls.chartTitleForm.valueChanges.subscribe(newValue => {
    this.chartDataModel.setChartTitle(newValue ?? '')
    this.chartDataModel.setChartOptions()
  })
  this.forms.controls.chartYaxisForm.valueChanges.subscribe(newValue => {
    this.chartDataModel.setChartYaxisTitle(newValue ?? '')
    this.chartDataModel.setChartOptions()
  })
  this.forms.controls.chartLabelForm.valueChanges.subscribe(newValue => {
    this.chartDataModel.setChartDataLabel(newValue ?? '')
    this.chartDataModel.setChartOptions()
  })
}

  receiveBackgroundColorFromChild($event: string) {
    if(this.backgroundColor!=$event){
      this.backgroundColor = $event
    this.chartDataModel.setChartBackgroundColor($event)
    this.chartDataModel.setChartOptions()
    }
  }

  receiveDataColorFromChild($event: string) {
    if(this.dataColor!=$event){
      this.dataColor = $event
    this.chartDataModel.setChartDataColor($event)
    this.chartDataModel.setChartOptions()
    }
  }

  receiveYaxisColorFromChild($event: string) {
    if(this.yAxisColor!=$event){
      this.yAxisColor = $event
    this.chartDataModel.setChartYaxisColor($event)
    this.chartDataModel.setChartOptions()
    }
  }

  receiveTitleColorFromChild($event: string) {
    if(this.titleColor!=$event){
      this.titleColor = $event
    this.chartDataModel.setChartTitleColor($event)
    this.chartDataModel.setChartOptions()
    }
  }

  receiveLabelColorFromChild($event: string) {
    if(this.labelColor!=$event){
      this.labelColor = $event
    this.chartDataModel.setChartLabelColor($event)
    this.chartDataModel.setChartOptions()
    }
  }

  addDataField(){
    this.dateFields.push(new FormControl(new TuiDay(
      TuiDay.currentLocal().year,
      TuiDay.currentLocal().month,
      TuiDay.currentLocal().day)))
      this.valueFields.push(new FormControl(0))
      this.chartDataModel.addToChartDataDate(
        this.dateFields.controls[this.dateFields.controls.length-1].value
      )
      this.chartDataModel.addToChartValues(
        this.valueFields.controls[this.valueFields.controls.length-1].value
      )
      this.utilsService.chartRef.series[0].setData(this.chartDataModel.getChartDataValues())
      this.utilsService.setChartRef(this.utilsService.chartRef)
  }

isAddChartModalOpen = false;

openAddChartModal(): void {
    this.isAddChartModalOpen = true;
}

updateValueForm(event:any,index: number){
  this.chartDataModel.updateChartDataValues(event ?? '',index)
  this.utilsService.chartRef.series[0].setData(this.chartDataModel.getChartDataValues())
      this.utilsService.setChartRef(this.utilsService.chartRef)
}
updateDateForm(event:any,index: number){
  this.chartDataModel.updateChartDataDate(event ?? 0,index)
  this.utilsService.chartRef.series[0].setData(this.chartDataModel.getChartDataValues())
      this.utilsService.setChartRef(this.utilsService.chartRef)
}


changeChartType(chartType:string){
  this.chartType = chartType
  this.chartDataModel.setChartType(
    chartType == 'Line' ? ChartType.Line:
    chartType == 'Spline' ? ChartType.Spline :
    chartType == 'Bar' ? ChartType.Bar :
    chartType == 'AreaSpline' ? ChartType.AreaSpline:
    ChartType.Area
  )
  
  this.chartDataModel.setChartOptions()
}

removeData(index:number){
  this.removeControl(index);
  this.chartDataModel.removeFromChartDataDate(index)
  this.chartDataModel.removeFromChartValues(index)
  this.utilsService.chartRef.series[0].setData(this.chartDataModel.getChartDataValues())
  this.utilsService.setChartRef(this.utilsService.chartRef);
}

removeControl(index:number){
  this.dateFields.removeAt(index)
  this.valueFields.removeAt(index)
}

addChart(){
  this.utilsService.addToChartDataModels(this.chartDataModel)
}

readonly arrow = TUI_ARROW;
 
}
