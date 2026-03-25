import { NavLink } from 'react-router-dom';
import logo from '../assets/logo.jpg'; // adjust filename if needed

const links = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Articles', to: '/articles' },
];

const NavBar = () => {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-zinc-200 bg-white/70 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">

        {/* LOGO */}
        <NavLink to="/" className="flex items-center gap-2">
          <img
            src={logo}
            alt="Logo"
            className="h-10 w-auto object-contain"
          />
          
        </NavLink>

        {/* NAV LINKS */}
        <nav className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className="group relative text-[12px] font-semibold uppercase tracking-[0.18em] text-zinc-500 transition"
            >
              {({ isActive }) => (
                <span className={`${isActive ? 'text-zinc-900' : 'group-hover:text-zinc-900'}`}>
                  {link.label}

                  {/* underline animation */}
                  <span
                    className={`absolute left-0 -bottom-1 h-[2px] w-full bg-zinc-900 transition-transform duration-300 origin-left ${
                      isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`}
                  />
                </span>
              )}
            </NavLink>
          ))}
        </nav>

      </div>
    </header>
  );
};

export default NavBar;