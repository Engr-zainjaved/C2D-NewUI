import React, { ReactNode } from 'react'

const BackupsScrolller = ({ children }: { children: ReactNode }) => {
    return (
        <div className='backups-scrolller w-100'>
            {children}
        </div>
    )
}

export default BackupsScrolller
