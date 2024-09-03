import React from 'react';
import Backups, {
  BackupsHeader,
  BackupsScrolller,
  BakupsTable,
} from '../../../../../../views/Projects/Details/Backups';
import Layout from '../../../../../../views/Projects/Details/Layout';

const BackupsPage = () => {
  return (
    <Backups>
      <BackupsHeader />
      <BackupsScrolller>
        <BakupsTable />
      </BackupsScrolller>
    </Backups>
  );
};

export default BackupsPage;
