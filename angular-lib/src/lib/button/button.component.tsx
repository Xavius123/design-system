import { Component, Input } from '@angular/core';

@Component({
  selector: 'ds-button',
  standalone: true,
  template: `<button class="ds-button" [ngClass]="variant">
    <ng-content />
  </button>`,
  styleUrls: ['./button.component.scss'],
})
export class DsButtonComponent {
  @Input() variant: 'primary' | 'ghost' = 'primary';
}
