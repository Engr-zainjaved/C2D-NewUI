import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { getProjectTracking } from '../../../apis';
import { useProjectContext } from '../../../context/projectContext';
import HistoryWrapper, { HistoryItem, HistoryItemStage } from '../../../views/Projects/Details/History';
import Layout from '../../../views/Projects/Details/Layout';
import request from '../../../common/lib/axios';
import useImportExportEnableStatusApi from '../../../hooks/useImportExportEnableStatusApi';
import useWebSocket from '../../../hooks/useWebSocket';
import { handleWebSocketResponse } from '../../../common/function/apiHelper/webSocketResponse';
import { toast } from 'react-toastify';
import Button from '../../../components/bootstrap/Button';
import { updateAllBranches, updateStatus } from '../../../common/function/utilities';

interface ApiData {
  [key: string]: {
    branches: {
      id: number;
      name: string;
      url: string | null;
      status: string;
    }[];
    id: number;
  };
}

const ProjectDetail = () => {
  const initalState = {
    Production: { branches: [], id: 0 },
    Staging: { branches: [], id: 0 },
    Development: { branches: [], id: 0 },
  };

  const { importExportEnableStatusApi } = useImportExportEnableStatusApi();
  const {
    branchName,
    websocketRealTimeData,
    projectData,
    setProjectData,
    setWebsocketRealTimeData,
    branchData,
    setBranchData,
  } = useProjectContext();
  const { webSocketData } = useWebSocket();
  const [lastBranchId, setLastBranchId] = useState(null);

  let projectId: any, branchId: any;

  try {
    projectId = localStorage.getItem('projectId');
    branchId = localStorage.getItem('branchId');
  } catch (error) {
    console.error('error in localStorage', error);
  }

  useEffect(() => {
    if (projectId && branchId) {
      importExportEnableStatusApi(projectId, branchId);
    }
  }, [projectId, branchId, branchName]);

  function updateBranchOnWebSocketData(webSocketData: any, currentBranches: any) {
    const { type } = webSocketData;
    if (type === 'branch_added' && currentBranches !== initalState) {
      const { branch, tracking } = webSocketData;
      const { id, name, stage } = branch;
      const { build } = tracking;
      const newBranchObject = {
        id: id,
        name: name,
        active: build?.is_active,
        build: build,
        version: '',
      };

      // Check if the branch already exists in the current branches state
      const existingBranch = currentBranches[stage.name]?.branches.find((branch: any) => branch.id === id);

      if (!existingBranch && currentBranches !== initalState) {
        // Update the state by creating a new object (immutable update)
        setBranchData((prevBranches: any) => ({
          ...prevBranches,
          [stage.name]: {
            ...prevBranches[stage.name],
            branches: [...(prevBranches[stage.name]?.branches || []), newBranchObject],
          },
        }));
      }
    } else if (type === 'branch_deleted' && currentBranches !== initalState) {
      const { id, stage } = webSocketData.data;

      // Update the state by removing the branch with the specified id
      setBranchData((prevBranches: any) => ({
        ...prevBranches,
        [stage?.name]: {
          ...prevBranches[stage?.name],
          branches: prevBranches[stage?.name]?.branches?.filter((branch: any) => branch?.id !== id),
        },
      }));
    }
  }

  function updateSideBarBranchStatus(webSocketBranchUpdateData: any, currentBranches: any) {
    const { type } = webSocketData;

    if (type === 'branch_updated') {
      const { branch_id, tracking } = webSocketBranchUpdateData;
      let branchIdToUpdate = branch_id;
      let buildObject = tracking.build;
      const updatedCurrentBranches = updateAllBranches(branchIdToUpdate, buildObject, currentBranches);
      setBranchData(updatedCurrentBranches);
    }

    if (
      type === 'build_succeed' ||
      type === 'build_failed' ||
      type === 'build_dropped' ||
      type === 'build_event' ||
      type === 'backup_failed'
    ) {
      const { branch_id, build } = webSocketBranchUpdateData;
      let branchIdToUpdate = branch_id;
      let buildObject = build;
      const updatedCurrentBranches = updateAllBranches(branchIdToUpdate, buildObject, currentBranches);
      setBranchData(updatedCurrentBranches);
    }
  }

  useEffect(() => {
    if (projectData && projectData.length > 0) {
      const updatedApiData = updateStatus(projectData, websocketRealTimeData, branchId);
      setProjectData(updatedApiData);
    }
  }, [websocketRealTimeData]);

  useEffect(() => {
    if (webSocketData) {
      const eventType = webSocketData.type;
      const eventMessage = webSocketData.message;

      updateSideBarBranchStatus(webSocketData, branchData);
      setWebsocketRealTimeData(webSocketData);

      if (webSocketData.project_id == projectId) {
        handleWebSocketResponse(webSocketData);
      }

      if (
        (eventType === 'branch_added' || eventType === 'branch_deleted') &&
        webSocketData.branch_id !== lastBranchId
      ) {
        updateBranchOnWebSocketData(webSocketData, branchData);
        setLastBranchId(webSocketData.branch_id);
      }

      if (eventType === 'download_ready' && webSocketData.project_id == projectId) {
        const url = webSocketData.download_url;
        toast.success(
          <>
            {eventMessage}
            <br />
            <Button color="success" onClick={() => window.open(url, '_blank')}>
              Download
            </Button>
          </>,
          { autoClose: false, closeOnClick: false, draggable: false },
        );
      }
    }
  }, [webSocketData]);

  return (
    <HistoryWrapper>
      {projectData &&
        projectData.length > 0 &&
        projectData.map((item: any, index: any) => {
          if (item.build?.status === 'success' && item.build?.id) {
            localStorage.setItem('buildId', item.build.id as string);
          }
          return item.source_stage !== null ? (
            <HistoryItemStage key={index} item={item} />
          ) : (
            <HistoryItem key={index} item={item} />
          );
        })}
    </HistoryWrapper>
  );
};

export default ProjectDetail;
