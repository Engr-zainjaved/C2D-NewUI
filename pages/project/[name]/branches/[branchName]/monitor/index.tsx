import { useState, useEffect } from 'react';
import Card, {
  CardBody,
  CardHeader,
  CardLabel,
  CardSubTitle,
  CardTitle,
} from '../../../../../../components/bootstrap/Card';
import { CartesianGrid, XAxis, YAxis, Tooltip, Area, AreaChart } from 'recharts';
import React from 'react';
import Monitor, { MonitorHeader } from '../../../../../../views/Projects/Details/Monitor';
import useImportExportEnableStatusApi from '../../../../../../hooks/useImportExportEnableStatusApi';

type GraphDataType = {
  timestamp: string;
  cpu_usage: number;
  memory_usage: number;
  memory_total: number;
  storage_usage: number;
  storage_total: number;
};

const MonitorPage: React.FC = () => {
  const [appGraphData, setAppGraphData] = useState<GraphDataType[]>([]);
  const [dbGraphData, setDBGraphData] = useState<GraphDataType[]>([]);
  const { metaUrls, importExportEnableStatusApi } = useImportExportEnableStatusApi();
  let selectedProjectId: any;
  let selectedBranchId: any;
  try {
    selectedProjectId = localStorage.getItem('projectId');
    selectedBranchId = localStorage.getItem('branchId');
  } catch {
    console.error('error in accessing projectId on backups page');
  }

  useEffect(() => {
    if (selectedBranchId && selectedProjectId) {
      importExportEnableStatusApi(selectedProjectId, selectedBranchId);
    }
  }, [selectedBranchId]);

  useEffect(() => {
    if (metaUrls) {
      const appSocketCleanup = handleWebSocket(metaUrls.monitor_url, setAppGraphData);
      const dbSocketCleanup = handleWebSocket(metaUrls.db_monitor_url, setDBGraphData);

      return () => {
        appSocketCleanup();
        dbSocketCleanup();
      };
    }
  }, [metaUrls]);

  const handleWebSocket = (url: string, setData: React.Dispatch<React.SetStateAction<GraphDataType[]>>) => {
    const socket = new WebSocket(url);

    socket.onopen = () => {};

    socket.onmessage = (event) => {
      const correctedJson = event.data.replace(/'/g, '"');

      try {
        const data = JSON.parse(correctedJson);
        const formattedData: GraphDataType = {
          timestamp: data.time,
          cpu_usage: data.cpu.used,
          memory_usage: data.memory.used,
          memory_total: data.memory.total,
          storage_usage: data.disk.used,
          storage_total: data.disk.total,
        };

        setData((prev) => {
          const updatedData = [...prev, formattedData];
          if (updatedData.length > 60) {
            return updatedData.slice(updatedData.length - 60);
          }
          return updatedData;
        });
      } catch (e) {
        console.error('Error parsing JSON!', e);
      }
    };

    socket.onclose = () => {};

    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    return () => {
      socket.close();
    };
  };

  if (!metaUrls?.monitor_url || !metaUrls?.db_monitor_url) {
    return (
      <Monitor>
        <MonitorHeader />
        <div className="text-center">
          No build monitor data available to show, either Build failed or is in-progress
        </div>
      </Monitor>
    );
  }

  return (
    <Monitor>
      <Card shadow="sm" className="mb-3 h-auto">
        <CardHeader>
          <CardLabel>
            <CardTitle>Memory Usage</CardTitle>
            <CardSubTitle>(in MB)</CardSubTitle>
          </CardLabel>
        </CardHeader>
        <CardBody className="d-flex justify-content-center align-items-center">
          <AreaChart width={860} height={300} data={appGraphData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorMemory" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="timestamp" />
            <YAxis
              domain={[0, (dataMax: any) => Math.ceil(Math.max(...appGraphData.map((d) => d.memory_total), dataMax))]}
              tickFormatter={(value) => `${value} MB`}
              tickCount={6}
            />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="memory_usage"
              stroke="#82ca9d"
              fillOpacity={1}
              fill="url(#colorMemory)"
              isAnimationActive={false}
            />
          </AreaChart>
        </CardBody>
      </Card>

      <Card shadow="sm" className="mb-3 h-auto">
        <CardHeader>
          <CardLabel>
            <CardTitle>CPU Usage</CardTitle>
            <CardSubTitle>(in %)</CardSubTitle>
          </CardLabel>
        </CardHeader>
        <CardBody className="d-flex justify-content-center align-items-center">
          <AreaChart width={860} height={300} data={appGraphData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorCpu" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="timestamp" />
            <YAxis domain={[0, 100]} tickFormatter={(value) => `${value} %`} />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="cpu_usage"
              stroke="#8884d8"
              fillOpacity={1}
              fill="url(#colorCpu)"
              isAnimationActive={false}
            />
          </AreaChart>
        </CardBody>
      </Card>

      <Card shadow="sm" className="mb-3 h-auto">
        <CardHeader>
          <CardLabel>
            <CardTitle>Storage Usage</CardTitle>
            <CardSubTitle>(in GB)</CardSubTitle>
          </CardLabel>
        </CardHeader>
        <CardBody className="d-flex justify-content-center align-items-center">
          <AreaChart width={860} height={300} data={dbGraphData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorStorage" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f4b501" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#f4b501" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="timestamp" />
            <YAxis
              domain={[0, (dataMax: any) => Math.ceil(Math.max(...dbGraphData.map((d) => d.storage_total), dataMax))]}
              tickFormatter={(value) => `${Math.round(value)} GB`}
            />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="storage_usage"
              stroke="#f4b501"
              fillOpacity={1}
              fill="url(#colorStorage)"
              isAnimationActive={false}
            />
          </AreaChart>
        </CardBody>
      </Card>
    </Monitor>
  );
};

export default MonitorPage;
