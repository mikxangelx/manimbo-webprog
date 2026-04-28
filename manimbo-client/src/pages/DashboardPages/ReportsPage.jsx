import React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Typography, Card, Stack } from '@mui/material';

// MOCK DATA
const articles = [
  { id: 1, title: "Morning Routine", category: "Lifestyle", views: 120 },
  { id: 2, title: "Minimalist Living", category: "Wellness", views: 90 },
  { id: 3, title: "Creative Journaling", category: "Creativity", views: 150 },
  { id: 4, title: "Slow Living Tips", category: "Lifestyle", views: 80 },
];

const categoryData = [
  { id: 0, value: 2, label: "Lifestyle" },
  { id: 1, value: 1, label: "Wellness" },
  { id: 2, value: 1, label: "Creativity" },
];

const columns = [
  { field: 'title', headerName: 'Title', width: 200 },
  { field: 'category', headerName: 'Category', width: 150 },
  { field: 'views', headerName: 'Views', width: 120 },
];

function ReportsPage() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Reports & Analytics
      </Typography>

      {/* CHARTS */}
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} sx={{ mb: 4 }}>
        
        {/* ARTICLE PERFORMANCE */}
        <Card sx={{ flex: 2, p: 3, borderRadius: 4 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Article Performance
          </Typography>
          <BarChart
            dataset={articles}
            xAxis={[{ scaleType: 'band', dataKey: 'title' }]}
            series={[{ dataKey: 'views', label: 'Views' }]}
            height={300}
          />
        </Card>

        {/* CATEGORY */}
        <Card sx={{ flex: 1, p: 3, borderRadius: 4 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Category Distribution
          </Typography>
          <PieChart
            series={[{ data: categoryData }]}
            width={250}
            height={250}
          />
        </Card>
      </Stack>

      {/* TABLE */}
      <Card sx={{ p: 3, borderRadius: 4 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Detailed Report
        </Typography>

        <DataGrid
          rows={articles}
          columns={columns}
          pageSizeOptions={[5]}
          autoHeight
        />
      </Card>
    </Box>
  );
}

export default ReportsPage;