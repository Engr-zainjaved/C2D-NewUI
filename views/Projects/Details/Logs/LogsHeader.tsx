import React, { useEffect, useState } from 'react';

import Select from '../../../../components/bootstrap/forms/Select';
import Option from '../../../../components/bootstrap/Option';
import Input from '../../../../components/bootstrap/forms/Input';
import InputGroup, { InputGroupText } from '../../../../components/bootstrap/forms/InputGroup';
import { useProjectContext } from '../../../../context/projectContext';

const LogsHeader = ({ onLogTypeChange }: { onLogTypeChange: any }) => {
  const [selectedLogType, setSelectedLogType] = useState('app');
  const { isbuildActiveStatus } = useProjectContext();

  const handleLogTypeChange = (event: any) => {
    setSelectedLogType(event.target.value);
    onLogTypeChange(event);
  };

  useEffect(() => {
    onLogTypeChange({ target: { value: selectedLogType } });
  }, []);

  return (
    <div className="logs-header d-flex align-items-center justify-content-between">
      <Select
        ariaLabel="logs-selection"
        size="lg"
        placeholder="Logs"
        className="header-field"
        value={selectedLogType}
        onChange={handleLogTypeChange}>
        <Option value={'app'}>app.log</Option>
        <Option value={'build'}>build.log</Option>
        <Option value={'install'}>install.log</Option>
        <Option value={'odoo'} disabled={!isbuildActiveStatus}>
          odoo.log
        </Option>
      </Select>

      <InputGroup size="lg" className="header-field">
        <InputGroupText>Filter</InputGroupText>
        <Input size="lg" placeholder="Search here eg: qurry" />
      </InputGroup>
    </div>
  );
};

export default LogsHeader;
