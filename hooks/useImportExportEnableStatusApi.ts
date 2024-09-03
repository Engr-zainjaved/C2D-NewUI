import { useState } from 'react';
import request from '../common/lib/axios';
import { useProjectContext } from '../context/projectContext';

interface DeploymentConfig {
  active_backup_count: number;
  enable_backup: boolean;
  active_import_count: number;
  active_restore_count: number;
  enable_restore_and_import: boolean;
  shell_url: string;
  editor_url: string;
  monitor_url: string;
  db_monitor_url: string;
}

const useImportExportEnableStatusApi = () => {
  const [isLoadingImportExportEnableStatusApi, setIsLoadingImportExportEnableStatusApi] = useState(false);
  const [isEnableImportExport, setIsEnableImportExport] = useState(false);
  const [metaUrls, setMetaUrls] = useState<DeploymentConfig>();
  const { setMonitorUrl, setDbMonitorUrl, setMetaUrlsData } = useProjectContext();

  const importExportEnableStatusApi = (projectId: number, branchId: number, cb?: any) => {
    setIsLoadingImportExportEnableStatusApi(true);

    const apiUrl = `/user/project/${projectId}/branches/${branchId}/meta`;

    request
      .get(apiUrl)
      .then((response) => {
        setIsEnableImportExport(response.data.enable_restore_and_import);
        cb && cb(response.data);
        setMonitorUrl(response.data.monitor_url);
        setDbMonitorUrl(response.data.db_monitor_url);
        setMetaUrlsData(response.data);
        setMetaUrls(response.data);
      })
      .finally(() => {
        setIsLoadingImportExportEnableStatusApi(false);
      });
  };
  return {
    isEnableImportExport,
    importExportEnableStatusApi,
    isLoadingImportExportEnableStatusApi,
    metaUrls,
  };
};

export default useImportExportEnableStatusApi;
