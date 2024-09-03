import React, { ReactNode } from 'react'

const LogsScrollar = ({ children }: { children: ReactNode }) => {
    return (
        <div className='logs-scrollar'>
            {children}
        </div>
    )
}

export default LogsScrollar
