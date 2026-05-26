import { Link, Outlet } from 'react-router-dom';
import authBackground from '../assets/auth.jpg';
import logo from '../assets/logo.jpg';

const AuthLayout = () => {
  return (
    <section
      className="relative min-h-screen overflow-x-hidden bg-[#f6ebdd] text-zinc-900"
      style={{
        backgroundImage: `url(${authBackground})`,
        backgroundPosition: 'left center',
        backgroundSize: 'cover',
      }}
    >
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,252,248,0.01),rgba(255,252,248,0.03),rgba(255,252,248,0.08))]" />
      <div className="absolute inset-y-0 right-0 w-[56%] bg-[linear-gradient(90deg,rgba(255,252,248,0)_0%,rgba(255,252,248,0.26)_24%,rgba(255,252,248,0.72)_100%)]" />
      <div className="absolute right-[18%] top-[16%] hidden h-24 w-24 rounded-full bg-[#fff8f1]/55 blur-3xl lg:block" />

      <div className="relative mx-auto flex min-h-screen max-w-[1440px] items-center justify-between px-4 py-4 sm:px-6 lg:px-10">
        <main className="ml-auto w-full max-w-[30rem] lg:mr-10">
          <div className="rounded-[1.25rem] border border-[#efe1d4] bg-[rgba(255,249,242,0.94)] p-4 shadow-[0_24px_60px_rgba(96,72,54,0.14)] sm:p-5">
            <div className="mb-2 flex items-center justify-center">
              <Link to="/" className="inline-flex transition duration-300 hover:opacity-80">
                <img
                  src={logo}
                  alt="Club Creative logo"
                  className="h-8 w-auto object-contain"
                />
              </Link>
            </div>
            <Outlet />
          </div>
        </main>
      </div>
    </section>
  );
};

export default AuthLayout;
