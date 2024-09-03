import React, { useState } from 'react';
import Button from '../../../../components/bootstrap/Button';
import CreateBackup from './comps/CreateBackup';
import ImportBackup from './comps/ImportBackup';
import request from '../../../../common/lib/axios';
import { useQueryClient } from 'react-query';
import { useProjectContext } from '../../../../context/projectContext';
import { handleApiSuccess } from '../../../../common/function/apiHelper/apiSuccess';

const BackupsHeader = () => {
  const [openCreate, setOpenCreate] = useState<boolean>(false);
  const [openImport, setOpenImport] = useState<boolean>(false);
  const [comment, setComment] = useState<string>('');
  const { branchName, setBranchBackupList } = useProjectContext();
  const queryClient = useQueryClient();
  let branchId: any, projectId: any;

  try {
    branchId = localStorage.getItem('branchId');
    projectId = localStorage.getItem('projectId');
  } catch (error) {
    console.error('error', error);
  }

  const getBranchBackup = async () => {
    const apiUrl = `/user/project/${projectId}/branches/${branchId}/backups/`;
    const response = await request.get(apiUrl);
    setBranchBackupList(response.data.data);
  };

  const createBranchBackup = async () => {
    try {
      if (branchId) {
        const apiUrl = `/user/project/${projectId}/branches/${branchId}/backups/`;
        const resp = await request.post(apiUrl, { comment: comment });
        setComment('');
        setOpenCreate(false);
        getBranchBackup();
        handleApiSuccess(resp);
        queryClient.invalidateQueries(['branchBackup', projectId, branchId]);
      }
    } catch (error) {
      setComment('');
      console.error(error);
    }
  };

  return (
    <>
      <div className="backups-header d-flex align-items-center justify-content-end gap-3">
        <Button color="primary" className="c2d-btn" size={'lg'} onClick={() => setOpenCreate(true)}>
          Create backup
        </Button>
        <Button color="secondary" className="c2d-btn" size={'lg'} onClick={() => setOpenImport(true)}>
          Import backup
        </Button>
      </div>

      <CreateBackup
        open={openCreate}
        setOpen={setOpenCreate}
        onSuccess={() => createBranchBackup()}
        branch={branchName}
        comment={comment}
        setComment={setComment}
      />

      <ImportBackup open={openImport} setOpen={setOpenImport} />
    </>
  );
};

export default BackupsHeader;
