import axios from 'axios';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { deleteProject } from '../../../../apis';
import { PAT } from '../../../../common/data/personalAccessToken';
import { handleApiSuccess } from '../../../../common/function/apiHelper/apiSuccess';
import request from '../../../../common/lib/axios';
import Avatar from '../../../../components/Avatar';
import Alert from '../../../../components/bootstrap/Alert';
import Button from '../../../../components/bootstrap/Button';
import Dropdown, { DropdownItem, DropdownMenu, DropdownToggle } from '../../../../components/bootstrap/Dropdown';
import Checks from '../../../../components/bootstrap/forms/Checks';
import Input from '../../../../components/bootstrap/forms/Input';
import InputGroup, { InputGroupText } from '../../../../components/bootstrap/forms/InputGroup';
import Select from '../../../../components/bootstrap/forms/Select';
import Option from '../../../../components/bootstrap/Option';
import Icon from '../../../../components/icon/Icon';
import PageWrapper from '../../../../layout/PageWrapper/PageWrapper';
import ProfileSettings from '../../../../views/ProfileSettings';
import { toast } from 'react-toastify';
import Spinner from '../../../../components/bootstrap/Spinner';

interface CollaboratorPayload {
  github_login: string;
  is_admin: boolean;
  github_meta: {
    name: string;
    avatar_url: string;
    html_url: string;
    repos_url: string;
  };
}

interface User {
  id: number;
  username: string;
  is_admin: boolean;
  name: string;
  access_level: string;
  avatar_url: string;
  github_url: string;
}

const ProjectSettings = () => {
  const [publicAccess, setPublicAccess] = useState(false);
  const [databaseWorkers, setDatabaseWorkers] = useState<number>(1);
  const [httpTimeout, setHttpTimeout] = useState(15);
  const [scheduledActionTimeout, setScheduledActionTimeout] = useState(15);
  const [stagingBranches, setStagingBranches] = useState(1);
  const [addCollaborator, setAddCollaborator] = useState('');
  const [collaborators, setCollaborators] = useState<any>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCollaborator, setSelectedCollaborator] = useState<CollaboratorPayload | null>(null);
  const [collaboratorsList, setCollaboratorsList] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [deleteProjectNameValue, setDeleteProjectNameValue] = useState('');
  const [isDeleteButtonEnabled, setIsDeleteButtonEnabled] = useState(false);
  const [submoduleInput, setSubmoudleInput] = useState('');
  const [submodules, setSubmodules] = useState([]);
  const [addSubmoduleLoading, setAddSubmoduleLoading] = useState(false);
  const router = useRouter();
  const { name: projectName } = router.query;
  const queryClient = useQueryClient();

  let projectId: any;

  try {
    projectId = localStorage.getItem('projectId');
  } catch (error) {
    console.error('error in localStorage', error);
  }

  const handleSubmoduleInput = (e: any) => {
    setSubmoudleInput(e.target.value);
  };

  const handleAddSubmodule = async () => {
    setAddSubmoduleLoading(true);
    try {
      const response = await request.post(`/user/project/${projectId}/add_deployment_key/`, {
        git_url: submoduleInput,
      });
      handleApiSuccess(response);
      getProjectSettings();
    } catch (error) {
      console.error(error);
    } finally {
      setSubmoudleInput('');
      setAddSubmoduleLoading(false);
    }
  };

  const handleDeleteSubmodule = async (submoduleId: number) => {
    request
      .delete(`/user/project/${projectId}/remove_deployment_key/`, {
        data: { git_url: submoduleId },
      })
      .then((response) => {
        handleApiSuccess(response);
        getProjectSettings();
      });
  };

  const mutation = useMutation(deleteProject, {
    onSuccess: () => {
      router.push('/project');
    },
  });

  const handleDelete = () => {
    mutation.mutate(projectId);
  };

  const handleSelectCollaborator = (collaborator: any) => {
    setAddCollaborator(collaborator.login);
    setSelectedCollaborator({
      github_login: collaborator.login,
      is_admin: false,
      github_meta: {
        name: collaborator.login,
        avatar_url: collaborator.avatar_url,
        html_url: collaborator.html_url,
        repos_url: collaborator.repos_url,
      },
    });
  };

  const handleDeleteProjectName = (e: any) => {
    setDeleteProjectNameValue(e.target.value);
    setIsDeleteButtonEnabled(e.target.value === projectName);
  };

  const handleAddCollaborator = async (e: any) => {
    const query = e.target.value;
    setAddCollaborator(query);
    const limit = 3;
    const token = process.env.GITHUB_PERSONAL_ACCESS_TOKEN || PAT;
    const url = `https://api.github.com/search/users?q=${query}&per_page=${limit}`;

    if (query.length > 0) {
      try {
        const response = await axios.get(url, {
          headers: {
            Authorization: `token ${token}`,
            Accept: 'application/vnd.github.v3+json',
          },
        });
        setCollaborators(response.data.items);
        if (!isDropdownOpen) {
          setIsDropdownOpen(true);
        }
      } catch (error) {
        console.error('Error fetching GitHub users:', error);
      }
    } else {
      setCollaborators([]);
      if (isDropdownOpen) {
        setIsDropdownOpen(false);
      }
    }
  };

  const handleSendCollaborator = () => {
    if (selectedCollaborator) {
      sendCollabortorPayloadToAPI(selectedCollaborator);
    } else {
      alert('Please select a collaborator first.');
    }
  };

  const sendCollabortorPayloadToAPI = async (payload: CollaboratorPayload) => {
    try {
      const response = await request.post(`/user/project/${projectId}/collaborators/`, payload);
      handleApiSuccess(response);
      setSelectedCollaborator(null);
      setAddCollaborator('');
      setIsDropdownOpen(false);
      getProjectSettings();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getProjectSettings();
  }, []);

  const getProjectSettings = async () => {
    try {
      const response = await request.get(`/user/project/${projectId}/settings/`);
      setSubmodules(response?.data?.data?.submodules);
      setCollaboratorsList(response?.data?.data?.users);
      setDatabaseWorkers(response?.data?.data?.repository?.max_production_workers);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRoleChange = async (collaborator: any, newRole: string) => {
    try {
      const isAdmin = newRole === 'admin';

      const response = await request.put(`/user/project/${projectId}/collaborators/${collaborator.id}/`, {
        is_admin: isAdmin,
      });

      handleApiSuccess(response);
    } catch (error) {
      console.error('Error updating role:', error);
    }
  };

  const handleDeleteCollaborator = async (collaborator: any) => {
    try {
      await request.delete(
        `${process.env.NEXT_PUBLIC_BASE_URL}/user/project/${projectId}/collaborators/${collaborator.id}/`,
      );

      setCollaboratorsList((prevCollaborators: any) => prevCollaborators.filter((c: any) => c.id !== collaborator.id));
    } catch (error) {
      console.error('Error deleting collaborator:', error);
    }
  };

  const handleStagingBranches = (e: any) => {
    const newValue = parseInt(e.target.value, 10);
    if (newValue > 0) {
      setStagingBranches(newValue);
    } else {
      setStagingBranches(1);
    }
  };

  const updateDatabaseWorkers = async (databaseWorkers: number) => {
    try {
      const response = await request.post(`/user/project/${projectId}/settings/db_workers_num/`, {
        workers: databaseWorkers,
      });
      setDatabaseWorkers(response.data.data.workers);
      handleApiSuccess(response);
    } catch (error) {
      console.error('Error updating role:', error);
    }
  };

  const handleDatabaseWorkers = (e: any) => {
    const newValue = parseInt(e.target.value, 10);
    if (newValue > 0) {
      setDatabaseWorkers(newValue);
      updateDatabaseWorkers(newValue);
    } else {
      setDatabaseWorkers(1);
    }
  };

  const handleScheduledActionTimeout = (e: any) => {
    const newValue = parseInt(e.target.value, 10);
    if (newValue > 0) {
      setScheduledActionTimeout(newValue);
    } else {
      setScheduledActionTimeout(15);
    }
  };

  const handleHttpTimeout = (e: any) => {
    const newValue = parseInt(e.target.value, 10);
    if (newValue > 0) {
      setHttpTimeout(newValue);
    } else {
      setHttpTimeout(15);
    }
  };

  const handleResetToDefaultWorkerSettings = () => {
    setHttpTimeout(15);
    setScheduledActionTimeout(15);
  };

  const toggleAlert = () => {
    setTimeout(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });
    setShowAlert(!showAlert);
  };

  return (
    <PageWrapper>
      <Head>
        <title>Project Settings</title>
      </Head>
      <ProfileSettings title="Project Settings" routePath="/project">
        <div className="row g-3 pt-4">
          <div className="c2d-form c2d-light-form">
            <div className="row gy-4">
              {/* PROJECT NAME */}
              <div className="col-12">
                <div className="d-flex">
                  <Icon icon="CustomGlob" />
                  <label className="form-label ms-2">Project Name</label>
                </div>
                <InputGroup className="c2d-input-group second-field">
                  <InputGroupText style={{ minWidth: 120 }}>https//</InputGroupText>
                  <Input placeholder="nomanjallal-c2d-playground" />
                  <InputGroupText style={{ minWidth: 120 }}>.c2d.com</InputGroupText>
                </InputGroup>
                <p className="form-control-info">
                  {'This will change URs for all future builds and for the production build.'}
                </p>
              </div>
              <div className="h-separator " />

              {/* COLLABORATORS */}
              <div className="col-12">
                <div className="d-flex">
                  <Icon icon="CustomUsers" />
                  <label className="form-label ms-2">Collaborators</label>
                </div>
                <Dropdown isOpen={isDropdownOpen} setIsOpen={setIsDropdownOpen} className="col-md-12">
                  <DropdownToggle hasIcon={false}>
                    <InputGroup className="c2d-input-group second-field">
                      <Input placeholder="GitHub username" value={addCollaborator} onChange={handleAddCollaborator} />
                      <Button
                        className="c2d-btn"
                        style={{ minWidth: 120 }}
                        hoverShadow="default"
                        color="primary"
                        isDisable={!addCollaborator}
                        onClick={handleSendCollaborator}>
                        Add
                      </Button>
                    </InputGroup>
                  </DropdownToggle>
                  <DropdownMenu className="col-md-12">
                    {collaborators?.length > 0 &&
                      collaborators?.map((collaborator: any) => (
                        <DropdownItem key={collaborator.id} onClick={() => handleSelectCollaborator(collaborator)}>
                          {collaborator.login}
                        </DropdownItem>
                      ))}
                  </DropdownMenu>
                </Dropdown>

                <p className="form-control-info col-8">
                  {
                    'Grant other GitHub users to this project.User rights disable access to production data and the settings. Push privileges on the repository are handled on GitHub.'
                  }
                </p>
              </div>
              {collaboratorsList &&
                collaboratorsList.length > 0 &&
                collaboratorsList.map((collaborator: User, key) => (
                  <React.Fragment key={collaborator.id || key}>
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="d-flex gap-3">
                        <Avatar src={collaborator.avatar_url} size={42} />
                        <div className="d-flex justify-content-center align-items-center gap-2">
                          <h4 className="mb-0">{collaborator.username}</h4>
                          <span>
                            <a
                              href={collaborator.github_url}
                              style={{ textDecoration: 'none', color: 'inherit' }}
                              className="hover:cursor-pointer">
                              ({collaborator.username})
                            </a>
                          </span>
                        </div>
                      </div>
                      <div className="d-flex gap-2">
                        <Select
                          ariaLabel="role-selection"
                          size="lg"
                          className="c2d-select ms-auto"
                          style={{ minWidth: 130, backgroundColor: '#EAEEF5' }}
                          defaultValue={collaborator.access_level}
                          onChange={(e: any) => handleRoleChange(collaborator, e.target.value)}>
                          <Option value={'admin'}>Admin</Option>
                          <Option value={'user'}>User</Option>
                        </Select>
                        <Button
                          icon="CustomTrashWhite"
                          className="c2d-btn"
                          hoverShadow="default"
                          rounded={1}
                          style={{ backgroundColor: '#a62f27', borderColor: '#a62f27' }}
                          onClick={() => handleDeleteCollaborator(collaborator)}
                        />
                      </div>
                    </div>
                    <div className="h-separator opacity-50" />
                  </React.Fragment>
                ))}

              <div className="h-separator mt-5" />

              {/* PUBLIC ACCESS*/}
              <div className="d-flex justify-content-between">
                <div className="col-12 col-md-4">
                  <div className="d-flex flex-column gap-3 setting-info">
                    <h5 className="d-flex align-items-center gap-2">
                      <Icon icon="CustomLock" />
                      Public Access
                    </h5>
                    <p className="form-control-info">
                      Expose the Builds page publicly, allowing visitors to connect to your developement builds.
                    </p>
                  </div>
                </div>
                <Checks
                  type="checkbox"
                  label="Allow public access"
                  id="public-access"
                  onChange={(e: any) => setPublicAccess(e.target.checked)}
                  checked={publicAccess}
                  className="accessCheck"
                />
              </div>
              <div className="h-separator mt-5" />

              {/* SUBMODULES */}
              <div className="col-12">
                <div className="d-flex">
                  <Icon icon="CustomLifeBoy" />
                  <label className="form-label ms-2">Submodules</label>
                </div>
                <Alert color="warning" isLight>
                  These settings are required for private repositories ONLY. <br />
                  <br />
                  <span>
                    If you are looking for some instructions on how to set up your submodules, please{' '}
                    <Link href="#">check out the documentation.</Link>
                  </span>
                </Alert>
                <p className="form-control-info col-8 mb-5">
                  Enter the Git URL of your private submodule hereunder and click on Add. <br />
                  Then copy the Publick key and add it as a Deploy key in the repository settings of your Git hosting
                  service.
                  <br />
                  <br />
                  You can read{' '}
                  <a href="#" target="_blank" rel="noopener noreferrer" className="underline">
                    our documentation
                  </a>{' '}
                  for more specific instructions.
                </p>
                <InputGroup className="c2d-input-group second-field">
                  <Input
                    placeholder="git@github.com:user-name/repo.git"
                    value={submoduleInput}
                    onChange={handleSubmoduleInput}
                  />
                  <Button
                    className="c2d-btn"
                    style={{ minWidth: 120 }}
                    hoverShadow="default"
                    color="primary"
                    isDisable={!submoduleInput || addSubmoduleLoading}
                    onClick={handleAddSubmodule}>
                    {addSubmoduleLoading ? (
                      <span>
                        Add
                        <Spinner size="1.2rem" className="ms-2" />
                      </span>
                    ) : (
                      'Add'
                    )}
                  </Button>
                </InputGroup>
              </div>

              {submodules.map((submodule: any) => (
                <div className="col-12 col-md-8">
                  <div className="mb-4">
                    <div className="mt-3 d-flex justify-content-between fw-bold">
                      {submodule.git_url}
                      <Icon
                        icon="CustomTrash"
                        color="danger"
                        className="cursor-pointer"
                        onClick={() => handleDeleteSubmodule(submodule.git_url)}
                      />
                    </div>
                    <div className="mt-3 d-flex justify-content-between">
                      <small className="fw-bold">Fingerprint</small>
                      <div>
                        <span style={{ color: '#2733BB' }} id="fingerprint">
                          {submodule.deploy_key_public_fingerprint}
                        </span>
                        <Icon
                          icon="CustomNotepad"
                          className="ms-3 cursor-pointer"
                          onClick={() => {
                            const element = document.getElementById('fingerprint');
                            if (element) {
                              const text = element.innerText;
                              navigator.clipboard.writeText(text);
                              toast.success('Fingerprint copied');
                            } else {
                              console.error('Element not found');
                            }
                          }}
                        />
                      </div>
                    </div>
                    <div className="mt-3 d-flex justify-content-between">
                      <small className="fw-bold">Public key</small>
                      <div>
                        <span
                          style={{
                            color: '#2733BB',
                            display: 'inline-block',
                            maxWidth: '350px',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                          id="publickey">
                          {submodule.deploy_key_public}
                        </span>
                        <Icon
                          icon="CustomNotepad"
                          className="ms-3 cursor-pointer"
                          onClick={() => {
                            const element = document.getElementById('publickey');
                            if (element) {
                              const text = element.innerText;
                              navigator.clipboard.writeText(text);
                              toast.success('Public key copied');
                            } else {
                              console.error('Element not found');
                            }
                          }}
                        />
                      </div>
                    </div>
                    <div className="h-separator opacity-50"></div>
                  </div>
                </div>
              ))}

              <div className="h-separator mt-5" />

              {/* PRODUCTION DATA SIZE */}
              <div className="col-12">
                <div className="d-flex">
                  <Icon icon="CustomLifeBoy" />
                  <label className="form-label ms-2">Production Data size</label>
                </div>

                <p className="form-control-info col-8 ">No production database yet.</p>
                <Alert color="info" isLight>
                  Trial project builds are limited to 1 GB in storage.
                </Alert>
              </div>
              <div className="h-separator mt-5" />

              {/* DATABASE WORKERS */}
              <div className="row mt-5">
                <div className="col-12 col-md-4">
                  <div className="d-flex flex-column gap-3 setting-info">
                    <h5 className="d-flex align-items-center gap-2">
                      <Icon icon="CustomClock" />
                      Database Workers
                    </h5>
                    <p className="form-control-info">
                      The database workiers define how many concurrent requests can be handled simultaneously. It is
                      necessary to have enough workers to server all incoming requests as they arrive but having more
                      doesn't speed up the requests processing time.
                    </p>
                  </div>
                </div>
                <div className="col-12 col-md-8">
                  <p className="form-control-info">
                    As a general rule of thumb, you should allocate about 1 worker per 25 users and 1 worker for every
                    5000 daily visitors. However, this can vary considerably based on database usage, website
                    characteristics, and code customizations.
                  </p>
                  <p className="form-control-info">
                    The default shared hosting offer provides up to 8 workers, while the dedicated server offer
                    increases this limit to 64 workers.
                  </p>
                  <div className="d-flex align-items-center justify-content-between">
                    <h5 style={{ color: '#6c757d' }}>Database Workers</h5>
                    <InputGroup className="c2d-input-group w-50">
                      <Input
                        type="number"
                        defaultValue={1}
                        min={1}
                        value={databaseWorkers}
                        onChange={handleDatabaseWorkers}
                        style={{ borderRight: '1px solid #ccc' }}
                      />
                      <InputGroupText style={{ backgroundColor: 'white' }}>Workers(s)</InputGroupText>
                    </InputGroup>
                  </div>
                </div>
              </div>
              <div className="h-separator mt-5" />

              {/* WORKERS SETTINGS */}
              <div className="row mt-5">
                <div className="col-12 col-md-4">
                  <div className="d-flex flex-column gap-3 setting-info">
                    <h5 className="d-flex align-items-center gap-2">
                      <Icon icon="CustomNotepad" />
                      Workers Settings
                    </h5>
                    <p className="form-control-info">
                      In this section, you can configure specific settings for the C2D workers.
                    </p>
                    <p className="form-control-info">
                      <span style={{ color: 'red' }}>Warning:</span> changing those settings could impact the
                      performance positively or negatively. In case of issue, please try to reset to default settings
                      before contacting the support.
                    </p>
                  </div>
                </div>
                <div className="col-12 col-md-8">
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="info d-flex align-items-center gap-1">
                      <h5 className="mb-0" style={{ color: '#6c757d' }}>
                        HTTP timeout
                      </h5>
                      <Icon icon="CustomInfo" />
                    </div>

                    <InputGroup className="c2d-input-group w-50">
                      <Input
                        type="number"
                        defaultValue={15}
                        min={1}
                        value={httpTimeout}
                        onChange={handleHttpTimeout}
                        style={{ borderRight: '1px solid #ccc' }}
                      />
                      <InputGroupText style={{ backgroundColor: 'white' }}>Minute(s)</InputGroupText>
                    </InputGroup>
                  </div>
                  <div className="h-separator opacity-50" />
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="info d-flex align-items-center gap-1">
                      <h5 className="mb-0" style={{ color: '#6c757d' }}>
                        Scheduled actions timeout
                      </h5>

                      <Icon icon="CustomInfo" />
                    </div>
                    <InputGroup className="c2d-input-group w-50">
                      <Input
                        type="number"
                        defaultValue={15}
                        min={1}
                        value={scheduledActionTimeout}
                        onChange={handleScheduledActionTimeout}
                        style={{ borderRight: '1px solid #ccc' }}
                      />
                      <InputGroupText style={{ backgroundColor: 'white' }}>Minute(s)</InputGroupText>
                    </InputGroup>
                  </div>
                  <div className="h-separator opacity-50" />
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="info d-flex align-items-center gap-1"></div>
                    <Button
                      color="primary"
                      size={'lg'}
                      className="c2d-btn"
                      rounded={3}
                      isDisable={httpTimeout == 15 && scheduledActionTimeout == 15}
                      onClick={handleResetToDefaultWorkerSettings}>
                      Reset to default
                    </Button>
                  </div>
                </div>
              </div>
              <div className="h-separator mt-5" />

              {/* STAGING BRANCHES */}
              <div className="row mt-5 d-flex align-items-center">
                <div className="col-12 col-md-4">
                  <div className="d-flex flex-column gap-3 setting-info">
                    <h5 className="d-flex align-items-center gap-2">
                      <Icon icon="CustomBranch" />
                      Staging Branches
                    </h5>
                    <p className="form-control-info">
                      Staging branches allow you to test and validate features with production data.
                    </p>
                  </div>
                </div>
                <div className="col-12 col-md-8">
                  <div className="d-flex align-items-center justify-content-between">
                    <h5 style={{ color: '#6c757d' }}>Staging Branches</h5>
                    <InputGroup className="c2d-input-group w-50">
                      <Input
                        type="number"
                        defaultValue={1}
                        min={1}
                        value={stagingBranches}
                        onChange={handleStagingBranches}
                        style={{ borderRight: '1px solid #ccc' }}
                      />
                      <InputGroupText style={{ backgroundColor: 'white' }}>Staging branch(es)</InputGroupText>
                    </InputGroup>
                  </div>
                </div>
              </div>
              <div className="h-separator mt-5" />

              {/* ACTIVATION */}
              <div className="row mt-5 d-flex align-items-center">
                <div className="col-12 col-md-4">
                  <div className="d-flex flex-column gap-3 setting-info">
                    <h5 className="d-flex align-items-center gap-2">
                      <Icon icon="CustomLayers" />
                      Activation
                    </h5>
                    <p className="form-control-info">
                      Odoo Enterprise codes with the Odoo.sh option are valid. Partnership codes activate the proect for
                      a trial, which allows a production branche for 30 days. After that it will be put back to the
                      development stage automatically, and finally deleted after another 60 days.
                    </p>
                  </div>
                </div>
                <div className="col-12 col-md-8"></div>
              </div>
              <div className="h-separator mt-5" />

              {/* DELETE PROJECT */}
              {true && (
                <div className="row mt-5">
                  <div className="col-12 col-md-4 "></div>
                  <div className="col-12 col-md-8 d-flex justify-content-end">
                    <Button color="danger" id="button-addon1" onClick={toggleAlert}>
                      Delete project
                    </Button>
                  </div>
                </div>
              )}

              <br />

              {showAlert && (
                <Alert color="danger" isLight className="d-block p-3">
                  <div>
                    <span>
                      This action will permanently delete the branch <strong>"{projectName}" </strong> and its builds.{' '}
                      <br />
                      This action <strong>CANNOT</strong> be undone .
                    </span>
                    <InputGroup className="c2d-input-group">
                      <Input
                        placeholder={`type the branch name "${projectName}" to confirm`}
                        id="test-suite"
                        value={deleteProjectNameValue}
                        onChange={handleDeleteProjectName}
                      />
                      <Button color="success" isDisable={false} onClick={toggleAlert}>
                        Abort deleting
                      </Button>
                      <Button
                        color="danger"
                        isOutline
                        icon="warning"
                        isDisable={!isDeleteButtonEnabled || mutation.isLoading}
                        onClick={handleDelete}>
                        Delete Project
                      </Button>
                    </InputGroup>
                  </div>
                </Alert>
              )}
            </div>
          </div>
        </div>
      </ProfileSettings>
    </PageWrapper>
  );
};

export default ProjectSettings;
