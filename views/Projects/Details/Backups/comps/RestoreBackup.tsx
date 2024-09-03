import React, { useEffect, useLayoutEffect, useState } from 'react';
import C2DModal from '../../../../components/Modal';
import Popovers from '../../../../../components/bootstrap/Popovers';
import Icon from '../../../../../components/icon/Icon';
import Button from '../../../../../components/bootstrap/Button';
import Alert from '../../../../../components/bootstrap/Alert';
import Select from '../../../../../components/bootstrap/forms/Select';
import Option from '../../../../../components/bootstrap/Option';
import request from '../../../../../common/lib/axios';
import { useRouter } from 'next/router';
import { handleApiSuccess } from '../../../../../common/function/apiHelper/apiSuccess';

interface Branch {
  id: number;
  name: string;
  active: boolean;
  build: {
    url: string;
    status: string;
  };
  version: number;
}

interface Environment {
  branches: Branch[];
  id: number;
}

interface BranchRestoreList {
  Production: Environment;
  Staging: Environment;
  Development: Environment;
}

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  backupId: number | undefined;
  projectId: number | undefined;
  branchId: number | undefined;
  branchName: string | string[] | undefined;
  projectName: string | string[] | undefined;
  branchRestoreList?: any;
}

const RestoreBackup: React.FC<Props> = ({
  open,
  setOpen,
  backupId,
  projectId,
  branchId,
  branchName,
  projectName,
  branchRestoreList,
}) => {
  if (!branchRestoreList) return null;

  const allBranches = [
    ...branchRestoreList?.Production.branches,
    ...branchRestoreList?.Staging.branches,
    ...branchRestoreList?.Development.branches,
  ];

  const [selectedBranchId, setSelectedBranchId] = useState<any>(allBranches?.[0]?.id || null);
  const router = useRouter();

  const handleCancel = () => {
    setOpen(false);
  };

  const handleRestoreBackup = async () => {
    if (projectId && branchId && backupId) {
      try {
        const apiUrl = `/user/project/${projectId}/branches/${branchId}/backups/${backupId}/restore/`;
        const restoreBranchId = Number(selectedBranchId);
        const requestBody = {
          branch: restoreBranchId,
        };
        const response = await request.post(apiUrl, requestBody);
        handleApiSuccess(response);
        router.push(`/project/${projectName}/branches/${branchName}/history`);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleBranchChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedBranchId(event.target.value);
  };

  return (
    <C2DModal open={open} setOpen={setOpen} title="Restore Backup?" titleIcon={<ModalInfo />}>
      <div className="c2d-form c2d-light-form mb-4">
        <label className="form-label">Restore Backup into</label>
        <Select ariaLabel="backup-selection" size="lg" value={selectedBranchId} onChange={handleBranchChange}>
          {allBranches.map((branch) => (
            <Option key={branch.id} value={branch.id.toString()}>
              {branch.name}
            </Option>
          ))}
        </Select>
      </div>

      <Alert color="warning" isLight rounded={3}>
        <div className="d-flex gap-2 alert-body">
          It will replace your current production database and container. A backup will be made before the operation.
        </div>
      </Alert>

      <div className="d-flex align-items-center gap-3 w-100 mt-4">
        <Button color="secondary" className="c2d-btn w-100" onClick={handleCancel} size={'lg'}>
          Cancel
        </Button>
        <Button color="primary" className="c2d-btn w-100" size={'lg'} onClick={handleRestoreBackup}>
          Restore
        </Button>
      </div>
    </C2DModal>
  );
};

export default RestoreBackup;

const ModalInfo = () => {
  return (
    <Popovers desc={'Restore Backup info here'} placement="bottom-end" trigger="hover" className="c2d-popover">
      <Icon icon="CustomInfo" />
    </Popovers>
  );
};
