import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  private _color: string = '#f4f4f4'; 

  @Input()
  get color(): string {
    return this._color;
  }
  set color(value: string) {
    if (value !== this._color) {
      this._color = value;
      this.sendColorToParent();
    }
  }

  constructor(private readonly sanitizer: DomSanitizer) {}

  sendColorToParent() {
    this.colorEvent.emit(this._color);
  }

  get background(): SafeStyle {
    return this.sanitizer.bypassSecurityTrustStyle(this._color);
  }
}
