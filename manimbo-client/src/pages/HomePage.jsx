import Button from '../components/Button';
import img4 from '../assets/img4.png';
import img1 from '../assets/img1.png';
import img2 from '../assets/img2.jpg';
import img3 from '../assets/img3.jpg';


const HomePage = () => {
  return (
    <div className="flex w-full flex-col gap-6">

      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">

          <div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
               Highlight Section
            </p>

            <h1 className="max-w-xl text-3xl font-bold leading-tight text-zinc-900 sm:text-4xl">
              Welcome to Club Creative
            </h1>

            <p className="mt-4 max-w-lg text-sm leading-7 text-zinc-600 sm:text-base">
              A space for stories, thoughts, and everyday inspiration.
              From random ideas to real-life moments—this is where creativity lives.
            </p>

            <div className="mt-6">
              <Button to="/about" variant="primary">Learn More</Button>
            </div>
          </div>
          
           <img
              src={img4}
              alt="Feature"
              className="w-full h-[350px] object-cover rounded-[1.25rem]"
              />
          

        </div>
      </section>

      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
            Little Things About This Spaces
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-zinc-900">
            Quick Glimpse
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
            <p className="text-2xl font-bold text-zinc-900">12</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Posts
            </p>
          </div>

          <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
            <p className="text-2xl font-bold text-zinc-900">08</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Categories
            </p>
          </div>

          <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
            <p className="text-2xl font-bold text-zinc-900">24</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Moments Captured
            </p>
          </div>

          <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
            <p className="text-2xl font-bold text-zinc-900">04</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Featured Topics
            </p>
          </div>

        </div>
      </section>

      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
            Feature Stories
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-zinc-900">
            Life, Thoughts & Creativity
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-3">

          <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4">
            <img
              src={img1}
              alt="Feature"
              className="w-full h-[180px] object-cover rounded-[1.25rem]"
              />

            <h3 className="mt-4 text-lg font-semibold text-zinc-900">
              Random Thoughts at 2AM
            </h3>

            <p className="mt-3 text-sm leading-6 text-zinc-600">
              Late night reflections about life, growth, and everything in between.
            </p>

            <Button className="mt-4" variant="primary">View More</Button>
          </article>

          <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4">
            <img
              src={img2}
              alt="Feature"
              className="w-full h-[180px] object-cover rounded-[1.25rem]"
              />

            <h3 className="mt-4 text-lg font-semibold text-zinc-900">
              Finding Peace in Small Moments
            </h3>

            <p className="mt-3 text-sm leading-6 text-zinc-600">
              Sometimes, it’s the quiet and simple days that mean the most.
            </p>

            <Button className="mt-4" variant="primary">View More</Button>
          </article>

          <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4">
           <img
              src={img3}
              alt="Feature"
              className="w-full h-[180px] object-cover rounded-[1.25rem]"
              />

            <h3 className="mt-4 text-lg font-semibold text-zinc-900">
              The Beauty of Starting Small
            </h3>

            <p className="mt-3 text-sm leading-6 text-zinc-600">
              You don’t need to have everything figured out to begin.
            </p>

            <Button className="mt-4" variant="primary">View More</Button>
          </article>

        </div>
      </section>

    </div>
  );
};

export default HomePage;