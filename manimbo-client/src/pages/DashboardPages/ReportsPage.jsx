import React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';
import { DataGrid } from '@mui/x-data-grid';
import {
  Box,
  Button,
  Card,
  Chip,
  Divider,
  Stack,
  Typography,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import PrintOutlinedIcon from '@mui/icons-material/PrintOutlined';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import AutoGraphOutlinedIcon from '@mui/icons-material/AutoGraphOutlined';
import logo from '../../assets/logo.jpg';

const articles = [
  { id: 1, title: 'Morning Routine', category: 'Lifestyle', views: 120 },
  { id: 2, title: 'Minimalist Living', category: 'Wellness', views: 90 },
  { id: 3, title: 'Creative Journaling', category: 'Creativity', views: 150 },
  { id: 4, title: 'Slow Living Tips', category: 'Lifestyle', views: 80 },
];

const categoryData = [
  { id: 0, value: 2, label: 'Lifestyle' },
  { id: 1, value: 1, label: 'Wellness' },
  { id: 2, value: 1, label: 'Creativity' },
];

const columns = [
  { field: 'title', headerName: 'Title', flex: 1, minWidth: 220 },
  { field: 'category', headerName: 'Category', minWidth: 150 },
  { field: 'views', headerName: 'Views', width: 120 },
];

const thStyle = {
  border: '1px solid #d6c6b7',
  padding: '12px',
  background: '#f3ede9',
  textAlign: 'left',
};

const tdStyle = {
  border: '1px solid #e6d9cc',
  padding: '12px',
};

const surfaceSx = {
  borderRadius: 6,
  border: '1px solid rgba(120, 92, 72, 0.12)',
  boxShadow: '0 22px 60px rgba(63, 43, 33, 0.08)',
  background:
    'linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(248,243,238,0.95) 100%)',
};

function ReportsPage() {
  const today = new Date().toLocaleDateString();
  const totalViews = articles.reduce((sum, article) => sum + article.views, 0);
  const topArticle = [...articles].sort((a, b) => b.views - a.views)[0];

  return (
    <Box sx={{ px: { xs: 1, sm: 2 }, py: { xs: 1, sm: 2 } }}>
      <Box className="no-print">
        <Card
          sx={{
            ...surfaceSx,
            p: { xs: 2.5, sm: 4 },
            mb: 3,
            position: 'relative',
            background:
              'radial-gradient(circle at top right, rgba(188, 129, 86, 0.18), transparent 34%), linear-gradient(135deg, #fffaf6 0%, #f4ece3 100%)',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              maxWidth: 760,
              mx: 'auto',
              pr: { xs: 0, lg: 34 },
            }}
          >
            <Box>
              <Chip
                icon={<AssessmentOutlinedIcon />}
                label="Reports"
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
                  fontWeight: 600,
                  color: '#2f241f',
                  lineHeight: 1.1,
                  mb: 1,
                }}
              >
                Sleeker reporting for faster decision-making
              </Typography>
              <Typography sx={{ color: '#67584d', maxWidth: 620, mx: 'auto' }}>
                Review article performance, category distribution, and your printable
              </Typography>
            </Box>
            <Stack
              spacing={1.5}
              alignItems="center"
              sx={{
                position: { xs: 'static', lg: 'absolute' },
                top: { lg: '50%' },
                right: { lg: 32 },
                transform: { lg: 'translateY(-50%)' },
                width: { xs: '100%', sm: 'auto' },
                mt: { xs: 3, lg: 0 },
              }}
            >
              <Button
                variant="contained"
                startIcon={<PrintOutlinedIcon />}
                onClick={() => window.print()}
                sx={{
                  px: 3.25,
                  py: 1.5,
                  borderRadius: 999,
                  textTransform: 'none',
                  fontWeight: 700,
                  fontSize: '1rem',
                  color: '#fffaf6',
                  bgcolor: '#7a4b32',
                  boxShadow: '0 18px 34px rgba(90, 53, 33, 0.2)',
                  minWidth: 230,
                  minHeight: 56,
                  '&:hover': {
                    bgcolor: '#643b26',
                    boxShadow: '0 20px 38px rgba(90, 53, 33, 0.24)',
                  },
                }}
              >
                Print or Save as PDF
              </Button>
              <Chip
                label={`Generated ${today}`}
                sx={{ bgcolor: 'rgba(255,255,255,0.7)', color: '#7a4b32', fontWeight: 700 }}
              />
            </Stack>
          </Box>
        </Card>

        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2.5} sx={{ mb: 3 }}>
          <Card sx={{ ...surfaceSx, flex: 1, p: 2.5 }}>
            <Typography sx={{ color: '#7c6a5b', fontSize: 14 }}>
              Total article views
            </Typography>
            <Typography variant="h4" sx={{ color: '#2f241f', fontWeight: 700, mt: 0.5 }}>
              {totalViews}
            </Typography>
            <Typography sx={{ color: '#8f6d57', fontSize: 13, mt: 1 }}>
              Strongest traffic comes from evergreen lifestyle content.
            </Typography>
          </Card>

          <Card sx={{ ...surfaceSx, flex: 1, p: 2.5 }}>
            <Typography sx={{ color: '#7c6a5b', fontSize: 14 }}>
              Best performing article
            </Typography>
            <Typography variant="h6" sx={{ color: '#2f241f', fontWeight: 700, mt: 0.5 }}>
              {topArticle.title}
            </Typography>
            <Typography sx={{ color: '#8f6d57', fontSize: 13, mt: 1 }}>
              {topArticle.views} views across the current reporting period.
            </Typography>
          </Card>

          <Card sx={{ ...surfaceSx, flex: 1, p: 2.5 }}>
            <Typography sx={{ color: '#7c6a5b', fontSize: 14 }}>
              Publishing focus
            </Typography>
            <Typography variant="h6" sx={{ color: '#2f241f', fontWeight: 700, mt: 0.5 }}>
              Lifestyle leads
            </Typography>
            <Typography sx={{ color: '#8f6d57', fontSize: 13, mt: 1 }}>
              Most content is clustered in calm living and routine-based topics.
            </Typography>
          </Card>
        </Stack>

        <Stack direction={{ xs: 'column', xl: 'row' }} spacing={2.5} sx={{ mb: 3 }}>
          <Card sx={{ ...surfaceSx, flex: 1.8, p: { xs: 2, sm: 3 } }}>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              justifyContent="space-between"
              alignItems={{ xs: 'flex-start', sm: 'center' }}
              spacing={1}
              sx={{ mb: 2 }}
            >
              <Box>
                <Typography variant="h6" sx={{ color: '#2f241f', fontWeight: 700 }}>
                  Article performance
                </Typography>
                <Typography sx={{ color: '#76685c', fontSize: 14 }}>
                  Compare views across your current article list.
                </Typography>
              </Box>
              <Chip
                icon={<AutoGraphOutlinedIcon />}
                label="Live snapshot"
                sx={{ bgcolor: alpha('#7a4b32', 0.1), color: '#7a4b32', fontWeight: 700 }}
              />
            </Stack>
            <BarChart
              dataset={articles}
              xAxis={[{ scaleType: 'band', dataKey: 'title' }]}
              series={[{ dataKey: 'views', label: 'Views', color: '#a86137' }]}
              height={300}
              grid={{ horizontal: true }}
            />
          </Card>

          <Card sx={{ ...surfaceSx, flex: 1, p: { xs: 2, sm: 3 } }}>
            <Typography variant="h6" sx={{ color: '#2f241f', fontWeight: 700 }}>
              Category distribution
            </Typography>
            <Typography sx={{ color: '#76685c', fontSize: 14, mb: 1 }}>
              A quick view of the editorial spread.
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <PieChart
                series={[
                  {
                    data: categoryData,
                    innerRadius: 55,
                    outerRadius: 92,
                    paddingAngle: 3,
                  },
                ]}
                colors={['#7a4b32', '#b16d45', '#d9af88']}
                width={280}
                height={250}
              />
            </Box>
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
                Detailed report
              </Typography>
              <Typography sx={{ color: '#76685c', fontSize: 14 }}>
                Clean tabular data for quick review before exporting.
              </Typography>
            </Box>
            <Chip
              label={`${articles.length} entries`}
              sx={{ bgcolor: 'rgba(122, 75, 50, 0.1)', color: '#7a4b32', fontWeight: 700 }}
            />
          </Stack>

          <Box sx={{ height: 350, width: '100%' }}>
            <DataGrid
              rows={articles}
              columns={columns}
              pageSizeOptions={[5]}
              autoHeight={false}
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

      <Box className="print-only">
        <Box sx={{ px: 4, py: 2 }}>
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <img src={logo} alt="logo" style={{ width: 84, marginBottom: 12 }} />
            <Typography variant="h4" fontWeight={700}>
              REPORTS SUMMARY
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Content Analytics Report
            </Typography>
          </Box>

          <Typography sx={{ mb: 2 }}>
            <strong>Date Generated:</strong> {today}
          </Typography>
          <Divider sx={{ borderColor: '#d4c3b6', mb: 3 }} />

          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" fontWeight={700}>
              1. ARTICLE PERFORMANCE
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              This chart shows the performance of articles based on the total number
              of views each article has received.
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <BarChart
                dataset={articles}
                xAxis={[{ scaleType: 'band', dataKey: 'title' }]}
                series={[{ dataKey: 'views', color: '#a86137' }]}
                height={300}
                width={600}
              />
            </Box>
            <Typography variant="caption" sx={{ display: 'block', textAlign: 'center', mt: 1 }}>
              Figure 1. Article performance based on number of views.
            </Typography>
          </Box>

          <Divider sx={{ borderColor: '#d4c3b6', mb: 3 }} />

          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" fontWeight={700}>
              2. CATEGORY DISTRIBUTION
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              This pie chart represents the distribution of articles according to
              their categories.
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <PieChart
                series={[{ data: categoryData }]}
                width={300}
                height={250}
              />
            </Box>
            <Typography variant="caption" sx={{ display: 'block', textAlign: 'center', mt: 1 }}>
              Figure 2. Distribution of articles by category.
            </Typography>
          </Box>

          <Box sx={{ mt: 3, p: 2, border: '1px solid #d6c6b7', borderRadius: 2 }}>
            <Typography fontWeight={700}>SUMMARY</Typography>
            <Typography variant="body2">
              The data indicates that <strong>{topArticle.title}</strong> is the most
              viewed article, while the <strong>Lifestyle</strong> category has the
              highest number of articles published.
            </Typography>
          </Box>

          <div style={{ pageBreakBefore: 'always' }} />

          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
              3. DETAILED REPORT
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              The following table provides a detailed list of articles along with
              their categories and total views.
            </Typography>

            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '40px' }}>
              <thead>
                <tr>
                  <th style={thStyle}>Title</th>
                  <th style={thStyle}>Category</th>
                  <th style={thStyle}>Views</th>
                </tr>
              </thead>
              <tbody>
                {articles.map((article) => (
                  <tr key={article.id}>
                    <td style={tdStyle}>{article.title}</td>
                    <td style={tdStyle}>{article.category}</td>
                    <td style={tdStyle}>{article.views}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 6 }}>
              <Box>
                <Typography>Prepared by:</Typography>
                <Box sx={{ mt: 4 }}>
                  <Typography>__________________________</Typography>
                  <Typography>Your Name</Typography>
                </Box>
              </Box>

              <Box>
                <Typography>Date:</Typography>
                <Typography>{today}</Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default ReportsPage;
