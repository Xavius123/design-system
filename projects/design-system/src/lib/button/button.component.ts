import {
  Component,
  Input,
  Output,
  EventEmitter,
  forwardRef,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  HostBinding,
  HostListener,
  ElementRef,
  OnInit,
  OnDestroy
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ButtonVariant, ButtonSize, ButtonType, ButtonConfig } from './button.types';

@Component({
  selector: 'ds-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ButtonComponent),
      multi: true
    }
  ],
  host: {
    class: 'ds-button',
    '[class.ds-button--primary]': 'variant === "primary"',
    '[class.ds-button--secondary]': 'variant === "secondary"',
    '[class.ds-button--outline]': 'variant === "outline"',
    '[class.ds-button--ghost]': 'variant === "ghost"',
    '[class.ds-button--danger]': 'variant === "danger"',
    '[class.ds-button--sm]': 'size === "sm"',
    '[class.ds-button--md]': 'size === "md"',
    '[class.ds-button--lg]': 'size === "lg"',
    '[class.ds-button--disabled]': 'disabled',
    '[class.ds-button--loading]': 'loading',
    '[class.ds-button--full-width]': 'fullWidth',
    '[attr.disabled]': 'disabled || loading ? "" : null',
    '[attr.type]': 'type',
    '[attr.aria-label]': 'ariaLabel',
    '[attr.aria-describedby]': 'ariaDescribedby',
    '[attr.aria-pressed]': 'ariaPressed',
    '[attr.aria-expanded]': 'ariaExpanded',
    '[attr.aria-haspopup]': 'ariaHaspopup',
    '[attr.aria-controls]': 'ariaControls',
    '[attr.aria-current]': 'ariaCurrent',
    '[attr.aria-live]': 'ariaLive',
    '[attr.aria-atomic]': 'ariaAtomic',
    '[attr.aria-relevant]': 'ariaRelevant',
    '[attr.aria-busy]': 'loading ? "true" : null',
    '[attr.aria-disabled]': 'disabled ? "true" : null'
  }
})
export class ButtonComponent implements OnInit, OnDestroy, ControlValueAccessor {
  @Input() variant: ButtonVariant = 'primary';
  @Input() size: ButtonSize = 'md';
  @Input() type: ButtonType = 'button';
  @Input() disabled = false;
  @Input() loading = false;
  @Input() fullWidth = false;
  @Input() ariaLabel?: string;
  @Input() ariaDescribedby?: string;
  @Input() ariaPressed?: string;
  @Input() ariaExpanded?: string;
  @Input() ariaHaspopup?: string;
  @Input() ariaControls?: string;
  @Input() ariaCurrent?: string;
  @Input() ariaLive?: string;
  @Input() ariaAtomic?: string;
  @Input() ariaRelevant?: string;

  @Output() click = new EventEmitter<MouseEvent>();
  @Output() focus = new EventEmitter<FocusEvent>();
  @Output() blur = new EventEmitter<FocusEvent>();
  @Output() mouseenter = new EventEmitter<MouseEvent>();
  @Output() mouseleave = new EventEmitter<MouseEvent>();

  // ControlValueAccessor properties
  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  constructor(private elementRef: ElementRef<HTMLElement>) {}

  ngOnInit(): void {
    this.validateInputs();
  }

  ngOnDestroy(): void {
    // Cleanup if needed
  }

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent): void {
    if (this.disabled || this.loading) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    this.click.emit(event);
    this.onChange(true);
    this.onTouched();
  }

  @HostListener('focus', ['$event'])
  onFocus(event: FocusEvent): void {
    this.focus.emit(event);
  }

  @HostListener('blur', ['$event'])
  onBlur(event: FocusEvent): void {
    this.blur.emit(event);
  }

  @HostListener('mouseenter', ['$event'])
  onMouseEnter(event: MouseEvent): void {
    this.mouseenter.emit(event);
  }

  @HostListener('mouseleave', ['$event'])
  onMouseLeave(event: MouseEvent): void {
    this.mouseleave.emit(event);
  }

  // ControlValueAccessor implementation
  writeValue(value: any): void {
    // For buttons, we typically don't need to write values
    // But we can use this to set internal state if needed
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  // Public methods
  focus(): void {
    this.elementRef.nativeElement.focus();
  }

  blur(): void {
    this.elementRef.nativeElement.blur();
  }

  // Private methods
  private validateInputs(): void {
    const validVariants: ButtonVariant[] = ['primary', 'secondary', 'outline', 'ghost', 'danger'];
    const validSizes: ButtonSize[] = ['sm', 'md', 'lg'];
    const validTypes: ButtonType[] = ['button', 'submit', 'reset'];

    if (!validVariants.includes(this.variant)) {
      console.warn(`Invalid button variant: ${this.variant}. Using 'primary' instead.`);
      this.variant = 'primary';
    }

    if (!validSizes.includes(this.size)) {
      console.warn(`Invalid button size: ${this.size}. Using 'md' instead.`);
      this.size = 'md';
    }

    if (!validTypes.includes(this.type)) {
      console.warn(`Invalid button type: ${this.type}. Using 'button' instead.`);
      this.type = 'button';
    }
  }

  // Getters for template
  get buttonClasses(): string {
    const classes = [
      'ds-button',
      `ds-button--${this.variant}`,
      `ds-button--${this.size}`,
      this.disabled ? 'ds-button--disabled' : '',
      this.loading ? 'ds-button--loading' : '',
      this.fullWidth ? 'ds-button--full-width' : ''
    ].filter(Boolean);

    return classes.join(' ');
  }

  get isDisabled(): boolean {
    return this.disabled || this.loading;
  }
} 