import React from 'react'

interface Props {
    title: String,
    callback: any
}

const Header: React.FC<Props> = ({ title, callback }) => {
    return (
        <div className="project-settings-header d-flex align-items-center justify-content-between">
            <h3>{title}</h3>
            <button
                type='button'
                className='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'
                onClick={callback}
            />
        </div>
    )
}

export default Header
