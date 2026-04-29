import { useState } from 'react';
import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  IconButton,
  InputAdornment,
  MenuItem,
  Stack,
  Switch,
  TextField,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import PersonAddAlt1OutlinedIcon from '@mui/icons-material/PersonAddAlt1Outlined';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';
import PersonOffOutlinedIcon from '@mui/icons-material/PersonOffOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import FilterListOutlinedIcon from '@mui/icons-material/FilterListOutlined';
import { DataGrid } from '@mui/x-data-grid';
import usersSeed from '../../data/users.json?raw';

const roles = ['admin', 'editor', 'viewer'];
const genders = ['male', 'female', 'other'];
const statusOptions = ['active', 'inactive'];

const blankForm = {
  firstName: '',
  lastName: '',
  age: '',
  gender: '',
  contactNumber: '',
  email: '',
  role: 'editor',
  username: '',
  password: '',
  address: '',
  isActive: true,
};

const surfaceSx = {
  borderRadius: 6,
  border: '1px solid rgba(120, 92, 72, 0.12)',
  boxShadow: '0 22px 60px rgba(63, 43, 33, 0.08)',
  background:
    'linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(248,243,238,0.95) 100%)',
};

const labelize = (value) =>
  value ? `${value.charAt(0).toUpperCase()}${value.slice(1)}` : '';

const loadUsers = () => {
  try {
    return {
      users: JSON.parse(usersSeed).map((user, index) => ({
        id: Number(user.id) || index + 1,
        firstName: String(user.firstName ?? '').trim(),
        lastName: String(user.lastName ?? '').trim(),
        age: String(user.age ?? '').trim(),
        gender: genders.includes(String(user.gender ?? '').trim().toLowerCase())
          ? String(user.gender ?? '').trim().toLowerCase()
          : '',
        contactNumber: String(user.contactNumber ?? '').trim(),
        email: String(user.email ?? '').trim().toLowerCase(),
        role: roles.includes(String(user.role ?? '').trim().toLowerCase())
          ? String(user.role ?? '').trim().toLowerCase()
          : 'editor',
        username: String(user.username ?? '').trim().toLowerCase(),
        password: String(user.password ?? ''),
        address: String(user.address ?? '').trim(),
        isActive: typeof user.isActive === 'boolean' ? user.isActive : true,
      })),
      error: '',
    };
  } catch {
    return {
      users: [],
      error: 'Unable to read users from src/assets/users.json.',
    };
  }
};

const seed = loadUsers();

const UsersPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [users, setUsers] = useState(seed.users);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({
    role: '',
    gender: '',
    status: '',
  });
  const [modal, setModal] = useState({ open: false, id: null });
  const [form, setForm] = useState(blankForm);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const activeUsers = users.filter((user) => user.isActive).length;
  const inactiveUsers = users.length - activeUsers;
  const adminCount = users.filter((user) => user.role === 'admin').length;

  const resetForm = () => {
    setForm({ ...blankForm });
    setErrors({});
  };

  const openModal = (user) => {
    setModal({ open: true, id: user?.id ?? null });
    setForm(user ? { ...blankForm, ...user } : { ...blankForm });
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
    const username = form.username.trim().toLowerCase();
    const age = form.age.trim();
    const contactNumber = form.contactNumber.trim();
    const password = form.password;

    [
      ['firstName', 'First name'],
      ['lastName', 'Last name'],
      ['age', 'Age'],
      ['gender', 'Gender'],
      ['contactNumber', 'Contact number'],
      ['email', 'Email'],
      ['role', 'Role'],
      ['username', 'Username'],
      ['password', 'Password'],
      ['address', 'Address'],
    ].forEach(([key, label]) => {
      if (!String(form[key]).trim()) {
        nextErrors[key] = `${label} is required.`;
      }
    });

    if (!nextErrors.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = 'Enter a valid email address.';
    }

    if (!nextErrors.password && password.length < 8) {
      nextErrors.password = 'Password must be at least 8 characters long.';
    }

    if (!nextErrors.contactNumber && !/^\d{11}$/.test(contactNumber)) {
      nextErrors.contactNumber = 'Contact number must be exactly 11 digits.';
    }

    if (!nextErrors.age && !/^\d+$/.test(age)) {
      nextErrors.age = 'Age must contain numbers only.';
    }

    if (!nextErrors.username && /\s/.test(form.username)) {
      nextErrors.username = 'Username must not contain spaces.';
    }

    if (!nextErrors.email && users.some((user) => user.id !== modal.id && user.email === email)) {
      nextErrors.email = 'Email address already exists.';
    }

    if (
      !nextErrors.username &&
      users.some((user) => user.id !== modal.id && user.username === username)
    ) {
      nextErrors.username = 'Username already exists.';
    }

    return nextErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = validate();

    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }

    const nextUser = {
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      age: form.age.trim(),
      gender: form.gender.trim().toLowerCase(),
      contactNumber: form.contactNumber.trim(),
      email: form.email.trim().toLowerCase(),
      role: form.role.trim().toLowerCase(),
      username: form.username.trim().toLowerCase(),
      password: form.password,
      address: form.address.trim(),
      isActive: form.isActive,
    };

    setUsers((prev) =>
      modal.id
        ? prev.map((user) => (user.id === modal.id ? { ...user, ...nextUser } : user))
        : [
            ...prev,
            {
              id: prev.reduce((max, user) => Math.max(max, Number(user.id) || 0), 0) + 1,
              ...nextUser,
            },
          ]
    );

    closeModal();
  };

  const toggleStatus = (id) => {
    setUsers((prev) =>
      prev.map((user) => (user.id === id ? { ...user, isActive: !user.isActive } : user))
    );
  };

  const handleFilterChange = ({ target: { name, value } }) => {
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const clearFilters = () => {
    setSearch('');
    setFilters({
      role: '',
      gender: '',
      status: '',
    });
  };

  const fieldProps = (name, label, extra = {}) => ({
    name,
    label,
    value: form[name],
    onChange: handleChange,
    error: Boolean(errors[name]),
    helperText: errors[name],
    fullWidth: true,
    ...extra,
  });

  const filteredUsers = users.filter((user) => {
    const searchTerm = search.trim().toLowerCase();
    const matchesSearch =
      !searchTerm ||
      [user.firstName, user.lastName, user.email, user.username].some((value) =>
        String(value).toLowerCase().includes(searchTerm)
      );

    const matchesRole = !filters.role || user.role === filters.role;
    const matchesGender = !filters.gender || user.gender === filters.gender;
    const matchesStatus =
      !filters.status || (filters.status === 'active' ? user.isActive : !user.isActive);

    return matchesSearch && matchesRole && matchesGender && matchesStatus;
  });

  const columns = [
    { field: 'id', headerName: 'ID', width: 80 },
    {
      field: 'fullName',
      headerName: 'User',
      flex: 1,
      minWidth: 220,
      sortable: false,
      renderCell: (params) => (
        <Stack direction="row" spacing={1.5} alignItems="center" sx={{ minWidth: 0, py: 1 }}>
          <Avatar sx={{ bgcolor: '#7a4b32', width: 38, height: 38 }}>
            {params.row.firstName.charAt(0)}
            {params.row.lastName.charAt(0)}
          </Avatar>
          <Box sx={{ minWidth: 0 }}>
            <Typography sx={{ fontWeight: 700, color: '#2f241f' }}>
              {`${params.row.firstName} ${params.row.lastName}`.trim()}
            </Typography>
            <Typography sx={{ color: '#7a6d62', fontSize: 13 }} noWrap>
              @{params.row.username}
            </Typography>
          </Box>
        </Stack>
      ),
    },
    {
      field: 'email',
      headerName: 'Email',
      flex: 1,
      minWidth: 220,
    },
    { field: 'age', headerName: 'Age', width: 90 },
    {
      field: 'gender',
      headerName: 'Gender',
      minWidth: 110,
      valueGetter: (_, row) => labelize(row.gender),
    },
    {
      field: 'contactNumber',
      headerName: 'Contact',
      minWidth: 150,
    },
    {
      field: 'role',
      headerName: 'Role',
      minWidth: 120,
      renderCell: (params) => (
        <Chip
          size="small"
          label={labelize(params.row.role)}
          sx={{
            bgcolor:
              params.row.role === 'admin'
                ? 'rgba(122, 75, 50, 0.12)'
                : params.row.role === 'editor'
                  ? 'rgba(177, 109, 69, 0.12)'
                  : 'rgba(108, 138, 97, 0.12)',
            color:
              params.row.role === 'admin'
                ? '#7a4b32'
                : params.row.role === 'editor'
                  ? '#a86137'
                  : '#56724d',
            fontWeight: 700,
          }}
        />
      ),
    },
    {
      field: 'status',
      headerName: 'Status',
      minWidth: 120,
      sortable: false,
      renderCell: (params) => (
        <Chip
          size="small"
          label={params.row.isActive ? 'Active' : 'Inactive'}
          sx={{
            bgcolor: params.row.isActive ? 'rgba(92, 131, 80, 0.12)' : 'rgba(128, 111, 98, 0.12)',
            color: params.row.isActive ? '#56724d' : '#75675c',
            fontWeight: 700,
          }}
        />
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      minWidth: 220,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Stack direction="row" spacing={1} sx={{ py: 0.5 }}>
          <Button
            size="small"
            variant="outlined"
            onClick={() => openModal(params.row)}
            sx={{
              borderRadius: 999,
              textTransform: 'none',
              borderColor: 'rgba(122, 75, 50, 0.24)',
              color: '#7a4b32',
            }}
          >
            Edit
          </Button>
          <Button
            size="small"
            variant="contained"
            color={params.row.isActive ? 'warning' : 'success'}
            onClick={() => toggleStatus(params.row.id)}
            sx={{ borderRadius: 999, textTransform: 'none', boxShadow: 'none' }}
          >
            {params.row.isActive ? 'Disable' : 'Activate'}
          </Button>
        </Stack>
      ),
    },
  ];

  const summaryCards = [
    {
      label: 'Total users',
      value: users.length,
      note: 'All records in the list',
      icon: <ManageAccountsOutlinedIcon />,
      tone: '#7a4b32',
    },
    {
      label: 'Active users',
      value: activeUsers,
      note: 'Currently enabled accounts',
      icon: <VerifiedUserOutlinedIcon />,
      tone: '#5f7a52',
    },
    {
      label: 'Inactive users',
      value: inactiveUsers,
      note: 'Accounts that need attention',
      icon: <PersonOffOutlinedIcon />,
      tone: '#8e6d59',
    },
    {
      label: 'Admins',
      value: adminCount,
      note: 'Higher-access members',
      icon: <PersonAddAlt1OutlinedIcon />,
      tone: '#b16d45',
    },
  ];

  return (
    <Box sx={{ width: '100%', minWidth: 0, px: { xs: 1, sm: 2 }, py: { xs: 1, sm: 2 } }}>
      <Card
        sx={{
          ...surfaceSx,
          p: { xs: 2.5, sm: 4 },
          mb: 3,
          position: 'relative',
          background:
            'radial-gradient(circle at top right, rgba(188, 129, 86, 0.16), transparent 34%), linear-gradient(135deg, #fffaf6 0%, #f4ece3 100%)',
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
            pr: { xs: 0, lg: 28 },
          }}
        >
          <Box>
            <Chip
              label="User Management"
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
              A cleaner space to manage users
            </Typography>
            <Typography sx={{ color: '#67584d', maxWidth: 640, mx: 'auto' }}>
              Search faster, filter more clearly, and update user records from a
              layout that feels lighter and easier to scan.
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<PersonAddAlt1OutlinedIcon />}
            onClick={() => openModal()}
            sx={{
              position: { xs: 'static', lg: 'absolute' },
              top: { lg: '50%' },
              right: { lg: 32 },
              transform: { lg: 'translateY(-50%)' },
              px: 3.25,
              py: 1.5,
              borderRadius: 999,
              textTransform: 'none',
              fontWeight: 700,
              fontSize: '1rem',
              letterSpacing: '0.01em',
              bgcolor: '#7a4b32',
              color: '#fffaf6',
              boxShadow: '0 18px 34px rgba(90, 53, 33, 0.2)',
              mt: { xs: 3, lg: 0 },
              width: { xs: '100%', sm: 'auto' },
              minWidth: 168,
              minHeight: 56,
              '&:hover': {
                bgcolor: '#643b26',
                boxShadow: '0 20px 38px rgba(90, 53, 33, 0.24)',
              },
              '& .MuiButton-startIcon': {
                mr: 1,
              },
            }}
          >
            Add User
          </Button>
        </Box>
      </Card>

      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2.5} sx={{ mb: 3 }}>
        {summaryCards.map((item) => (
          <Card key={item.label} sx={{ ...surfaceSx, flex: 1, p: 2.5 }}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Avatar
                sx={{
                  bgcolor: alpha(item.tone, 0.12),
                  color: item.tone,
                  width: 50,
                  height: 50,
                }}
              >
                {item.icon}
              </Avatar>
              <Box>
                <Typography sx={{ color: '#7c6a5b', fontSize: 14 }}>{item.label}</Typography>
                <Typography variant="h4" sx={{ color: '#2f241f', fontWeight: 700 }}>
                  {item.value}
                </Typography>
              </Box>
            </Stack>
            <Typography sx={{ mt: 1.5, color: item.tone, fontSize: 13 }}>{item.note}</Typography>
          </Card>
        ))}
      </Stack>

      {seed.error ? (
        <Alert severity="error" sx={{ mb: 2 }}>
          {seed.error}
        </Alert>
      ) : null}

      <Card sx={{ ...surfaceSx, p: { xs: 2, sm: 3 } }}>
        {users.length ? (
          <Stack spacing={2.5} sx={{ mb: 2.5 }}>
            <Stack
              direction={{ xs: 'column', xl: 'row' }}
              spacing={2}
              alignItems={{ xs: 'stretch', xl: 'center' }}
            >
              <Stack
                direction={{ xs: 'column', md: 'row' }}
                spacing={2}
                sx={{ flex: 1, minWidth: 0 }}
              >
                <TextField
                  label="Search users"
                  placeholder="Search by first name, last name, email, or username"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  fullWidth
                  sx={{ flex: { xs: '1 1 auto', md: 1.35 } }}
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchOutlinedIcon sx={{ color: '#8b7767' }} />
                        </InputAdornment>
                      ),
                    },
                  }}
                />

                <Stack
                  direction={{ xs: 'column', sm: 'row' }}
                  spacing={2}
                  sx={{ flex: { xs: '1 1 auto', md: 1 } }}
                >
                  <TextField
                    select
                    label="Role"
                    name="role"
                    value={filters.role}
                    onChange={handleFilterChange}
                    fullWidth
                  >
                    <MenuItem value="">All Roles</MenuItem>
                    {roles.map((role) => (
                      <MenuItem key={role} value={role}>
                        {labelize(role)}
                      </MenuItem>
                    ))}
                  </TextField>

                  <TextField
                    select
                    label="Gender"
                    name="gender"
                    value={filters.gender}
                    onChange={handleFilterChange}
                    fullWidth
                  >
                    <MenuItem value="">All Genders</MenuItem>
                    {genders.map((gender) => (
                      <MenuItem key={gender} value={gender}>
                        {labelize(gender)}
                      </MenuItem>
                    ))}
                  </TextField>

                  <TextField
                    select
                    label="Status"
                    name="status"
                    value={filters.status}
                    onChange={handleFilterChange}
                    fullWidth
                  >
                    <MenuItem value="">All Statuses</MenuItem>
                    {statusOptions.map((status) => (
                      <MenuItem key={status} value={status}>
                        {labelize(status)}
                      </MenuItem>
                    ))}
                  </TextField>
                </Stack>
              </Stack>

              <Button
                variant="outlined"
                startIcon={<FilterListOutlinedIcon />}
                onClick={clearFilters}
                sx={{
                  width: { xs: '100%', xl: 'auto' },
                  alignSelf: { xs: 'stretch', xl: 'center' },
                  borderRadius: 999,
                  textTransform: 'none',
                  color: '#7a4b32',
                  borderColor: 'rgba(122, 75, 50, 0.24)',
                  px: 2.5,
                  whiteSpace: 'nowrap',
                }}
              >
                Clear Filters
              </Button>
            </Stack>
          </Stack>
        ) : null}

        {users.length ? (
          <Box sx={{ height: { xs: 520, sm: 620 }, width: '100%' }}>
            <DataGrid
              rows={filteredUsers}
              columns={columns}
              disableRowSelectionOnClick
              pageSizeOptions={[5, 10]}
              rowHeight={72}
              initialState={{
                pagination: { paginationModel: { pageSize: 5, page: 0 } },
              }}
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
        ) : (
          <Alert severity="info">
            No users found. Use Add User to create your first record.
          </Alert>
        )}

        {users.length && !filteredUsers.length ? (
          <Alert severity="info" sx={{ mt: 2 }}>
            No users match the current search and filter selection.
          </Alert>
        ) : null}
      </Card>

      <Dialog
        open={modal.open}
        onClose={closeModal}
        fullWidth
        fullScreen={isMobile}
        maxWidth="md"
        PaperProps={{
          sx: {
            borderRadius: isMobile ? 0 : 5,
            background:
              'linear-gradient(180deg, rgba(255,255,255,0.99) 0%, rgba(248,243,238,0.98) 100%)',
          },
        }}
      >
        <Box component="form" onSubmit={handleSubmit}>
          <DialogTitle sx={{ px: { xs: 2.5, sm: 3 }, pt: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: 700, color: '#2f241f' }}>
              {modal.id ? 'Edit User' : 'Add User'}
            </Typography>
            <Typography sx={{ color: '#76685c', fontSize: 14, mt: 0.5 }}>
              Keep user details complete and easy to manage.
            </Typography>
          </DialogTitle>
          <DialogContent dividers sx={{ px: { xs: 2, sm: 3 } }}>
            <Stack spacing={2.25} sx={{ pt: 1 }}>
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
                  {...fieldProps('email', 'Email Address', {
                    type: 'email',
                  })}
                />
              </Stack>

              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField {...fieldProps('role', 'Role', { select: true })}>
                  {roles.map((role) => (
                    <MenuItem key={role} value={role}>
                      {labelize(role)}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField {...fieldProps('username', 'Username')} />
              </Stack>

              <TextField
                {...fieldProps('password', 'Password', {
                  type: showPassword ? 'text' : 'password',
                  slotProps: {
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            edge="end"
                            onClick={() => setShowPassword((prev) => !prev)}
                            onMouseDown={(event) => event.preventDefault()}
                            aria-label={showPassword ? 'Hide password' : 'Show password'}
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
                  />
                }
                label={form.isActive ? 'User status: Active' : 'User status: Inactive'}
              />
            </Stack>
          </DialogContent>

          <DialogActions sx={{ px: 3, py: 2.5 }}>
            <Button onClick={closeModal} sx={{ textTransform: 'none', color: '#7a4b32' }}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              sx={{
                borderRadius: 999,
                px: 2.5,
                textTransform: 'none',
                fontWeight: 700,
                bgcolor: '#7a4b32',
                '&:hover': { bgcolor: '#643b26' },
              }}
            >
              {modal.id ? 'Update User' : 'Save User'}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  );
};

export default UsersPage;
