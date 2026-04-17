import type { ButtonHTMLAttributes, PropsWithChildren } from 'react'

type ButtonProps = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement> & {
    kind?: 'primary' | 'secondary' | 'ghost'
  }
>

export function Button({ kind = 'primary', className = '', children, ...props }: ButtonProps) {
  return (
    <button className={`ui-button ${kind} ${className}`.trim()} {...props}>
      {children}
    </button>
  )
}
