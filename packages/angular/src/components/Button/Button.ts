import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";

/** @jsxImportSource @builder.io/mitosis */

export interface ButtonProps {
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: (event: any) => void;
  children?: any;
  className?: string;
}

import styles from "./Button.module.css";

@Component({
  selector: "button",
  template: `
    <button
      [attr.type]="type || 'button'"
      [attr.disabled]="disabled"
      (click)="onClick"
      [class]="computedClasses"
    >
      <ng-content></ng-content>
    </button>
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
export default class Button {
  @Input() variant!: ButtonProps["variant"];
  @Input() size!: ButtonProps["size"];
  @Input() className!: ButtonProps["className"];
  @Input() type!: ButtonProps["type"];
  @Input() disabled!: ButtonProps["disabled"];
  @Input() onClick!: ButtonProps["onClick"];

  get variantClass() {
    return this.variant || "primary";
  }
  get sizeClass() {
    return this.size || "md";
  }
  get computedClasses() {
    const classes = [
      styles.button,
      styles[this.variantClass],
      styles[this.sizeClass],
      this.className || "",
    ];
    return classes.filter(Boolean).join(" ");
  }
}
