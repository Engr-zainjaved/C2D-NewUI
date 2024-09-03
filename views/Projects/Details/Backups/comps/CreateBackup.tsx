import React, { useState } from 'react';
import C2DModal from '../../../../components/Modal';
import Button from '../../../../../components/bootstrap/Button';
import Input from '../../../../../components/bootstrap/forms/Input';
import Spinner from '../../../../../components/bootstrap/Spinner';

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onSuccess?: any;
  branch: string;
  comment: string;
  setComment: React.Dispatch<React.SetStateAction<string>>;
}
const CreateBackup: React.FC<Props> = ({ onSuccess, branch, ...props }) => {
  const [loading, setLoading] = useState(false);
  const onCreate = async () => {
    setLoading(true);
    await onSuccess();
    setLoading(false);

    // props?.setOpen(false);
  };

  return (
    <C2DModal {...props} title='Create Backup'>
      <p style={{ fontSize: 14 }} className='mb-4'>
        You are about to create a manual backup of the <b>“{branch}”</b> production branch’s
        database. You may enter a short comment for this backup here below
      </p>

      <Input
        placeholder='backup comment...'
        className='c2d-input mb-4'
        size='lg'
        value={props.comment}
        onChange={(e: any) => props.setComment(e.target.value)}
      />

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
          onClick={onCreate}
          size={'lg'}
          isDisable={loading}
        >
          <div className='d-flex align-items-center justify-content-center'>
            <span style={{ marginRight: '10px' }}>Create</span>
            {loading && <Spinner tag='span' color='primary' size={'1em'} />}
          </div>
        </Button>
      </div>
    </C2DModal>
  );
};

export default CreateBackup;
