/**
 * Represents the side navigation component for the application.
 */
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TuiAccordionModule } from '@taiga-ui/kit';
import { TuiSidebarModule } from '@taiga-ui/addon-mobile';
import { TuiButtonModule } from '@taiga-ui/core';
import { MatIconModule } from '@angular/material/icon';
import { NavigationEnd, RouterModule, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { TuiDay } from '@taiga-ui/cdk';
import { ChangeDateFilterAction } from '../../../ngxs/date filter/date-filter.action';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [MatToolbarModule, TuiAccordionModule, CommonModule, TuiSidebarModule, TuiButtonModule, MatIconModule, RouterModule],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.scss'
})
export class SideNavComponent {
  // Flag to indicate whether side nav is open 
  open = false;
  // Flag to indicate whether view mode is active
  isViewModeActive = false;
  // Flag to indicate whether settings mode is active
  isSettingsActive = false;

  /**
   * Toggles the sidebar open or closed.
   * @param open The state indicating whether the sidebar is open or closed.
   */
  toggle(open: any): void {
    this.open = open;
  }

  /**
   * Check the current route and update mode accordingly.
   */
  checkRoute() {
    if (this.router.url == '/settings') {
      this.changeSettingsActiveMode(); // Activate settings mode if the route is '/settings'
    }
    else {
      this.changeViewModeActiveMode(); // Activate view mode for other routes
    }
  }

  constructor(private router: Router, private store: Store) {
    // Check the current route when component initializes
    this.checkRoute();
    // Subscribe to router events to detect route changes
    this.router.events.subscribe(
      (event: any) => {
        if (event instanceof NavigationEnd) {
          this.checkRoute(); // Check route whenever navigation ends
        }
      }
    );
  }

  /**
   * Sets the view mode active and settings mode inactive.
   */
  changeViewModeActiveMode() {
    this.isViewModeActive = true;
    this.isSettingsActive = false;
  }

  /**
   * Activate settings mode, dispatch change date filter action, and deactivate view mode.
   */
  changeSettingsActiveMode() {
    // Dispatch an action to change the date filter to default values
    this.store.dispatch(new ChangeDateFilterAction({
      from: new TuiDay(1992, 0, 1), // Start date
      to: TuiDay.currentLocal() // End date, defaults to current local time
    }));
    // Deactivate view mode and activate settings mode
    this.isViewModeActive = false;
    this.isSettingsActive = true;
  }
}
