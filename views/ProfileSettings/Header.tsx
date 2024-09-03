import { useRouter } from 'next/router';
import React, { ReactNode } from 'react';
import Icon from '../../components/icon/Icon';

interface Props {
  tabs?: ReactNode;
  title?: String;
  callback?: any;
  routePath?: string;
}

const Header: React.FC<Props> = ({ tabs, title }) => {
  const router = useRouter();

  const handleClick = () => {
    router.back();
  };

  return (
    <div className="profile-settings-header d-flex align-items-center justify-content-between" style={{ width: '98%' }}>
      {title && <h3>{title}</h3>}
      {tabs}
      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleClick} />
    </div>
  );
};

export default Header;
