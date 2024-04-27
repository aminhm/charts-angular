import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TuiDayRange, TuiDay } from '@taiga-ui/cdk';
import { Store } from '@ngxs/store';
import { ChangeDateFilterAction } from '../../../ngxs/date filter/date-filter.action';
import { TuiInputDateRangeModule } from '@taiga-ui/kit';
import { TuiTextfieldControllerModule } from '@taiga-ui/core';

@Component({
  selector: 'app-date-filter',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TuiInputDateRangeModule,
    TuiTextfieldControllerModule,
  ],
  templateUrl: './date-filter.component.html',
  styleUrl: './date-filter.component.scss'
})
export class DateFilterComponent {
  dateForm = new FormGroup({
    dateValue: new FormControl({}),
});
constructor(private store:Store){}
dateChanges(event:any){
  this.store.dispatch(new ChangeDateFilterAction(event));
}
ngOnInit(){
  this.dateForm.controls.dateValue = new FormControl(
    new TuiDayRange(
      new TuiDay(
        1992,0,1
      ),
      TuiDay.currentLocal()
  ),
  )
}
}
