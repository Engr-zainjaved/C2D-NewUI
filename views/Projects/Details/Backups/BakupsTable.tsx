import React, { useEffect, useState } from 'react';
import Button from '../../../../components/bootstrap/Button';
import RestoreBackup from './comps/RestoreBackup';
import DownloadBackup from './comps/DownloadBackup';
import { getBranchBackup } from '../../../../apis';
import { useQuery } from 'react-query';
import DeleteBackup from './comps/DeleteBackup';
import request from '../../../../common/lib/axios';
import Spinner from '../../../../components/bootstrap/Spinner';
import { useRouter } from 'next/router';
import { useProjectContext } from '../../../../context/projectContext';
import useImportExportEnableStatusApi from '../../../../hooks/useImportExportEnableStatusApi';
import Popovers from '../../../../components/bootstrap/Popovers';
import Icon from '../../../../components/icon/Icon';
import { handleWebSocketResponse } from '../../../../common/function/apiHelper/webSocketResponse';
import useWebSocket from '../../../../hooks/useWebSocket';

const BakupsTable = () => {
  const [openRestore, setOpenRestore] = useState<any>(false);
  const [openDownload, setOpenDownload] = useState<boolean>(false);
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [backupId, setBackupId] = useState<any>();
  const [branchRestoreList, setBranchRestoreList] = useState();
  const [isModalLoading, setIsModalLoading] = useState(false);
  const router = useRouter();
  const { websocketRealTimeData, branchBackupList, setBranchBackupList } = useProjectContext();
  const { importExportEnableStatusApi, isEnableImportExport } = useImportExportEnableStatusApi();
  const { name: projectName, branchName } = router.query;
  let branchId: any, projectId: any;

  try {
    branchId = localStorage.getItem('branchId');
    projectId = localStorage.getItem('projectId');
  } catch (error) {
    console.error('error', error);
  }

  const getProjectBranches = async () => {
    const res = await request.get(`/user/project/${projectId}/branches/`);
    setBranchRestoreList(res.data.data);
  };

  const handleRestoreClick = async (backupId: number) => {
    setBackupId(backupId);
    setIsModalLoading(true);
    getProjectBranches()
      .then(() => {
        setOpenRestore(true);
      })
      .finally(() => {
        setIsModalLoading(false);
      });
  };

  const handleDownloadClick = (backupId: number) => {
    setBackupId(backupId);
    setOpenDownload(true);
  };

  function formatFileSize(bytes: number): string {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 Byte';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return (bytes / Math.pow(1024, i)).toFixed(2) + ' ' + sizes[i];
  }

  const updateBranchStatus = (updatedItem: any) => {
    setBranchBackupList((prevList: any) => {
      return prevList?.map((item: any) => {
        if (item.id === updatedItem.backup_id) {
          return {
            ...item,
            status: updatedItem.type,
            file_size: updatedItem.object.file_size,
          };
        } else {
          return item;
        }
      });
    });
  };
  const { webSocketData } = useWebSocket();

  useEffect(() => {
    if (webSocketData) {
      updateBranchStatus(webSocketData);
      handleWebSocketResponse(webSocketData);
    }
    if (projectId && branchId) {
      importExportEnableStatusApi(projectId, branchId);
    }
  }, [webSocketData]);

  useEffect(() => {
    getBranchBackup();
  }, []);

  const getBranchBackup = async () => {
    const apiUrl = `/user/project/${projectId}/branches/${branchId}/backups/`;
    const response = await request.get(apiUrl);
    setBranchBackupList(response.data.data);
  };

  const handleDelete = (id: number) => {
    setOpenDelete(true);
    setBackupId(id);
  };

  const chipColor = (type: string) => {
    switch (type) {
      case 'Automatic backup before Import':
        return 'pending';
      case 'Automatic Daily Backup':
        return 'success';
      case 'Test Comment Backup':
        return 'error';
      case 'Manual Backup':
        return 'info';
      default:
        return '';
    }
  };

  return (
    <>
      <table className="backups-table">
        <thead>
          <tr>
            <th style={{ width: '15%' }}>Time (UTC)</th>
            <th style={{ width: '10%' }}>Revision</th>
            <th style={{ width: '20%' }}>Comment</th>
            <th style={{ width: '20%' }}>Database name</th>
            <th style={{ width: '15%' }}>Branch</th>
            <th style={{ width: '10%' }}>Size</th>
            <th style={{ width: '10%' }}>Version</th>
            <th style={{ width: '10%' }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {branchBackupList.length > 0 &&
            branchBackupList.map((item: any) => (
              <tr key={`${item.branch?.id}-${item.revision}-${item.date_created}`}>
                <td>{new Date(item.date_created).toLocaleString()}</td>
                <td className="revision">{item.revision.slice(0, 7)}</td>
                <td>
                  <div className={`chip rounded-pill ${chipColor(item.comment)}`}>{item.comment}</div>
                </td>
                <td>{item.db_name}</td>
                <td>{item.branch.name}</td>
                <td>{formatFileSize(item.file_size)}</td>
                <td>{item.version}</td>
                <td colSpan={3} className="actions">
                  <div className="d-flex justify-content-end gap-3">
                    <Button
                      color="primary"
                      className="c2d-btn d-flex flex-row justify-content-center align-items-center"
                      icon="CustomRestore"
                      onClick={() => handleRestoreClick(item.id)}>
                      <div>
                        <span className="d-flex align-items-center justify-content-center mb-0 ">
                          Restore
                          {isModalLoading && <Spinner color="info" size="sm" className="ml-2 ms-2" />}
                        </span>
                      </div>
                    </Button>
                    <Button
                      color="primary"
                      className="c2d-btn"
                      icon="CustomDownload"
                      onClick={() => handleDownloadClick(item.id)}>
                      Download
                    </Button>
                    <Button color="danger" className="c2d-btn" icon="Delete" onClick={() => handleDelete(item.id)} />
                  </div>
                </td>
                <td style={{ textAlign: 'center' }}>
                  <div className="d-flex align-items-center">
                    {item?.status == 'in_progress'
                      ? 'In Progress'
                      : item?.status == 'success'
                      ? 'Success'
                      : item?.status == 'backup_failed'
                      ? 'Failed'
                      : item?.status == 'backup_succeed'
                      ? 'Success'
                      : item.status}
                    {item?.error_message && (
                      <Popovers desc={item?.error_message} trigger="hover">
                        <Icon icon="Assistant" className="h5 m-2 text-danger" />
                      </Popovers>
                    )}
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      <DownloadBackup
        open={openDownload}
        setOpen={setOpenDownload}
        projectId={projectId}
        branchId={branchId}
        backupId={backupId}
      />
      <RestoreBackup
        open={openRestore}
        setOpen={setOpenRestore}
        projectId={projectId}
        branchId={branchId}
        backupId={backupId}
        branchName={branchName}
        projectName={projectName}
        branchRestoreList={branchRestoreList}
      />
      <DeleteBackup open={openDelete} setOpen={setOpenDelete} backupId={backupId} />
    </>
  );
};

export default BakupsTable;
