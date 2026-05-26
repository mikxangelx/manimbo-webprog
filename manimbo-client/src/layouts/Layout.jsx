import { Outlet } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const Layout = () => {
  return (
    <div className="min-h-screen bg-[#fbf9f6] px-2 py-0 sm:px-3 lg:px-4">
      <div className="mx-auto flex min-h-screen w-full max-w-[1480px] flex-col bg-white text-zinc-900 shadow-[0_18px_50px_rgba(95,74,49,0.05)]">
        <NavBar />
        <main className="flex-1 pb-16">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
