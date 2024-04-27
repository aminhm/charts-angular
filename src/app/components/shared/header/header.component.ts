/**
 * Represents a header component for the application.
 */
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
  imports: [MatToolbarModule, TuiButtonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  // Flag to indicate whether view mode is active
  isViewModeActive = false;
  // Flag to indicate whether settings mode is active
  isSettingsActive = false;
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

  /**
   * Activate view mode and deactivate settings mode.
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
