import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TuiAccordionModule } from '@taiga-ui/kit';
import {TuiSidebarModule} from '@taiga-ui/addon-mobile';
import { TuiButtonModule } from '@taiga-ui/core';
import {MatIconModule} from '@angular/material/icon';
import { NavigationEnd, RouterModule, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { TuiDay } from '@taiga-ui/cdk';
import { ChangeDateFilterAction } from '../../../ngxs/date filter/date-filter.action';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [MatToolbarModule,TuiAccordionModule,CommonModule,TuiSidebarModule,TuiButtonModule,MatIconModule,RouterModule],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.scss'
})
export class SideNavComponent {
  open = false;
  isViewModeActive = false;
  isSettingsActive = false;

  toggle(open: any): void {
      this.open = open;
  }

  checkRoute(){
    if(this.router.url=='/settings'){
      this.changeSettingsActiveMode()
    }
    else{
      this.changeViewModeActiveMode()
    }
  }
  constructor(private router: Router,private store:Store){
    this.checkRoute()
    this.router.events.subscribe(
      (event: any) => {
        if (event instanceof NavigationEnd) {
          this.toggle(false)
          this.checkRoute()
        }
      }
    );
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
