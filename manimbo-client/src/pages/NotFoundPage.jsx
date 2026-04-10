import Button from '../components/Button';
import logo from '../assets/logo.jpg';

function NotFoundPage() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-6 py-16">
      <section className="w-full max-w-2xl rounded-[2rem] border border-zinc-900/10 bg-[#f7ead7] px-8 py-14 text-center shadow-[0_18px_45px_rgba(95,74,49,0.08)] sm:px-12">
        <img
          src={logo}
          alt="Club Creative logo"
          className="mx-auto h-20 w-auto object-contain sm:h-24"
        />
        <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
          Error 404
        </p>
        <h1 className="mt-3 text-4xl font-semibold leading-tight text-zinc-900 sm:text-5xl">
          This page wandered off.
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-zinc-600 sm:text-base">
          The page you are looking for does not exist, or the link may have been
          moved. Let&apos;s bring you back to a better place.
        </p>
        <div className="mt-8 flex justify-center">
          <Button to="/" variant="primary">
            Back Home
          </Button>
        </div>
      </section>
    </div>
  );
}

export default NotFoundPage;
