import React, { useState, useEffect } from 'react';
import Icon from '../../../../../components/icon/Icon';
import { useRouter } from 'next/router';
import Dropdown, { DropdownItem, DropdownMenu, DropdownToggle } from '../../../../../components/bootstrap/Dropdown';
import request from '../../../../../common/lib/axios';

const UserAccount = () => {
  const [state, setState] = useState(false);
  const [projectData, setProjectData] = useState<any>([]);
  const router = useRouter();
  const projectName = router?.query?.name;

  useEffect(() => {
    getProjects();
  }, []);

  const getProjects = async () => {
    const res = await request.get('/user/project/');
    setProjectData(res.data.data);
  };

  const handleProjectSelect = (name: string, id: any) => {
    router.push(`/project/${name}`);
    localStorage.setItem('projectId', id as string);
    setState(false);
  };

  return (
    <div className="user-account">
      <Icon
        icon="CustomSetting"
        size={'lg'}
        onClick={() => {
          router.push(`/project/${projectName}/settings`);
        }}
      />
      <div className="divider" />
      <Dropdown isOpen={state} setIsOpen={setState}>
        <DropdownToggle hasIcon={false}>
          <div className="info">
            <p>{projectName} </p>
            <small>({projectName})</small>
          </div>
        </DropdownToggle>

        <DropdownMenu>
          <DropdownItem isHeader>PROJECTS</DropdownItem>
          {projectData?.map((project: any) => (
            <DropdownItem key={project.id}>
              <div onClick={() => handleProjectSelect(project.name, project.id)}>
                <Icon icon="Send" /> {project.name}
              </div>
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default UserAccount;
