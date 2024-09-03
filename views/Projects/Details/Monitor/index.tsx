export { default as MonitorHeader } from './MonitorHeader';

import React, { ReactNode } from 'react';

const Monitor = ({ children }: { children: ReactNode }) => {
  return <div className="backups-wrapper d-flex flex-column flex-grow-1 width-100">{children}</div>;
};

export default Monitor;
