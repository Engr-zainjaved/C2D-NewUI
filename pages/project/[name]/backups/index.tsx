import React from 'react';
import Layout from '../../../../views/Projects/Details/Layout';
import Backups, {
  BackupsHeader,
  BackupsScrolller,
  BakupsTable,
} from '../../../../views/Projects/Details/Backups';

const BackupsPage = () => {
  return (
    <Layout>
      <Backups>
        <BackupsHeader />
        <BackupsScrolller>
          <BakupsTable />
        </BackupsScrolller>
      </Backups>
    </Layout>
  );
};

export default BackupsPage;
