'use client';

import type { NextPage } from 'next';
import Head from 'next/head';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PageWrapper from '../../layout/PageWrapper/PageWrapper';
import { pageLayoutTypesPagesMenu } from '../../menu';
import { useEffect, useInsertionEffect, useState } from 'react';
import Spinner from '../../components/bootstrap/Spinner';
import { handleApiResponse } from '../../common/function/apiHelper/apiResponse';
import request from '../../common/lib/axios';
import { useSession } from 'next-auth/react';
import useBackendGitHubLoginApi from '../../hooks/useBackendGitHubLoginApi';
import ControlHeader from '../../views/Projects/ControlHeader';
import GridCard from '../../views/Projects/GridCard';
import ListCard from '../../views/Projects/ListCard';
import { useProjectContext } from '../../context/projectContext';
import { useMutation, useQueryClient } from 'react-query';
import { deleteProject } from '../../apis';

interface User {
  name: string;
  email: string;
  image: string;
  id: string;
}

const Index: NextPage = () => {
  const [projects, setProjects] = useState([]);
  const [layout, setLayout] = useState<string>('grid');
  const [search, setSearch] = useState<string>('');
  const [projectData, setProjectData] = useState<any>();
  const [isProjectFetching, setIsProjectFetching] = useState<boolean>(false);
  const { gitHubLoginApi } = useBackendGitHubLoginApi();
  const { data: session } = useSession();
  const { getProjectsCheck } = useProjectContext();
  const [isDeleteSuccess, setIsDeleteSucces] = useState(false);

  const mutation = useMutation(deleteProject, {
    onSuccess: () => {
      getProjects();
      setIsDeleteSucces(true);
    },
  });

  const handleDelete = (id: string | number) => {
    mutation.mutate(id);
  };

  const getProjects = async () => {
    setIsProjectFetching(true);
    try {
      const res = await request.get('/user/project/');
      setProjectData(res.data.data);
    } catch (error) {
      console.error('error', error);
    } finally {
      setIsProjectFetching(false);
    }
  };

  useEffect(() => {
    localStorage.removeItem('projectId');
    localStorage.removeItem('branchId');
  }, []);

  useEffect(() => {
    const lsBackendToken = localStorage.getItem('backendToken');
    if (lsBackendToken) {
      getProjects();
    }
  }, [getProjectsCheck]);

  useEffect(() => {
    const fetchData = async () => {
      if (session && 'accessToken' in session && session.accessToken && session.user && session.user.email) {
        let { accessToken, user } = session;
        let { email, name, image } = user;
        {
          name && localStorage.setItem('userName', name);
        }
        {
          image && localStorage.setItem('userImage', image);
        }
        {
          email && localStorage.setItem('userEmail', email);
        }
        gitHubLoginApi(accessToken, email).then(() => {
          getProjects();
        });
      }
    };
    const lsBackendToken = localStorage.getItem('backendToken');
    if (!lsBackendToken && session) {
      fetchData();
    } 
  }, [session]);

  useEffect(() => {
    if (projectData) {
      setProjects(projectData);
    }
  }, [projectData]);

  return (
    <PageWrapper>
      <Head>
        <title>{pageLayoutTypesPagesMenu?.project?.text}</title>
      </Head>
      <ToastContainer />
      <ControlHeader layout={layout} handleLayoutChange={setLayout} search={search} setSearch={setSearch} />
      <div className={`container projects-container pb-5 ${layout == 'list' ? 'projects-list-container' : ''}`}>
        <div className={`row g-4 ${layout == 'list' ? 'overflow-auto' : ''}`}>
          {projects?.length > 0 &&
            projects
              .filter((project: any) => (search ? project?.name?.toLowerCase()?.includes(search?.toLowerCase()) : true))
              .map((project: any, index: any) =>
                layout == 'grid' ? (
                  <div key={index} className="col col-md-6 col-lg-3">
                    <GridCard
                      id={project.id}
                      name={project?.project_name}
                      version={project?.odoo_branch}
                      status={project?.status}
                      location={project?.geo_location}
                      isTrialActive={project?.is_trial}
                      repoUrl={project?.repository_url}
                      collaborators={project?.collaborators}
                      handleDelete={handleDelete}
                      isDeleting={mutation.isLoading}
                      isDeleteSuccess={isDeleteSuccess}
                    />
                  </div>
                ) : (
                  <div key={index} className="col-12">
                    <ListCard
                      id={project.id}
                      name={project?.project_name}
                      version={project?.odoo_branch}
                      status={project?.status}
                      location={project?.geo_location}
                      isTrialActive={project?.is_trial}
                      repoUrl={project?.repository_url}
                      collaborators={project?.collaborators}
                      handleDelete={handleDelete}
                      isDeleting={mutation.isLoading}
                      isDeleteSuccess={isDeleteSuccess}
                    />
                  </div>
                ),
              )}

          {isProjectFetching && (
            <div className="d-flex align-items-center justify-content-center">
              <Spinner tag="span" color="primary" size={'3rem'} />
            </div>
          )}
        </div>
      </div>
    </PageWrapper>
  );
};

export default Index;
