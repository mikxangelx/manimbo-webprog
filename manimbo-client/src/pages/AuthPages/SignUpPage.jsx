import { Link } from 'react-router-dom';
import Button from '../../components/Button';

const inputClasses =
  'mt-2 w-full rounded-[1rem] border border-[#ddcbb7] bg-[#fffaf4] px-4 py-3.5 text-sm text-[#2f241f] outline-none transition placeholder:text-[#b59a83] focus:border-[#8f715f] focus:bg-white focus:shadow-[0_0_0_4px_rgba(231,212,193,0.45)]';

const actionButtonClassName = 'w-full rounded-[1rem] py-3.5 text-[11px] tracking-[0.22em]';

const SignUpPage = () => {
  return (
    <div className="flex min-h-[560px] flex-col justify-center">
      <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#a17f64]">
        Join the space
      </p>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#2f241f] sm:text-4xl">
        Create your Club Creative account
      </h2>
      <p className="mt-4 text-sm leading-6 text-[#6e5b4d]">
        Make a calm little home for your reflections and favorite reads.
      </p>

      <form className="mt-7 space-y-4">
        <div>
          <label htmlFor="full-name" className="text-sm font-medium text-[#5f4b3d]">
            Full Name
          </label>
          <input
            id="full-name"
            type="text"
            placeholder="Your full name"
            autoComplete="name"
            className={inputClasses}
          />
        </div>

        <div>
          <label htmlFor="signup-email" className="text-sm font-medium text-[#5f4b3d]">
            Email Address
          </label>
          <input
            id="signup-email"
            type="email"
            placeholder="hello@example.com"
            autoComplete="email"
            className={inputClasses}
          />
        </div>

        <div>
          <label htmlFor="signup-password" className="text-sm font-medium text-[#5f4b3d]">
            Password
          </label>
          <input
            id="signup-password"
            type="password"
            placeholder="Create a password"
            autoComplete="new-password"
            className={inputClasses}
          />
        </div>

        <div className="rounded-[1rem] border border-[#eadbca] bg-[#fff7ee] px-4 py-3 text-sm text-[#6e5b4d]">
          <label className="flex items-start gap-3">
            <input type="checkbox" className="mt-1 h-4 w-4 rounded border-[#cfb69f] accent-[#2f241f]" />
            <span className="leading-6">
              I agree to the terms and privacy policy.
            </span>
          </label>
        </div>

        <Button type="submit" variant="primary" className={actionButtonClassName}>
          Create Account
        </Button>
      </form>

      <div className="mt-6 rounded-[1rem] border border-[#eadbca] bg-[#fff7ee] px-4 py-4 text-sm text-[#6e5b4d]">
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
