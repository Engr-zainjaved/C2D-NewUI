import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../../../assets/landing-page/main-logo.svg';
import Search from './comps/Search';
import UserAccount from './comps/UserAccount';
import Environment from './comps/Environment';
import { useQuery, useQueryClient } from 'react-query';
import { getProjectBranches } from '../../../apis';
import Placeholder from './Settings/Placeholder';
import request from '../../../common/lib/axios';
import { useProjectContext } from '../../../context/projectContext';
import { findEnvironment } from '../../../common/function/branchBelongToWhichStage';
import { useRouter } from 'next/router';
import { handleApiResponse } from '../../../common/function/apiHelper/apiResponse';
import { toast } from 'react-toastify';
import { getProjects } from '../../../apis';
import Id from '../../../pages/appointment/employee/[id]';

// interface Branches {
//   id: number;
//   name: string;
// }

const Sidebar = React.memo(() => {
  let projectId: any;
  let branchId: any;
  let stage;

  const queryClient = useQueryClient();
  const { setProjectData, setBranchData, branchData } = useProjectContext();
  const [search, setSearch] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [allBranches, setAllBranches] = useState<any>([]);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [selectedBranchId, setSelectedBranchId] = useState<number | null>(null);
  const [selectedBranch, setSelectedBranch] = useState<number | null>(null);
  const { setBranchName } = useProjectContext();

  const route = useRouter();

  try {
    projectId = localStorage.getItem('projectId');
    branchId = localStorage.getItem('branchId');
  } catch (error) {
    console.error('error in localStorage', error);
  }

  const getProjectBranches = async () => {
    const res = await request.get(`/user/project/${projectId}/branches/`);
    setBranchData(res.data.data);
    setErrorMessage(res.data.message);
  };

  useEffect(() => {
    getProjectBranches();
    
  }, []);

  const getProjectTracking = async (id: any) => {
    const apiUrl = `/user/project/${projectId}/branches/${id}/tracking/`;
    const response = await request.get(apiUrl);
    setProjectData(response.data.data);
    
  };

  useEffect(() => {
    if (branchData) {
      const branches: any[] = [];
      Object.values(branchData).forEach((env: any) => {
        if (env.branches) {
          env.branches.forEach((branch: any) => {
            branches.push(branch);
          });
        }
      });
      setAllBranches(branches);

      if (branches.length > 0 && isInitialLoad) {
        localStorage.setItem('branchId', branches[0].id.toString());
        const stage = findEnvironment(branches[0].id, branchData);
        if (stage) {
          localStorage.setItem('currentStage', stage);
        }
        setSelectedBranch(branches[0].id);
        setSelectedBranchId(branches[0].id);
        setBranchName(branches[0].name);
        getProjectTracking(branches[0].id);
        setIsInitialLoad(false);
      } else if (branches.length == 0) {
        route.push('/project');
        toast.error(errorMessage, { autoClose: 5000, theme: 'colored' });
      }
    }
  }, [branchData]);

  const handleBranchCreated = () => {
    
    getProjectBranches();
    
    
    
  };

  const filterBranchesByEnvironment = (branches: any[]) => {
    
    return branches && branches.filter((branch) => branch.name.toLowerCase().includes(search.toLowerCase()));
    
    
  };

  const handleBranchSelect = (id: number) => {
    setSelectedBranchId(id);
    localStorage.setItem('branchId', id.toString());
    stage = findEnvironment(id, branchData);
    if (stage) {
      localStorage.setItem('currentStage', stage);
    
    }
    
  };

  return (
    <div className="details-sidebar">
      <Link href={'/project'} className="main-logo">
        <Image src={logo} alt="C2D Logo" width={262} height={34} className="logo" />
      </Link>
      <Search search={search} setSearch={setSearch} />
      <div className="environments-wrapper">
        {false ? (
          <div>
            <Placeholder />
            <Placeholder />
            <Placeholder />
          </div>
        ) : (
          branchData &&
          Object.keys(branchData).map((key: string, i: number) => (
            <Environment
              key={branchData[key].id}
              label={key}
              forkable={i > 0}
              branches={filterBranchesByEnvironment(branchData[key]?.branches)}
              envId={branchData[key]?.id}
              allBranches={allBranches}
              isInitialLoad={isInitialLoad}
              projectId={projectId}
              onBranchCreated={handleBranchCreated}
              selectedBranchId={selectedBranchId}
              setSelectedBranchId={setSelectedBranchId}
              onBranchSelect={handleBranchSelect}
              selectedBranch={selectedBranch}
              setSelectedBranch={setSelectedBranch}
            />
          ))
        )}
      </div>

      {/* User Account */}
      <UserAccount />
    </div>
  );
});

export default Sidebar;
