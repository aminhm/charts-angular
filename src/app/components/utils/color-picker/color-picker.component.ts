/**
 * Component for a color picker, allowing users to select a color.
 */
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
  /**
   * Event emitter for when a color is selected.
   */
  @Output() colorEvent = new EventEmitter<string>();

  // Private property for storing the selected color
  private _color: string = '#f4f4f4';

  /**
   * Input property for getting the selected color.
   */
  @Input()
  get color(): string {
    return this._color;
  }

  /**
   * Input property for setting the selected color.
   */
  set color(value: string) {
    if (value !== this._color) {
      this._color = value;
      this.sendColorToParent();
    }
  }

  constructor(private readonly sanitizer: DomSanitizer) { }

  /**
   * Emits the selected color to the parent component.
   */
  sendColorToParent() {
    this.colorEvent.emit(this._color);
  }

  /**
   * Gets the background style of the color picker.
   */
  get background(): SafeStyle {
    return this.sanitizer.bypassSecurityTrustStyle(this._color);
  }
}
