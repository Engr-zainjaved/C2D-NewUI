import React, { ReactNode } from 'react';
import Header from './Header';

interface Props {
    children: ReactNode,
}

const ProjectSettings: React.FC<Props> = ({ children }) => {

    return (
        <div className="project-settings-container">
            <div className="project-settings-inner-wrapper">
                <Header
                    title={'Project Settings'}
                    callback={() => { }}
                />
                <div className="project-settings-body">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default ProjectSettings