import request from '../common/lib/axios';
import { ICreateBranch, IDeployProjectPayload } from '../type/common-interface';

export const getRepositories = async () => {
  const res = await request.get('/user/repository/');
  return res.data.data;
};

export const getProjects = async () => {
  const res = await request.get('/user/project/');
  return res.data.data;
};

export const deployProject = async (payload: IDeployProjectPayload) => {
  const res = await request.post('/user/project/', payload);
  return res;
};

export const getProjectBranches = async (projectId: string| number) => {
  const res = await request.get(`/user/project/${projectId}/branches/`);
  return { data: res.data.data, message: res.data.message };
};

export const getProjectTracking = async (projectId: string | null | undefined, branchId: string | null | undefined) => {
  if (projectId && branchId) {
    const res = await request.get(`/user/project/${projectId}/branches/${branchId}/tracking/`);
    return res.data;
  }
};

export const createBranch = async (projectId: string, payload: ICreateBranch) => {
  const res = await request.post(`/user/project/${projectId}/branches/`, payload);
  return res;
};

export const getBranchBackup = async (projectId: string, branchId: string) => {
  const apiUrl = `/user/project/${projectId}/branches/${branchId}/backups/`;
  const response = await request.get(apiUrl);
  return response.data.data;
};

export const deleteBranchBackup = async (projectId: string, branchId: string, backupId: number) => {
  const apiUrl = `/user/project/${projectId}/branches/${branchId}/backups/${backupId}`;
  const response = await request.delete(apiUrl);
  return response;
};

export const deleteProject = async (projectId: string | number) => {
  await request.delete(`/user/project/${projectId}`);
};
