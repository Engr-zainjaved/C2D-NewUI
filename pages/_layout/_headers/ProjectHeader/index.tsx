import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../../../../assets/landing-page/main-logo.svg';
import Notifications from './Notifications';
import UserProfile from './UserProfile';

const ProjectHeader = () => {
  return (
    <header className="project-header">
      <div className="inner-wrapper d-flex align-items-center gap-5">
        <Link href={'/'}>
          <Image src={logo} alt="C2D Logo" width={262} height={34} className="logo" />
        </Link>
        <div className="d-flex justify-content-end align-items-center gap-3 ms-auto">
          {false && <Notifications />}
          <UserProfile />
        </div>
      </div>
    </header>
  );
};

export default ProjectHeader;
