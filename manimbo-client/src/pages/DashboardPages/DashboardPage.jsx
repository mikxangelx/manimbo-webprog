import React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';
import { Gauge } from '@mui/x-charts/Gauge';
import { DataGrid } from '@mui/x-data-grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { Typography, Card, CardContent } from '@mui/material';
import ArticleIcon from '@mui/icons-material/Article';
import PeopleIcon from '@mui/icons-material/People';
import VisibilityIcon from '@mui/icons-material/Visibility';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

const articles = [
  { id: 1, title: "Morning Routine", category: "Lifestyle", views: 120 },
  { id: 2, title: "Minimalist Living", category: "Wellness", views: 90 },
  { id: 3, title: "Creative Journaling", category: "Creativity", views: 150 },
  { id: 4, title: "Slow Living Tips", category: "Lifestyle", views: 80 },
];

const userStats = [
  { day: "Mon", users: 20 },
  { day: "Tue", users: 35 },
  { day: "Wed", users: 25 },
  { day: "Thu", users: 40 },
  { day: "Fri", users: 30 },
];

const pageViews = [
  { day: "Mon", views: 200 },
  { day: "Tue", views: 300 },
  { day: "Wed", views: 250 },
  { day: "Thu", views: 400 },
  { day: "Fri", views: 350 },
];

const categoryData = [
  { id: 0, value: 2, label: "Lifestyle" },
  { id: 1, value: 1, label: "Wellness" },
  { id: 2, value: 1, label: "Creativity" },
];

const articleColumns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'title', headerName: 'Title', width: 220 },
  { field: 'category', headerName: 'Category', width: 150 },
  { field: 'views', headerName: 'Views', width: 120 },
];

function DashboardPage() {
  const mostViewed = articles.reduce((max, a) =>
    a.views > max.views ? a : max
  );

  return (
   <Box sx={{ p: 3 }}>
  <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
    Club Creative Dashboard Overview
  </Typography>

  {/* 🔹 KPI CARDS */}
  <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} sx={{ mb: 4 }}>
  {[
    { label: "Articles", value: articles.length, icon: <ArticleIcon />, color: "#8D6E63" },
    { label: "Users", value: 150, icon: <PeopleIcon />, color: "#6D4C41" },
    { label: "Views", value: "1,200", icon: <VisibilityIcon />, color: "#A1887F" },
    { label: "Growth", value: "+12%", icon: <TrendingUpIcon />, color: "#5D4037" },
  ].map((item, i) => (
    <Card
      key={i}
      sx={{
        flex: 1,
        p: 2,
        borderRadius: 4,
        boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
        display: "flex",
        alignItems: "center",
        gap: 2,
      }}
    >
      {/* ICON */}
      <Box
        sx={{
          backgroundColor: item.color,
          color: "#fff",
          borderRadius: "50%",
          width: 45,
          height: 45,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {item.icon}
      </Box>

      {/* TEXT */}
      <Box>
        <Typography color="text.secondary" fontSize={14}>
          {item.label}
        </Typography>
        <Typography variant="h5" fontWeight={600}>
          {item.value}
        </Typography>
      </Box>
    </Card>
  ))}
</Stack>

  {/* 🔹 MAIN CHARTS */}
  <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} sx={{ mb: 4 }}>
    
    <Card sx={{ flex: 2, p: 3, borderRadius: 4 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Page Views Trend
      </Typography>
      <BarChart
        dataset={pageViews}
        xAxis={[{ scaleType: 'band', dataKey: 'day' }]}
        series={[{ dataKey: 'views', label: 'Views' }]}
        height={250}
      />
    </Card>

    <Card sx={{ flex: 1, p: 3, borderRadius: 4 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Categories
      </Typography>
      <PieChart
        series={[{ data: categoryData }]}
        width={250}
        height={250}
      />
    </Card>
  </Stack>

  {/* 🔹 SECOND ROW */}
  <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} sx={{ mb: 4 }}>
    
    <Card sx={{ flex: 1, p: 3, borderRadius: 4 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        User Growth
      </Typography>
      <BarChart
        dataset={userStats}
        xAxis={[{ scaleType: 'band', dataKey: 'day' }]}
        series={[{ dataKey: 'users' }]}
        height={250}
      />
    </Card>

    <Card sx={{ flex: 1, p: 3, borderRadius: 4 }}>
  <Typography variant="h6" sx={{ mb: 2 }}>
    Top Articles
  </Typography>

  {articles
    .sort((a, b) => b.views - a.views)
    .slice(0, 3)
    .map((a) => (
      <Box key={a.id} sx={{ mb: 2 }}>
        <Typography fontWeight={500}>{a.title}</Typography>
        <Typography variant="caption" color="text.secondary">
          {a.views} views
        </Typography>
      </Box>
    ))}
</Card>

  </Stack>

  {/* 🔹 TABLE */}
  <Card sx={{ p: 3, borderRadius: 4 }}>
    <Typography variant="h6" sx={{ mb: 2 }}>
      Articles Overview
    </Typography>

    <DataGrid
      rows={articles}
      columns={articleColumns}
      pageSizeOptions={[5]}
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

export default DashboardPage;