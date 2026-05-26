import React from 'react';
import { useLocation } from 'react-router-dom';
import { getFirstName, getRole } from '../../services/auth';

import { DataGrid } from '@mui/x-data-grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';

import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import PeopleIcon from '@mui/icons-material/People';
import AssessmentIcon from '@mui/icons-material/Assessment';
import ArticleIcon from '@mui/icons-material/Article';
import VisibilityIcon from '@mui/icons-material/Visibility';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PlaceIcon from '@mui/icons-material/Place';

const PALETTE = {
  bg: '#fdfbf8',
  surface: '#ffffff',
  surfaceAlt: '#fbf7f2',
  border: '#efe3d7',
  text: '#2f241f',
  textMuted: '#6e5b4d',
  textSubtle: '#a17f64',
  accent: '#8b7564',
  accentDark: '#5f4b3d',
};

const CHART_COLORS = ['#8b7564', '#a17f64', '#cfb49d', '#5f4b3d', '#d9c4ad'];

const cardSx = {
  borderRadius: 3,
  border: `1px solid ${PALETTE.border}`,
  background: PALETTE.surface,
  boxShadow: '0 8px 24px rgba(95, 74, 49, 0.05)',
};

const stats = [
  {
    label: 'Total Users',
    value: '1,248',
    delta: '+12%',
    icon: PeopleIcon,
    accent: '#8b7564',
    bg: '#f3ead9',
  },
  {
    label: 'Articles',
    value: '84',
    delta: '+6%',
    icon: ArticleIcon,
    accent: '#a17f64',
    bg: '#f7e8d6',
  },
  {
    label: 'Reports',
    value: '12',
    delta: '+3%',
    icon: AssessmentIcon,
    accent: '#5f4b3d',
    bg: '#eadccb',
  },
  {
    label: 'Visits',
    value: '23.4k',
    delta: '+18%',
    icon: VisibilityIcon,
    accent: '#cfb49d',
    bg: '#f4ebdd',
  },
];

const columns = [
  { field: 'id', headerName: 'ID', width: 80 },
  { field: 'firstName', headerName: 'First name', width: 150 },
  { field: 'lastName', headerName: 'Last name', width: 150 },
  { field: 'age', headerName: 'Age', type: 'number', width: 110 },
  {
    field: 'fullName',
    headerName: 'Full name',
    sortable: false,
    width: 200,
    valueGetter: (value, row) =>
      `${row.firstName || ''} ${row.lastName || ''}`,
  },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 14 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 31 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 31 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 11 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

const dataGridSx = {
  border: 'none',
  '& .MuiDataGrid-columnHeaders': {
    backgroundColor: PALETTE.surfaceAlt,
    color: PALETTE.text,
    fontWeight: 600,
    borderBottom: `1px solid ${PALETTE.border}`,
  },
  '& .MuiDataGrid-cell': {
    color: PALETTE.textMuted,
    borderBottom: `1px solid ${PALETTE.border}`,
  },
  '& .MuiDataGrid-row:hover': {
    backgroundColor: PALETTE.surfaceAlt,
  },
  '& .MuiDataGrid-footerContainer': {
    backgroundColor: PALETTE.surfaceAlt,
    borderTop: `1px solid ${PALETTE.border}`,
  },
  '& .MuiCheckbox-root.Mui-checked': {
    color: PALETTE.accent,
  },
};

function DashboardPage() {
  useLocation();
  const firstName = getFirstName();
  const role = getRole();
  const roleLabel = role
    ? `${role.charAt(0).toUpperCase()}${role.slice(1)}`
    : '';
  const greetingName = firstName || roleLabel || 'there';

  const averageAge = (
    rows.reduce((sum, row) => sum + (row.age || 0), 0) /
    rows.filter((row) => row.age !== null).length
  ).toFixed(1);

  return (
    <Box sx={{ background: PALETTE.bg, minHeight: '100%', p: { xs: 0, md: 1 } }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="overline"
          sx={{
            color: PALETTE.textSubtle,
            letterSpacing: '0.28em',
            fontWeight: 600,
          }}
        >
          Dashboard Overview
        </Typography>
        <Typography
          variant="h4"
          sx={{ fontWeight: 600, color: PALETTE.text, mt: 0.5 }}
        >
          Welcome back, {greetingName}
          {roleLabel ? ` · ${roleLabel}` : ''}
        </Typography>
        <Typography variant="body2" sx={{ color: PALETTE.textMuted, mt: 1 }}>
          A quick look at how Club Creative is performing today.
        </Typography>
      </Box>

      {/* KPI Cards */}
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2.5}
        sx={{ mb: 4 }}
        flexWrap="wrap"
        useFlexGap
      >
        {stats.map(({ label, value, delta, icon: Icon, accent, bg }) => (
          <Card key={label} sx={{ ...cardSx, flex: 1, minWidth: 200 }}>
            <CardContent>
              <Stack
                direction="row"
                spacing={2}
                alignItems="center"
                sx={{ mb: 1.5 }}
              >
                <Avatar
                  sx={{
                    bgcolor: bg,
                    color: accent,
                    width: 44,
                    height: 44,
                  }}
                >
                  <Icon />
                </Avatar>
                <Box flex={1}>
                  <Typography
                    variant="caption"
                    sx={{
                      color: PALETTE.textSubtle,
                      letterSpacing: '0.18em',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                    }}
                  >
                    {label}
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: 700, color: PALETTE.text }}
                  >
                    {value}
                  </Typography>
                </Box>
              </Stack>
              <Chip
                size="small"
                icon={<TrendingUpIcon sx={{ fontSize: '14px !important' }} />}
                label={`${delta} this week`}
                sx={{
                  bgcolor: PALETTE.surfaceAlt,
                  color: PALETTE.accentDark,
                  border: `1px solid ${PALETTE.border}`,
                  fontWeight: 600,
                  fontSize: 11,
                }}
              />
            </CardContent>
          </Card>
        ))}
      </Stack>

      {/* Gauges */}
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={2.5}
        sx={{ mb: 4 }}
      >
        {[
          { label: 'Engagement', value: 72 },
          { label: 'Conversion', value: 48 },
          { label: 'Retention', value: 86 },
        ].map((g) => (
          <Card key={g.label} sx={{ ...cardSx, flex: 1 }}>
            <CardContent>
              <Typography
                variant="overline"
                sx={{
                  color: PALETTE.textSubtle,
                  letterSpacing: '0.24em',
                  fontWeight: 600,
                }}
              >
                {g.label}
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  mt: 1,
                }}
              >
                <Gauge
                  width={140}
                  height={140}
                  value={g.value}
                  sx={{
                    [`& .${gaugeClasses.valueText}`]: {
                      fontSize: 22,
                      fontWeight: 700,
                      fill: PALETTE.text,
                    },
                    [`& .${gaugeClasses.valueArc}`]: {
                      fill: PALETTE.accent,
                    },
                    [`& .${gaugeClasses.referenceArc}`]: {
                      fill: PALETTE.border,
                    },
                  }}
                />
              </Box>
            </CardContent>
          </Card>
        ))}
      </Stack>

      {/* Charts */}
      <Stack
        direction={{ xs: 'column', lg: 'row' }}
        spacing={2.5}
        sx={{ mb: 4 }}
      >
        <Card sx={{ ...cardSx, flex: 2 }}>
          <CardContent>
            <Typography
              variant="h6"
              sx={{ fontWeight: 600, color: PALETTE.text }}
            >
              Quarterly Performance
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: PALETTE.textMuted, mb: 2 }}
            >
              Comparison of revenue across the past four quarters.
            </Typography>
            <Divider sx={{ borderColor: PALETTE.border, mb: 2 }} />
            <BarChart
              series={[
                { data: [35, 44, 24, 34], label: 'Series 1', color: CHART_COLORS[0] },
                { data: [51, 6, 49, 30], label: 'Series 2', color: CHART_COLORS[1] },
              ]}
              height={280}
              xAxis={[
                {
                  data: ['Q1', 'Q2', 'Q3', 'Q4'],
                  scaleType: 'band',
                  label: 'Quarters',
                },
              ]}
            />
          </CardContent>
        </Card>

        <Card sx={{ ...cardSx, flex: 1 }}>
          <CardContent>
            <Typography
              variant="h6"
              sx={{ fontWeight: 600, color: PALETTE.text }}
            >
              Audience Mix
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: PALETTE.textMuted, mb: 2 }}
            >
              How readers are reaching the platform.
            </Typography>
            <Divider sx={{ borderColor: PALETTE.border, mb: 2 }} />
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <PieChart
                series={[
                  {
                    data: [
                      { id: 0, value: 10, label: 'Direct', color: CHART_COLORS[0] },
                      { id: 1, value: 15, label: 'Organic', color: CHART_COLORS[1] },
                      { id: 2, value: 20, label: 'Social', color: CHART_COLORS[2] },
                    ],
                    innerRadius: 36,
                    outerRadius: 90,
                  },
                ]}
                width={240}
                height={220}
              />
            </Box>
          </CardContent>
        </Card>
      </Stack>

      {/* Summary mini stats */}
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={2.5}
        sx={{ mb: 4 }}
      >
        <Card sx={{ ...cardSx, flex: 1 }}>
          <CardContent>
            <Typography
              variant="overline"
              sx={{
                color: PALETTE.textSubtle,
                letterSpacing: '0.24em',
                fontWeight: 600,
              }}
            >
              Total Users
            </Typography>
            <Typography
              variant="h3"
              sx={{ fontWeight: 700, color: PALETTE.text, mt: 1 }}
            >
              {rows.length}
            </Typography>
            <Typography variant="body2" sx={{ color: PALETTE.textMuted, mt: 1 }}>
              Registered users in the system.
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ ...cardSx, flex: 1 }}>
          <CardContent>
            <Typography
              variant="overline"
              sx={{
                color: PALETTE.textSubtle,
                letterSpacing: '0.24em',
                fontWeight: 600,
              }}
            >
              Average Age
            </Typography>
            <Typography
              variant="h3"
              sx={{ fontWeight: 700, color: PALETTE.text, mt: 1 }}
            >
              {averageAge}
            </Typography>
            <Typography variant="body2" sx={{ color: PALETTE.textMuted, mt: 1 }}>
              Based on the current user roster.
            </Typography>
          </CardContent>
        </Card>
      </Stack>

      {/* DataGrid */}
      <Card sx={{ ...cardSx, mb: 4 }}>
        <CardContent>
          <Typography
            variant="h6"
            sx={{ fontWeight: 600, color: PALETTE.text }}
          >
            Users Overview
          </Typography>
          <Typography variant="body2" sx={{ color: PALETTE.textMuted, mb: 2 }}>
            A quick snapshot of the latest users on the platform.
          </Typography>
          <Divider sx={{ borderColor: PALETTE.border, mb: 2 }} />
          <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={rows}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { pageSize: 5 },
                },
              }}
              pageSizeOptions={[5]}
              checkboxSelection
              disableRowSelectionOnClick
              sx={dataGridSx}
            />
          </Box>
        </CardContent>
      </Card>

      {/* Map */}
      <Card sx={cardSx}>
        <CardContent>
          <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 0.5 }}>
            <PlaceIcon sx={{ color: PALETTE.accent }} />
            <Typography
              variant="h6"
              sx={{ fontWeight: 600, color: PALETTE.text }}
            >
              Office Location
            </Typography>
          </Stack>
          <Typography variant="body2" sx={{ color: PALETTE.textMuted, mb: 2 }}>
            National University - Manila Campus.
          </Typography>
          <Divider sx={{ borderColor: PALETTE.border, mb: 2 }} />
          <Box
            sx={{
              height: 420,
              width: '100%',
              borderRadius: 2,
              overflow: 'hidden',
              border: `1px solid ${PALETTE.border}`,
            }}
          >
            <MapContainer
              center={[14.604253, 120.994314]}
              zoom={13}
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
              />
              <Marker position={[14.604253, 120.994314]}>
                <Popup>
                  National University-Manila <br />
                  <p>551 f Jhocson St, Sampaloc, Manila, 1000 Metro Manila</p>
                </Popup>
              </Marker>
            </MapContainer>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default DashboardPage;
