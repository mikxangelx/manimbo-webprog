import { Link } from 'react-router-dom';
import Button from '../../components/Button';

const inputClasses =
  'mt-2 w-full rounded-[1rem] border border-[#ddcbb7] bg-[#fffaf4] px-4 py-3.5 text-sm text-[#2f241f] outline-none transition placeholder:text-[#b59a83] focus:border-[#8f715f] focus:bg-white focus:shadow-[0_0_0_4px_rgba(231,212,193,0.45)]';

const actionButtonClassName = 'w-full rounded-[1rem] py-3.5 text-[11px] tracking-[0.22em]';

const SignInPage = () => {
  return (
    <div className="flex min-h-[560px] flex-col justify-center">
      <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#a17f64]">
        Welcome back
      </p>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#2f241f] sm:text-4xl">
        Sign in to your Club Creative account
      </h2>
      <p className="mt-4 text-sm leading-6 text-[#6e5b4d]">
        Pick up where you left off and step back into your reading space.
      </p>

      <form className="mt-7 space-y-4">
        <div>
          <label htmlFor="signin-email" className="text-sm font-medium text-[#5f4b3d]">
            Email Address
          </label>
          <input
            id="signin-email"
            type="email"
            placeholder="hello@example.com"
            autoComplete="email"
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
            className={inputClasses}
          />
          <button
            type="button"
            className="mt-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#9d7d65] transition hover:text-[#2f241f]"
          >
            Forgot Password?
          </button>
        </div>

        <label className="flex items-center gap-2 text-sm text-[#6e5b4d]">
          <input type="checkbox" className="h-4 w-4 rounded border-[#cfb69f] accent-[#2f241f]" />
          <span>Keep me signed in</span>
        </label>

        <Button type="submit" variant="primary" className={actionButtonClassName}>
          Sign In
        </Button>
      </form>

      <div className="mt-6 rounded-[1rem] border border-[#eadbca] bg-[#fff7ee] px-4 py-4 text-sm text-[#6e5b4d]">
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
