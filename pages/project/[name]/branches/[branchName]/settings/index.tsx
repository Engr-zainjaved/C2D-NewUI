import React, { useEffect, useState } from 'react';
import Icon from '../../../../../../components/icon/Icon';
import Select from '../../../../../../components/bootstrap/forms/Select';
import Option from '../../../../../../components/bootstrap/Option';
import Checks from '../../../../../../components/bootstrap/forms/Checks';
import Button from '../../../../../../components/bootstrap/Button';
import Label from '../../../../../../components/bootstrap/forms/Label';
import InputGroup, { InputGroupText } from '../../../../../../components/bootstrap/forms/InputGroup';
import Input from '../../../../../../components/bootstrap/forms/Input';
import Alert from '../../../../../../components/bootstrap/Alert';
import DomainModal from '../../../../../../views/Projects/Details/Settings/DomainModal';
import Settings from '../../../../../../views/Projects/Details/Settings';
import useDeleteProjectBranch from '../../../../../../hooks/useDeleteProjectBranch';
import { useRouter } from 'next/router';
import { isProductionBranch } from '../../../../../../helpers/helpers';
import { useProjectContext } from '../../../../../../context/projectContext';

const SettingsPage = () => {
  const router = useRouter();
  const { name, branchName } = router.query;
  const { branchData } = useProjectContext();
  const [domainConfig, setDomainConfig] = useState(false);
  const [buildBehaviour, setBuildBehaviour] = useState(false);
  const [validateTestSuite, setValidateTestSuite] = useState(false);
  const [moduleInstallation, setModuleInstallation] = useState('install-only-my-module');
  const [inputTestSuiteValue, setInputTestSuiteValue] = useState('');
  const [deleteBranchNameValue, setDeleteBranchNameValue] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const { deleteProjectBranch, isLoadingDeleteProjectBranch } = useDeleteProjectBranch();
  const [isProductionBranchId, setIsProductionBranchId] = useState(false);
  const [isDeleteButtonEnabled, setIsDeleteButtonEnabled] = useState(false);
  let projectId: any, branchId: any;

  try {
    projectId = localStorage.getItem('projectId');
    branchId = localStorage.getItem('branchId');
  } catch (error) {
    console.error('SettingsPage -> error', error);
  }

  useEffect(() => {
    if (branchData) {
      setIsProductionBranchId(isProductionBranch(branchData, branchId));
    }
  }, [branchData]);

  const handleTestSuiteChange = (e: any) => {
    setInputTestSuiteValue(e.target.value);
  };

  const handleDeleteBranchName = (e: any) => {
    setDeleteBranchNameValue(e.target.value);
    setIsDeleteButtonEnabled(e.target.value === branchName);
  };

  const handleBuildBehaviour = () => {
    setBuildBehaviour(!buildBehaviour);
  };

  const handleTestSuite = () => {
    setValidateTestSuite(!validateTestSuite);
  };

  const handleModuleInstallation = (event: any) => {
    setModuleInstallation(event.target.value);
  };

  const toggleAlert = () => {
    setTimeout(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });
    setShowAlert(!showAlert);
  };

  const handleDeleteProjectBranch = (projectName: any) => {
    deleteProjectBranch(projectId, branchId, projectName);
  };

  return (
    <Settings>
      {/* BEHAVIOUR UPON NEW COMMITS */}
      <div className="row mt-5">
        <div className="col-12 col-md-4">
          <div className="d-flex flex-column gap-3 setting-info">
            <h5 className="d-flex align-items-center gap-2">
              <Icon icon="CustomNotepad" />
              Behavior upon new commits
            </h5>
            <p>
              New commits will either do nothing, create new builds or update the previous one if it is still running.
            </p>
          </div>
        </div>
        <div className="col-12 col-md-8">
          <Select ariaLabel="version-selection" size="lg" className="c2d-select ms-auto">
            <Option value={'do-nothing'}>Do nothing</Option>
            <Option value={'new-build'}>New build</Option>
            <Option value={'update-previous-build'}>Update previous build</Option>
          </Select>
        </div>
      </div>
      <div className="h-separator mt-5" />

      {/* DEVELOPMENT BUILD BEHAVIOUR */}
      <div className="row mt-5">
        <div className="col-12 col-md-4">
          <div className="d-flex flex-column gap-3 setting-info">
            <h5 className="d-flex align-items-center gap-2">
              <Icon icon="CustomNotepad" />
              Development build behavior
            </h5>
          </div>
        </div>
        <div className="col-12 col-md-8 d-flex align-items-center">
          <Checks
            id="id"
            name="name"
            type="checkbox"
            label="Use default"
            checked={buildBehaviour}
            onChange={handleBuildBehaviour}
          />
          <Button color="link" icon="EditNote">
            Modify Default
          </Button>
        </div>
      </div>
      <div className="h-separator mt-5" />

      {/* MODULE INSTALLATION */}
      <div className="row mt-5">
        <div className="col-12 col-md-4">
          <div className="d-flex flex-column gap-3 setting-info">
            <h5 className="d-flex align-items-center gap-2">
              <Icon icon="CustomNotepad" />
              Module installation
            </h5>
            <p>
              All installed modules will be tested except if you select Full installation. This setting applies only to
              this development branch.
            </p>
          </div>
        </div>
        <div className="col-12 col-md-8">
          <Checks
            type="radio"
            name="Install only my modules (does not include submodules)"
            id="install-only-my-module"
            label="Install only my modules (does not include submodules)"
            value="install-only-my-module"
            onChange={handleModuleInstallation}
            checked={moduleInstallation}
          />
          <Checks
            type="radio"
            name="Full installation (no test suite)"
            id="full-installation"
            label="Full installation (no test suite)"
            value="full-installation"
            onChange={handleModuleInstallation}
            checked={moduleInstallation}
          />
          <Checks
            type="radio"
            name="Install a list of modules"
            id="install-a-list-of-modules"
            label="Install a list of modules"
            value="install-a-list-of-modules"
            onChange={handleModuleInstallation}
            checked={moduleInstallation}
          />
        </div>
      </div>
      <div className="h-separator mt-5" />

      {/* TEST SUITE */}
      <div className="row mt-5">
        <div className="col-12 col-md-4">
          <div className="d-flex flex-column gap-3 setting-info">
            <h5 className="d-flex align-items-center gap-2">
              <Icon icon="CustomNotepad" />
              Test suite
            </h5>
            <p>
              Odoo has a test suite that can help validate your customizations. You can choose to disable it if you wish
              to reduce the build's creation time, but be aware this goes against best practices.
            </p>
          </div>
        </div>
        <div className="col-12 col-md-8">
          <Checks
            id="id"
            name="name"
            type="checkbox"
            label="Validate the test suite on new builds."
            checked={validateTestSuite}
            onChange={handleTestSuite}
          />
          {validateTestSuite && (
            <>
              <Label htmlFor="test-suite" className="mt-4">
                Test tags can be added to limit the tests to be run on new builds (comma-separated tags)
              </Label>
              <InputGroup className="c2d-input-group ">
                <Input
                  placeholder="for example: custom_tags, at_install, post_install"
                  id="test-suite"
                  value={inputTestSuiteValue}
                  onChange={handleTestSuiteChange}
                />
                <Button isOutline color="primary" id="button-addon1">
                  Apply default
                </Button>
              </InputGroup>
            </>
          )}
        </div>
      </div>
      <div className="h-separator mt-5" />

      {/* C2D VERSION */}
      <div className="row mt-4">
        <div className="col-12 col-md-4">
          <div className="d-flex flex-column gap-3 setting-info">
            <h5 className="d-flex align-items-center gap-2">
              <Icon icon="CustomNotepad" />
              C2D Version
            </h5>
            <p>
              Stick the Odoo codebase to a specific revision, or get the weekly updates to benefit of the latest
              security, bug and performance fixes.
            </p>
          </div>
        </div>
        <div className="col-12 col-md-8">
          <div className="d-flex align-items-center w-100 mb-4">
            <div className="version-details">
              Version <span>15.4</span>
            </div>
            <Select ariaLabel="version-selection" size="lg" className="c2d-select ms-auto" style={{ maxWidth: 230 }}>
              <Option value={'version-1'}>version 1</Option>
              <Option value={'version-2'}>version 2</Option>
            </Select>
          </div>
          <div className="mb-4">
            Information
            <p className="mt-2">
              You can use *.odoo.com or your own domain.
              <br />
              Note that with your own domain, you have to configure the
              <br />
              DNS entries accordingly.
            </p>
          </div>
          <div className="mb-4">
            Repository revisions
            <div className="mt-3 d-flex flex-column gap-3">
              {['C2D', 'enterprise', 'themes'].map((item, i) => (
                <div className="repo-rev" key={i}>
                  {item}
                  <span className="ms-auto">
                    0e518424fd53fa9b72bbd800f15a2a26facfad3b
                    <Icon icon="CustomGithub" />
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="h-separator " />

      {/* CUSTOM DOMAINS */}
      <div className="row mt-5">
        <div className="col-12 col-md-4">
          <div className="d-flex flex-column gap-3 setting-info">
            <h5 className="d-flex align-items-center gap-2">
              <Icon icon="CustomNotepad" />
              Custom domains
            </h5>
            <p>Associate a domain to your production database.</p>
          </div>
        </div>
        <div className="col-12 col-md-8">
          <InputGroup className="c2d-input-group">
            <Input placeholder="www.your-domain-name.com" />
            <InputGroupText>Add domain</InputGroupText>
          </InputGroup>

          <div className="mt-4">
            <p className="mt-2">
              You can use *.odoo.com or your own domain.
              <br />
              Note that with your own domain, you have to configure the
              <br />
              DNS entries accordingly.
            </p>
          </div>
          <div className="mt-3 arrow-link d-flex align-items-center gap-2 mb-4" onClick={() => setDomainConfig(true)}>
            <Icon icon="ArrowForwardIos" />
            <span>How to setup domain?</span>
          </div>
        </div>
      </div>
      <div className="h-separator " />

      {/* DELETE BRANCH */}
      {isProductionBranchId && (
        <Alert color="danger" isLight className="d-block p-3">
          <span>
            You cannot delete the <strong>Production Branch </strong>. <br />
            The only way to delete a production branch is to delete the entire project
          </span>
        </Alert>
      )}

      {!isProductionBranchId && (
        <div className="row mt-5">
          <div className="col-12 col-md-4 "></div>
          <div className="col-12 col-md-8 d-flex justify-content-end">
            <Button color="danger" id="button-addon1" onClick={toggleAlert}>
              Delete branch
            </Button>
          </div>
        </div>
      )}

      <br />

      {showAlert && (
        <Alert color="danger" isLight className="d-block p-3">
          <div>
            <span>
              This action will permanently delete the branch <strong>"{branchName}" </strong> and its builds. <br />
              This action <strong>CANNOT</strong> be undone .
            </span>
            <InputGroup className="c2d-input-group">
              <Input
                placeholder={`type the branch name "${branchName}" to confirm`}
                id="test-suite"
                value={deleteBranchNameValue}
                onChange={handleDeleteBranchName}
              />
              <Button color="success" isDisable={false} onClick={toggleAlert}>
                Abort deleting
              </Button>
              <Button
                color="danger"
                isOutline
                icon="warning"
                isDisable={!isDeleteButtonEnabled || isLoadingDeleteProjectBranch}
                onClick={() => handleDeleteProjectBranch(name)}>
                Delete branch
              </Button>
            </InputGroup>
          </div>
        </Alert>
      )}

      <DomainModal open={domainConfig} setOpen={setDomainConfig} />
    </Settings>
  );
};

export default SettingsPage;
