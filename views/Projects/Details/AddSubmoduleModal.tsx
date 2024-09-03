import React, { useState } from 'react';
import C2DModal from '../../components/Modal';
import { Field, Form, Formik, FormikProps } from 'formik';
import Input from '../../../components/bootstrap/forms/Input';
import Button from '../../../components/bootstrap/Button';
import Select from '../../../components/bootstrap/forms/Select';
import Option from '../../../components/bootstrap/Option';
import Spinner from '../../../components/bootstrap/Spinner';
import request from '../../../common/lib/axios';
import { handleApiSuccess } from '../../../common/function/apiHelper/apiSuccess';

interface FormValues {
  repositoryUrl: string;
  path: string;
  branch: number;
}

const AddSubmoduleModal = ({
  values,
  setFieldValue,
  resetForm,
  openModal,
  setOpenModal,
}: {
  values: any;
  setFieldValue: any;
  resetForm: any;
  openModal: any;
  setOpenModal: any;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isAddSubmoduelLoading, setIsAddSubmoduelLoading] = useState(false);
  const [submoduleBranches, setSubmoduleBranches] = useState<any>([]);
  const [branchRevision, setBranchRevision] = useState('');
  let projectId: any;
  let branchId: any;

  try {
    projectId = localStorage.getItem('projectId');
    branchId = localStorage.getItem('branchId');
  } catch (error) {
    console.error('DetailsHeader -> error', error);
  }

  const handleFetchSubModuleBranches = async () => {
    try {
      setIsLoading(true);
      const apiUrl = `/user/project/${projectId}/branches/${branchId}/fetch_sub_module/`;
      const response = await request.post(apiUrl, {
        git_url: values.repositoryUrl,
      });
      const branches = response.data.data.branches;
      setSubmoduleBranches(branches);

      if (branches.length > 0) {
        setFieldValue('branch', branches[0].name);
        setBranchRevision(branches[0].revision);
      }
      setFieldValue('path', response.data.data.default_module_path);
      setIsLoading(false);
    } catch (error: any) {
      resetForm();
      setIsLoading(false);
    }
  };

  const handleAddSubModule = async () => {
    try {
      setIsAddSubmoduelLoading(true);

      const apiUrl = `/user/project/${projectId}/branches/${branchId}/add_sub_module/`;
      const response = await request.post(apiUrl, {
        git_url: values.repositoryUrl,
        url: values.repositoryUrl,
        path: values.path,
        branch_name: values.branch,
        branch_sha: branchRevision,
      });
      handleApiSuccess(response);
    } catch (error) {
      console.error('handleAddSubModule -> error', error);
    } finally {
      resetForm();
      setIsAddSubmoduelLoading(false);
      setOpenModal(false);
    }
  };

  return (
    <C2DModal title="Add a submodule" open={openModal} setOpen={setOpenModal} size="xl">
      <span>
        Use Git submodules to manage dependencies among different repositories. <br />
        All modules of the repository will be loaded in your project, but you can configure in the settings which ones
        you want to install or not.
      </span>

      <>
        <Form className="c2d-form">
          <div className="col">
            <label className="form-label mt-4">Repository URL:</label>
            <div className="col d-flex align-items-center justify-content-between gap-2 mb-4 ">
              <Field
                as={Input}
                name="repositoryUrl"
                className=""
                size="lg"
                placeholder="git@github.com:USERNAME/REPOSITORY.git"
              />
              <Button
                color="primary"
                className="c2d-btn "
                isDisable={isLoading || values.repositoryUrl == ''}
                onClick={() => handleFetchSubModuleBranches()}>
                {isLoading ? <Spinner color="info" size="sm" /> : 'proceed'}
              </Button>
            </div>
            <div className="col mb-4">
              <label className="form-label">Branch:</label>
              <Field
                as={Select}
                name="branch"
                ariaLabel="version-selection"
                size="lg"
                onChange={(e: any) => {
                  const selectedBranch = submoduleBranches.find((branch: any) => branch.name === e.target.value);
                  setBranchRevision(selectedBranch?.revision);
                  setFieldValue('branch', selectedBranch?.name);
                }}>
                {submoduleBranches.map((branch: any) => (
                  <Option value={branch.name}>{branch.name}</Option>
                ))}
              </Field>
            </div>
            <div className="col mb-4">
              <label className="form-label">Path:</label>
              <Field as={Input} name="path" className="" size="lg" placeholder="submodules/submodules-name" />
            </div>
          </div>
        </Form>

        <div className="d-flex align-items-center gap-3 w-100 mt-4">
          <Button color="secondary" className="c2d-btn w-100" onClick={() => setOpenModal(false)} size="lg">
            Cancel
          </Button>
          <Button
            color="primary"
            className="c2d-btn w-100"
            size="lg"
            isDisable={isLoading || isAddSubmoduelLoading || !values.repositoryUrl || !values.path || !values.branch}
            onClick={handleAddSubModule}>
            {isAddSubmoduelLoading ? <Spinner color="info" size="sm" /> : 'Add Submodule'}
          </Button>
        </div>
      </>
    </C2DModal>
  );
};

export default AddSubmoduleModal;
