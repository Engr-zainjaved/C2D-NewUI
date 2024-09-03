import React, { useState } from 'react';
import C2DModal from '../../../../components/Modal';
import Button from '../../../../../components/bootstrap/Button';
import Input from '../../../../../components/bootstrap/forms/Input';
import Spinner from '../../../../../components/bootstrap/Spinner';
import request from '../../../../../common/lib/axios';
import { useQueryClient } from 'react-query';

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onSuccess?: any;
  backupId: number | undefined;
}
const DeleteBackup: React.FC<Props> = ({ onSuccess, backupId, ...props }) => {
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();

  let branchId: any, projectId: any;

  try {
    branchId = localStorage.getItem('branchId');
    projectId = localStorage.getItem('projectId');
  } catch (error) {
    console.error('error', error);
  }

  const onDelete = async () => {
    setLoading(true);
    const apiUrl = `/user/project/${projectId}/branches/${branchId}/backups/${backupId}`;
    await request.delete(apiUrl);
    queryClient.invalidateQueries(['branchBackup', projectId, branchId]);
    setLoading(false);
    props?.setOpen(false);
  };

  return (
    <C2DModal {...props} title='Create Backup'>
      <p style={{ fontSize: 14 }} className='mb-4'>
        Are you sure you want to delete the backup ?
      </p>

      <div className='d-flex align-items-center gap-3 w-100'>
        <Button
          color='secondary'
          className='c2d-btn w-100'
          onClick={() => props.setOpen(false)}
          size={'lg'}
        >
          Discard
        </Button>
        <Button
          color='primary'
          className='c2d-btn w-100'
          onClick={onDelete}
          size={'lg'}
          isDisable={loading}
        >
          <div className='d-flex align-items-center justify-content-center'>
            <span style={{ marginRight: '10px' }}>Delete</span>
            {loading && <Spinner tag='span' color='primary' size={'1em'} />}
          </div>
        </Button>
      </div>
    </C2DModal>
  );
};

export default DeleteBackup;
