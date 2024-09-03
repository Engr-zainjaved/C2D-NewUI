import React, { useState } from 'react';
import C2DModal from '../../../../components/Modal';
import Popovers from '../../../../../components/bootstrap/Popovers';
import Icon from '../../../../../components/icon/Icon';
import Button from '../../../../../components/bootstrap/Button';
import Alert from '../../../../../components/bootstrap/Alert';
import Checks from '../../../../../components/bootstrap/forms/Checks';
import useDownloadDatabaseDumpApi from '../../../../../hooks/useDownloadDatabaseDumpApi';
import { toast } from 'react-toastify';

interface Props {
  open: boolean;
  backupId: number | undefined;
  projectId: number | undefined;
  branchId: number | undefined;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const DownloadBackup: React.FC<Props> = ({ open, setOpen, backupId, projectId, branchId }) => {
  const [dumpType, setDumpType] = useState<string>('exact');
  const [downloadType, setdownloadType] = useState<string>('with_filestore');

  const { isLoadingDownloadDatabaseDumpApi, downloadDatabaseDump } = useDownloadDatabaseDumpApi(setOpen);

  const handleCancel = () => {
    setOpen(false);
  };

  const handledownloadDatabaseDump = () => {
    if (backupId && projectId && branchId) {
      downloadDatabaseDump(projectId, branchId, backupId, downloadType);
    } else {
      toast.error(`backupId: ${backupId}, projectId:${projectId}, branchId: ${branchId} `, {
        autoClose: 5000,
        theme: 'colored',
      });
    }
  };

  return (
    <C2DModal open={open} setOpen={setOpen} title="Download a database dump" titleIcon={<ModalInfo />}>
      <div className="c2d-form c2d-light-form mb-4">
        <div className="row">
          <div className="col-12 mb-4">
            <label className="form-label separator">Type of dump</label>
            <div className="d-flex flex-column gap-1 mt-2 ms-1">
              <Checks
                type="radio"
                name="dump-type"
                id="dump-neutralized"
                label="Neutralized databased dump for testing/troubleshooting"
                value="neutralized"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDumpType(e.target.value)}
                checked={dumpType}
              />
              <Checks
                type="radio"
                name="dump-type"
                id="dump-exact"
                label="Exact database dump"
                value="exact"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDumpType(e.target.value)}
                checked={dumpType}
              />
            </div>

            {dumpType == 'exact' ? (
              <Alert color="warning" isLight rounded={3} className="mt-4">
                <div className="d-flex gap-2 alert-body">
                  <Icon icon="CustomInfo" />
                  Downloading and restoring an exact database dump on another system can conflict with the existing
                  database running on the C2D. The only reasons to download this type of database dump should be to
                  change hosting service or to perform a manual version upgrade.
                </div>
              </Alert>
            ) : null}
          </div>
          <div className="col-12 mb-4">
            <label className="form-label separator">
              <Icon icon="CustomInfo" className="color-primary" />
              File store
            </label>
            <div className="d-flex flex-column gap-1 mt-2 ms-1">
              <Checks
                type="radio"
                name="file-type"
                label="Without file store"
                value={'without_filestore'}
                id="without_filestore"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setdownloadType(e.target.value)}
                checked={downloadType}
              />
              <Checks
                type="radio"
                name="file-type"
                label="With file store"
                value={'with_filestore'}
                id={'with_filestore'}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setdownloadType(e.target.value)}
                checked={downloadType}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex align-items-center gap-3 w-100 mt-4">
        <Button color="secondary" className="c2d-btn w-100" onClick={handleCancel} size={'lg'}>
          Cancel
        </Button>
        <Button
          color="primary"
          className="c2d-btn w-100"
          size={'lg'}
          onClick={() => handledownloadDatabaseDump()}
          isDisable={dumpType == 'neutralized'}>
          Start
        </Button>
      </div>
    </C2DModal>
  );
};

export default DownloadBackup;

const ModalInfo = () => {
  return (
    <Popovers desc={'Download Backup info here'} placement="bottom-end" trigger="hover" className="c2d-popover">
      <Icon icon="CustomInfo" />
    </Popovers>
  );
};
