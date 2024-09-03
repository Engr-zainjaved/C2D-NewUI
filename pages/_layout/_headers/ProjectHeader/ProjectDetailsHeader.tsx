import React from 'react';
import Notifications from './Notifications';
import UserProfile from './UserProfile';

const ProjectDetailsHeader = () => {
  return (
    <header className="project-header project-details-header">
      <div className="d-flex justify-content-end align-items-center items-wrapper">
        {false && (
          <div className="header-item rounded-pill">
            <Notifications />
          </div>
        )}
        <div className="header-item rounded-pill">
          <UserProfile />
        </div>
      </div>
    </header>
  );
};

export default ProjectDetailsHeader;
