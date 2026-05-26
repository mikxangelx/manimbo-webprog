import Button from '../components/Button';
import logo from '../assets/logo.jpg';

function NotFoundPage() {
  return (
    <div className="flex min-h-[76vh] items-center justify-center px-6 py-16">
      <section className="w-full max-w-3xl rounded-[2.2rem] bg-[linear-gradient(135deg,#fff8ee_0%,#f7ead7_60%,#f1ddd0_100%)] px-8 py-16 text-center shadow-[0_22px_55px_rgba(95,74,49,0.12)] sm:px-12">
        <img
          src={logo}
          alt="Club Creative logo"
          className="mx-auto h-24 w-auto rounded-full object-contain sm:h-28"
        />
        <p className="mt-7 text-[11px] font-semibold uppercase tracking-[0.32em] text-[#a17f64]">
          Error 404
        </p>
        <h1 className="mt-4 text-5xl font-semibold leading-[1.02] text-[#2f241f] sm:text-6xl">
          This page slipped out of the story.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-[#6e5b4d] sm:text-lg">
          The page you were looking for cannot be found, but there is still a lot
          to explore inside Club Creative.
        </p>
        <div className="mt-9 flex justify-center">
          <Button to="/" variant="primary">
            Back Home
          </Button>
        </div>
      </section>
    </div>
  );
}

export default NotFoundPage;
