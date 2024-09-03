import React, { useEffect, useRef, useState } from 'react';
import request from '../../../../../../common/lib/axios';
import Logs, { LogsHeader, LogsScrollar } from '../../../../../../views/Projects/Details/Logs';
import Layout from '../../../../../../views/Projects/Details/Layout';

const LogsPage = () => {
  const intervalId = useRef<NodeJS.Timeout | null>(null);
  const lineNoRef = useRef<number>(1);
  const [logs, setLogs] = useState<string[]>([]);
  let branchId: any;

  try {
    branchId = localStorage.getItem('branchId');
  } catch (error) {}

  const getOdooLogs = () => {
    if (!branchId) return;

    request
      .get(`/builds/${branchId}/odoo-logs?line_no=${lineNoRef.current}`)
      .then((response) => {
        setLogs((prevLogs) => [...prevLogs, ...response.data.data]);
        lineNoRef.current = response.data.line_no;
      })
      .catch((reason: any) => {
        setLogs([]);
        if (intervalId.current) clearInterval(intervalId.current);
      })
      .finally(() => {});
  };

  const getInstallLogs = () => {
    if (!branchId) return;
    setLogs([]);
    request
      .get(`/builds/${branchId}/install-logs`)
      .then((response) => {
        setLogs([]);
        setLogs(response.data.data);
      })
      .catch((reason: any) => {
        setLogs([]);
        if (intervalId.current) clearInterval(intervalId.current);
      })
      .finally(() => {});
  };

  const getBuildLogs = () => {
    if (!branchId) return;

    request
      .get(`/builds/build-logs/${branchId}`)
      .then((response) => {
        setLogs([]);
        setLogs(response.data.data);
      })
      .catch((reason: any) => {
        setLogs([]);
        if (intervalId.current) clearInterval(intervalId.current);
      })
      .finally(() => {});
  };

  const getAppLogs = () => {
    if (!branchId) return;

    request
      .get(`/builds/app-logs/${branchId}`)
      .then((response) => {
        setLogs([]);
        setLogs(response.data.data);
      })
      .catch((reason: any) => {
        setLogs([]);
        if (intervalId.current) clearInterval(intervalId.current);
      })
      .finally(() => {});
  };

  const handleLogTypeChange = (event: any) => {
    const newLogType = event.target.value;
    if (intervalId.current) clearInterval(intervalId.current);

    if (newLogType === 'odoo') {
      setLogs([]);
      getOdooLogs();
      intervalId.current = setInterval(getOdooLogs, 10000);
    } else {
      lineNoRef.current = 1;
      if (newLogType === 'app') {
        getAppLogs();
        intervalId.current = setInterval(getAppLogs, 10000);
      } else if (newLogType === 'install') {
        getInstallLogs();
        intervalId.current = setInterval(getInstallLogs, 10000);
      } else {
        getBuildLogs();
        intervalId.current = setInterval(getBuildLogs, 10000);
      }
    }
  };

  useEffect(() => {
    return () => {
      if (intervalId.current) clearInterval(intervalId.current);
    };
  }, []);

  return (
    <Logs>
      <LogsHeader onLogTypeChange={handleLogTypeChange} />
      <LogsScrollar>
        <pre>{logs.join('\n')}</pre>
      </LogsScrollar>
    </Logs>
  );
};

export default LogsPage;
