import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";


export interface InputProps {
  type?: "text" | "email" | "password" | "number" | "tel" | "url" | "search";
  size?: "sm" | "md" | "lg";
  label?: string;
  error?: boolean;
  errorMessage?: string;
  helperText?: string;
  required?: boolean;
  fullWidth?: boolean;
  placeholder?: string;
  value?: string;
  disabled?: boolean;
  id?: string;
  onChange?: (event: any) => void;
  className?: string;
}

import styles from "./Input.module.css";

@Component({
  selector: "input",
  template: `
    <div [class]="wrapperClasses">
      <ng-container *ngIf="label">
        <label [attr.for]="inputId" [class]="styles.label">
          {{label}}
          <ng-container *ngIf="required">
            <span [class]="styles.required">*</span>
          </ng-container>
        </label>
      </ng-container>
      <input
        [attr.id]="inputId"
        [attr.type]="type || 'text'"
        [attr.required]="required"
        [attr.placeholder]="placeholder"
        [attr.value]="value"
        [attr.disabled]="disabled"
        (change)="onChange"
        [class]="inputClasses"
      />
      <ng-container *ngIf="error && errorMessage">
        <p [class]="styles.errorMessage">{{errorMessage}}</p>
      </ng-container>
      <ng-container *ngIf="!error && helperText">
        <p [class]="styles.helperText">{{helperText}}</p>
      </ng-container>
    </div>
  `,
  styles: [
    `
      :host {
        display: contents;
      }
    `,
  ],
  standalone: true,
  imports: [CommonModule],
})
export default class Input {
  styles = styles;

  @Input() id!: InputProps["id"];
  @Input() size!: InputProps["size"];
  @Input() error!: InputProps["error"];
  @Input() disabled!: InputProps["disabled"];
  @Input() className!: InputProps["className"];
  @Input() fullWidth!: InputProps["fullWidth"];
  @Input() label!: InputProps["label"];
  @Input() required!: InputProps["required"];
  @Input() type!: InputProps["type"];
  @Input() placeholder!: InputProps["placeholder"];
  @Input() value!: InputProps["value"];
  @Input() onChange!: InputProps["onChange"];
  @Input() errorMessage!: InputProps["errorMessage"];
  @Input() helperText!: InputProps["helperText"];

  inputId = null;
  get sizeClass() {
    return this.size || "md";
  }
  get inputClasses() {
    const classes = [
      styles.input,
      styles[this.sizeClass],
      this.error ? styles.error : "",
      this.disabled ? styles.disabled : "",
      this.className || "",
    ];
    return classes.filter(Boolean).join(" ");
  }
  get wrapperClasses() {
    const classes = [
      styles.wrapper,
      this.fullWidth ? styles.wrapperFullWidth : "",
    ];
    return classes.filter(Boolean).join(" ");
  }

  ngOnInit() {
    this.inputId =
      this.id || `input-${Math.random().toString(36).substr(2, 9)}`;
  }
}
