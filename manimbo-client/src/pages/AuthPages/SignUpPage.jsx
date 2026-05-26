import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import { createUser } from '../../services/UserService';

const inputClasses =
  'mt-1 w-full rounded-[0.85rem] border border-[#ddcbb7] bg-[#fffaf4] px-3.5 py-2 text-sm leading-5 text-[#2f241f] outline-none transition placeholder:text-[#b59a83] focus:border-[#8f715f] focus:bg-white focus:shadow-[0_0_0_4px_rgba(231,212,193,0.45)]';

const actionButtonClassName = 'w-full rounded-[0.9rem] py-2.5 text-[10px] tracking-[0.22em]';

const blankForm = {
  firstName: '',
  lastName: '',
  age: '',
  gender: '',
  contactNumber: '',
  email: '',
  username: '',
  password: '',
  address: '',
};

const getSignUpErrorMessage = (err) => {
  const message =
    err.response?.data?.message ||
    err.message ||
    'Sign up failed. Please try again.';

  if (message.includes('E11000')) {
    if (message.includes('email')) return 'Email address is already registered.';
    if (message.includes('username')) return 'Username is already taken.';
    return 'Account already exists.';
  }

  return message;
};

const SignUpPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState(blankForm);
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    if (!agree) return 'Please agree to the terms and privacy policy.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      return 'Enter a valid email address.';
    if (form.password.length < 8)
      return 'Password must be at least 8 characters.';
    if (!/^\d+$/.test(form.age)) return 'Age must be numeric.';
    if (!/^\d{11}$/.test(form.contactNumber))
      return 'Contact number must be 11 digits.';
    if (/\s/.test(form.username))
      return 'Username must not contain spaces.';
    return '';
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    try {
      await createUser({
        ...form,
        email: form.email.trim().toLowerCase(),
        username: form.username.trim().toLowerCase(),
        type: 'viewer',
        isActive: true,
      });
      setSuccess('Account created. Redirecting to sign in…');
      setTimeout(() => navigate('/auth/signin'), 1200);
    } catch (err) {
      setError(getSignUpErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center">
      <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-[#a17f64]">
        Join the space
      </p>
      <h2 className="mt-1 text-xl font-semibold tracking-tight text-[#2f241f] sm:text-2xl">
        Create your Club Creative account
      </h2>
      <p className="mt-1 text-sm leading-5 text-[#6e5b4d]">
        Make a calm little home for your reflections and favorite reads.
      </p>

      {error ? (
        <div className="mt-4 rounded-[1rem] border border-[#e7c0b6] bg-[#fdecea] px-4 py-3 text-sm font-medium text-[#8b2f2f]">
          {error}
        </div>
      ) : null}
      {success ? (
        <div className="mt-4 rounded-[1rem] border border-[#bfd9b8] bg-[#eaf5e3] px-4 py-3 text-sm font-medium text-[#3a5a3a]">
          {success}
        </div>
      ) : null}

      <form className="mt-3 space-y-2.5" onSubmit={handleSubmit}>
        <div className="grid gap-2.5 sm:grid-cols-2">
          <div>
            <label className="text-sm font-medium text-[#5f4b3d]">First Name</label>
            <input
              name="firstName"
              type="text"
              value={form.firstName}
              onChange={handleChange}
              required
              className={inputClasses}
            />
          </div>
          <div>
            <label className="text-sm font-medium text-[#5f4b3d]">Last Name</label>
            <input
              name="lastName"
              type="text"
              value={form.lastName}
              onChange={handleChange}
              required
              className={inputClasses}
            />
          </div>
        </div>

        <div className="grid gap-2.5 sm:grid-cols-2">
          <div>
            <label className="text-sm font-medium text-[#5f4b3d]">Age</label>
            <input
              name="age"
              type="text"
              inputMode="numeric"
              value={form.age}
              onChange={handleChange}
              required
              className={inputClasses}
            />
          </div>
          <div>
            <label className="text-sm font-medium text-[#5f4b3d]">Gender</label>
            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              required
              className={inputClasses}
            >
              <option value="">Select…</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-[#5f4b3d]">Contact Number</label>
          <input
            name="contactNumber"
            type="tel"
            placeholder="11 digits"
            value={form.contactNumber}
            onChange={handleChange}
            required
            className={inputClasses}
          />
        </div>

        <div>
          <label className="text-sm font-medium text-[#5f4b3d]">Email Address</label>
          <input
            name="email"
            type="email"
            placeholder="hello@example.com"
            value={form.email}
            onChange={handleChange}
            required
            className={inputClasses}
          />
        </div>

        <div>
          <label className="text-sm font-medium text-[#5f4b3d]">Username</label>
          <input
            name="username"
            type="text"
            value={form.username}
            onChange={handleChange}
            required
            className={inputClasses}
          />
        </div>

        <div>
          <label className="text-sm font-medium text-[#5f4b3d]">Password</label>
          <input
            name="password"
            type="password"
            placeholder="At least 8 characters"
            value={form.password}
            onChange={handleChange}
            required
            className={inputClasses}
          />
        </div>

        <div>
          <label className="text-sm font-medium text-[#5f4b3d]">Address</label>
          <textarea
            name="address"
            rows={2}
            value={form.address}
            onChange={handleChange}
            required
            className={`${inputClasses} min-h-[54px]`}
          />
        </div>

        <div className="rounded-[0.85rem] border border-[#eadbca] bg-[#fff7ee] px-3.5 py-2 text-sm text-[#6e5b4d]">
          <label className="flex items-start gap-3">
            <input
              type="checkbox"
              checked={agree}
              onChange={(event) => setAgree(event.target.checked)}
              className="mt-1 h-4 w-4 rounded border-[#cfb69f] accent-[#2f241f]"
            />
            <span className="leading-5">
              I agree to the terms and privacy policy.
            </span>
          </label>
        </div>

        <Button
          type="submit"
          variant="primary"
          className={actionButtonClassName}
          disabled={loading}
        >
          {loading ? 'Creating…' : 'Create Account'}
        </Button>
      </form>

      <div className="mt-3 rounded-[0.85rem] border border-[#eadbca] bg-[#fff7ee] px-4 py-2.5 text-sm text-[#6e5b4d]">
        Already have an account?{' '}
        <Link
          to="/auth/signin"
          className="font-semibold uppercase tracking-[0.16em] text-[#2f241f] transition hover:text-[#7d6757]"
        >
          Sign in
        </Link>
      </div>
    </div>
  );
};

export default SignUpPage;
