<template>
  <div :class="wrapperClasses">
    <template v-if="label">
      <label :for="inputId" :class="styles.label"
        >{{ label }}
        <template v-if="required">
          <span :class="styles.required">*</span>
        </template>
      </label>
    </template>

    <input
      :id="inputId"
      :type="type || 'text'"
      :required="required"
      :placeholder="placeholder"
      :value="value"
      :disabled="disabled"
      @change="async (event) => onChange"
      :class="inputClasses"
    />
    <template v-if="error && errorMessage">
      <p :class="styles.errorMessage">{{ errorMessage }}</p>
    </template>

    <template v-if="!error && helperText">
      <p :class="styles.helperText">{{ helperText }}</p>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

import styles from "./Input.module.css";

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

const props = defineProps<InputProps>();
const inputId = ref(
  props.id || `input-${Math.random().toString(36).substr(2, 9)}`
);

const sizeClass = computed(() => {
  return props.size || "md";
});
const inputClasses = computed(() => {
  const classes = [
    styles.input,
    styles[sizeClass],
    props.error ? styles.error : "",
    props.disabled ? styles.disabled : "",
    props.className || "",
  ];
  return classes.filter(Boolean).join(" ");
});
const wrapperClasses = computed(() => {
  const classes = [
    styles.wrapper,
    props.fullWidth ? styles.wrapperFullWidth : "",
  ];
  return classes.filter(Boolean).join(" ");
});
</script>