import Button from '../components/Button';
import img10 from '../assets/img10.jpg';
import img14 from '../assets/img14.jpg';
import img11 from '../assets/img11.jpg';
import img12 from '../assets/img12.jpg';
import img13 from '../assets/img13.jpg';

const ArticlePage = () => {
  return (
    <div className="flex w-full flex-col gap-6">

      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
  <div className="grid gap-8 lg:grid-cols-2 lg:items-center">

    {/* LEFT SIDE (TEXT) */}
    <div>
      <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
        Articles
      </p>

      <h1 className="max-w-xl text-3xl font-bold leading-tight text-zinc-900 sm:text-4xl">
        Stories Worth Sharing
      </h1>

      <p className="mt-4 max-w-lg text-sm leading-7 text-zinc-600 sm:text-base">
        This is where simple moments turn into meaningful stories—
        a space for reflections, creativity, and pieces of everyday life.
      </p>

      <div className="mt-6">
        <Button to="/">Back Home</Button>
      </div>
    </div>

    <div>
      <img
        src={img10}
        alt="Feature"
        className="w-full h-[350px] object-cover rounded-[1.25rem]"
      />
    </div>

  </div>
</section>

      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
            Featured Articles
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-zinc-900">
            Article card grid
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

          <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4">
           <div>
            <img
              src={img14}
              alt="Feature"
              className="w-full h-[200px] object-cover rounded-[1.25rem]"
            />
            </div>

            <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Article 01
            </p>

            <h3 className="mt-2 text-lg font-semibold text-zinc-900">
              Finding Peace in Small Moments
            </h3>

            <p className="mt-3 text-sm leading-6 text-zinc-600">
              A quiet pause, a simple drink, and a moment to just breathe.
            </p>

            <Button className="mt-4">Read More</Button>
          </article>

          <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4">
           <div>
            <img
              src={img11}
              alt="Feature"
              className="w-full h-[200px] object-cover rounded-[1.25rem]"
            />
            </div>

            <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Article 02
            </p>

            <h3 className="mt-2 text-lg font-semibold text-zinc-900">
              Chasing Little Joys
            </h3>

            <p className="mt-3 text-sm leading-6 text-zinc-600">
              Happiness doesn’t have to be big—sometimes it’s found in the smallest things.
            </p>

            <Button className="mt-4">Read More</Button>
          </article>

          <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4">
            <div>
            <img
              src={img12}
              alt="Feature"
              className="w-full h-[200px] object-cover rounded-[1.25rem]"
            />
            </div>

            <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Article 03
            </p>

            <h3 className="mt-2 text-lg font-semibold text-zinc-900">
              Capturing the Moment
            </h3>

            <p className="mt-3 text-sm leading-6 text-zinc-600">
              Some memories are too beautiful not to keep.
            </p>

            <Button className="mt-4">Read More</Button>
          </article>

          <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4">
           <div>
            <img
              src={img13}
              alt="Feature"
              className="w-full h-[200px] object-cover rounded-[1.25rem]"
            />
            </div>

            <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Article 04
            </p>

            <h3 className="mt-2 text-lg font-semibold text-zinc-900">
              Simple Days at Home
            </h3>

            <p className="mt-3 text-sm leading-6 text-zinc-600">
              The comfort of being at home, with the little things that make it special.
            </p>

            <Button className="mt-4">Read More</Button>
          </article>

        </div>
      </section>

    </div>
  );
};

export default ArticlePage;