import Button from '../../components/Button';
import img4 from '../../assets/img4.png';
import img1 from '../../assets/img1.png';
import img2 from '../../assets/img2.jpg';
import img3 from '../../assets/img3.jpg';

const featuredStories = [
  {
    title: 'Random Thoughts at 2AM',
    description:
      'Late-night reflections about life, growth, and all the little feelings in between.',
    image: img1,
  },
  {
    title: 'Finding Peace in Small Moments',
    description:
      'A reminder that some of the most meaningful days are the softest and simplest ones.',
    image: img2,
  },
  {
    title: 'The Beauty of Starting Small',
    description:
      'You do not need a perfect plan to begin. Sometimes small starts lead to the most honest progress.',
    image: img3,
  },
];

const HomePage = () => {
  return (
    <div className="flex w-full flex-col gap-6 px-3 pt-3 sm:px-4">
      <section className="overflow-hidden rounded-[2rem] border border-[#efe3d7] bg-[linear-gradient(135deg,#ffffff_0%,#fdfaf6_58%,#f8f2eb_100%)] px-6 py-10 sm:px-8 lg:px-12 lg:py-14">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="text-left">
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#a17f64]">
              Welcome to Club Creative
            </p>
            <h1 className="mt-5 max-w-2xl text-5xl font-semibold leading-[1.02] text-[#2f241f] sm:text-6xl lg:text-7xl">
              A gentle editorial space for stories, thoughts, and everyday inspiration.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-[#6e5b4d] sm:text-lg">
              From random ideas to real-life moments, this is a personal corner
              for reflection, creativity, and finding beauty in ordinary days.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button to="/articles" variant="primary">
                Read Articles
              </Button>
              <Button to="/about">About Club Creative</Button>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-6 -top-6 h-28 w-28 rounded-full bg-white/40 blur-2xl" />
            <div className="rounded-[2rem] border border-[#f0e4d8] bg-white/80 p-3 shadow-[0_24px_60px_rgba(104,79,58,0.1)]">
              <img
                src={img4}
                alt="Club Creative feature"
                className="h-[340px] w-full rounded-[1.6rem] object-cover sm:h-[460px] lg:h-[560px]"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-[1.75rem] border border-[#efe4d9] bg-white p-6 text-left shadow-[0_10px_30px_rgba(95,74,49,0.05)]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-[#a17f64]">
            Journal
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-[#2f241f]">Thoughtful writing</h2>
          <p className="mt-3 text-sm leading-7 text-[#6e5b4d]">
            Personal essays, soft reflections, and small observations that feel
            honest and close to home.
          </p>
        </div>
        <div className="rounded-[1.75rem] border border-[#efe4d9] bg-[#fdfaf6] p-6 text-left shadow-[0_10px_30px_rgba(95,74,49,0.05)]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-[#a17f64]">
            Moodboard
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-[#2f241f]">Warm visuals</h2>
          <p className="mt-3 text-sm leading-7 text-[#6e5b4d]">
            A calm visual direction inspired by mornings, home rituals, and the
            beauty of familiar moments.
          </p>
        </div>
        <div className="rounded-[1.75rem] border border-[#efe4d9] bg-white p-6 text-left shadow-[0_10px_30px_rgba(95,74,49,0.05)]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-[#a17f64]">
            Purpose
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-[#2f241f]">Creative living</h2>
          <p className="mt-3 text-sm leading-7 text-[#6e5b4d]">
            A reminder that creativity can live in ordinary routines, quiet
            spaces, and the stories we choose to keep.
          </p>
        </div>
      </section>

      <section className="rounded-[2rem] border border-[#efe3d7] bg-[#fdfbf8] px-6 py-10 sm:px-8 lg:px-10">
        <div className="flex items-end justify-between gap-6">
          <div className="text-left">
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#a17f64]">
              Featured Stories
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-[#2f241f]">
              Notes from the heart of the site
            </h2>
          </div>
          <Button to="/articles" className="hidden md:inline-flex">
            View All
          </Button>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {featuredStories.map((story) => (
            <article
              key={story.title}
              className="overflow-hidden rounded-[1.75rem] border border-[#efe4d9] bg-white p-4 shadow-[0_12px_30px_rgba(95,74,49,0.05)]"
            >
              <img
                src={story.image}
                alt={story.title}
                className="h-[220px] w-full rounded-[1.3rem] object-cover"
              />
              <h3 className="mt-5 text-left text-xl font-semibold text-[#2f241f]">
                {story.title}
              </h3>
              <p className="mt-3 text-left text-sm leading-7 text-[#6e5b4d]">
                {story.description}
              </p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
