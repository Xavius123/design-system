import * as React from "react";
import {
  FlatList,
  ScrollView,
  View,
  StyleSheet,
  Image,
  Text,
  Pressable,
  TextInput,
  TouchableOpacity,
  Button,
  Linking,
} from "react-native";
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
    <View>
      {props.label ? (
        <View htmlFor={inputId}>
          <Text>{props.label}</Text>
          {props.required ? (
            <View>
              <Text>*</Text>
            </View>
          ) : null}
        </View>
      ) : null}
      <TextInput
        id={inputId}
        type={props.type || "text"}
        required={props.required}
        placeholder={props.placeholder}
        value={props.value}
        disabled={props.disabled}
        onChange={(event) => props.onChange}
      />
      {props.error && props.errorMessage ? (
        <View>
          <Text>{props.errorMessage}</Text>
        </View>
      ) : null}
      {!props.error && props.helperText ? (
        <View>
          <Text>{props.helperText}</Text>
        </View>
      ) : null}
    </View>
  );
}

export default Input;
