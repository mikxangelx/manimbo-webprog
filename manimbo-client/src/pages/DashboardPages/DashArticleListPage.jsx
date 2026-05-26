import { useEffect, useMemo, useState } from 'react';
import {
  Alert,
  Avatar,
  Box,
  Button,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControlLabel,
  InputAdornment,
  MenuItem,
  Paper,
  Stack,
  Switch,
  TextField,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import DraftsOutlinedIcon from '@mui/icons-material/DraftsOutlined';
import FilterAltOffOutlinedIcon from '@mui/icons-material/FilterAltOffOutlined';
import SearchIcon from '@mui/icons-material/Search';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import SlideshowOutlinedIcon from '@mui/icons-material/SlideshowOutlined';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';
import { DataGrid } from '@mui/x-data-grid';
import {
  fetchArticles,
  createArticle,
  updateArticle,
} from '../../services/ArticleService';

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
  orange: '#f48b18',
};

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
  px: 2,
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
    outline: 'none',
    fontSize: 13,
  },
  '& .MuiDataGrid-row:hover': {
    backgroundColor: '#fff8f0',
  },
  '& .MuiDataGrid-footerContainer': {
    backgroundColor: '#fffdfa',
    borderTop: `1px solid ${PALETTE.border}`,
  },
};

const textFieldSx = {
  '& .MuiOutlinedInput-root': {
    background: PALETTE.surface,
    borderRadius: 1,
    '& fieldset': { borderColor: PALETTE.border },
    '&:hover fieldset': { borderColor: PALETTE.accent },
    '&.Mui-focused fieldset': { borderColor: PALETTE.accent },
  },
  '& .MuiInputLabel-root': { color: PALETTE.textMuted },
  '& .MuiInputLabel-root.Mui-focused': { color: PALETTE.accent },
};

const blankForm = {
  title: '',
  name: '',
  description: '',
  imageUrl: '',
  content: '',
  isActive: true,
};

const toSlug = (value) =>
  String(value || '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

const truncate = (value, max = 80) => {
  const str = String(value ?? '');
  return str.length > max ? `${str.slice(0, max - 1)}…` : str;
};

const normalizeArticle = (article) => {
  const content = Array.isArray(article.content) ? article.content : [];
  return {
    id: article._id || article.id,
    shortId: String(article._id || article.id || '').slice(-6).toUpperCase(),
    name: article.name || '',
    title: article.title || '',
    description: article.description || '',
    imageUrl: article.imageUrl || '',
    content,
    paragraphCount: content.length,
    preview: truncate(content[0] || article.description || ''),
    isActive: typeof article.isActive === 'boolean' ? article.isActive : true,
  };
};

const DashArticleListPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState('');
  const [saving, setSaving] = useState(false);

  const [modal, setModal] = useState({ open: false, id: null });
  const [form, setForm] = useState(blankForm);
  const [errors, setErrors] = useState({});

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const loadArticles = async () => {
    setLoading(true);
    setLoadError('');
    try {
      const { data } = await fetchArticles();
      const list = data?.data ?? data?.articles ?? [];
      setArticles(list.map(normalizeArticle));
    } catch (err) {
      setLoadError(
        err.response?.data?.message ||
          err.message ||
          'Unable to load articles from the server.'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadArticles();
  }, []);

  const openModal = (article) => {
    setModal({ open: true, id: article?.id ?? null });
    setForm(
      article
        ? {
            title: article.title,
            name: article.name,
            description: article.description,
            imageUrl: article.imageUrl,
            content: (article.content || []).join('\n\n'),
            isActive: article.isActive,
          }
        : { ...blankForm }
    );
    setErrors({});
  };

  const closeModal = () => {
    setModal({ open: false, id: null });
    setForm({ ...blankForm });
    setErrors({});
  };

  const handleChange = ({ target: { name, value, checked, type } }) => {
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const nextErrors = {};
    if (!form.title.trim()) nextErrors.title = 'Title is required.';
    const finalName = toSlug(form.name || form.title);
    if (!finalName) nextErrors.name = 'Slug is required.';
    else if (
      articles.some(
        (article) => article.id !== modal.id && article.name === finalName
      )
    ) {
      nextErrors.name = 'Slug already in use.';
    }
    return nextErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = validate();
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }

    const payload = {
      title: form.title.trim(),
      name: toSlug(form.name || form.title),
      description: form.description.trim(),
      imageUrl: form.imageUrl.trim(),
      content: form.content
        .split(/\n+/)
        .map((p) => p.trim())
        .filter(Boolean),
      isActive: form.isActive,
    };

    setSaving(true);
    try {
      if (modal.id) {
        await updateArticle(modal.id, payload);
      } else {
        await createArticle(payload);
      }
      closeModal();
      await loadArticles();
    } catch (err) {
      setErrors({
        submit:
          err.response?.data?.message ||
          err.message ||
          'Unable to save article. Please try again.',
      });
    } finally {
      setSaving(false);
    }
  };

  const handleToggle = async (article) => {
    try {
      await updateArticle(article.id, { isActive: !article.isActive });
      setArticles((prev) =>
        prev.map((a) =>
          a.id === article.id ? { ...a, isActive: !a.isActive } : a
        )
      );
    } catch (err) {
      setLoadError(
        err.response?.data?.message ||
          err.message ||
          'Unable to update article status.'
      );
    }
  };

  const filteredArticles = useMemo(() => {
    const term = search.trim().toLowerCase();
    return articles.filter((article) => {
      const matchesSearch =
        !term ||
        article.title.toLowerCase().includes(term) ||
        article.name.toLowerCase().includes(term) ||
        article.description.toLowerCase().includes(term);
      const matchesStatus =
        statusFilter === 'all' ||
        (statusFilter === 'active' ? article.isActive : !article.isActive);
      return matchesSearch && matchesStatus;
    });
  }, [articles, search, statusFilter]);

  const summary = useMemo(() => {
    const total = articles.length;
    const active = articles.filter((a) => a.isActive).length;
    const paragraphs = articles.reduce(
      (sum, article) => sum + article.paragraphCount,
      0
    );
    return { total, active, inactive: total - active, paragraphs };
  }, [articles]);

  const tableRows = useMemo(
    () =>
      filteredArticles.map((article, index) => ({
        ...article,
        displayId: index + 1,
      })),
    [filteredArticles]
  );

  const resetFilters = () => {
    setSearch('');
    setStatusFilter('all');
  };

  const columns = [
    { field: 'displayId', headerName: 'ID', width: 64 },
    {
      field: 'title',
      headerName: 'Article',
      flex: 1.25,
      minWidth: 260,
      renderCell: ({ row }) => (
        <Stack direction="row" alignItems="center" spacing={1.2}>
          <Avatar
            sx={{
              width: 34,
              height: 34,
              bgcolor: '#f2dfd2',
              color: PALETTE.accentDark,
            }}
          >
            <ArticleOutlinedIcon fontSize="small" />
          </Avatar>
          <Box sx={{ minWidth: 0 }}>
            <Typography
              sx={{ color: PALETTE.text, fontSize: 13, fontWeight: 700 }}
              noWrap
            >
              {row.title}
            </Typography>
            <Typography
              sx={{ color: PALETTE.textSubtle, fontSize: 11, lineHeight: 1.2 }}
              noWrap
            >
              /{row.name}
            </Typography>
          </Box>
        </Stack>
      ),
    },
    { field: 'shortId', headerName: 'Code', width: 90 },
    { field: 'paragraphCount', headerName: 'Paragraphs', width: 120 },
    { field: 'preview', headerName: 'Preview', flex: 1.2, minWidth: 240 },
    {
      field: 'status',
      headerName: 'Status',
      width: 110,
      renderCell: ({ row }) => (
        <Chip
          size="small"
          label={row.isActive ? 'Active' : 'Inactive'}
          sx={
            row.isActive
              ? {
                  bgcolor: '#e8f0e2',
                  color: '#3a5a3a',
                  border: '1px solid #cfdcc1',
                  height: 24,
                  fontSize: 11,
                  fontWeight: 700,
                }
              : {
                  bgcolor: '#f5ece6',
                  color: '#8b4d3b',
                  border: '1px solid #ead7ce',
                  height: 24,
                  fontSize: 11,
                  fontWeight: 700,
                }
          }
        />
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      minWidth: 220,
      sortable: false,
      filterable: false,
      renderCell: ({ row }) => (
        <Stack direction="row" spacing={1} sx={{ py: 0.5 }}>
          <Button
            size="small"
            variant="outlined"
            onClick={() => openModal(row)}
            sx={{ ...outlinedButtonSx, minWidth: 0, px: 1.4, py: 0.35, fontSize: 11 }}
          >
            Edit
          </Button>
          <Button
            size="small"
            variant="contained"
            onClick={() => handleToggle(row)}
            sx={{
              ...primaryButtonSx,
              minWidth: 0,
              px: 1.3,
              py: 0.35,
              fontSize: 11,
              bgcolor: row.isActive ? PALETTE.orange : '#4f9a5a',
              '&:hover': { bgcolor: row.isActive ? '#d86f00' : '#3f7f48' },
            }}
          >
            {row.isActive ? 'Disable' : 'Activate'}
          </Button>
        </Stack>
      ),
    },
  ];

  return (
    <Box sx={{ background: PALETTE.bg, minHeight: '100%', p: { xs: 0, md: 0.5 } }}>
      <Paper
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
            label="Content Management"
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
            A smoother shelf for
            <Box component="span" sx={{ display: 'block' }}>
              managing articles
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
            Search by story details, review publishing status, and keep public
            article records tidy from one lighter workspace.
          </Typography>
        </Box>
        <Button
          startIcon={<AddCircleOutlineIcon />}
          onClick={() => openModal()}
          sx={{
            ...primaryButtonSx,
            position: { xs: 'static', md: 'absolute' },
            right: { md: 28 },
            top: { md: '50%' },
            transform: { md: 'translateY(-50%)' },
            mt: { xs: 2.5, md: 0 },
            width: { xs: '100%', sm: 'auto' },
            boxShadow: '0 14px 28px rgba(95, 75, 61, 0.22)',
          }}
        >
          Add Article
        </Button>
      </Paper>

      {loadError ? (
        <Alert
          severity="error"
          sx={{ mb: 2, borderRadius: 2, border: `1px solid ${PALETTE.border}` }}
        >
          {loadError}
        </Alert>
      ) : null}

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 2 }}>
        {[
          {
            label: 'Total articles',
            value: summary.total,
            note: 'All saved stories',
            icon: <ArticleOutlinedIcon fontSize="small" />,
            tint: '#f2dfd2',
          },
          {
            label: 'Active articles',
            value: summary.active,
            note: 'Visible to readers',
            icon: <VerifiedOutlinedIcon fontSize="small" />,
            tint: '#e4eedc',
          },
          {
            label: 'Inactive articles',
            value: summary.inactive,
            note: 'Hidden from public pages',
            icon: <DraftsOutlinedIcon fontSize="small" />,
            tint: '#f1dfd2',
          },
          {
            label: 'Paragraphs',
            value: summary.paragraphs,
            note: 'Total content blocks',
            icon: <SlideshowOutlinedIcon fontSize="small" />,
            tint: '#f6e6d8',
          },
        ].map((s) => (
          <Paper key={s.label} sx={{ ...cardSx, flex: 1, p: 2.1 }}>
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
          </Paper>
        ))}
      </Stack>

      <Paper sx={{ ...cardSx, p: { xs: 1.5, sm: 2 }, overflow: 'hidden' }}>
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={1.2}
          alignItems={{ xs: 'stretch', md: 'center' }}
          sx={{ mb: 2 }}
        >
          <Box sx={{ flex: 1, minWidth: { md: 360 } }}>
            <Typography sx={{ color: PALETTE.textSubtle, fontSize: 11, fontWeight: 700, mb: 0.5 }}>
              Search articles
            </Typography>
            <TextField
              placeholder="Search articles by title, slug, or description"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              size="small"
              fullWidth
              sx={textFieldSx}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon
                        fontSize="small"
                        sx={{ color: PALETTE.textSubtle }}
                      />
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Box>
          <TextField
            select
            size="small"
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            sx={{ ...textFieldSx, minWidth: { xs: '100%', md: 150 }, mt: { md: '21px' } }}
          >
            <MenuItem value="all">Status</MenuItem>
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="inactive">Inactive</MenuItem>
          </TextField>
          <Button
            startIcon={<FilterAltOffOutlinedIcon />}
            onClick={resetFilters}
            sx={{ ...outlinedButtonSx, mt: { md: '21px' }, whiteSpace: 'nowrap' }}
          >
            Clear Filters
          </Button>
        </Stack>
        {loading ? (
          <Stack alignItems="center" sx={{ py: 6 }}>
            <CircularProgress sx={{ color: PALETTE.accent }} />
          </Stack>
        ) : tableRows.length ? (
          <Box sx={{ height: { xs: 480, sm: 548 }, width: '100%' }}>
            <DataGrid
              rows={tableRows}
              columns={columns}
              disableRowSelectionOnClick
              rowHeight={58}
              pageSizeOptions={[5, 10]}
              initialState={{
                pagination: { paginationModel: { pageSize: 5, page: 0 } },
              }}
              sx={dataGridSx}
            />
          </Box>
        ) : (
          <Alert
            severity="info"
            sx={{
              borderRadius: 2,
              border: `1px solid ${PALETTE.border}`,
              background: PALETTE.surfaceAlt,
              color: PALETTE.textMuted,
            }}
          >
            No articles match the current search or filter. Use Add Article to
            create one.
          </Alert>
        )}
      </Paper>

      <Dialog
        open={modal.open}
        onClose={closeModal}
        fullWidth
        fullScreen={isMobile}
        maxWidth="md"
        slotProps={{
          paper: {
            sx: {
              borderRadius: isMobile ? 0 : 3,
              border: `1px solid ${PALETTE.border}`,
              background: PALETTE.surface,
            },
          },
        }}
      >
        <Box component="form" onSubmit={handleSubmit}>
          <DialogTitle sx={{ color: PALETTE.text, fontWeight: 600, pb: 1 }}>
            {modal.id ? 'Edit Article' : 'Add Article'}
            <Typography
              variant="body2"
              sx={{ color: PALETTE.textMuted, mt: 0.5 }}
            >
              {modal.id
                ? 'Update the article details below.'
                : 'Create a new article. The slug auto-generates from the title if left blank.'}
            </Typography>
          </DialogTitle>
          <Divider sx={{ borderColor: PALETTE.border }} />
          <DialogContent sx={{ px: { xs: 2, sm: 3 }, py: 3 }}>
            {errors.submit ? (
              <Alert severity="error" sx={{ mb: 2 }}>
                {errors.submit}
              </Alert>
            ) : null}
            <Stack spacing={2}>
              <TextField
                name="title"
                label="Title"
                value={form.title}
                onChange={handleChange}
                error={Boolean(errors.title)}
                helperText={errors.title}
                fullWidth
                sx={textFieldSx}
              />
              <TextField
                name="name"
                label="Slug (optional — generated from title)"
                value={form.name}
                onChange={handleChange}
                error={Boolean(errors.name)}
                helperText={errors.name}
                fullWidth
                sx={textFieldSx}
              />
              <TextField
                name="description"
                label="Short Description"
                value={form.description}
                onChange={handleChange}
                fullWidth
                multiline
                rows={2}
                sx={textFieldSx}
              />
              <TextField
                name="imageUrl"
                label="Image URL"
                value={form.imageUrl}
                onChange={handleChange}
                fullWidth
                sx={textFieldSx}
              />
              <TextField
                name="content"
                label="Paragraphs (one per blank line)"
                value={form.content}
                onChange={handleChange}
                fullWidth
                multiline
                rows={6}
                sx={textFieldSx}
              />
              <FormControlLabel
                control={
                  <Switch
                    name="isActive"
                    checked={form.isActive}
                    onChange={handleChange}
                    sx={{
                      '& .MuiSwitch-switchBase.Mui-checked': {
                        color: PALETTE.accent,
                      },
                      '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                        backgroundColor: PALETTE.accent,
                      },
                    }}
                  />
                }
                label={
                  <Typography sx={{ color: PALETTE.textMuted }}>
                    {form.isActive
                      ? 'Article status: Active'
                      : 'Article status: Inactive'}
                  </Typography>
                }
              />
            </Stack>
          </DialogContent>
          <Divider sx={{ borderColor: PALETTE.border }} />
          <DialogActions sx={{ px: 3, py: 2 }}>
            <Button onClick={closeModal} sx={outlinedButtonSx} disabled={saving}>
              Cancel
            </Button>
            <Button type="submit" sx={primaryButtonSx} disabled={saving}>
              {saving
                ? 'Saving…'
                : modal.id
                ? 'Update Article'
                : 'Save Article'}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  );
};

export default DashArticleListPage;
