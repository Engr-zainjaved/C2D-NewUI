import React, { Dispatch, useState, SetStateAction, useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Link from 'next/link';
import C2DModal from '../../components/Modal';
import Button from '../../../components/bootstrap/Button';
import Icon from '../../../components/icon/Icon';
import Input from '../../../components/bootstrap/forms/Input';
import Select from '../../../components/bootstrap/forms/Select';
import Option from '../../../components/bootstrap/Option';
import { handleApiSuccess } from '../../../common/function/apiHelper/apiSuccess';
import { deployProject, getRepositories } from '../../../apis';
import { useMutation, useQuery } from 'react-query';
import { IDeployProjectPayload } from '../../../type/common-interface';
import Spinner from '../../../components/bootstrap/Spinner';
import { useProjectContext } from '../../../context/projectContext';

interface Props {
  isOpenModal: boolean;
  setIsOpenModal: Dispatch<SetStateAction<boolean>>;
}

interface Repository {
  name: string;
}

const CreateNewModal: React.FC<Props> = ({ isOpenModal, setIsOpenModal }) => {
  const [repoType, setRepoType] = useState<string>('new');
  const [showCode, setShowCode] = useState<boolean>(false);
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [selectedRepo, setSelectedRepo] = useState<string>('');
  const { setGetProjectsCheck } = useProjectContext();
  const mutation = useMutation(deployProject);

  const { data } = useQuery('get-repositories', getRepositories, {
    enabled: repoType === 'existing',
  });

  const handleDeployProject = (payload: IDeployProjectPayload) => {
    mutation.mutate(payload, {
      onSuccess: (data) => {
        setGetProjectsCheck((prevState: any) => !prevState);
        handleApiSuccess(data);
        setIsOpenModal(false);
      },
      onError: (error) => {
        console.error('Error deploying project:', error);
        setIsOpenModal(false);
      },
    });
  };

  useEffect(() => {
    if (data && !data.error) {
      setRepositories(data);
      if (data.length > 0) {
        setSelectedRepo(data[0].name);
      }
    }
  }, [data]);

  const validationSchema = Yup.object({
    organization: Yup.string().required('Required'),
    repository: Yup.string().required('Required'),
    version: Yup.number().required('Required'),
    hosting_location: Yup.string().required('Required'),
  });

  let userName: any;
  try {
    userName = localStorage.getItem('userName');
  } catch (error) {
    console.error('Error accessing localStorage:', error);
  }

  return (
    <C2DModal open={isOpenModal} setOpen={setIsOpenModal} title="Deploy Your Platform">
      <Formik
        initialValues={{
          organization: 'C2D',
          repository: repoType === 'new' ? '' : selectedRepo,
          subscriptionCode: '',
          version: 17,
          hosting_location: 'am',
        }}
        validationSchema={validationSchema}
        enableReinitialize={true}
        onSubmit={(values) => {
          let payload;
          if (repoType === 'new') {
            payload = {
              existing_repo: false,
              repository_name: values.repository,
              odoo_version: Number(values.version),
              hosting_location: values.hosting_location.toLowerCase(),
            };
          } else {
            payload = {
              existing_repo: true,
              github_repo_name: values.repository,
              odoo_version: Number(values.version),
              hosting_location: values.hosting_location.toLowerCase(),
            };
          }
          handleDeployProject(payload);
        }}>
        {({ setFieldValue }) => (
          <Form className="c2d-form">
            <div className="row">
              <div className="col mb-4">
                <label className="form-label">
                  <Icon icon="CustomInfo" />
                  GitHub Repository
                  <div className="ms-auto d-flex gap-3">
                    <input
                      type="radio"
                      name="repoType"
                      id="repo-new"
                      value="new"
                      onChange={(e: any) => setRepoType(e.target.value)}
                      checked={repoType === 'new'}
                    />
                    <label htmlFor="repo-new">New</label>
                    <input
                      type="radio"
                      name="repoType"
                      id="repo-existing"
                      value="existing"
                      onChange={(e: any) => setRepoType(e.target.value)}
                      checked={repoType === 'existing'}
                    />
                    <label htmlFor="repo-existing">Existing</label>
                  </div>
                </label>
                <div className="combined-fields">
                  <div className="first-field text-truncate">{userName}</div>

                  <ErrorMessage name="organization" component="div" className="form-error text-danger" />
                  {repoType === 'new' ? (
                    <>
                      <Field as={Input} name="repository" className="second-field" size="lg" />
                      <ErrorMessage name="repository" component="div" className="form-error text-danger" />
                    </>
                  ) : (
                    <>
                      <Field
                        as={Select}
                        name="repository"
                        className="second-field"
                        ariaLabel="repo-selection"
                        size="lg"
                        value={selectedRepo}
                        onChange={(e: any) => {
                          setSelectedRepo(e.target.value);
                          setFieldValue('repository', e.target.value);
                        }}>
                        {repositories.map((repo) => (
                          <Option key={repo.name} value={repo.name}>
                            {repo.name}
                          </Option>
                        ))}
                      </Field>
                      <ErrorMessage name="repository" component="div" className="form-error text-danger" />
                    </>
                  )}
                </div>
                <div className="mt-2 text-end">
                  <Link className="form-link" href={'#'}>
                    Can’t see your organization or repository?
                  </Link>
                </div>
              </div>
              <div className="col col-lg-8">
                <label className="form-label">
                  <Icon icon="CustomInfo" />
                  Subscription code
                </label>
                <div className="input-adornment">
                  <Field
                    as={Input}
                    name="subscriptionCode"
                    size="lg"
                    type={showCode ? 'text' : 'password'}
                    placeholder="e.g, M17100123456"
                  />
                  <div className="adornment-icon" onClick={() => setShowCode(!showCode)}>
                    {showCode ? <Icon icon="CustomEyeOff" /> : <Icon icon="CustomEye" />}
                  </div>
                </div>
                <ErrorMessage name="subscriptionCode" component="div" className="form-error text-danger" />
              </div>
              <div className="col col-lg-4">
                <label className="form-label">Odoo Version</label>
                <Field as={Select} name="version" ariaLabel="version-selection" size="lg">
                  <Option value={13}>13</Option>
                  <Option value={14}>14</Option>
                  <Option value={15}>15</Option>
                  <Option value={16}>16</Option>
                  <Option value={17}>17</Option>
                </Field>
                <ErrorMessage name="version" component="div" className="form-error text-danger" />
              </div>
              <div className="col-12 mb-4">
                <div className="mt-2 text-end">
                  <Link className="form-link" href={'#'}>
                    Don’t have a subscription code?
                  </Link>
                </div>
              </div>

              <div className="col-12 mb-5">
                <label className="form-label">
                  <Icon icon="CustomInfo" />
                  Hosting Location
                </label>
                <Field as={Select} name="hosting_location" ariaLabel="location-selection" size="lg">
                  <Option value={'am'}>America </Option>
                  <Option value={'eu'}>Europe - Africa </Option>
                  <Option value={'me'}>Middle East - Southern Asia</Option>
                  <Option value={'sa'}>South America </Option>
                  <Option value={'asia'}>Asia </Option>
                </Field>
                <ErrorMessage name="hosting_location" component="div" className="form-error text-danger" />
              </div>

              <div className="col-12 mb-3">
                <Button
                  type="submit"
                  color="primary"
                  size={'lg'}
                  className="c2d-btn w-100"
                  rounded={3}
                  isDisable={mutation.isLoading}>
                  <div className="d-flex align-items-center justify-content-center">
                    <span style={{ marginRight: '10px' }}>Deploy</span>
                    {mutation.isLoading && <Spinner tag="span" color="primary" size={'1em'} />}
                  </div>
                </Button>
              </div>

              <div className="col-12 mb-3">
                <div className="form-info-text text-center">
                  By clicking on deploy you accept our Terms of Service, Data Processing Agreement, Privacy Policy, GDPR
                  and Data Transfer Impact Assessment.
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </C2DModal>
  );
};

export default CreateNewModal;
