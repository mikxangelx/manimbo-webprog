import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import logo from '../assets/logo.jpg';
import {
  getFirstName,
  getRole,
  isAuthenticated,
  logout,
} from '../services/auth';

const links = [
  { label: 'Home', to: '/home' },
  { label: 'About', to: '/about' },
  { label: 'Articles', to: '/articles' },
];

const pillClasses =
  'inline-flex items-center justify-center rounded-full border border-[#e7dacc] bg-white px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#2f241f] shadow-[0_8px_20px_rgba(95,74,49,0.07)] transition duration-300 hover:-translate-y-[1px] hover:border-[#cfb49d] hover:bg-[#fdfaf6] hover:shadow-[0_14px_26px_rgba(95,74,49,0.11)]';

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const signedIn = isAuthenticated();
  const firstName = getFirstName();
  const role = getRole();
  const canSeeDashboard = role === 'admin' || role === 'editor';

  const handleLogout = () => {
    logout();
    navigate('/auth/signin', { replace: true, state: { fromLogout: true } });
  };

  void location;

  return (
    <header className="sticky top-0 z-50 border-b border-[#eee2d6] bg-white/92 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-6 lg:px-10">
        <NavLink to="/home" className="flex items-center gap-3">
          <img
            src={logo}
            alt="Club Creative logo"
            className="h-11 w-auto rounded-full object-contain"
          />
          <div className="text-left">
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#ae9078]">
              Club Creative
            </p>
            <p className="text-sm text-[#68584b]">Stories, notes, and everyday beauty</p>
          </div>
        </NavLink>

        <nav className="hidden items-center gap-2 md:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/home'}
              className={({ isActive }) =>
                [
                  'relative inline-flex px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] transition duration-200',
                  'after:absolute after:bottom-[0.35rem] after:left-4 after:h-[1.5px] after:w-[calc(100%-2rem)] after:origin-left after:bg-[#8b7564] after:transition-transform after:duration-300',
                  isActive
                    ? 'text-[#2f241f] after:scale-x-100'
                    : 'text-[#7d6757] after:scale-x-0 hover:text-[#2f241f] hover:after:scale-x-100',
                ].join(' ')
              }
            >
              {link.label}
            </NavLink>
          ))}

          {signedIn ? (
            <div className="ml-3 flex items-center gap-2">
              <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#7d6757]">
                Hi, {firstName || 'reader'}
              </span>
              {canSeeDashboard ? (
                <NavLink to="/dashboard" className={pillClasses}>
                  Dashboard
                </NavLink>
              ) : null}
              <button type="button" onClick={handleLogout} className={pillClasses}>
                Logout
              </button>
            </div>
          ) : (
            <NavLink to="/auth/signin" className={`${pillClasses} ml-3`}>
              Sign In
            </NavLink>
          )}
        </nav>

        {signedIn ? (
          <button
            type="button"
            onClick={handleLogout}
            className={`${pillClasses} md:hidden`}
          >
            Logout
          </button>
        ) : (
          <NavLink to="/auth/signin" className={`${pillClasses} md:hidden`}>
            Sign In
          </NavLink>
        )}
      </div>
    </header>
  );
};

export default NavBar;
