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
  IconButton,
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
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import FilterAltOffOutlinedIcon from '@mui/icons-material/FilterAltOffOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import SearchIcon from '@mui/icons-material/Search';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import PersonOffOutlinedIcon from '@mui/icons-material/PersonOffOutlined';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';
import { DataGrid } from '@mui/x-data-grid';
import {
  fetchUsers,
  createUser,
  updateUser,
} from '../../services/UserService';

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
  peach: '#f1dfcf',
  green: '#e8f0e2',
  orange: '#f48b18',
  danger: '#d87724',
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
  '& .MuiCheckbox-root.Mui-checked': {
    color: PALETTE.accent,
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

const roles = ['admin', 'editor', 'viewer'];
const genders = ['male', 'female', 'other'];

const blankForm = {
  firstName: '',
  lastName: '',
  age: '',
  gender: '',
  contactNumber: '',
  email: '',
  type: 'editor',
  username: '',
  password: '',
  address: '',
  isActive: true,
};

const labelize = (value) =>
  value ? `${value.charAt(0).toUpperCase()}${value.slice(1)}` : '';

const getInitials = (user) =>
  `${user.firstName?.charAt(0) || ''}${user.lastName?.charAt(0) || ''}`.toUpperCase();

const normalizeUser = (user) => ({
  id: user._id || user.id,
  firstName: String(user.firstName ?? ''),
  lastName: String(user.lastName ?? ''),
  age: String(user.age ?? ''),
  gender: String(user.gender ?? '').toLowerCase(),
  contactNumber: String(user.contactNumber ?? ''),
  email: String(user.email ?? '').toLowerCase(),
  type: roles.includes(String(user.type ?? '').toLowerCase())
    ? String(user.type).toLowerCase()
    : 'viewer',
  username: String(user.username ?? '').toLowerCase(),
  address: String(user.address ?? ''),
  isActive: typeof user.isActive === 'boolean' ? user.isActive : true,
});

const UsersPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState('');
  const [saving, setSaving] = useState(false);
  const [modal, setModal] = useState({ open: false, id: null });
  const [form, setForm] = useState(blankForm);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [genderFilter, setGenderFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const loadUsers = async () => {
    setLoading(true);
    setLoadError('');
    try {
      const { data } = await fetchUsers();
      setUsers((data.users || []).map(normalizeUser));
    } catch (err) {
      setLoadError(
        err.response?.data?.message ||
          err.message ||
          'Unable to load users from the server.'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const resetForm = () => {
    setForm({ ...blankForm });
    setErrors({});
  };

  const openModal = (user) => {
    setModal({ open: true, id: user?.id ?? null });
    setForm(user ? { ...blankForm, ...user, password: '' } : { ...blankForm });
    setErrors({});
  };

  const closeModal = () => {
    setModal({ open: false, id: null });
    setShowPassword(false);
    resetForm();
  };

  const handleChange = ({ target: { name, value, checked, type } }) => {
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const nextErrors = {};
    const email = form.email.trim().toLowerCase();
    const username = form.username.trim();
    const password = form.password;
    const age = String(form.age).trim();
    const contactNumber = String(form.contactNumber).trim();

    [
      ['firstName', 'First name'],
      ['lastName', 'Last name'],
      ['age', 'Age'],
      ['gender', 'Gender'],
      ['contactNumber', 'Contact number'],
      ['email', 'Email'],
      ['type', 'Role'],
      ['username', 'Username'],
      ['address', 'Address'],
    ].forEach(([key, label]) => {
      if (!String(form[key] ?? '').trim()) {
        nextErrors[key] = `${label} is required.`;
      }
    });

    if (!modal.id && !password) {
      nextErrors.password = 'Password is required.';
    }

    if (!nextErrors.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = 'Enter a valid email address.';
    }
    if (
      !nextErrors.email &&
      users.some((user) => user.id !== modal.id && user.email === email)
    ) {
      nextErrors.email = 'Email address already exists.';
    }

    if (!nextErrors.username && /\s/.test(username)) {
      nextErrors.username = 'Username must not contain spaces.';
    }
    if (
      !nextErrors.username &&
      users.some(
        (user) =>
          user.id !== modal.id && user.username === username.toLowerCase()
      )
    ) {
      nextErrors.username = 'Username already exists.';
    }

    if (!nextErrors.password && password && password.length < 8) {
      nextErrors.password = 'Password must be at least 8 characters.';
    }

    if (!nextErrors.age && !/^\d+$/.test(age)) {
      nextErrors.age = 'Age must be a number only.';
    }

    if (!nextErrors.contactNumber && !/^\d{11}$/.test(contactNumber)) {
      nextErrors.contactNumber = 'Contact number must be 11 digits.';
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
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      age: String(form.age).trim(),
      gender: form.gender.trim().toLowerCase(),
      contactNumber: String(form.contactNumber).trim(),
      email: form.email.trim().toLowerCase(),
      type: form.type.trim().toLowerCase(),
      username: form.username.trim().toLowerCase(),
      address: form.address.trim(),
      isActive: form.isActive,
    };
    if (form.password) payload.password = form.password;

    setSaving(true);
    try {
      if (modal.id) {
        await updateUser(modal.id, payload);
      } else {
        await createUser(payload);
      }
      closeModal();
      await loadUsers();
    } catch (err) {
      setErrors({
        submit:
          err.response?.data?.message ||
          err.message ||
          'Unable to save user. Please try again.',
      });
    } finally {
      setSaving(false);
    }
  };

  const toggleStatus = async (user) => {
    try {
      await updateUser(user.id, { isActive: !user.isActive });
      setUsers((prev) =>
        prev.map((u) =>
          u.id === user.id ? { ...u, isActive: !u.isActive } : u
        )
      );
    } catch (err) {
      setLoadError(
        err.response?.data?.message ||
          err.message ||
          'Unable to update user status.'
      );
    }
  };

  const fieldProps = (name, label, extra = {}) => ({
    name,
    label,
    value: form[name] ?? '',
    onChange: handleChange,
    error: Boolean(errors[name]),
    helperText: errors[name],
    fullWidth: true,
    sx: textFieldSx,
    ...extra,
  });

  const filteredUsers = useMemo(() => {
    const term = search.trim().toLowerCase();
    return users.filter((user) => {
      const matchesSearch =
        !term ||
        user.firstName.toLowerCase().includes(term) ||
        user.lastName.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term) ||
        user.username.toLowerCase().includes(term);

      const matchesRole = roleFilter === 'all' || user.type === roleFilter;
      const matchesGender =
        genderFilter === 'all' || user.gender === genderFilter;
      const matchesStatus =
        statusFilter === 'all' ||
        (statusFilter === 'active' ? user.isActive : !user.isActive);

      return matchesSearch && matchesRole && matchesGender && matchesStatus;
    });
  }, [users, search, roleFilter, genderFilter, statusFilter]);

  const summary = useMemo(() => {
    const total = users.length;
    const active = users.filter((u) => u.isActive).length;
    const admins = users.filter((u) => u.type === 'admin').length;
    return { total, active, inactive: total - active, admins };
  }, [users]);

  const tableRows = useMemo(
    () => filteredUsers.map((user, index) => ({ ...user, displayId: index + 1 })),
    [filteredUsers]
  );

  const resetFilters = () => {
    setSearch('');
    setRoleFilter('all');
    setGenderFilter('all');
    setStatusFilter('all');
  };

  const columns = [
    {
      field: 'displayId',
      headerName: 'ID',
      width: 64,
    },
    {
      field: 'fullName',
      headerName: 'User',
      flex: 1.1,
      minWidth: 210,
      valueGetter: (_, row) => `${row.firstName} ${row.lastName}`.trim(),
      renderCell: ({ row }) => (
        <Stack direction="row" alignItems="center" spacing={1.2}>
          <Avatar
            sx={{
              width: 34,
              height: 34,
              bgcolor: PALETTE.accent,
              color: '#fff',
              fontSize: 13,
              fontWeight: 700,
              boxShadow: 'inset 0 0 0 2px rgba(255,255,255,0.35)',
            }}
          >
            {getInitials(row)}
          </Avatar>
          <Box sx={{ minWidth: 0 }}>
            <Typography
              sx={{
                color: PALETTE.text,
                fontSize: 13,
                fontWeight: 700,
                lineHeight: 1.15,
              }}
              noWrap
            >
              {`${row.firstName} ${row.lastName}`.trim()}
            </Typography>
            <Typography
              sx={{ color: PALETTE.textSubtle, fontSize: 11, lineHeight: 1.2 }}
              noWrap
            >
              @{row.username}
            </Typography>
          </Box>
        </Stack>
      ),
    },
    { field: 'email', headerName: 'Email', flex: 1.2, minWidth: 220 },
    { field: 'age', headerName: 'Age', width: 74 },
    {
      field: 'gender',
      headerName: 'Gender',
      minWidth: 105,
      valueGetter: (_, row) => labelize(row.gender),
    },
    { field: 'contactNumber', headerName: 'Contact', minWidth: 150 },
    {
      field: 'type',
      headerName: 'Role',
      minWidth: 110,
      renderCell: ({ row }) => (
        <Chip
          size="small"
          label={labelize(row.type)}
          sx={{
            height: 24,
            bgcolor:
              row.type === 'admin'
                ? '#f3e5d9'
                : row.type === 'editor'
                ? '#f8ead0'
                : '#eef3e8',
            color:
              row.type === 'admin'
                ? PALETTE.accentDark
                : row.type === 'editor'
                ? '#935c13'
                : '#526d42',
            border: '1px solid rgba(95, 75, 61, 0.08)',
            fontSize: 11,
            fontWeight: 700,
          }}
        />
      ),
    },
    {
      field: 'status',
      headerName: 'Status',
      minWidth: 110,
      sortable: false,
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
            sx={{
              ...outlinedButtonSx,
              minWidth: 0,
              px: 1.4,
              py: 0.35,
              fontSize: 11,
            }}
          >
            Edit
          </Button>
          <Button
            size="small"
            variant="contained"
            onClick={() => toggleStatus(row)}
            sx={
              row.isActive
                ? {
                    ...primaryButtonSx,
                    minWidth: 0,
                    px: 1.3,
                    py: 0.35,
                    fontSize: 11,
                    bgcolor: PALETTE.orange,
                    '&:hover': { bgcolor: '#d86f00' },
                  }
                : {
                    ...primaryButtonSx,
                    minWidth: 0,
                    px: 1.3,
                    py: 0.35,
                    fontSize: 11,
                    bgcolor: '#4f9a5a',
                    '&:hover': { bgcolor: '#3f7f48' },
                  }
            }
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
        <Box sx={{ textAlign: 'center', mx: 'auto', maxWidth: 560 }}>
          <Chip
            size="small"
            label="User Management"
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
            A cleaner space to
            <Box component="span" sx={{ display: 'block' }}>
              manage users
            </Box>
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: PALETTE.textMuted,
              mt: 1.8,
              mx: 'auto',
              maxWidth: 460,
              lineHeight: 1.55,
            }}
          >
            Search faster, filter more clearly, and update user records from a
            layout that feels lighter and easier to scan.
          </Typography>
        </Box>
        <Button
          startIcon={<PersonAddAlt1Icon />}
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
          Add User
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
            label: 'Total users',
            value: summary.total,
            note: 'All records in the list',
            icon: <PeopleAltOutlinedIcon fontSize="small" />,
            tint: '#f2dfd2',
          },
          {
            label: 'Active users',
            value: summary.active,
            note: 'Currently enabled accounts',
            icon: <VerifiedUserOutlinedIcon fontSize="small" />,
            tint: '#e4eedc',
          },
          {
            label: 'Inactive users',
            value: summary.inactive,
            note: 'Accounts that need attention',
            icon: <PersonOffOutlinedIcon fontSize="small" />,
            tint: '#f1dfd2',
          },
          {
            label: 'Admins',
            value: summary.admins,
            note: 'Higher-access members',
            icon: <AdminPanelSettingsOutlinedIcon fontSize="small" />,
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
              Search users
            </Typography>
            <TextField
              placeholder="Search by first name, last name, email, or username"
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
            value={roleFilter}
            onChange={(event) => setRoleFilter(event.target.value)}
            sx={{ ...textFieldSx, minWidth: { xs: '100%', md: 150 }, mt: { md: '21px' } }}
          >
            <MenuItem value="all">Role</MenuItem>
            {roles.map((role) => (
              <MenuItem key={role} value={role}>
                {labelize(role)}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            size="small"
            value={genderFilter}
            onChange={(event) => setGenderFilter(event.target.value)}
            sx={{ ...textFieldSx, minWidth: { xs: '100%', md: 150 }, mt: { md: '21px' } }}
          >
            <MenuItem value="all">Gender</MenuItem>
            {genders.map((gender) => (
              <MenuItem key={gender} value={gender}>
                {labelize(gender)}
              </MenuItem>
            ))}
          </TextField>
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
          <Box
            sx={{
              height: { xs: 480, sm: 548 },
              width: '100%',
              minWidth: 0,
            }}
          >
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
            No users match the current search or filter. Try adjusting them, or
            use Add User to create a new record.
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
            {modal.id ? 'Edit User' : 'Add User'}
            <Typography
              variant="body2"
              sx={{ color: PALETTE.textMuted, mt: 0.5 }}
            >
              {modal.id
                ? 'Update this user’s information below. Leave password blank to keep it unchanged.'
                : 'Fill in the details to create a new user account.'}
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
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField {...fieldProps('firstName', 'First Name')} />
                <TextField {...fieldProps('lastName', 'Last Name')} />
              </Stack>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField {...fieldProps('age', 'Age')} />
                <TextField {...fieldProps('gender', 'Gender', { select: true })}>
                  {genders.map((gender) => (
                    <MenuItem key={gender} value={gender}>
                      {labelize(gender)}
                    </MenuItem>
                  ))}
                </TextField>
              </Stack>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField {...fieldProps('contactNumber', 'Contact Number')} />
                <TextField
                  {...fieldProps('email', 'Email Address', { type: 'email' })}
                />
              </Stack>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField {...fieldProps('type', 'Role', { select: true })}>
                  {roles.map((role) => (
                    <MenuItem key={role} value={role}>
                      {labelize(role)}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField {...fieldProps('username', 'Username')} />
              </Stack>
              <TextField
                {...fieldProps('password', modal.id ? 'New Password (optional)' : 'Password', {
                  type: showPassword ? 'text' : 'password',
                  slotProps: {
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            edge="end"
                            onClick={() => setShowPassword((prev) => !prev)}
                            onMouseDown={(event) => event.preventDefault()}
                            aria-label={
                              showPassword ? 'Hide password' : 'Show password'
                            }
                            sx={{ color: PALETTE.textSubtle }}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    },
                  },
                })}
              />
              <TextField
                {...fieldProps('address', 'Address', {
                  multiline: true,
                  rows: 3,
                })}
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
                      ? 'User status: Active'
                      : 'User status: Inactive'}
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
                ? 'Update User'
                : 'Save User'}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  );
};

export default UsersPage;
