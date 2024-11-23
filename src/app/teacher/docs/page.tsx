'use client';
import React, { useState } from 'react';
import {
  DataGrid,
  GridRowsProp,
  GridColDef,
  GridRenderCellParams,
} from '@mui/x-data-grid';
import {
  Button,
  Box,
  Switch,
  Typography,
  createTheme,
  ThemeProvider,
} from '@mui/material';

const TableComponent: React.FC = () => {
  const initialRows: GridRowsProp = [
    { id: 1, name: 'ce02-1', submissionOpen: false, isActive: false },
    { id: 2, name: 'ce02-2', submissionOpen: false, isActive: false },
    { id: 3, name: 'ce02-3', submissionOpen: false, isActive: false },
    { id: 4, name: 'ce02-4', submissionOpen: false, isActive: false },
    { id: 5, name: 'ce02-4', submissionOpen: false, isActive: false },
    { id: 6, name: 'ce02-4', submissionOpen: false, isActive: false },
    { id: 7, name: 'ce02-4', submissionOpen: false, isActive: false },
  ];

  const alternativeRows: GridRowsProp = [
    { id: 1, name: 'ce03-1', submissionOpen: false, isActive: false },
    { id: 2, name: 'ce03-2', submissionOpen: false, isActive: false },
    { id: 3, name: 'ce03-3', submissionOpen: false, isActive: false },
    { id: 4, name: 'ce03-4', submissionOpen: false, isActive: false },
  ];

  const [rows, setRows] = useState<GridRowsProp>(initialRows);

  const handleButtonClick = (type: 'initial' | 'alternative') => {
    setRows(type === 'initial' ? initialRows : alternativeRows);
  };

  const handleSwitchToggle = (
    id: number,
    field: 'submissionOpen' | 'isActive'
  ) => {
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === id ? { ...row, [field]: !row[field] } : row
      )
    );
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ลำดับ', width: 100 },
    { field: 'name', headerName: 'ชื่อ', flex: 1 },
    {
      field: 'submissionOpen',
      headerName: 'เปิด/ปิดส่ง',
      width: 150,
      renderCell: (params: GridRenderCellParams) => (
        <Switch
          checked={!!params.value}
          onChange={() => handleSwitchToggle(params.id as number, 'submissionOpen')}
          color="primary"
        />
      ),
    },
    {
      field: 'isActive',
      headerName: 'สถานะใช้งาน',
      width: 150,
      renderCell: (params: GridRenderCellParams) => (
        <Switch
          checked={!!params.value}
          onChange={() => handleSwitchToggle(params.id as number, 'isActive')}
          color="primary"
        />
      ),
    },
    {
      field: 'actions',
      headerName: 'การจัดการ',
      width: 100,
      renderCell: () => <Button variant="text">≡</Button>,
    },
  ];

  return (
    <ThemeProvider
      theme={createTheme({
        typography: { fontFamily: 'Prompt, sans-serif' },
        palette: {
          primary: { main: '#1976d2' },
          secondary: { main: '#dc004e' },
        },
      })}
    >
      <Box style={{ padding: '20px' }}>
        <Box
          className="flex space-x-4 mb-4"
          style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleButtonClick('initial')}
          >
            เตรียมโครงงาน
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleButtonClick('alternative')}
          >
            โครงงาน
          </Button>
        </Box>

        <Box style={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { pageSize: 100, page: 0 },
              },
            }}
            pageSizeOptions={[100]}
            disableRowSelectionOnClick
          />
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default TableComponent;
