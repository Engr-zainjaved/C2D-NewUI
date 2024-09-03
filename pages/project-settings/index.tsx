import React from 'react';
import Head from 'next/head';
import PageWrapper from '../../layout/PageWrapper/PageWrapper';
import { pageLayoutTypesPagesMenu } from '../../menu';
import ProjectSettings from '../../views/ProjectSettings';
import Input from '../../components/bootstrap/forms/Input';
import InputGroup, { InputGroupText } from "../../components/bootstrap/forms/InputGroup";
import Select from '../../components/bootstrap/forms/Select';
import Option from '../../components/bootstrap/Option';
import Avatar from '../../components/Avatar';
import Icon from '../../components/icon/Icon';
import Button from '../../components/bootstrap/Button';
import Checks from '../../components/bootstrap/forms/Checks';
import Alert from '../../components/bootstrap/Alert';

const ProjectSettingsPage = () => {
  const [publicAccess, setPublicAccess] = React.useState(false);

  return (
    <PageWrapper>
      <Head>
        <title>{pageLayoutTypesPagesMenu?.projectSettings?.text}</title>
      </Head>
      <ProjectSettings>
        <div className="row gy-3">

          <div className="col-12">
            <h5 className="d-flex align-items-center gap-2 ps-h">
              <Icon icon="CustomGlob" />
              <b>Project Name</b>
            </h5>
          </div>

          <div className="col-12">
            <div className="c2d-combined-fields">
              <Select
                className='first-field c2d-select'
                ariaLabel='protocol-selection'
                value={'https://'}>
                <Option value={'https://'}>
                  https://
                </Option>
                <Option value={'www.'}>
                  www.
                </Option>
              </Select>
              <InputGroup className='c2d-input-group second-field'>
                <Input
                  placeholder="nomanjallal-c2d-playground"
                />
                <InputGroupText style={{ minWidth: 120 }}>.c2d.com</InputGroupText>
              </InputGroup>
            </div>
            <i className="form-control-info">This will change URLs for all future builds and for the production build.</i>
          </div>

          <div className="col-12">
            <div className="h-separator" />
          </div>

          <div className="col-12">
            <h5 className="d-flex align-items-center gap-2 ps-h">
              <Icon icon="CustomUsers" />
              <b>Collaborators</b>
            </h5>
          </div>

          <div className="col-12">
            <InputGroup className='c2d-input-group second-field'>
              <Input
                placeholder="GitHub username"
              />
              <InputGroupText style={{ minWidth: 120 }}>Add</InputGroupText>
            </InputGroup>
            <p className="form-control-info">Grand other GitHub users access to this project. User rights disable access to production<br />data and the settings. Push privileges on the repository are handled on GitHub.</p>
          </div>

          <div className="col-12">
            <div className="d-flex flex-column gap-3 mb-4">
              <div className="settings-user-wrapper d-flex align-items-center justify-content-between">
                <div className="github-user d-flex align-items-center">
                  <Avatar
                    src='https://img.freepik.com/free-photo/portrait-young-businessman-with-mustache-glasses-3d-rendering_1142-51509.jpg?size=338&ext=jpg&ga=GA1.1.2082370165.1716768000&semt=ais_user'
                    size={24}
                    className='profile-photo'
                  />
                  Noman Jaalal
                  <span>(Noman Jalal)</span>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <Select
                    className='c2d-select'
                    ariaLabel='role-selection'
                    value={'admin'}>
                    <Option value={'admin'}>
                      Admin
                    </Option>
                    <Option value={'owner'}>
                      Owner
                    </Option>
                  </Select>
                  <Button
                    color='danger'
                    icon='CustomTrash'
                    rounded={1}
                    shadow="none"
                    hoverShadow="none"
                    className='c2d-icon-btn'
                  />
                </div>
              </div>
              <div className="h-separator" style={{ marginBlock: 0 }} />
              <div className="settings-user-wrapper d-flex align-items-center justify-content-between">
                <div className="github-user d-flex align-items-center">
                  <Avatar
                    src='https://img.freepik.com/free-photo/portrait-young-businessman-with-mustache-glasses-3d-rendering_1142-51509.jpg?size=338&ext=jpg&ga=GA1.1.2082370165.1716768000&semt=ais_user'
                    size={24}
                    className='profile-photo'
                  />
                  Noman Jaalal
                  <span>(Noman Jalal)</span>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <Select
                    className='c2d-select'
                    ariaLabel='role-selection'
                    value={'admin'}>
                    <Option value={'admin'}>
                      Admin
                    </Option>
                    <Option value={'owner'}>
                      Owner
                    </Option>
                  </Select>
                  <Button
                    color='danger'
                    icon='CustomTrash'
                    rounded={1}
                    shadow="none"
                    hoverShadow="none"
                    className='c2d-icon-btn'
                  />
                </div>
              </div>
              <div className="h-separator" style={{ marginBlock: 0 }} />
            </div>
          </div>

          <div className="col-12">
            <div className="h-separator" />
          </div>

          <div className="col-12">
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <h5 className="d-flex align-items-center gap-2 ps-h">
                  <Icon icon="CustomLock" />
                  Public Access
                </h5>
                <p className="form-control-info">Expose the Builds page publicly, allowing<br />visitors to connect to your development builds.</p>
              </div>
              <Checks
                type='checkbox'
                label='Allow public access'
                id='public-access'
                onChange={(e: any) => setPublicAccess(e.target.checked)}
                checked={publicAccess}
                className="accessCheck"
              />
            </div>
          </div>

          <div className="col-12">
            <h5 className="d-flex align-items-center gap-2 ps-h mb-4">
              <Icon icon="CustomLifeBoy" />
              Submodules
            </h5>
            <Alert
              color='warning'
              isLight
              className='rounded-1'
            >
              <div className="d-flex alert-body flex-column">
                <p>These settings are required for <b>private repositories</b> only.<br /></p>
                <p className='m-0'>If you are looking for some instructions on how to set up your submodules, please <a href='#'>check out the documentation.</a></p>
              </div>
            </Alert>
            <p className="form-control-info">
              Enter the Git URL of your private submodule hereunder and click on Add.<br />Then copy the Public key and add it as a Deploy key in the repository settings of your Git hosting service.
            </p>
            <p className="form-control-info">
              You can read <a href='#'>our documentation</a> for more specific instructions.
            </p>
          </div>

          <div className="col-12">
            <InputGroup className='c2d-input-group second-field'>
              <Input
                placeholder="GitHub username"
              />
              <InputGroupText style={{ minWidth: 120 }}>Add</InputGroupText>
            </InputGroup>
          </div>

          <div className="col-12">
            <div className="h-separator" />
          </div>

          <div className="col-12">
            <h5 className="d-flex align-items-center gap-2 ps-h mb-4">
              <Icon icon="CustomLayers" />
              Production Data size
            </h5>
            <p className="form-control-info mb-4">No production database yet.</p>
            <Alert
              color='light'
              borderWidth={0}
              className='rounded-1'
            >
              <div className="d-flex gap-2 alert-body">
                Trial project builds are limited to 1 GB in storage.
              </div>
            </Alert>
          </div>

          <div className="col-12">
            <div className="h-separator" />
          </div>

          <div className="col-12 col-md-4">
            <h5 className="d-flex align-items-center gap-2 ps-h mb-3">
              <Icon icon="CustomClock" />
              Database Workers
            </h5>
            <p className="form-control-info">The database workers define how many concurrent requests can be handled simultaneously. It is necessary to have enough workers to serve all incoming requests as they arrive but having more doesn't speed up the requests' processing time.</p>
          </div>
          <div className="col-12 col-md-1" />

          <div className="col-12 col-md-7">
            <p className="form-control-info">
              As a general rule of thumb, you should allocate about 1 worker per 25 users and 1 worker for every 5000 daily visitors. However, this can vary considerably based on database usage, website characteristics, and code customizations.
            </p>
            <p className="form-control-info">
              The default shared hosting offer provides up to 8 workers, while the dedicated server offer increases this limit to 64 workers.
            </p>
            <div className="d-flex align-items-center justify-content-between mt-4 text-secondary">
              Database Workers

              <InputGroup className='c2d-input-group counts-input'>
                <Input
                  value={1}
                />
                <InputGroupText>Worker(s)</InputGroupText>
              </InputGroup>
            </div>
          </div>

          <div className="col-12">
            <div className="h-separator" />
          </div>

          <div className="col-12 col-md-4">
            <h5 className="d-flex align-items-center gap-2 ps-h mb-3">
              <Icon icon="CustomNotepad" />
              Workers settings
            </h5>
            <p className="form-control-info">
              In this section, you can configure specific settings for the C2D workers.
            </p>
            <p className="form-control-info">
              Warning: changing those settings could impact the performance positively or negatively. In case of issue, please try to reset to default settings before contacting the support.
            </p>
          </div>

          <div className="col-12 col-md-1" />

          <div className="col-12 col-md-7">
            <div className="d-flex align-items-center justify-content-between mt-4 text-secondary">
              <div>
                HTTP timeout <Icon icon='CustomInfo' />
              </div>
              <InputGroup className='c2d-input-group counts-input'>
                <Input
                  value={15}
                />
                <InputGroupText>Minute(s)</InputGroupText>
              </InputGroup>
            </div>
            <div className="h-separator my-4" />
            <div className="d-flex align-items-center justify-content-between mt-4 text-secondary">
              <div>
                Scheduled actions timeout <Icon icon='CustomInfo' />
              </div>
              <InputGroup className='c2d-input-group counts-input'>
                <Input
                  value={15}
                />
                <InputGroupText>Minute(s)</InputGroupText>
              </InputGroup>
            </div>
            <div className="h-separator my-4" />

            <div className="d-flex flex-row-reverse">
              <Button
                color="secondary"
                className="c2d-btn ml-auto"
                isDisable
                rounded={1}
              >
                Reset to default
              </Button>
            </div>
          </div>

          <div className="col-12">
            <div className="h-separator" />
          </div>

          <div className="col-12">
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <h5 className="d-flex align-items-center gap-2 ps-h">
                  <Icon icon="CustomBranch" />
                  Staging Branches
                </h5>
                <p className="form-control-info">Staging branches allow you to test and validate features<br />with production data.</p>
              </div>

              <div className="d-flex align-items-center justify-content-between mt-4 text-secondary gap-4">
                Staging Branches
                <InputGroup className='c2d-input-group counts-input ci-lg'>
                  <Input
                    value={1}
                  />
                  <InputGroupText>Staging branch(es)</InputGroupText>
                </InputGroup>
              </div>
            </div>
          </div>

          <div className="col-12">
            <div className="h-separator" />
          </div>

          <div className="col-12 col-md-5">
            <h5 className="d-flex align-items-center gap-2 ps-h">
              <Icon icon="CustomLayers" />
              Activation
            </h5>
            <p className="form-control-info">Odoo Enterprise codes with the Odoo.sh option are valid. Partnership codes activate the project for a trial, which allows a production branch for 30 days. After that it will be put back to the development stage automatically, and finally deleted after another 60days.</p>
          </div>

        </div>
      </ProjectSettings>
    </PageWrapper>
  )
}

export default ProjectSettingsPage
