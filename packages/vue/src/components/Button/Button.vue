<template>
  <button
    :type="type || 'button'"
    :disabled="disabled"
    @click="async (event) => onClick"
    :class="computedClasses"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from "vue";

import styles from "./Button.module.css";


export interface ButtonProps {
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: (event: any) => void;
  children?: any;
  className?: string;
}

const props = defineProps<ButtonProps>();

const variantClass = computed(() => {
  return props.variant || "primary";
});
const sizeClass = computed(() => {
  return props.size || "md";
});
const computedClasses = computed(() => {
  const classes = [
    styles.button,
    styles[variantClass],
    styles[sizeClass],
    props.className || "",
  ];
  return classes.filter(Boolean).join(" ");
});
</script>