import { useRef } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { BarChart } from '@mui/x-charts/BarChart';
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';
import { PieChart } from '@mui/x-charts/PieChart';
import { DataGrid } from '@mui/x-data-grid';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutlined';
import FilterListIcon from '@mui/icons-material/FilterList';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import DonutLargeOutlinedIcon from '@mui/icons-material/DonutLargeOutlined';
import FactCheckOutlinedIcon from '@mui/icons-material/FactCheckOutlined';
import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined';

const PALETTE = {
  bg: '#fbfaf8',
  surface: '#ffffff',
  surfaceAlt: '#fcf8f3',
  border: '#eee5db',
  text: '#2f241f',
  textMuted: '#6e5b4d',
  textSubtle: '#a17f64',
  accent: '#8b7564',
  accentDark: '#5f4b3d',
};

const CHART_COLORS = ['#8b7564', '#a17f64', '#cfb49d', '#5f4b3d', '#d9c4ad'];

const cardSx = {
  borderRadius: 4,
  border: `1px solid ${PALETTE.border}`,
  background:
    'linear-gradient(180deg, rgba(255,255,255,0.96) 0%, rgba(253,249,244,0.96) 100%)',
  boxShadow: '0 14px 34px rgba(95, 74, 49, 0.07)',
};

const primaryButtonSx = {
  bgcolor: PALETTE.text,
  color: '#fff',
  textTransform: 'none',
  fontWeight: 600,
  letterSpacing: '0.04em',
  borderRadius: 999,
  px: 2.5,
  '&:hover': { bgcolor: PALETTE.accentDark },
};

const outlinedButtonSx = {
  borderColor: PALETTE.border,
  color: PALETTE.text,
  textTransform: 'none',
  fontWeight: 600,
  letterSpacing: '0.04em',
  borderRadius: 999,
  px: 2.5,
  background: PALETTE.surface,
  '&:hover': {
    borderColor: PALETTE.accent,
    background: PALETTE.surfaceAlt,
  },
};

const dataGridSx = {
  border: 'none',
  color: PALETTE.text,
  fontFamily: 'inherit',
  '& .MuiDataGrid-columnHeaders': {
    backgroundColor: '#fffdfa',
    color: PALETTE.text,
    fontWeight: 700,
    borderBottom: `1px solid ${PALETTE.border}`,
  },
  '& .MuiDataGrid-columnHeaderTitle': {
    fontSize: 12,
    letterSpacing: '0.01em',
  },
  '& .MuiDataGrid-cell': {
    color: PALETTE.textMuted,
    borderBottom: `1px solid ${PALETTE.border}`,
    fontSize: 13,
  },
  '& .MuiDataGrid-row:hover': {
    backgroundColor: '#fff8f0',
  },
  '& .MuiDataGrid-footerContainer': {
    backgroundColor: '#fffdfa',
    borderTop: `1px solid ${PALETTE.border}`,
  },
  '& .MuiCheckbox-root.Mui-checked': {
    color: PALETTE.accent,
  },
};

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'firstName', headerName: 'First name', width: 150, editable: true },
  { field: 'lastName', headerName: 'Last name', width: 150, editable: true },
  { field: 'age', headerName: 'Age', type: 'number', width: 110, editable: true },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
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

const reportStats = [
  {
    label: 'Generated',
    value: '89',
    note: 'Reports created this cycle',
    icon: <AssessmentOutlinedIcon fontSize="small" />,
    tint: '#f2dfd2',
  },
  {
    label: 'Completed',
    value: '71',
    note: 'Finished reports',
    icon: <FactCheckOutlinedIcon fontSize="small" />,
    tint: '#e4eedc',
  },
  {
    label: 'Completion',
    value: '78%',
    note: 'On-time performance',
    icon: <TrendingUpOutlinedIcon fontSize="small" />,
    tint: '#f1dfd2',
  },
  {
    label: 'Categories',
    value: '4',
    note: 'Active report groups',
    icon: <DonutLargeOutlinedIcon fontSize="small" />,
    tint: '#f6e6d8',
  },
];

const ReportsPage = () => {
  const printRef = useRef(null);

  const handlePrint = () => {
    const printContent = printRef.current;

    if (!printContent) {
      return;
    }

    const printWindow = window.open('', '_blank', 'width=1200,height=900');

    if (!printWindow) {
      return;
    }

    const headMarkup = Array.from(
      document.querySelectorAll('style, link[rel="stylesheet"]')
    )
      .map((node) => node.outerHTML)
      .join('');

    const exportedAt = new Intl.DateTimeFormat('en-US', {
      dateStyle: 'long',
      timeStyle: 'short',
    }).format(new Date());

    printWindow.document.write(`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Print Report</title>
          ${headMarkup}
          <style>
            @page {
              size: A4;
              margin: 16mm;
            }

            * { box-sizing: border-box; }

            body {
              margin: 0;
              font-family: 'Segoe UI', Arial, Helvetica, sans-serif;
              background: #fff;
              color: #2f241f;
            }

            .report-shell { padding: 28px; }

            .report-header {
              margin-bottom: 24px;
              padding-bottom: 14px;
              border-bottom: 1px solid #efe3d7;
            }

            .report-header .eyebrow {
              font-size: 11px;
              font-weight: 600;
              letter-spacing: 0.28em;
              text-transform: uppercase;
              color: #a17f64;
              margin: 0 0 8px;
            }

            .report-header h1 {
              margin: 0 0 6px;
              font-size: 28px;
              font-weight: 700;
              color: #2f241f;
            }

            .report-header p {
              margin: 4px 0;
              font-size: 13px;
              color: #6e5b4d;
              line-height: 1.6;
            }

            .report-content .MuiCard-root {
              box-shadow: none !important;
              border: 1px solid #efe3d7;
              border-radius: 12px;
              break-inside: avoid;
              page-break-inside: avoid;
              margin-bottom: 16px;
            }

            .report-content .MuiCardContent-root {
              padding: 20px;
            }

            .report-content svg {
              max-width: 100%;
            }
          </style>
        </head>
        <body>
          <main class="report-shell">
            <header class="report-header">
              <p class="eyebrow">Club Creative</p>
              <h1>Reports Summary</h1>
              <p>Analytics overview for generated reports, category breakdown, and completion performance.</p>
              <p>Prepared on ${exportedAt}</p>
            </header>
            <section class="report-content">
              ${printContent.outerHTML}
            </section>
          </main>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  return (
    <Box sx={{ background: PALETTE.bg, minHeight: '100%', p: { xs: 0, md: 0.5 } }}>
      <Card
        sx={{
          ...cardSx,
          position: 'relative',
          overflow: 'hidden',
          mb: 2,
          px: { xs: 2.5, md: 5 },
          py: { xs: 3, md: 4.5 },
          background:
            'linear-gradient(100deg, rgba(255,253,250,0.98) 0%, rgba(250,241,232,0.96) 100%)',
        }}
      >
        <Box sx={{ textAlign: 'center', mx: 'auto', maxWidth: 580 }}>
          <Chip
            size="small"
            label="Analytics"
            sx={{
              bgcolor: '#efe2d5',
              color: PALETTE.accentDark,
              fontSize: 11,
              fontWeight: 700,
              mb: 1.5,
            }}
          />
          <Typography
            variant="h3"
            sx={{
              color: PALETTE.text,
              fontWeight: 800,
              lineHeight: 0.95,
              fontSize: { xs: 30, md: 42 },
            }}
          >
            A clearer view of
            <Box component="span" sx={{ display: 'block' }}>
              report activity
            </Box>
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: PALETTE.textMuted,
              mt: 1.8,
              mx: 'auto',
              maxWidth: 470,
              lineHeight: 1.55,
            }}
          >
            Review generated reports, category breakdowns, and completion
            performance from a layout that matches the dashboard tools.
          </Typography>
        </Box>

        <Stack
          direction="row"
          spacing={1}
          flexWrap="wrap"
          useFlexGap
          sx={{
            position: { xs: 'static', md: 'absolute' },
            right: { md: 28 },
            top: { md: '50%' },
            transform: { md: 'translateY(-50%)' },
            mt: { xs: 2.5, md: 0 },
            justifyContent: { xs: 'center', md: 'flex-end' },
          }}
        >
          <Button startIcon={<AddCircleOutlineIcon />} sx={primaryButtonSx}>
            Generate
          </Button>
          <Button
            startIcon={<PictureAsPdfIcon />}
            onClick={handlePrint}
            sx={outlinedButtonSx}
          >
            Export
          </Button>
          <Button startIcon={<FilterListIcon />} sx={outlinedButtonSx}>
            Filter
          </Button>
        </Stack>
      </Card>

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 2 }}>
        {reportStats.map((s) => (
          <Card key={s.label} sx={{ ...cardSx, flex: 1, p: 2.1 }}>
            <Stack direction="row" spacing={1.4} alignItems="flex-start">
              <Box
                sx={{
                  display: 'grid',
                  placeItems: 'center',
                  width: 38,
                  height: 38,
                  flex: '0 0 auto',
                  borderRadius: '50%',
                  bgcolor: s.tint,
                  color: PALETTE.accentDark,
                }}
              >
                {s.icon}
              </Box>
              <Box sx={{ minWidth: 0 }}>
                <Typography sx={{ color: PALETTE.textSubtle, fontSize: 11, fontWeight: 700 }}>
                  {s.label}
                </Typography>
                <Typography sx={{ color: PALETTE.text, fontSize: 30, fontWeight: 800, lineHeight: 1 }}>
                  {s.value}
                </Typography>
                <Typography sx={{ color: PALETTE.textSubtle, fontSize: 11, mt: 1.2 }}>
                  {s.note}
                </Typography>
              </Box>
            </Stack>
          </Card>
        ))}
      </Stack>

      <Stack ref={printRef} spacing={2}>
        {/* Bar Chart */}
        <Card sx={cardSx}>
          <CardContent>
            <Typography
              variant="overline"
              sx={{
                color: PALETTE.textSubtle,
                letterSpacing: '0.24em',
                fontWeight: 600,
              }}
            >
              Monthly Output
            </Typography>
            <Typography
              variant="h6"
              sx={{ fontWeight: 600, color: PALETTE.text, mt: 0.5 }}
            >
              Monthly Report Output
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: PALETTE.textMuted, mb: 2 }}
            >
              This chart compares how many reports were generated and how many
              were completed across the last four months.
            </Typography>
            <Divider sx={{ borderColor: PALETTE.border, mb: 2 }} />
            <BarChart
              series={[
                {
                  data: [18, 24, 20, 27],
                  label: 'Generated',
                  color: CHART_COLORS[0],
                },
                {
                  data: [12, 19, 17, 23],
                  label: 'Completed',
                  color: CHART_COLORS[1],
                },
              ]}
              height={300}
              xAxis={[
                {
                  data: ['January', 'February', 'March', 'April'],
                  scaleType: 'band',
                  label: 'Months',
                },
              ]}
            />
          </CardContent>
        </Card>

        {/* Pie + Gauge */}
        <Stack direction={{ xs: 'column', lg: 'row' }} spacing={3}>
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
                Category Share
              </Typography>
              <Typography
                variant="h6"
                sx={{ fontWeight: 600, color: PALETTE.text, mt: 0.5 }}
              >
                Report Category Share
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: PALETTE.textMuted, mb: 2 }}
              >
                Distribution of report requests by category for the current
                reporting period.
              </Typography>
              <Divider sx={{ borderColor: PALETTE.border, mb: 2 }} />
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <PieChart
                  series={[
                    {
                      data: [
                        { id: 0, value: 14, label: 'Sales', color: CHART_COLORS[0] },
                        { id: 1, value: 10, label: 'Users', color: CHART_COLORS[1] },
                        { id: 2, value: 8, label: 'Inventory', color: CHART_COLORS[2] },
                        { id: 3, value: 6, label: 'Finance', color: CHART_COLORS[3] },
                      ],
                      innerRadius: 36,
                      outerRadius: 95,
                    },
                  ]}
                  width={260}
                  height={240}
                />
              </Box>
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
                Completion
              </Typography>
              <Typography
                variant="h6"
                sx={{ fontWeight: 600, color: PALETTE.text, mt: 0.5 }}
              >
                Completion Rate
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: PALETTE.textMuted, mb: 2 }}
              >
                Current percentage of reports completed on time based on the
                latest reporting cycle.
              </Typography>
              <Divider sx={{ borderColor: PALETTE.border, mb: 2 }} />
              <Box
                sx={{
                  minHeight: 220,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Gauge
                  width={200}
                  height={200}
                  value={78}
                  sx={{
                    [`& .${gaugeClasses.valueText}`]: {
                      fontSize: 28,
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
        </Stack>

        {/* DataGrid */}
        <Card sx={cardSx}>
          <CardContent>
            <Typography
              variant="overline"
              sx={{
                color: PALETTE.textSubtle,
                letterSpacing: '0.24em',
                fontWeight: 600,
              }}
            >
              Roster
            </Typography>
            <Typography
              variant="h6"
              sx={{ fontWeight: 600, color: PALETTE.text, mt: 0.5 }}
            >
              Recent Entries
            </Typography>
            <Typography variant="body2" sx={{ color: PALETTE.textMuted, mb: 2 }}>
              Latest records included in this reporting cycle.
            </Typography>
            <Divider sx={{ borderColor: PALETTE.border, mb: 2 }} />
            <Box sx={{ height: 400 }}>
              <DataGrid
                rows={rows}
                columns={columns}
                experimentalFeatures={{ newEditingApi: true }}
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
      </Stack>
    </Box>
  );
};

export default ReportsPage;
