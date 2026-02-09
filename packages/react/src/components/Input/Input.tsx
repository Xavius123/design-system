"use client";
import * as React from "react";
import { useState } from "react";

/** @jsxImportSource @builder.io/mitosis */

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

function Input(props: InputProps) {
  const [inputId, setInputId] = useState(
    () => props.id || `input-${Math.random().toString(36).substr(2, 9)}`
  );

  function sizeClass() {
    return props.size || "md";
  }

  function inputClasses() {
    const classes = [
      styles.input,
      styles[sizeClass()],
      props.error ? styles.error : "",
      props.disabled ? styles.disabled : "",
      props.className || "",
    ];
    return classes.filter(Boolean).join(" ");
  }

  function wrapperClasses() {
    const classes = [
      styles.wrapper,
      props.fullWidth ? styles.wrapperFullWidth : "",
    ];
    return classes.filter(Boolean).join(" ");
  }

  return (
    <div className={wrapperClasses()}>
      {props.label ? (
        <label htmlFor={inputId} className={styles.label}>
          {props.label}
          {props.required ? <span className={styles.required}>*</span> : null}
        </label>
      ) : null}
      <input
        id={inputId}
        type={props.type || "text"}
        required={props.required}
        placeholder={props.placeholder}
        value={props.value}
        disabled={props.disabled}
        onChange={(event) => props.onChange}
        className={inputClasses()}
      />
      {props.error && props.errorMessage ? (
        <p className={styles.errorMessage}>{props.errorMessage}</p>
      ) : null}
      {!props.error && props.helperText ? (
        <p className={styles.helperText}>{props.helperText}</p>
      ) : null}
    </div>
  );
}

export default Input;
