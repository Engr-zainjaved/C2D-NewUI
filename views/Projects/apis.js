import request from '../../common/lib/axios';

// Define getProjectBranches as a named export
export const getProjectBranches = async (projectId, setBranchData, setErrorMessage) => {
  try {
    const res = await request.get(`/user/project/${projectId}/branches/`);
    setBranchData(res.data.data);
    setErrorMessage(res.data.message);
  } catch (error) {
    console.error('Error fetching project branches:', error);
  }
};
