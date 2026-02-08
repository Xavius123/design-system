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
    <Button
      type={props.type || "button"}
      disabled={props.disabled}
      onPress={(event) => props.onClick}
    >
      {props.children}
    </Button>
  );
}

export default Button;
