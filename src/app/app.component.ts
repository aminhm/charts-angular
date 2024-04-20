import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ViewModeComponent } from "./components/view-mode/view-mode.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, ViewModeComponent]
})
export class AppComponent {
  title = 'charts-angular';
}
