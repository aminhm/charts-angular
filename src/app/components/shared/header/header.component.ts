import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { Store } from '@ngxs/store';
import { TuiButtonModule } from '@taiga-ui/core';
import { ChangeDateFilterAction } from '../../../ngxs/date filter/date-filter.action';
import { TuiDay } from '@taiga-ui/cdk';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule,TuiButtonModule,RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  isViewModeActive = false;
  isSettingsActive = false;
  constructor(private router: Router,private store:Store){
    this.checkRoute()
    this.router.events.subscribe(
      (event: any) => {
        if (event instanceof NavigationEnd) {
          this.checkRoute()
        }
      }
    );
  }

  checkRoute(){
    if(this.router.url=='/settings'){
      this.changeSettingsActiveMode()
    }
    else{
      this.changeViewModeActiveMode()
    }
  }
  changeViewModeActiveMode(){
    this.isViewModeActive = true;
    this.isSettingsActive = false;
  }
  changeSettingsActiveMode(){
    this.store.dispatch(new ChangeDateFilterAction({
      from: new TuiDay(
        1992,0,1
      ),
      to: TuiDay.currentLocal()
    }));
    this.isViewModeActive = false;
    this.isSettingsActive = true;
  }
}
