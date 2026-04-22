import Button from '../../components/Button.jsx';
import ArticleList from '../../components/ArticleList.jsx';
import articles from '../../assets/article-content.js';
import img10 from '../../assets/img10.jpg';

const ArticlesListPage = () => {
  return (
    <div className="flex w-full flex-col gap-6 px-3 pt-3 sm:px-4">
      <section className="rounded-[2rem] border border-[#efe3d7] bg-[linear-gradient(120deg,#ffffff_0%,#fdfaf6_58%,#f7f1ea_100%)] px-6 py-10 sm:px-8 lg:px-12 lg:py-14">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.95fr] lg:items-center">
          <div className="text-left">
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#a17f64]">
              Articles
            </p>
            <h1 className="mt-5 max-w-2xl text-5xl font-semibold leading-[1.04] text-[#2f241f] sm:text-6xl">
              Stories worth sharing, rereading, and keeping close.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-[#6e5b4d] sm:text-lg">
              This is where simple moments turn into meaningful stories: soft
              reflections, quiet routines, and creative pieces shaped by
              everyday life.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button to="/" variant="primary">
                Back Home
              </Button>
            </div>
          </div>

          <div className="rounded-[1.9rem] border border-[#f0e4d8] bg-white/80 p-3 shadow-[0_24px_60px_rgba(104,79,58,0.1)]">
            <img
              src={img10}
              alt="Articles feature"
              className="h-[340px] w-full rounded-[1.6rem] object-cover sm:h-[520px]"
            />
          </div>
        </div>
      </section>

      <section className="rounded-[2rem] border border-[#efe3d7] bg-[#fdfbf8] px-6 py-10 sm:px-8 lg:px-10">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div className="text-left">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#a17f64]">
              Featured Articles
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-[#2f241f]">
              A calm collection of visual essays
            </h2>
          </div>
        </div>

        <ArticleList articles={articles} />
      </section>
    </div>
  );
};

export default ArticlesListPage;
