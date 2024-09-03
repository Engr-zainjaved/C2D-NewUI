import React, { FC, useState } from 'react';
import Button from '../../../components/bootstrap/Button';
import Icon from '../../../components/icon/Icon';
import Avatar, { AvatarGroup } from '../../../components/Avatar';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from 'react-query';
import { deleteProject } from '../../../apis';
import C2DModal from '../../components/Modal';
import InputGroup, { InputGroupText } from '../../../components/bootstrap/forms/InputGroup';
import Input from '../../../components/bootstrap/forms/Input';
import Spinner from '../../../components/bootstrap/Spinner';

interface Collaborator {
  id: number;
  username: string;
  is_admin: boolean;
  avatar_url: string;
  github_url: string;
}

interface Props {
  id: string | number;
  name: string;
  version: string | number;
  status: string;
  location: string;
  isTrialActive: boolean;
  repoUrl: string;
  collaborators: Collaborator[];
  handleDelete: (id: string | number) => void;
  isDeleting: boolean;
  isDeleteSuccess: boolean;
}

const ListCard: FC<Props> = ({
  id,
  name,
  version,
  status,
  location,
  isTrialActive,
  repoUrl,
  collaborators,
  handleDelete,
  isDeleting,
  isDeleteSuccess,
}) => {
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);
  const [deleteProjectNameValue, setDeleteProjectNameValue] = useState('');
  const [isDeleteButtonEnabled, setIsDeleteButtonEnabled] = useState(false);

  const handleDeleteProjectName = (e: any) => {
    setDeleteProjectNameValue(e.target.value);
    setIsDeleteButtonEnabled(e.target.value === name);
  };

  return (
    <>
      <div className="project-list-card w-full h-100 bg-white d-flex align-items-center justify-content-start cursor-pointer">
        <h4
          className="title"
          onClick={() => {
            router.push(`/project/${name}`);
            localStorage.setItem('projectId', id as string);
          }}>
          {name}
        </h4>

        <div className="tags d-flex align-items-start">
          <div className="tag rounded-pill">
            <Icon icon="CustomPin" />
            {location}
          </div>
          <div className={`tag rounded-pill ${status !== 'development' && 'prod'}`}>
            <Icon icon="Code" />
            {status}
          </div>
          {isTrialActive && (
            <div className="tag rounded-pill trial">
              <Icon icon="AccessTimeFilled" />
              Trial
            </div>
          )}
        </div>

        {collaborators.length == 1 &&
          collaborators.map((collaborator) => (
            <Avatar size={34} src={collaborator.avatar_url} userName={collaborator.username} />
          ))}
        {collaborators.length > 1 && (
          <AvatarGroup size={44}>
            {collaborators.map((collaborator) => (
              <Avatar size={34} src={collaborator.avatar_url} userName={collaborator.username} />
            ))}
          </AvatarGroup>
        )}

        <span className="version">V-{version}</span>

        <Button
          color="primary"
          className="c2d-btn"
          icon={'CustomGithub'}
          rounded={'pill'}
          onClick={() => window.open(repoUrl, '_blank')}>
          GitHub
          <Icon icon="ArrowForward" className="to-right" />
        </Button>

        {false && (
          <div className="d-flex align-items-center flex-nowrap gap-2">
            <>
              <Button className="c2d-icon-btn" icon={'CustomSetting'} rounded={'circle'} />
              <Button className="c2d-icon-btn" icon={'CustomBell'} rounded={'circle'} />
            </>
          </div>
        )}
        <Button
          className="c2d-icon-btn"
          icon={'CustomSetting'}
          rounded={'circle'}
          onClick={() => {
            localStorage.setItem('projectId', id as string);
            router.push(`/project/${name}/settings`);
          }}
        />
        <Button className="c2d-icon-btn" icon={'CustomDelete'} rounded={'circle'} onClick={() => setOpenModal(true)} />
      </div>
      {/* DELETE PROJECT MODAL */}
      <C2DModal title="Are you sure you want to Delete Project?" open={openModal} setOpen={setOpenModal} size="xl">
        <span>
          This action will permanently delete the project <strong>{name}</strong> and its builds. This action{' '}
          <strong>CANNOT</strong> be undone.
        </span>
        <InputGroup className="c2d-input-group second-field mt-3">
          <InputGroupText style={{ minWidth: 120 }}>To confirm</InputGroupText>
          <Input
            placeholder={`type "${name}" in the box`}
            value={deleteProjectNameValue}
            onChange={handleDeleteProjectName}
          />
        </InputGroup>

        <div className="d-flex align-items-center gap-3 w-100 mt-4">
          <Button color="secondary" className="c2d-btn w-100" onClick={() => setOpenModal(false)} size="lg">
            Abort Deleting
          </Button>
          <Button
            color="danger"
            className="c2d-btn w-100"
            size="lg"
            isDisable={!isDeleteButtonEnabled || isDeleting}
            onClick={() => handleDelete(id)}>
            {isDeleting ? (
              <span className="d-flex align-items-center justify-content-center">
                Deleting <Spinner className="ms-3" color="secondary" size="sm" />
              </span>
            ) : (
              'Delete Project'
            )}
          </Button>
        </div>
      </C2DModal>
    </>
  );
};

export default ListCard;
