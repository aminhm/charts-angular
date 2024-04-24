import { Component, EventEmitter, Output } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { TuiHostedDropdownModule } from '@taiga-ui/core/components/hosted-dropdown';
import { TuiColorSelectorModule } from '@taiga-ui/addon-editor';
import { TuiActiveZoneModule } from '@taiga-ui/cdk';
import { TuiButtonModule } from '@taiga-ui/core/components/button';
@Component({
  selector: 'app-color-picker',
  standalone: true,
  imports: [
    TuiHostedDropdownModule,
    TuiColorSelectorModule,
    TuiActiveZoneModule,
    TuiButtonModule,
  ],
  templateUrl: './color-picker.component.html',
  styleUrl: './color-picker.component.scss'
})
export class ColorPickerComponent {
  @Output() colorEvent = new EventEmitter<string>();
  color = '#f4f4f4';

  sendColorToParent() {
    this.colorEvent.emit(this.color);
  }

  constructor(private readonly sanitizer: DomSanitizer) {}

  get background(): SafeStyle {
      this.sendColorToParent()
      return this.sanitizer.bypassSecurityTrustStyle(this.color);
  }
}
