import type { HTMLAttributes, PropsWithChildren } from 'react'

type CardProps = PropsWithChildren<HTMLAttributes<HTMLElement>>

export function Card({ className = '', children, ...props }: CardProps) {
  return (
    <article className={`ui-card ${className}`.trim()} {...props}>
      {children}
    </article>
  )
}
