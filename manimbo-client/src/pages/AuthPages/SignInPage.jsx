import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import { loginUser } from '../../services/UserService';

const inputClasses =
  'mt-1.5 w-full rounded-[1rem] border border-[#ddcbb7] bg-[#fffaf4] px-4 py-3 text-sm text-[#2f241f] outline-none transition placeholder:text-[#b59a83] focus:border-[#8f715f] focus:bg-white focus:shadow-[0_0_0_4px_rgba(231,212,193,0.45)]';

const actionButtonClassName = 'w-full rounded-[1rem] py-3 text-[10px] tracking-[0.22em]';
const socialButtonClassName =
  'flex w-full items-center justify-center gap-3 rounded-[1rem] border border-[#cfdaf0] bg-white px-4 py-3.5 text-sm font-semibold text-[#182b57] transition hover:border-[#afc1e7] hover:bg-[#f8fbff]';

const SignInPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { data } = await loginUser({ email, password });
      localStorage.setItem('token', data.token);
      localStorage.setItem('type', data.type);
      localStorage.setItem('firstName', data.firstName ?? '');
      localStorage.setItem('lastName', data.lastName ?? '');
      localStorage.setItem('email', data.email ?? email);

      const destination =
        data.type === 'admin' || data.type === 'editor' ? '/dashboard' : '/';
      navigate(destination, {
        state: { firstName: data.firstName, type: data.type },
      });
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.message ||
        'Login failed. Please try again.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[480px] flex-col justify-center">
      <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#a17f64]">
        Welcome back
      </p>
      <h2 className="mt-2 text-2xl font-semibold tracking-tight text-[#2f241f] sm:text-[2rem]">
        Sign in to your Club Creative account
      </h2>
      <p className="mt-2 text-sm leading-6 text-[#6e5b4d]">
        Pick up where you left off and step back into your reading space.
      </p>

      {error ? (
        <div className="mt-4 rounded-[1rem] border border-[#e7c0b6] bg-[#fdecea] px-4 py-3 text-sm font-medium text-[#8b2f2f]">
          {error}
        </div>
      ) : null}

      <form className="mt-5 space-y-3" onSubmit={handleLogin}>
        <div>
          <label htmlFor="signin-email" className="text-sm font-medium text-[#5f4b3d]">
            Email Address
          </label>
          <input
            id="signin-email"
            type="email"
            placeholder="hello@example.com"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            className={inputClasses}
          />
        </div>

        <div>
          <label htmlFor="signin-password" className="text-sm font-medium text-[#5f4b3d]">
            Password
          </label>
          <input
            id="signin-password"
            type="password"
            placeholder="Enter your password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            className={inputClasses}
          />
          <button
            type="button"
            className="mt-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#9d7d65] transition hover:text-[#2f241f]"
          >
            Forgot Password?
          </button>
        </div>

        <label className="flex items-center gap-2 text-sm text-[#6e5b4d]">
          <input type="checkbox" className="h-4 w-4 rounded border-[#cfb69f] accent-[#2f241f]" />
          <span>Keep me signed in</span>
        </label>

        <Button
          type="submit"
          variant="primary"
          className={actionButtonClassName}
          disabled={loading}
        >
          {loading ? 'Signing in…' : 'Sign In'}
        </Button>

        <div className="pt-1">
          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-[#d8e1f1]" />
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#7c8fb5]">
              Or
            </span>
            <div className="h-px flex-1 bg-[#d8e1f1]" />
          </div>

          <div className="mt-3 space-y-2.5">
            <button type="button" className={socialButtonClassName}>
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
                <path
                  fill="#EA4335"
                  d="M12 10.2v3.9h5.4c-.2 1.3-1.5 3.9-5.4 3.9-3.2 0-5.9-2.7-5.9-6s2.7-6 5.9-6c1.8 0 3 .8 3.7 1.5l2.5-2.4C16.6 3.4 14.5 2.5 12 2.5a9.5 9.5 0 1 0 0 19c5.5 0 9.1-3.9 9.1-9.3 0-.6-.1-1.1-.2-1.6H12Z"
                />
                <path
                  fill="#34A853"
                  d="M2.5 7.9l3.2 2.3C6.6 8 9.1 6 12 6c1.8 0 3 .8 3.7 1.5l2.5-2.4C16.6 3.4 14.5 2.5 12 2.5c-3.7 0-6.9 2.1-8.5 5.4Z"
                />
                <path
                  fill="#FBBC05"
                  d="M12 21.5c2.4 0 4.5-.8 6-2.3l-2.8-2.2c-.8.6-1.9 1-3.2 1-3.8 0-5.2-2.5-5.4-3.8l-3.2 2.5c1.5 3.3 4.8 4.8 8.6 4.8Z"
                />
                <path
                  fill="#4285F4"
                  d="M2.5 7.9A9.7 9.7 0 0 0 1.7 12c0 1.4.3 2.8.8 4.1l3.2-2.5a5.9 5.9 0 0 1 0-3.7L2.5 7.9Z"
                />
              </svg>
              <span>Log in with Google</span>
            </button>

            <button type="button" className={socialButtonClassName}>
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
                <path d="M16.7 12.8c0-2.4 2-3.6 2-3.7-1.1-1.6-2.9-1.8-3.5-1.9-1.5-.2-2.8.9-3.6.9-.8 0-1.9-.9-3.1-.8-1.6 0-3 .9-3.8 2.3-1.6 2.8-.4 6.9 1.2 9.1.8 1.1 1.7 2.3 2.9 2.2 1.2 0 1.7-.8 3.1-.8 1.5 0 1.9.8 3.2.8 1.3 0 2.2-1.1 3-2.2.9-1.3 1.3-2.6 1.3-2.7 0 0-2.7-1-2.7-3.2ZM14.2 5.8c.6-.8 1-1.9.9-3-.9 0-2.1.6-2.7 1.3-.6.7-1 1.8-.9 2.9 1 0 2.1-.5 2.7-1.2Z" />
              </svg>
              <span>Log in with Apple</span>
            </button>
          </div>
        </div>
      </form>

      <div className="mt-4 rounded-[1rem] border border-[#eadbca] bg-[#fff7ee] px-4 py-3 text-sm text-[#6e5b4d]">
        New here?{' '}
        <Link
          to="/auth/signup"
          className="font-semibold uppercase tracking-[0.16em] text-[#2f241f] transition hover:text-[#7d6757]"
        >
          Create an account
        </Link>
      </div>
    </div>
  );
};

export default SignInPage;
