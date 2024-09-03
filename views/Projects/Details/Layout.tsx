import React, { ReactNode } from 'react';
import Sidebar from './Sidebar';
import DetailsHeader from './DetailsHeader';
interface Props {
    children: ReactNode,
}

const Layout: React.FC<Props> = ({ children }) => {
    return (
        <div className="project-details-layout d-flex flex-grow-1">
            <Sidebar />
            <div className="project-details flex-grow-1 flex-column d-flex">
                <div className="details-container flex-grow-1 flex-column d-flex">
                    <DetailsHeader />
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Layout
