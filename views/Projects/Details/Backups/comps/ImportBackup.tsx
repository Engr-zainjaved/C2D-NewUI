import React, { useState } from 'react';
import C2DModal from '../../../../components/Modal';
import Button from '../../../../../components/bootstrap/Button';
import Input from '../../../../../components/bootstrap/forms/Input';
import Icon from '../../../../../components/icon/Icon';
import Alert from '../../../../../components/bootstrap/Alert';
import Popovers from '../../../../../components/bootstrap/Popovers';
import Checks from '../../../../../components/bootstrap/forms/Checks';
import useS3FileUpload from '../../../../../hooks/useS3FileUpload';
import useImportDatabase from '../../../../../hooks/useImportDatabase';
import Spinner from '../../../../../components/bootstrap/Spinner';
import { useRouter } from 'next/router';

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ImportBackup: React.FC<Props> = ({ open, setOpen }) => {
  const [isNext, setIsNext] = useState<boolean>(true);
  const [importType, setImportType] = useState<string>('local_file');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [hostedUrl, setHostedUrl] = useState<string>('');
  const { uploadFileToS3, isLoadinguploadFileToS3 } = useS3FileUpload();
  const { importDatabase, isLoadingImportDatabase } = useImportDatabase();
  let branchId: any, projectId: any;
  const router = useRouter();
  const { name, branchName } = router.query;

  try {
    branchId = localStorage.getItem('branchId');
    projectId = localStorage.getItem('projectId');
  } catch (error) {
    console.error('error', error);
  }

  const handleNext = () => {
    if (isNext) {
      setIsNext(false);
    } else {
      setOpen(false);
    }
  };

  const handleCancel = () => {
    setOpen(false);
    setIsNext(true);
  };

  const handleCreate = () => {
    if (importType == 'local_file') {
      if (selectedFile) {
        uploadFileToS3(selectedFile.name, selectedFile, projectId, branchId, importType)
          .then(() => {
            router.push(`/project/${name}/branches/${branchName}/history`);
          })
          .catch((error) => {
            console.error('Upload failed:', error);
          });
      } else {
        console.error('No file selected');
      }
    } else {
      importDatabase(projectId, branchId, importType, hostedUrl)
        .then(() => {
          router.push(`/project/${name}/branches/${branchName}/history`);
        })
        .finally(() => {
          setHostedUrl('');
        });
    }
  };

  return (
    <C2DModal open={open} setOpen={setOpen} title="Import your Database" titleIcon={<ModalInfo />}>
      {isNext ? (
        <div className="d-flex flex-column gap-3 mb-4">
          <p className="mb-0" style={{ fontWeight: 600 }}>
            To import an existing on-premise C2D database:
          </p>
          <ol type="1" className="ms-3">
            <li>Open the existing C2D instance</li>
            <li>Connect to it as the administerator</li>
            <li>download a backup of the database with the database manager (/web/database/manager)</li>
            <li>Upload it in the next step</li>
          </ol>
          <div className="d-flex flex-column gap-1">
            <Alert color="light" rounded={3}>
              <div className="d-flex gap-2 alert-body">
                <Icon icon="CustomInfo" />
                During the import process, Odoo.sh will reset the system parameters
                for web.base.url and mail.catchall.domain as well as deactivating the custom mail servers, as the
                platform is managing this on your behalf. Please review these parameters after the import if you require
                to set custom values.
              </div>
            </Alert>
            <Alert color="danger" isLight rounded={3}>
              <div className="d-flex gap-2 alert-body">
                <Icon icon="CustomInfo" />
                You are about to replace your current production database! Importing an external database can conflict
                with the original one if it's still hosted elsewhere. To set up a test database please import in a
                staging branch instead to benefit from the neutralize system.
              </div>
            </Alert>
          </div>
        </div>
      ) : (
        <div className="c2d-form c2d-light-form mb-3">
          <div className="row">
            <div className="col-12 mb-5">
              <label className="form-label">
                <Checks
                  type="radio"
                  name="import-type"
                  label="Through Local Files"
                  value="local_file"
                  onChange={(e: any) => setImportType(e.target.value)}
                  checked={importType}
                />
              </label>

              <Input
                size="lg"
                type={'file'}
                placeholder="Upload zip file"
                disabled={Boolean(importType == 'hosted_file')}
                accept=".zip"
                onChange={(e: any) => setSelectedFile(e.target.files[0])}
              />
            </div>
            <div className="col-12 mb-4">
              <label className="form-label">
                <Checks
                  type="radio"
                  name="import-type"
                  label="Through hosted URL"
                  value="hosted_file"
                  onChange={(e: any) => setImportType(e.target.value)}
                  checked={importType}
                />
              </label>

              <Input
                size="lg"
                placeholder="Add URL"
                value={hostedUrl}
                onChange={(e: any) => setHostedUrl(e.target.value)}
                disabled={Boolean(importType === 'local_file')}
              />
            </div>
          </div>
        </div>
      )}

      <div className="d-flex align-items-center gap-3 w-100">
        <Button color="secondary" className="c2d-btn w-100" onClick={handleCancel} size={'lg'}>
          Cancel
        </Button>
        <Button
          color="primary"
          className="c2d-btn w-100"
          onClick={isNext ? handleNext : handleCreate}
          size={'lg'}
          isDisable={isLoadinguploadFileToS3}>
          {isNext ? (
            'Next'
          ) : isLoadinguploadFileToS3 ? (
            <>
              Create <Spinner size="1.2rem" />
            </>
          ) : (
            'Create'
          )}
        </Button>
      </div>
    </C2DModal>
  );
};

export default ImportBackup;

const ModalInfo = () => {
  return (
    <Popovers
      desc={'Select the file and ensure you are on a stable internet connection'}
      placement="bottom-end"
      trigger="hover"
      className="c2d-popover">
      <Icon icon="CustomInfo" />
    </Popovers>
  );
};
