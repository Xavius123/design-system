/** @jsxImportSource @builder.io/mitosis */
import { useStore } from '@builder.io/mitosis'
import styles from './Input.module.css'

export interface InputProps {
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search'
  size?: 'sm' | 'md' | 'lg'
  label?: string
  error?: boolean
  errorMessage?: string
  helperText?: string
  required?: boolean
  fullWidth?: boolean
  placeholder?: string
  value?: string
  disabled?: boolean
  id?: string
  onChange?: (event: any) => void
  className?: string
}

export default function Input(props: InputProps) {
  const state = useStore({
    inputId: props.id || `input-${Math.random().toString(36).substr(2, 9)}`,
    get sizeClass() {
      return props.size || 'md'
    },
    get inputClasses() {
      const classes = [
        styles.input,
        styles[state.sizeClass],
        props.error ? styles.error : '',
        props.disabled ? styles.disabled : '',
        props.className || ''
      ]
      return classes.filter(Boolean).join(' ')
    },
    get wrapperClasses() {
      const classes = [
        styles.wrapper,
        props.fullWidth ? styles.wrapperFullWidth : ''
      ]
      return classes.filter(Boolean).join(' ')
    }
  })

  return (
    <div className={state.wrapperClasses}>
      {props.label && (
        <label htmlFor={state.inputId} className={styles.label}>
          {props.label}
          {props.required && <span className={styles.required}>*</span>}
        </label>
      )}
      <input
        id={state.inputId}
        type={props.type || 'text'}
        required={props.required}
        className={state.inputClasses}
        placeholder={props.placeholder}
        value={props.value}
        disabled={props.disabled}
        onChange={props.onChange}
      />
      {props.error && props.errorMessage && (
        <p className={styles.errorMessage}>{props.errorMessage}</p>
      )}
      {!props.error && props.helperText && (
        <p className={styles.helperText}>{props.helperText}</p>
      )}
    </div>
  )
}
