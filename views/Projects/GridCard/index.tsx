import React, { FC, useEffect, useState } from 'react';
import Button from '../../../components/bootstrap/Button';
import Icon from '../../../components/icon/Icon';
import Avatar, { AvatarGroup } from '../../../components/Avatar';
import { useRouter } from 'next/navigation';
import Dropdown, { DropdownItem, DropdownMenu, DropdownToggle } from '../../../components/bootstrap/Dropdown';
import Link from 'next/link';
import Collapse from '../../../components/bootstrap/Collapse';
import Popovers from '../../../components/bootstrap/Popovers';
import request from '../../../common/lib/axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { deleteProject, getProjects } from '../../../apis';
import Spinner from '../../../components/bootstrap/Spinner';
import C2DModal from '../../components/Modal';
import Input from '../../../components/bootstrap/forms/Input';
import InputGroup, { InputGroupText } from '../../../components/bootstrap/forms/InputGroup';

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

const GridCard: FC<Props> = ({
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
  const [openDropdown, setOpenDropdown] = useState(false);
  const [deleteProjectNameValue, setDeleteProjectNameValue] = useState('');
  const [isDeleteButtonEnabled, setIsDeleteButtonEnabled] = useState(false);

  const DROPDOWN_INNER = (
    <div className="d-flex flex-column ">
      <Button
        color="light"
        className="c2d-btn"
        icon={'CustomSetting'}
        onClick={() => {
          localStorage.setItem('projectId', id as string);
          router.push(`/project/${name}/settings`);
        }}>
        Settings
      </Button>
      <Button
        color="danger"
        isLight
        className="c2d-btn mt-2 w-100"
        icon={'CustomDelete'}
        isDisable={isDeleting}
        onClick={() => setOpenModal(true)}>
        Delete
        {isDeleting && <Spinner color="dark" size={20} className="ms-3" />}
      </Button>
    </div>
  );

  const handleDeleteProjectName = (e: any) => {
    setDeleteProjectNameValue(e.target.value);
    setIsDeleteButtonEnabled(e.target.value === name);
  };

  useEffect(() => {
    if (isDeleteSuccess) {
      setOpenModal(false);
      setDeleteProjectNameValue('');
      setIsDeleteButtonEnabled(false);
    }
  }, [isDeleteSuccess]);

  return (
    <>
      <div className="project-grid-card w-100 h-100 bg-white d-flex flex-column ">
        <div className="grid-card-header d-flex align-items-center justify-content-between mb-4">
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

          {/* <div>
            {false && <Button className="c2d-icon-btn" icon={'CustomBell'} rounded={'circle'} />}
            <Popovers desc={DROPDOWN_INNER} placement="auto" trigger={'hover'}>
              <Button className="c2d-icon-btn" icon={'MoreVert'} rounded={'circle'} />
            </Popovers>
          </div> */}
          <div>
            <Dropdown isOpen={openDropdown} setIsOpen={setOpenDropdown}>
              <DropdownToggle hasIcon={false}>
                <Button className="c2d-icon-btn" icon={'MoreVert'} rounded={'circle'} />
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem>
                  <Button
                    color="light"
                    className="c2d-btn w-100"
                    icon={'CustomSetting'}
                    onClick={() => {
                      localStorage.setItem('projectId', id as string);
                      router.push(`/project/${name}/settings`);
                    }}>
                    Settings
                  </Button>
                </DropdownItem>
                <DropdownItem>
                  <Button
                    color="light"
                    className="c2d-btn mt-2 w-100"
                    icon={'CustomDelete'}
                    isDisable={isDeleting}
                    onClick={() => setOpenModal(true)}>
                    Delete
                    {isDeleting && <Spinner color="dark" size={20} className="ms-3" />}
                  </Button>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>

        <div className="titles">
          <span>V-{version}</span>
          <h4
            className="cursor-pointer text-decoration-none hover:text-decoration-underline"
            onClick={() => {
              router.push(`/project/${name}`);
              localStorage.setItem('projectId', id as string);
            }}>
            {name}
          </h4>
        </div>

        <div className="tags d-flex flex-column align-items-start w-100">
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

        <Button
          color="primary"
          className="c2d-btn w-100"
          icon={'CustomGithub'}
          rounded={'pill'}
          onClick={() => window.open(repoUrl, '_blank')}>
          GitHub
          <Icon icon="ArrowForward" className="to-right" />
        </Button>
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

export default GridCard;
