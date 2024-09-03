import React, { ReactNode } from 'react';
import Header from './Header';

interface Props {
  children: ReactNode;
  title?: string;
  routePath?: string;
  tabs?: ReactNode;
}

const ProjectSettings: React.FC<Props> = ({ children, tabs, title, routePath }) => {
  return (
    <div className="profile-settings-container">
      <div className="profile-settings-inner-wrapper">
        <Header tabs={tabs} title={title} callback={() => {}} routePath={routePath} />
        <div className="profile-settings-body">{children}</div>
      </div>
    </div>
  );
};

export default ProjectSettings;
