export { default as LogsHeader } from './LogsHeader';
export { default as LogsScrollar } from './LogsScrollar';

import React, { ReactNode } from 'react'

const Logs = ({ children }: { children: ReactNode }) => {
    return (
        <div className="logs-wrapper d-flex flex-column flex-grow-1">
            {children}
        </div>
    )
}

export default Logs