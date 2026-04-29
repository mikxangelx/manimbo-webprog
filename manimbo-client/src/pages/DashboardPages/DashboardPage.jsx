import React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';
import { DataGrid } from '@mui/x-data-grid';
import {
  Avatar,
  Box,
  Card,
  Chip,
  Divider,
  LinearProgress,
  Stack,
  Typography,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';

const articles = [
  { id: 1, title: 'Morning Routine', category: 'Lifestyle', views: 120 },
  { id: 2, title: 'Minimalist Living', category: 'Wellness', views: 90 },
  { id: 3, title: 'Creative Journaling', category: 'Creativity', views: 150 },
  { id: 4, title: 'Slow Living Tips', category: 'Lifestyle', views: 80 },
];

const userStats = [
  { day: 'Mon', users: 20 },
  { day: 'Tue', users: 35 },
  { day: 'Wed', users: 25 },
  { day: 'Thu', users: 40 },
  { day: 'Fri', users: 30 },
];

const pageViews = [
  { day: 'Mon', views: 200 },
  { day: 'Tue', views: 300 },
  { day: 'Wed', views: 250 },
  { day: 'Thu', views: 400 },
  { day: 'Fri', views: 350 },
];

const categoryData = [
  { id: 0, value: 2, label: 'Lifestyle' },
  { id: 1, value: 1, label: 'Wellness' },
  { id: 2, value: 1, label: 'Creativity' },
];

const articleColumns = [
  { field: 'id', headerName: 'ID', width: 80 },
  { field: 'title', headerName: 'Title', flex: 1, minWidth: 220 },
  { field: 'category', headerName: 'Category', minWidth: 150 },
  { field: 'views', headerName: 'Views', width: 120 },
];

const surfaceSx = {
  borderRadius: 6,
  border: '1px solid',
  borderColor: 'rgba(120, 92, 72, 0.12)',
  boxShadow: '0 22px 60px rgba(63, 43, 33, 0.08)',
  background:
    'linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(248,243,238,0.95) 100%)',
};

function DashboardPage() {
  const totalViews = articles.reduce((sum, article) => sum + article.views, 0);
  const totalReaders = 150;
  const mostViewed = [...articles].sort((a, b) => b.views - a.views)[0];
  const topArticles = [...articles].sort((a, b) => b.views - a.views).slice(0, 3);
  const peakDay = [...pageViews].sort((a, b) => b.views - a.views)[0];

  const statCards = [
    {
      label: 'Published Articles',
      value: articles.length,
      note: '+2 this week',
      icon: <ArticleOutlinedIcon />,
      tone: '#7a4b32',
    },
    {
      label: 'Active Readers',
      value: totalReaders,
      note: 'Steady engagement',
      icon: <GroupsOutlinedIcon />,
      tone: '#8f5e42',
    },
    {
      label: 'Weekly Views',
      value: totalViews.toLocaleString(),
      note: `Peak on ${peakDay.day}`,
      icon: <VisibilityOutlinedIcon />,
      tone: '#b16d45',
    },
    {
      label: 'Growth Rate',
      value: '+12%',
      note: 'From last report',
      icon: <TrendingUpOutlinedIcon />,
      tone: '#5f7a52',
    },
  ];

  return (
    <Box sx={{ px: { xs: 1, sm: 2 }, py: { xs: 1, sm: 2 }, width: '100%' }}>
      <Card
        sx={{
          ...surfaceSx,
          p: { xs: 2.5, sm: 4 },
          mb: 3,
          overflow: 'hidden',
          position: 'relative',
          background:
            'radial-gradient(circle at top right, rgba(188, 129, 86, 0.16), transparent 34%), linear-gradient(135deg, #fffaf6 0%, #f5ede5 100%)',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: -36,
            right: -18,
            width: 150,
            height: 150,
            borderRadius: '50%',
            background: 'rgba(165, 107, 68, 0.09)',
          }}
        />
        <Box
          sx={{
            position: 'relative',
            zIndex: 1,
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', lg: 'minmax(0, 1fr) 520px' },
            alignItems: 'center',
            gap: { xs: 3, lg: 4 },
          }}
        >
          <Box
            sx={{
              maxWidth: 720,
              textAlign: 'center',
              mx: 'auto',
              width: '100%',
            }}
          >
            <Chip
              label="Overview"
              sx={{
                mb: 2,
                bgcolor: 'rgba(122, 75, 50, 0.1)',
                color: '#7a4b32',
                fontWeight: 700,
              }}
            />
            <Typography
              variant="h3"
              sx={{
                fontSize: { xs: '2rem', sm: '2.6rem' },
                fontWeight: 700,
                color: '#2f241f',
                lineHeight: 1.1,
                mb: 1,
              }}
            >
              Club Creative dashboard at a glance
            </Typography>
            <Typography
              sx={{ maxWidth: 620, color: '#67584d', fontSize: '1rem', mx: 'auto' }}
            >
              Track performance, content momentum, and reader activity in one
              cleaner workspace that is easier to scan during quick check-ins.
            </Typography>
          </Box>

          <Card
            sx={{
              width: { xs: '100%', lg: 520 },
              maxWidth: '100%',
              p: 2.5,
              borderRadius: 5,
              bgcolor: 'rgba(255,255,255,0.72)',
              border: '1px solid rgba(122, 75, 50, 0.12)',
              boxShadow: 'none',
              backdropFilter: 'blur(10px)',
              textAlign: 'center',
              mx: { xs: 'auto', lg: 0 },
              justifySelf: { xs: 'center', lg: 'end' },
            }}
          >
            <Typography variant="overline" sx={{ color: '#9a7d68', letterSpacing: 1.2 }}>
              Highlights
            </Typography>
            <Stack spacing={1.5} sx={{ mt: 1 }}>
              <Box>
                <Typography sx={{ fontWeight: 700, color: '#2f241f' }}>
                  Top article
                </Typography>
                <Typography sx={{ color: '#67584d' }}>
                  {mostViewed.title} with {mostViewed.views} views
                </Typography>
              </Box>
              <Divider />
              <Box>
                <Typography sx={{ fontWeight: 700, color: '#2f241f' }}>
                  Quick signal
                </Typography>
                <Typography sx={{ color: '#67584d' }}>
                  Reader activity is strongest midweek and remains healthy into Friday.
                </Typography>
              </Box>
            </Stack>
          </Card>
        </Box>
      </Card>

      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2.5} sx={{ mb: 3 }}>
        {statCards.map((item) => (
          <Card
            key={item.label}
            sx={{
              ...surfaceSx,
              flex: 1,
              p: 2.5,
              minHeight: 150,
            }}
          >
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
              <Avatar
                sx={{
                  bgcolor: alpha(item.tone, 0.12),
                  color: item.tone,
                  width: 52,
                  height: 52,
                }}
              >
                {item.icon}
              </Avatar>
              <ArrowOutwardIcon sx={{ color: alpha(item.tone, 0.75), fontSize: 20 }} />
            </Stack>
            <Typography sx={{ mt: 2.5, color: '#7c6a5b', fontSize: 14 }}>
              {item.label}
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 700, color: '#2f241f', mt: 0.5 }}>
              {item.value}
            </Typography>
            <Typography sx={{ color: item.tone, fontSize: 13, mt: 1 }}>
              {item.note}
            </Typography>
          </Card>
        ))}
      </Stack>

      <Stack direction={{ xs: 'column', xl: 'row' }} spacing={2.5} sx={{ mb: 3 }}>
        <Card sx={{ ...surfaceSx, flex: 1.8, p: { xs: 2, sm: 3 } }}>
          <Typography variant="h6" sx={{ color: '#2f241f', fontWeight: 700 }}>
            Page views trend
          </Typography>
          <Typography sx={{ color: '#76685c', fontSize: 14, mb: 2 }}>
            A quick weekly look at visibility and content reach.
          </Typography>
          <BarChart
            dataset={pageViews}
            xAxis={[{ scaleType: 'band', dataKey: 'day' }]}
            series={[{ dataKey: 'views', label: 'Views', color: '#a86137' }]}
            height={280}
            grid={{ horizontal: true }}
          />
        </Card>

        <Card sx={{ ...surfaceSx, flex: 1, p: { xs: 2, sm: 3 } }}>
          <Typography variant="h6" sx={{ color: '#2f241f', fontWeight: 700 }}>
            Category mix
          </Typography>
          <Typography sx={{ color: '#76685c', fontSize: 14, mb: 1 }}>
            Current publishing balance across topics.
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <PieChart
              series={[
                {
                  data: categoryData,
                  innerRadius: 55,
                  outerRadius: 90,
                  paddingAngle: 3,
                },
              ]}
              colors={['#7a4b32', '#b16d45', '#d9af88']}
              width={280}
              height={240}
            />
          </Box>
        </Card>
      </Stack>

      <Stack direction={{ xs: 'column', lg: 'row' }} spacing={2.5} sx={{ mb: 3 }}>
        <Card sx={{ ...surfaceSx, flex: 1.25, p: { xs: 2, sm: 3 } }}>
          <Typography variant="h6" sx={{ color: '#2f241f', fontWeight: 700 }}>
            User activity
          </Typography>
          <Typography sx={{ color: '#76685c', fontSize: 14, mb: 2 }}>
            Engagement by day shows steady platform usage.
          </Typography>
          <BarChart
            dataset={userStats}
            xAxis={[{ scaleType: 'band', dataKey: 'day' }]}
            series={[{ dataKey: 'users', label: 'Users', color: '#6c8a61' }]}
            height={260}
            grid={{ horizontal: true }}
          />
        </Card>

        <Card sx={{ ...surfaceSx, flex: 1, p: { xs: 2, sm: 3 } }}>
          <Typography variant="h6" sx={{ color: '#2f241f', fontWeight: 700 }}>
            Top articles
          </Typography>
          <Typography sx={{ color: '#76685c', fontSize: 14, mb: 2.5 }}>
            The best-performing stories right now.
          </Typography>
          <Stack spacing={2.25}>
            {topArticles.map((article, index) => {
              const progress = Math.round((article.views / mostViewed.views) * 100);

              return (
                <Box key={article.id}>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{ mb: 0.8 }}
                  >
                    <Box>
                      <Typography sx={{ fontWeight: 700, color: '#2f241f' }}>
                        {index + 1}. {article.title}
                      </Typography>
                      <Typography sx={{ color: '#8b7767', fontSize: 13 }}>
                        {article.category}
                      </Typography>
                    </Box>
                    <Typography sx={{ fontWeight: 700, color: '#7a4b32' }}>
                      {article.views}
                    </Typography>
                  </Stack>
                  <LinearProgress
                    variant="determinate"
                    value={progress}
                    sx={{
                      height: 8,
                      borderRadius: 999,
                      bgcolor: 'rgba(122, 75, 50, 0.12)',
                      '& .MuiLinearProgress-bar': {
                        borderRadius: 999,
                        bgcolor: index === 0 ? '#7a4b32' : '#c08761',
                      },
                    }}
                  />
                </Box>
              );
            })}
          </Stack>
        </Card>
      </Stack>

      <Card sx={{ ...surfaceSx, p: { xs: 2, sm: 3 } }}>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          alignItems={{ xs: 'flex-start', sm: 'center' }}
          spacing={1}
          sx={{ mb: 2 }}
        >
          <Box>
            <Typography variant="h6" sx={{ color: '#2f241f', fontWeight: 700 }}>
              Articles overview
            </Typography>
            <Typography sx={{ color: '#76685c', fontSize: 14 }}>
              A tidy snapshot of your content library and current reach.
            </Typography>
          </Box>
          <Chip
            label={`${articles.length} records`}
            sx={{ bgcolor: 'rgba(122, 75, 50, 0.1)', color: '#7a4b32', fontWeight: 700 }}
          />
        </Stack>

        <Box sx={{ height: 340, width: '100%' }}>
          <DataGrid
            rows={articles}
            columns={articleColumns}
            pageSizeOptions={[5]}
            disableRowSelectionOnClick
            sx={{
              border: 'none',
              '& .MuiDataGrid-columnHeaders': {
                backgroundColor: '#f6eee7',
                borderBottom: 'none',
              },
              '& .MuiDataGrid-row:nth-of-type(even)': {
                backgroundColor: 'rgba(122, 75, 50, 0.03)',
              },
              '& .MuiDataGrid-cell, & .MuiDataGrid-columnHeader': {
                outline: 'none',
              },
            }}
          />
        </Box>
      </Card>
    </Box>
  );
}

export default DashboardPage;
