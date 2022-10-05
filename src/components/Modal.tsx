import React, { FC, ReactNode } from 'react'

type ModalProps = {
  children: ReactNode
}

export const Modal = ({ children }: ModalProps) => {
  return (
    <div>
      <button>Close</button>
      { children }
    </div>
  )
}
