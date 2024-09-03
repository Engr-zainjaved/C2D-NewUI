import React, { useState } from 'react';
import Head from 'next/head';
import PageWrapper from '../../layout/PageWrapper/PageWrapper';
import { pageLayoutTypesPagesMenu } from '../../menu';
import ProfileSettings from '../../views/ProfileSettings';
import Input from '../../components/bootstrap/forms/Input';
import InputGroup, { InputGroupText } from '../../components/bootstrap/forms/InputGroup';
import Select from '../../components/bootstrap/forms/Select';
import Option from '../../components/bootstrap/Option';
import Avatar from '../../components/Avatar';
import Icon from '../../components/icon/Icon';
import Checks from '../../components/bootstrap/forms/Checks';
import Button from '../../components/bootstrap/Button';
import Billings from '../../views/ProfileSettings/Billings';

const ProfileSettingsPage = () => {
  let userName, userImage, userEmail;

  try {
    userName = localStorage.getItem('userName');
    userImage = localStorage.getItem('userImage');
    userEmail = localStorage.getItem('userEmail');
  } catch (error) {
    console.error('error', error);
  }

  const [publicAccess, setPublicAccess] = React.useState(false);
  const [activePage, setActivePage] = React.useState('profile');
  const [profileUserName, setProfileUserName] = useState(userName);
  const [profileUserEmail, setProfileUserEmail] = useState(userEmail);

  const handleProfileUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileUserName(e.target.value);
  };

  const handleProfileEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileUserEmail(e.target.value);
  };

  return (
    <PageWrapper>
      <Head>
        <title>{pageLayoutTypesPagesMenu?.profileSettings?.text}</title>
      </Head>
      <ProfileSettings tabs={<Tabs activePage={activePage} setActivePage={setActivePage} />}>
        {activePage === 'profile' ? (
          <div className="row g-3 pt-4">
            <div className="col-12 col-md-3">
              <div className="profile-picture-wrapper">
                <Avatar src={userImage ? userImage : ''} className="profile-photo" />
                <button className="profile-action">
                  <div className="icon">
                    <Icon icon={'CustomEdit'} />
                  </div>
                  Change photo
                </button>
              </div>
            </div>
            <div className="col-12 col-md-9">
              <div className="c2d-form c2d-light-form">
                <div className="row gy-4">
                  <div className="col-12">
                    <label className="form-label">Username</label>
                    <Input size="lg" value={profileUserName ? profileUserName : ''} onChange={handleProfileUserName} />
                  </div>

                  <div className="col-12">
                    <label className="form-label">Email</label>
                    <Input
                      size="lg"
                      type="email"
                      value={profileUserEmail ? profileUserEmail : ''}
                      onChange={handleProfileEmail}
                    />
                  </div>

                  <div className="col-12">
                    <h4 className="form-control-heading mt-4">Notification preferences</h4>
                    <p className="form-control-sublabel">Send notification by mail for levels including and above</p>
                    <Select ariaLabel="notification-selection" size="lg">
                      <Option value={'option 1'}>Option 1</Option>
                      <Option value={'option 2'}>Option 2</Option>
                    </Select>
                  </div>

                  <div className="col-12">
                    <h4 className="form-control-heading mt-4">Changelog</h4>
                    <div className="mt-4 mb-3">
                      <Checks
                        type="checkbox"
                        label="Allow public access"
                        id="public-access"
                        onChange={(e: any) => setPublicAccess(e.target.checked)}
                        checked={publicAccess}
                        className="accessCheck"
                      />
                    </div>
                  </div>

                  <div className="col-12">
                    <h4 className="form-control-heading mt-4 mb-3 d-flex align-items-center gap-3">
                      SSH Keys
                      <div className="info d-flex align-items-center gap-1">
                        <Icon icon="CustomInfo" />
                        We only suppert ssh-rsa and ssh-ed25519keys
                      </div>
                    </h4>
                    <label className="form-label">Notification preferences</label>
                    <div className="action-btn d-flex align-items-center justify-content-end w-100 gap-2">
                      <Icon icon="CustomArrowIn" />
                      Import from GitHub
                    </div>
                  </div>

                  <div className="col-12">
                    <label className="form-label">Add a key manually</label>
                    <InputGroup className="c2d-input-group second-field">
                      <Input placeholder="ssh-rsa <data> <name>" />
                      <InputGroupText style={{ minWidth: 120 }}>Add</InputGroupText>
                    </InputGroup>
                    <p className="form-control-info">
                      {'After adding your public key connect to your builds with:ssh <build_id>@<domain>.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
        {activePage === 'billings' ? <Billings /> : null}
      </ProfileSettings>
    </PageWrapper>
  );
};

export default ProfileSettingsPage;

const Tabs = ({ activePage, setActivePage }: any) => {
  return (
    <div className="d-flex gap-2">
      <Button
        size={'sm'}
        className={`header-btn ${activePage === 'profile' && 'active'}`}
        onClick={() => setActivePage('profile')}>
        My Profile
      </Button>
      <Button
        size={'sm'}
        className={`header-btn ${activePage === 'billings' && 'active'}`}
        onClick={() => setActivePage('billings')}>
        Billings
      </Button>
    </div>
  );
};
