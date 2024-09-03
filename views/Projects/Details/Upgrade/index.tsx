export { default as UpgradeHeader } from './UpgradeHeader';

import React, { ReactNode } from 'react';

const Upgrade = ({ children }: { children: ReactNode }) => {
  return <div className="backups-wrapper d-flex flex-column flex-grow-1 width-100">{children}</div>;
};

export default Upgrade;
