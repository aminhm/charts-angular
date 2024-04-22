import { Routes } from '@angular/router';
import { ViewModeComponent } from './components/view-mode/view-mode.component';
import { SettingsComponent } from './components/settings/settings.component';

export const routes: Routes = [
    {
        path: '', component: ViewModeComponent  
    },
    {
        path: 'settings', component: SettingsComponent  
    }
];
