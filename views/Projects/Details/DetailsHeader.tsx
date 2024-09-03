import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Button from '../../../components/bootstrap/Button';
import { useProjectContext } from '../../../context/projectContext';
import { isBuildActive } from '../../../common/function/utilities';
import C2DModal from '../../components/Modal';
import Spinner from '../../../components/bootstrap/Spinner';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import { Label } from 'recharts';
import { Field, Form, Formik, FormikProps, useFormikContext } from 'formik';
import Input from '../../../components/bootstrap/forms/Input';
import Select from '../../../components/bootstrap/forms/Select';
import Option from '../../../components/bootstrap/Option';
import request from '../../../common/lib/axios';
import AddSubmoduleModal from './AddSubmoduleModal';

interface FormValues {
  repositoryUrl: string;
  path: string;
  branch: number;
}

const DetailsHeader = () => {
  const router = useRouter();
  const { projectData, branchName, isbuildActiveStatus, setIsbuildActiveStatus, metaUrlsData } = useProjectContext();
  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isAddSubmoduelLoading, setIsAddSubmoduelLoading] = useState(false);
  const [submoduleBranches, setSubmoduleBranches] = useState<any>([]);
  const [errorMessage, setErrorMessage] = useState('');
  // const { values, setFieldValue, resetForm } = useFormikContext<FormValues>();

  let currentStage: any;
  let projectId: any;
  let branchId: any;
  try {
    currentStage = localStorage.getItem('currentStage');
    projectId = localStorage.getItem('projectId');
    branchId = localStorage.getItem('branchId');
  } catch (error) {
    console.error('DetailsHeader -> error', error);
  }
  ``;
  useEffect(() => {
    if (projectData && projectData != null) {
      setIsbuildActiveStatus(isBuildActive(projectData));
    }
  }, [projectData]);

  // const handleFetchSubModuleBranches = async () => {
  //   try {
  //     setIsLoading(true);
  //     const apiUrl = `/user/project/${projectId}/branches/${branchId}/fetch_sub_module/`;
  //     const response = await request.post(apiUrl, {
  //       git_url: values.repositoryUrl,
  //     });
  //     const branches = response.data.data.branches;
  //     setSubmoduleBranches(branches);

  //     if (branches.length > 0) {
  //       setFieldValue('branch', branches[0].name);
  //     }
  //     setFieldValue('path', response.data.data.default_module_path);
  //     setIsLoading(false);
  //   } catch (error: any) {
  //     setErrorMessage(error.response?.data.errors[0] || 'An error occurred');
  //     resetForm();
  //     setIsLoading(false);
  //   }
  // };

  const nav_links = [
    {
      label: 'History',
      path: `/project/${router.query.name}/branches/${branchName}/history`,
      path2: `/project/${router.query.name}`,
    },
    { label: 'Logs', path: `/project/${router.query.name}/branches/${branchName}/logs` },
    {
      label: 'Backups',
      path: `/project/${router.query.name}/branches/${branchName}/backups`,
      disabled: !isbuildActiveStatus || currentStage == 'Development' || !metaUrlsData?.enable_backup,
    },
    {
      label: 'Monitor',
      path: `/project/${router.query.name}/branches/${branchName}/monitor`,
      disabled: !isbuildActiveStatus && (metaUrlsData?.monitor_url == '' || metaUrlsData?.monitor_url == ''),
    },
    { label: 'Upgrade', path: `/project/${router.query.name}/branches/${branchName}/upgrade` },
    { label: 'Settings', path: `/project/${router.query.name}/branches/${branchName}/settings` },
  ];

  return (
    <>
      <div className="details-header-wrapper">
        <div className="branch-name d-flex justify-content-between align-items-center">
          {branchName?.toUpperCase()}

          <Button
            color="secondary"
            size="lg"
            className="btn connect"
            style={{ padding: '5px 10px' }}
            onClick={() => setOpenModal(true)}>
            Add Submodule
          </Button>
        </div>
        <div className="details-header-navbar w-100 d-flex gap-1">
          {nav_links?.map((link, i) => (
            <Link
              key={i}
              href={link.disabled ? '#' : link.path}
              className={`dh-nav-item btn btn-sm ${link.disabled ? 'disabled' : ''} ${
                link.path === router.asPath ? 'active' : link.path2 === router.asPath ? 'active' : ''
              }`}
              aria-disabled={link.disabled}>
              {link.label}
            </Link>
          ))}

          <Button
            size={'sm'}
            className="ms-auto dh-nav-item"
            icon={'CustomShare'}
            tag="a"
            isDisable={!isbuildActiveStatus || metaUrlsData?.shell_url == ''}
            href={metaUrlsData?.shell_url}
            target="_blank">
            Shell
          </Button>
          <Button
            size={'sm'}
            className="dh-nav-item"
            icon={'CustomShare'}
            tag="a"
            isDisable={!isbuildActiveStatus || metaUrlsData?.editor_url == ''}
            href={metaUrlsData?.editor_url}
            target="_blank">
            Editor
          </Button>
        </div>
      </div>
      <Formik
        initialValues={{
          repositoryUrl: '',
          path: '',
          branch: 1,
        }}
        enableReinitialize={true}
        onSubmit={(values) => {}}>
        {(formikProps: FormikProps<FormValues>) => (
          <AddSubmoduleModal
            values={formikProps.values}
            setFieldValue={formikProps.setFieldValue}
            resetForm={formikProps.resetForm}
            openModal={openModal}
            setOpenModal={setOpenModal}
          />
        )}
      </Formik>
    </>
  );
};

export default DetailsHeader;
