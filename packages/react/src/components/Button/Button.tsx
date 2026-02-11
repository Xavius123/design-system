"use client";
import * as React from "react";


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

function Button(props: ButtonProps) {
  function variantClass() {
    return props.variant || "primary";
  }

  function sizeClass() {
    return props.size || "md";
  }

  function computedClasses() {
    const classes = [
      styles.button,
      styles[variantClass()],
      styles[sizeClass()],
      props.className || "",
    ];
    return classes.filter(Boolean).join(" ");
  }

  return (
    <button
      type={props.type || "button"}
      disabled={props.disabled}
      onClick={(event) => props.onClick}
      className={computedClasses()}
    >
      {props.children}
    </button>
  );
}

export default Button;
