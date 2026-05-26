import { NavLink } from 'react-router-dom';
import { FaFacebook, FaInstagram } from 'react-icons/fa6';
import { LuMail } from 'react-icons/lu';
import logo from '../assets/logo.jpg';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Articles', to: '/articles' },
];

const Footer = () => {
  return (
    <footer className="mt-16 border-t border-[#eee2d6] bg-[#fdfbf8] text-[#6f5a4a]">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 text-left md:grid-cols-[1.3fr_0.8fr_1fr] lg:px-10">
        <div className="max-w-md">
          <img
            src={logo}
            alt="Club Creative logo"
            className="h-20 w-auto rounded-full object-contain"
          />
          <p className="mt-6 text-sm leading-7 text-[#756658]">
            A space for stories, thoughts, and everyday inspiration. From random
            ideas to real-life moments, this is where creativity lives.
          </p>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.24em] text-[#ae9078]">
            Explore
          </h2>
          <nav className="mt-5 flex flex-col gap-3 text-[15px]">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className="w-fit border-b border-transparent pb-1 transition duration-200 hover:border-[#9d7d65] hover:text-[#2f241f]"
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.24em] text-[#ae9078]">
            Connect
          </h2>
          <div className="mt-5 flex items-center gap-4">
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[#e8dbce] bg-white text-[#725e4e] transition duration-200 hover:bg-[#faf6f1] hover:text-[#2f241f]"
            >
              <FaInstagram className="text-lg" />
            </a>
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[#e8dbce] bg-white text-[#725e4e] transition duration-200 hover:bg-[#faf6f1] hover:text-[#2f241f]"
            >
              <FaFacebook className="text-lg" />
            </a>
            <a
              href="mailto:hello@clubcreative.com"
              aria-label="Email hello@clubcreative.com"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[#e8dbce] bg-white text-[#725e4e] transition duration-200 hover:bg-[#faf6f1] hover:text-[#2f241f]"
            >
              <LuMail className="text-lg" />
            </a>
          </div>
          <p className="mt-5 text-sm">hello@clubcreative.com</p>
        </div>
      </div>

      <div className="border-t border-[#eee2d6] px-6 py-5 text-center text-sm text-[#8a7361]">
        © 2026 Club Creative. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
