import type { HTMLAttributes, PropsWithChildren } from 'react'

type SectionProps = PropsWithChildren<
  HTMLAttributes<HTMLElement> & {
    title?: string
  }
>

export function Section({ title, className = '', children, ...props }: SectionProps) {
  return (
    <section className={`ui-section ${className}`.trim()} {...props}>
      {title ? <h2 className="section-title">{title}</h2> : null}
      {children}
    </section>
  )
}
