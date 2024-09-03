import React, { useState, useEffect } from 'react';
import { useDrop } from 'react-dnd';
import Collapse from '../../../../../components/bootstrap/Collapse';
import Select from '../../../../../components/bootstrap/forms/Select';
import Option from '../../../../../components/bootstrap/Option';
import Input from '../../../../../components/bootstrap/forms/Input';
import InputGroup, { InputGroupText } from '../../../../../components/bootstrap/forms/InputGroup';
import Button from '../../../../../components/bootstrap/Button';
import Icon from '../../../../../components/icon/Icon';
import Branch from './Branch';
import { ICreateBranch } from '../../../../../type/common-interface';
import { useMutation, useQueryClient } from 'react-query';
import { createBranch } from '../../../../../apis';
import Spinner from '../../../../../components/bootstrap/Spinner';
import C2DModal from '../../../../components/Modal';
import request from '../../../../../common/lib/axios';
import { useProjectContext } from '../../../../../context/projectContext';
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
}

interface Branches {
  id: number;
  name: string;
}

interface Props {
  allBranches: Branches[];
  envId: number;
  label: string;
  projectId: string;
  forkable?: boolean;
  // branches?: Main[] | undefined;
  branches?: any;
  onBranchCreated?: () => void;
  onBranchSelect?: any;
  selectedBranchId: any;
  setSelectedBranchId: any;
  isInitialLoad: boolean;
  selectedBranch: any;
  setSelectedBranch: any;
}

const Environment: React.FC<Props> = ({
  allBranches,
  envId,
  label,
  projectId,
  forkable,
  branches,
  onBranchCreated,
  onBranchSelect,
  selectedBranchId,
  setSelectedBranchId,
  isInitialLoad,
  selectedBranch,
  setSelectedBranch,
}) => {
  const [show, setShow] = useState<boolean>(false);
  const [newBranchName, setNewBranchName] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [draggedBranchId, setDraggedBranchId] = useState<number | null>(null);
  const queryClient = useQueryClient();

  const mutation = useMutation(
    ({ projectId, payload }: { projectId: string; payload: ICreateBranch }) => createBranch(projectId, payload),
    {
      onSuccess: (response) => {
        handleApiSuccess(response);
        if (onBranchCreated) {
          onBranchCreated();
        }
      },
    },
  );

  const handleCreateBranch = () => {
    if (!selectedBranch || !newBranchName) {
      console.error('Both branch selection and new branch name are required');
      return;
    }

    const baseBranch = allBranches.find((branch) => branch.id == selectedBranch);

    if (!baseBranch) {
      console.error('Selected branch not found');
      return;
    }

    const payload: ICreateBranch = {
      base_branch: baseBranch.id,
      name: newBranchName,
      stage: envId,
    };

    mutation.mutate({ projectId, payload });
    setNewBranchName('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === 'NumpadEnter') {
      handleCreateBranch();
    }
  };

  const handleStageChange = (draggedBranchId: number | null, targetStageId: number) => {
    if (!draggedBranchId) return;
    setIsLoading(true);
    const apiUrl = `/user/project/${projectId}/branches/${draggedBranchId}/`;

    request
      .patch(apiUrl, { stage: targetStageId })
      .then((response) => {
        handleApiSuccess(response);
        queryClient.invalidateQueries(['projectBranches', projectId]);
        return queryClient.fetchQuery(['projectBranches', projectId]);
      })
      .finally(() => {
        setIsLoading(false);
        setOpenModal(false);
      });
  };

  const [, drop] = useDrop({
    accept: 'branch',
    drop: (item: { id: number }, monitor) => {
      if (!monitor.didDrop()) {
        setDraggedBranchId(item.id);
        setOpenModal(true);
      }
    },
  });

  return (
    <>
      <div ref={drop}>
        <div className="env-header-wrapper mt-1" id={label}>
          <div className={`env-header ${show ? 'opened' : ''}`} onClick={() => setShow(!show)}>
            <h4>{label}</h4>
            {forkable ? <Icon icon="Add" size={'lg'} /> : null}
          </div>
          {forkable ? (
            <Collapse isOpen={show} id={`Collapse`}>
              <div className="d-flex flex-column gap-3 collapse-body">
                <InputGroup size="lg">
                  <InputGroupText>Fork</InputGroupText>
                  <Select
                    ariaLabel="branch-selection"
                    size="lg"
                    value={selectedBranch?.toString() ?? ''}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedBranch(Number(e.target.value))}>
                    {allBranches.map((branch) => (
                      <Option key={branch.id} value={branch.id.toString()}>
                        {branch.name}
                      </Option>
                    ))}
                  </Select>
                </InputGroup>
                <InputGroup size="lg">
                  <InputGroupText>To</InputGroupText>
                  <Input
                    size="lg"
                    placeholder="new branch name"
                    value={newBranchName}
                    onChange={(e: any) => setNewBranchName(e.target.value)}
                    onKeyDown={handleKeyDown}
                    disabled={mutation.isLoading}
                  />
                </InputGroup>
                {mutation.isLoading && (
                  <span>
                    <Spinner color="info" isSmall className="ms-2" /> creating branch
                  </span>
                )}
              </div>
            </Collapse>
          ) : null}
        </div>
        {branches?.length > 0 ? (
          <div className="branches d-flex flex-column">
            {branches?.map((branch: any) => (
              <Branch
                key={branch.id}
                {...branch}
                isSelected={branch.id == selectedBranchId}
                onSelect={() => onBranchSelect(branch.id)}
              />
            ))}
          </div>
        ) : null}
      </div>
      <C2DModal title="Are you sure you want to Change Stage?" open={openModal} setOpen={setOpenModal} size="xl">
        <span>
          Before using Staging branches, you need to setup your production branch by Drag & Dropping a branch to
          Production. Staging branches are used to test your new features, with the production data.
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
            onClick={() => handleStageChange(draggedBranchId, envId)}>
            {isLoading ? <Spinner color="info" size="sm" /> : 'Change Stage'}
          </Button>
        </div>
      </C2DModal>
    </>
  );
};

export default Environment;
