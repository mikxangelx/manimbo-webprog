import { NavLink } from 'react-router-dom';
import { FaInstagram } from 'react-icons/fa6';
import { FaFacebook } from 'react-icons/fa6';
import { LuMail } from 'react-icons/lu';
import logo from '../assets/logo.jpg';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Articles', to: '/articles' },
];

const Footer = () => {
  return (
    <footer className="mt-20 bg-[#f7ead7] text-zinc-700">
      <div className="mx-auto max-w-7xl px-6 py-14 sm:px-8 lg:px-10">
        <div className="grid gap-12 text-left md:grid-cols-3 md:gap-10">
          <div className="max-w-sm">
            <img
              src={logo}
              alt="Club Creative logo"
              className="h-16 w-auto object-contain sm:h-20"
            />
            <p className="mt-5 text-sm leading-7 text-zinc-600 sm:text-[15px]">
              A space for stories, thoughts, and everyday inspiration. From
              random ideas to real-life moments-this is where creativity lives.
            </p>
          </div>

          <div className="md:justify-self-center">
            <h2 className="text-sm font-medium uppercase tracking-[0.24em] text-zinc-500">
              Navigation
            </h2>
            <nav className="mt-5 flex flex-col gap-3 text-[15px] text-zinc-700">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/'}
                  className="w-fit border-b border-transparent pb-1 transition duration-200 hover:border-zinc-500 hover:text-zinc-900"
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>
          </div>

          <div className="md:justify-self-end">
            <h2 className="text-sm font-medium uppercase tracking-[0.24em] text-zinc-500">
              Social & Contact
            </h2>
            <div className="mt-5 flex items-center gap-4">
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-white/55 text-zinc-600 transition duration-200 hover:bg-white/85 hover:text-zinc-900"
              >
                <FaInstagram className="text-lg" />
              </a>
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-white/55 text-zinc-600 transition duration-200 hover:bg-white/85 hover:text-zinc-900"
              >
                <FaFacebook className="text-lg" />
              </a>
              
              <a
                href="mailto:hello@clubcreative.com"
                aria-label="Email hello@clubcreative.com"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-white/55 text-zinc-600 transition duration-200 hover:bg-white/85 hover:text-zinc-900"
              >
                <LuMail className="text-lg" />
              </a>
            </div>
            <p className="mt-4 text-sm text-zinc-600">
              <br></br>hello@clubcreative.com
            </p>
          </div>
        </div> 

        <div className="mt-12 text-center text-sm text-zinc-500">
          © 2026 Club Creative. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
