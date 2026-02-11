/** @jsxImportSource @builder.io/mitosis */
import { useStore } from '@builder.io/mitosis'
import styles from './Button.module.css'

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  onClick?: (event: any) => void
  children?: any
  className?: string
}

export default function Button(props: ButtonProps) {
  const state = useStore({
    get variantClass() {
      return props.variant || 'primary'
    },
    get sizeClass() {
      return props.size || 'md'
    },
    get computedClasses() {
      const classes = [
        styles.button,
        styles[state.variantClass],
        styles[state.sizeClass],
        props.className || ''
      ]
      return classes.filter(Boolean).join(' ')
    }
  })

  return (
    <button
      type={props.type || 'button'}
      className={state.computedClasses}
      disabled={props.disabled}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  )
}
