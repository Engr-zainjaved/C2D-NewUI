import React, { ReactNode } from 'react'

const Settings = ({ children }: { children: ReactNode }) => {
    return (
        <div className="settings-wrapper">
            {children}
        </div>
    )
}

export default Settings