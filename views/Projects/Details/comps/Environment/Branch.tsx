import React, { useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import Button from '../../../../../components/bootstrap/Button';
import Spinner from '../../../../../components/bootstrap/Spinner';
import request from '../../../../../common/lib/axios';
import { useProjectContext } from '../../../../../context/projectContext';
import C2DModal from '../../../../components/Modal';
import { useRouter } from 'next/router';
import { handleApiSuccess } from '../../../../../common/function/apiHelper/apiSuccess';

interface BuildInfo {
  url: string;
  status: string | 'connect' | 'error' | 'drop';
}

interface Main {
  id: number;
  name: string;
  active: boolean;
  build: BuildInfo;
  version: string;
  isSelected: boolean;
  onSelect: (id: number) => void;
}

const Branch: React.FC<Main> = ({ id, name, active, build, version, isSelected, onSelect }) => {
  const { setProjectData, setBranchName } = useProjectContext();
  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [draggedBranchId, setDraggedBranchId] = useState<number | null>(null);
  const router = useRouter();
  const { name: projectName } = router.query;

  const [{ opacity }, drag] = useDrag(
    () => ({
      type: 'branch',
      item: { id },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.4 : 1,
      }),
    }),
    [],
  );

  const [, drop] = useDrop({
    accept: 'branch',
    drop: (item: { id: number }) => {
      if (item.id !== id) {
        setOpenModal(true);
        setDraggedBranchId(item.id);
      }
    },
  });

  let projectId: any;
  try {
    projectId = localStorage.getItem('projectId');
  } catch (error) {
    console.error('unable to get projectId from local storage', error);
  }

  const handleMergeBranch = (targetBranchId: any, draggedBranchId: any) => {
    setIsLoading(true);
    const apiUrl = `/user/project/${projectId}/branches/merge/`;

    request
      .post(apiUrl, {
        target_branch: targetBranchId,
        source_branch: draggedBranchId,
      })
      .then((response) => {
        handleApiSuccess(response);
      })
      .finally(() => {
        setOpenModal(false);
        setIsLoading(false);
      });
  };

  const getProjectTracking = async () => {
    const apiUrl = `/user/project/${projectId}/branches/${id}/tracking/`;
    const response = await request.get(apiUrl);
    setProjectData(response.data.data);
  };

  const handleClick = () => {
    onSelect(id);
    localStorage.setItem('branchId', id.toString());
    getProjectTracking();
    setBranchName(name);
    router.push(`/project/${projectName}/branches/${name}/history`);
  };

  return (
    <>
      <div
        ref={(node) => drag(drop(node))}
        className={`branch cursor-pointer ${isSelected ? 'bg-light border border-primary rounded' : ''}`}
        style={{ opacity }}
        data-testid={name + '-' + version}
        onClick={handleClick}>
        {name}
        <span>{version}</span>
        {build?.status === 'success' || build?.status === 'connect' ? (
          <Button color="success" size="sm" className="chip" onClick={() => window.open(build?.url, '_blank')}>
            Connect
          </Button>
        ) : build?.status === 'in_progress' ? (
          <Spinner color="info" size="sm" />
        ) : (
          <div className={`chip ${build?.status}`}>{build?.status}</div>
        )}
      </div>
      <C2DModal title="Are you sure you want to merge?" open={openModal} setOpen={setOpenModal} size="xl">
        <span>
          "Rebase and Merge" will create a pull request and merge it with the rebase option for a linear history.
          "Merge" will create a merge commit, no fast forward. (The resulting code will be the same. More info.)
        </span>
        <div className="d-flex align-items-center gap-3 w-100 mt-4">
          <Button color="secondary" className="c2d-btn w-100" onClick={() => setOpenModal(false)} size="lg">
            Cancel
          </Button>
          <Button
            color="primary"
            className="c2d-btn w-100"
            size="lg"
            isDisable={isLoading}
            onClick={() => handleMergeBranch(id, draggedBranchId!)}>
            {isLoading ? <Spinner color="info" size="sm" /> : 'Merge'}
          </Button>
        </div>
      </C2DModal>
    </>
  );
};

export default Branch;
