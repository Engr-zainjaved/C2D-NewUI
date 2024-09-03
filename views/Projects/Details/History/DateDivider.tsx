import React from 'react'

interface Props {
    children: string
}

const DateDivider: React.FC<Props> = ({ children }) => {
    return (
        <div className="date-divider">{children}</div>
    )
}

export default DateDivider
