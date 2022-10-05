import React, { ReactNode, useEffect, useState } from 'react'

type MessageBoxProps = {
    type: 'error' | 'success',
    content?: string,
    children?: ReactNode
}

export const MessageBox = ({ type, content, children }: MessageBoxProps) => {
    const [isOpen, setIsOpen] = useState(false);
    
    const close = () => {
        setIsOpen(false);
    }

    useEffect(() => {
        setIsOpen(true);
    }, [content, children])

    return (
        <>
        { isOpen &&
            <div className={`msg msg-${type}`}>
                { children }
                { content }
                <button onClick={ close }> &times; </button>
            </div>
        }
        </>
    )
}
