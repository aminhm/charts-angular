import { Routes } from '@angular/router';
import { ViewModeComponent } from './components/pages/view-mode/view-mode.component';
import { SettingsComponent } from './components/pages/settings/settings.component';

export const routes: Routes = [
    {
        path: '', component: ViewModeComponent  
    },
    {
        path: 'settings', component: SettingsComponent  
    },
    {path: 'view-mode', component: ViewModeComponent  
}
];
