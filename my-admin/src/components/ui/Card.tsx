import type { ReactNode } from "react"

interface Props {
  title: string
  children: ReactNode
  className?: string
}

export default function Card({ title, children, className = '' }: Props) {
  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-200 ${className}`}>
      <div className="p-4 border-bottom">
        <h5 className="mb-0 fw-semibold">{title}</h5>
      </div>
      <div className="p-4">{children}</div>
    </div>
  )
}