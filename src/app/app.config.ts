import { provideAnimations } from "@angular/platform-browser/animations";
import { TuiRootModule } from "@taiga-ui/core";
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { HttpClient, provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { NgxsModule } from "@ngxs/store";
import { ChartState } from "./ngxs/chart/chart.state";
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { DateFilterState } from "./ngxs/date filter/date-filter.state";

export const environment = {
  production: false
};
export const appConfig: ApplicationConfig = {
  providers: [provideAnimations(), provideRouter(routes), provideClientHydration(),
    provideHttpClient(
      withFetch()
    ), 
    importProvidersFrom(TuiRootModule), provideAnimationsAsync(), provideAnimationsAsync(), provideAnimationsAsync(),
    importProvidersFrom(
      NgxsModule.forRoot([ChartState,DateFilterState], {
        developmentMode: !environment.production,
      })
    ),
    importProvidersFrom(
      NgxsReduxDevtoolsPluginModule.forRoot({
        disabled: environment.production,
      })
    ),
  ],
};

