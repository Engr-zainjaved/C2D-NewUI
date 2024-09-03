export { default as BackupsHeader } from './BackupsHeader';
export { default as BackupsScrolller } from './BackupsScrolller';
export { default as BakupsTable } from './BakupsTable';

import React, { ReactNode } from 'react'

const Backups = ({ children }: { children: ReactNode }) => {
    return (
        <div className="backups-wrapper d-flex flex-column flex-grow-1 width-100">
            {children}
        </div>
    )
}

export default Backups