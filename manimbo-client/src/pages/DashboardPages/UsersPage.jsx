import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Typography, Card } from '@mui/material';

const users = [
  { id: 1, name: "Angela Cruz", email: "angela@gmail.com" },
  { id: 2, name: "John Reyes", email: "john@gmail.com" },
  { id: 3, name: "Maria Santos", email: "maria@gmail.com" },
  { id: 4, name: "David Lim", email: "david@gmail.com" },
];


const columns = [
  { field: 'name', headerName: 'Name', width: 200 },
  { field: 'email', headerName: 'Email', width: 250 },
];

function UsersPage() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Users
      </Typography>

      <Card sx={{ p: 3, borderRadius: 4 }}>
        <DataGrid
          rows={users}
          columns={columns}
          pageSizeOptions={[5]}
          autoHeight

          // ✅ CHECKBOX FEATURE
          checkboxSelection
          disableRowSelectionOnClick

          sx={{
            border: "none",
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: '#F3EDE9',
            },
          }}
        />
      </Card>
    </Box>
  );
}

export default UsersPage;