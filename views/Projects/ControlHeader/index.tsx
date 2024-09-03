import React, { Dispatch, SetStateAction, useState } from 'react';
import Button from '../../../components/bootstrap/Button';
import Icon from '../../../components/icon/Icon';
import CreateNewModal from '../CreateNewModal';

interface Props {
  layout: string;
  handleLayoutChange: Dispatch<SetStateAction<string>>;
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
}

const ControlHeader: React.FC<Props> = ({ layout, handleLayoutChange, search, setSearch }) => {
  const [createNew, setCreateNew] = useState<boolean>(false);
  return (
    <div className='container projects-container'>
      <div className='projects-control-header d-flex align-items-center justify-content-between mt-4'>
        <h4>Projects</h4>
        <div className='d-flex align-items-center justify-content-end gap-3 flex-grow-1'>
          <div className='project-search-bar d-flex align-items-center'>
            <input
              className='flex-grow-1'
              type='text'
              placeholder='Search'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Icon icon='CustomSearch' size={'2x'} />
          </div>
          <Button
            color={layout == 'grid' ? 'primary' : 'secondary'}
            onClick={() => handleLayoutChange('grid')}
            size={'lg'}
            className='c2d-icon-btn'
            icon={'CustomGrid'}
            rounded={3}
          />
          <Button
            color={layout == 'list' ? 'primary' : 'secondary'}
            onClick={() => handleLayoutChange('list')}
            size={'lg'}
            className='c2d-icon-btn'
            icon={'CustomList'}
            rounded={3}
          />
          <Button
            color='primary'
            size={'lg'}
            className='c2d-btn'
            icon={'CustomAdd'}
            rounded={3}
            onClick={() => setCreateNew(true)}
          >
            Create New
          </Button>
        </div>
      </div>
      <CreateNewModal isOpenModal={createNew} setIsOpenModal={setCreateNew} />
    </div>
  );
};

export default ControlHeader;
